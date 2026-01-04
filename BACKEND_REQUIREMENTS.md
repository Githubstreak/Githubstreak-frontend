# Backend Requirements for New Frontend Features

**Date:** January 4, 2026  
**Frontend Version:** v2.0 (Gamification Update)  
**Priority Levels:** 🔴 Critical | 🟠 High | 🟡 Medium | 🟢 Low

---

## Overview

The frontend has been updated with gamification features to increase user engagement and retention. Some features require new backend endpoints or data model updates to fully function.

---

## 1. 🟠 Embeddable Profile Badge

### Purpose

Allow users to embed a dynamic streak badge in their GitHub README or personal websites.

### Frontend Generates URLs Like:

```
https://api.ggithubstreak.com/badge/{username}
https://api.ggithubstreak.com/badge/{username}?style=flat
https://api.ggithubstreak.com/badge/{username}?style=plastic
```

### Required Endpoint

```http
GET /badge/:username
```

#### Query Parameters (Optional)

| Parameter | Type   | Default | Description                                     |
| --------- | ------ | ------- | ----------------------------------------------- |
| `style`   | string | `flat`  | Badge style: `flat`, `plastic`, `for-the-badge` |
| `theme`   | string | `dark`  | Color theme: `dark`, `light`                    |

#### Response

- **Content-Type:** `image/svg+xml` or `image/png`
- **Cache-Control:** `public, max-age=3600` (1 hour cache)

#### Badge Content Should Include:

- 🔥 Fire emoji or icon
- Current streak count
- "day streak" text
- Dynamic color based on streak:
  - Gray: 0 days
  - Blue: 1-6 days
  - Green: 7-29 days
  - Gold: 30-99 days
  - Purple: 100+ days

#### Example SVG Structure:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="28">
  <rect width="150" height="28" rx="3" fill="#1e293b"/>
  <text x="10" y="19" fill="#f97316">🔥</text>
  <text x="30" y="19" font-family="sans-serif" font-size="12" fill="white">
    <tspan font-weight="bold">42</tspan> day streak
  </text>
</svg>
```

#### Error Handling

- User not found: Return a gray badge with "0 day streak"
- Invalid username: Return 400 Bad Request

---

## 2. 🟠 Streak Freeze System

### Purpose

Allow users to "freeze" their streak for one day if they miss a commit. Freezes are earned by hitting streak milestones.

### Data Model Changes

Add to User model:

```typescript
interface User {
  // ... existing fields
  usedFreezes: number; // Default: 0
  lastFreezeUsedAt: Date; // Optional: Track when freeze was last used
}
```

### Freeze Earning Rules (Frontend Calculated)

| Milestone      | Freezes Earned |
| -------------- | -------------- |
| 7-day streak   | +1 freeze      |
| 30-day streak  | +2 freezes     |
| 100-day streak | +3 freezes     |

**Total Available Freezes** = Earned (based on longest streak) - Used

### Required Endpoint

```http
POST /v1/users/use-freeze
```

#### Request Body

```json
{
  "userId": "clerk_user_id"
}
```

#### Response (Success - 200)

```json
{
  "success": true,
  "message": "Streak freeze applied successfully",
  "data": {
    "usedFreezes": 1,
    "availableFreezes": 2,
    "currentStreak": 15,
    "streakRestored": true
  }
}
```

#### Response (Error - 400)

```json
{
  "success": false,
  "error": "NO_FREEZES_AVAILABLE",
  "message": "You don't have any streak freezes available"
}
```

#### Business Logic

1. Calculate earned freezes from `longestStreak`:

   - longestStreak >= 100: earned = 6 (1+2+3)
   - longestStreak >= 30: earned = 3 (1+2)
   - longestStreak >= 7: earned = 1
   - else: earned = 0

2. Check: `earned - usedFreezes > 0`

3. If available:

   - Increment `usedFreezes`
   - Set `lastFreezeUsedAt` to now
   - Restore streak (set last contribution date to yesterday)
   - Return success

4. If not available:
   - Return error

---

## 3. 🟢 Public User Lookup (For Streak Battles)

### Purpose

Allow users to compare streaks with friends by looking up another user's public stats.

### Required Endpoint

```http
GET /v1/users/public/:username
```

or

```http
GET /v1/users/stat?username=:githubUsername
```

#### Response (Success - 200)

```json
{
  "success": true,
  "data": {
    "username": "octocat",
    "avatarUrl": "https://github.com/octocat.png",
    "currentStreak": 25,
    "longestStreak": 45,
    "contributions": 1234,
    "isPublic": true
  }
}
```

#### Response (User Not Found - 404)

```json
{
  "success": false,
  "error": "USER_NOT_FOUND",
  "message": "User not found or profile is private"
}
```

#### Privacy Considerations

- Only return data for users who have opted in to be publicly visible
- Consider adding a `isProfilePublic` field to user model
- Default to public for existing users (opt-out model)

---

## 4. 🟡 Contribution Days Array (Enhancement)

### Current State

The `/v1/users/stat` endpoint returns contribution data but may not include the detailed `contributionDays` array.

### Requested Enhancement

Include an array of contribution days for the weekly calendar and heatmap features.

#### Updated Response for `/v1/users/stat`

```json
{
  "currentStreak": {
    "count": 15,
    "startDate": "2025-12-20"
  },
  "longestStreak": {
    "count": 45,
    "startDate": "2025-10-01",
    "endDate": "2025-11-14"
  },
  "contributions": 1234,
  "lastContributionDate": "2026-01-04",
  "contributionDays": [
    { "date": "2026-01-04", "count": 5 },
    { "date": "2026-01-03", "count": 3 },
    { "date": "2026-01-02", "count": 1 }
    // ... last 90 days ideally
  ]
}
```

#### Use Cases

- **Weekly Calendar:** Shows green/gray squares for last 7 days
- **Contribution Heatmap:** GitHub-style 12-week activity grid
- **Accurate Streak Status:** Determine if user committed "today" vs "yesterday"

---

## 5. 🟡 Manual Sync Trigger

### Purpose

Allow users to manually trigger a GitHub data refresh instead of waiting for scheduled sync.

### Required Endpoint

```http
POST /v1/users/sync
```

#### Request Body

```json
{
  "userId": "clerk_user_id"
}
```

#### Response (Success - 200)

```json
{
  "success": true,
  "message": "Sync completed",
  "data": {
    "currentStreak": 16,
    "contributions": 1235,
    "lastSyncedAt": "2026-01-04T15:30:00Z"
  }
}
```

#### Rate Limiting

- Limit to 1 sync per user per 5 minutes
- Return 429 Too Many Requests if exceeded

---

## 6. 🟢 User Preferences (Future)

### Purpose

Store user preferences for notifications and privacy.

### Suggested Fields

```typescript
interface UserPreferences {
  isProfilePublic: boolean; // Default: true
  reminderEnabled: boolean; // Default: false
  reminderTime: string; // e.g., "20:00" (8 PM)
  timezone: string; // e.g., "America/New_York"
}
```

### Endpoint

```http
PATCH /v1/users/preferences
```

---

## Implementation Priority

| Priority  | Feature            | Effort | Impact                |
| --------- | ------------------ | ------ | --------------------- |
| 🟠 High   | Embeddable Badge   | Medium | High (shareability)   |
| 🟠 High   | Streak Freeze      | Medium | High (retention)      |
| 🟡 Medium | Contribution Days  | Low    | Medium (accuracy)     |
| 🟡 Medium | Manual Sync        | Low    | Medium (UX)           |
| 🟢 Low    | Public User Lookup | Low    | Low (social feature)  |
| 🟢 Low    | User Preferences   | Medium | Low (future-proofing) |

---

## Questions for Backend Team

1. **Timezone Handling:** Are all dates stored in UTC? The frontend assumes midnight UTC for streak resets.

2. **GitHub API Rate Limits:** How often can we sync a user's data? Is there a queue system?

3. **Badge Caching:** Should badges be cached at CDN level, or generated on each request?

4. **Privacy:** Should we implement an opt-in or opt-out model for public profiles?

5. **Freeze Expiration:** Should freezes expire after a certain time, or be permanent once earned?

---

## Contact

For questions about these requirements, please reach out to the frontend team.

**Files Changed in This Update:**

- `src/components/AchievementBadges.jsx` - Badge system
- `src/components/ConfettiCelebration.jsx` - Milestone celebrations
- `src/components/StreakFreezeTokens.jsx` - Freeze token UI
- `src/components/DailyChallenge.jsx` - Daily prompts
- `src/components/EmbeddableBadge.jsx` - Badge embed code
- `src/components/StreakBattle.jsx` - Friend battles
- `src/components/LevelProgress.jsx` - XP system
- `src/components/NotificationSettings.jsx` - Browser notifications
- `src/components/MotivationalQuote.jsx` - Daily quotes
- `src/components/ContributionHeatmap.jsx` - Activity heatmap
- `src/Pages/Profile.jsx` - New profile page
