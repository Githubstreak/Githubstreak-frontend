/**
 * Empty state illustrations as React components
 * These provide friendly visuals for zero-state scenarios
 */

import PropTypes from "prop-types";

/**
 * Illustration for new users with no streak
 */
export const NoStreakIllustration = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Flame outline (not lit) */}
    <path
      d="M100 20C75 45 60 70 60 95C60 120 78 140 100 140C122 140 140 120 140 95C140 70 125 45 100 20Z"
      stroke="#475569"
      strokeWidth="3"
      strokeDasharray="8 4"
      fill="none"
    />
    {/* Sparkle hints */}
    <circle cx="50" cy="40" r="2" fill="#475569" />
    <circle cx="150" cy="50" r="3" fill="#475569" />
    <circle cx="45" cy="100" r="2" fill="#475569" />
    <circle cx="155" cy="90" r="2" fill="#475569" />
    {/* Match stick */}
    <rect x="90" y="130" width="20" height="8" rx="2" fill="#78716c" />
    <rect x="95" y="120" width="10" height="15" rx="2" fill="#a8a29e" />
  </svg>
);

/**
 * Illustration for first-time visitors
 */
export const WelcomeIllustration = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* GitHub-like octocat silhouette */}
    <circle
      cx="100"
      cy="70"
      r="40"
      fill="#1e293b"
      stroke="#334155"
      strokeWidth="2"
    />
    <circle cx="85" cy="65" r="8" fill="#334155" />
    <circle cx="115" cy="65" r="8" fill="#334155" />
    <circle cx="87" cy="63" r="3" fill="#22c55e" />
    <circle cx="117" cy="63" r="3" fill="#22c55e" />
    <path
      d="M90 85 Q100 95 110 85"
      stroke="#334155"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
    {/* Tentacles */}
    <path
      d="M70 100 Q60 120 50 130"
      stroke="#334155"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M130 100 Q140 120 150 130"
      stroke="#334155"
      strokeWidth="4"
      strokeLinecap="round"
    />
    {/* Stars around */}
    <path
      d="M40 30 L43 38 L51 38 L45 43 L47 51 L40 46 L33 51 L35 43 L29 38 L37 38 Z"
      fill="#22c55e"
      opacity="0.5"
    />
    <path
      d="M160 40 L162 45 L167 45 L163 48 L165 53 L160 50 L155 53 L157 48 L153 45 L158 45 Z"
      fill="#22c55e"
      opacity="0.5"
    />
    <path
      d="M170 100 L172 105 L177 105 L173 108 L175 113 L170 110 L165 113 L167 108 L163 105 L168 105 Z"
      fill="#22c55e"
      opacity="0.3"
    />
  </svg>
);

/**
 * Illustration for loading/waiting states
 */
export const LoadingIllustration = ({ className = "" }) => (
  <svg
    className={`${className} animate-pulse`}
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Pulsing circles */}
    <circle
      cx="100"
      cy="80"
      r="30"
      fill="#1e293b"
      stroke="#334155"
      strokeWidth="2"
    />
    <circle cx="100" cy="80" r="20" fill="#334155" />
    <circle cx="100" cy="80" r="10" fill="#475569" />
    {/* Orbiting dots */}
    <circle cx="100" cy="40" r="5" fill="#22c55e" opacity="0.8">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 100 80"
        to="360 100 80"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="140" cy="80" r="4" fill="#22c55e" opacity="0.6">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="90 100 80"
        to="450 100 80"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="100" cy="120" r="3" fill="#22c55e" opacity="0.4">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="180 100 80"
        to="540 100 80"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

/**
 * Illustration for broken streak
 */
export const BrokenStreakIllustration = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Broken chain links */}
    <ellipse
      cx="70"
      cy="80"
      rx="25"
      ry="15"
      stroke="#475569"
      strokeWidth="4"
      fill="none"
    />
    <ellipse
      cx="130"
      cy="80"
      rx="25"
      ry="15"
      stroke="#475569"
      strokeWidth="4"
      fill="none"
    />
    {/* Break in the middle */}
    <line
      x1="90"
      y1="70"
      x2="110"
      y2="90"
      stroke="#ef4444"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <line
      x1="110"
      y1="70"
      x2="90"
      y2="90"
      stroke="#ef4444"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Sad face hint */}
    <circle cx="60" cy="120" r="3" fill="#475569" />
    <circle cx="80" cy="120" r="3" fill="#475569" />
    <path
      d="M55 135 Q70 125 85 135"
      stroke="#475569"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
    {/* Sparkles of hope */}
    <circle cx="150" cy="50" r="2" fill="#22c55e" opacity="0.5" />
    <circle cx="160" cy="130" r="2" fill="#22c55e" opacity="0.5" />
  </svg>
);

/**
 * Illustration for achievement locked
 */
export const LockedAchievementIllustration = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Lock body */}
    <rect
      x="70"
      y="70"
      width="60"
      height="50"
      rx="8"
      fill="#334155"
      stroke="#475569"
      strokeWidth="2"
    />
    {/* Lock shackle */}
    <path
      d="M80 70 V55 C80 40 90 30 100 30 C110 30 120 40 120 55 V70"
      stroke="#475569"
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
    {/* Keyhole */}
    <circle cx="100" cy="90" r="8" fill="#1e293b" />
    <rect x="97" y="90" width="6" height="15" rx="2" fill="#1e293b" />
    {/* Stars around */}
    <circle cx="40" cy="60" r="3" fill="#eab308" opacity="0.3" />
    <circle cx="160" cy="50" r="2" fill="#eab308" opacity="0.3" />
    <circle cx="155" cy="120" r="3" fill="#eab308" opacity="0.3" />
  </svg>
);

/**
 * Illustration for empty leaderboard
 */
export const EmptyLeaderboardIllustration = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Podium */}
    <rect x="30" y="100" width="40" height="40" fill="#334155" />
    <rect x="80" y="80" width="40" height="60" fill="#475569" />
    <rect x="130" y="110" width="40" height="30" fill="#334155" />
    {/* Numbers */}
    <text x="98" y="75" fill="#94a3b8" fontSize="14" fontWeight="bold">
      1
    </text>
    <text x="48" y="95" fill="#94a3b8" fontSize="12">
      2
    </text>
    <text x="148" y="105" fill="#94a3b8" fontSize="12">
      3
    </text>
    {/* Question marks (empty spots) */}
    <text x="92" y="115" fill="#64748b" fontSize="20">
      ?
    </text>
    <text x="42" y="125" fill="#64748b" fontSize="16">
      ?
    </text>
    <text x="142" y="130" fill="#64748b" fontSize="16">
      ?
    </text>
    {/* Decorative stars */}
    <circle cx="100" cy="30" r="4" fill="#eab308" opacity="0.5" />
    <circle cx="60" cy="50" r="2" fill="#22c55e" opacity="0.5" />
    <circle cx="140" cy="45" r="3" fill="#22c55e" opacity="0.5" />
  </svg>
);

NoStreakIllustration.propTypes = { className: PropTypes.string };
WelcomeIllustration.propTypes = { className: PropTypes.string };
LoadingIllustration.propTypes = { className: PropTypes.string };
BrokenStreakIllustration.propTypes = { className: PropTypes.string };
LockedAchievementIllustration.propTypes = { className: PropTypes.string };
EmptyLeaderboardIllustration.propTypes = { className: PropTypes.string };
