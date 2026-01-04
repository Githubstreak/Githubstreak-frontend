import { useState, useEffect } from "react";
import { FaBell, FaBellSlash, FaClock } from "react-icons/fa";

const NotificationSettings = ({ streakStatus }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [permission, setPermission] = useState("default");
  const [reminderTime, setReminderTime] = useState("20:00"); // 8 PM default

  useEffect(() => {
    // Check notification permission on mount
    if ("Notification" in window) {
      setPermission(Notification.permission);

      // Check if already enabled from localStorage
      const savedEnabled = localStorage.getItem("notificationsEnabled");
      const savedTime = localStorage.getItem("reminderTime");

      if (savedEnabled === "true" && Notification.permission === "granted") {
        setIsEnabled(true);
      }
      if (savedTime) {
        setReminderTime(savedTime);
      }
    }
  }, []);

  // Schedule daily reminder check
  useEffect(() => {
    if (!isEnabled) return;

    const checkReminder = () => {
      const now = new Date();
      const [hours, minutes] = reminderTime.split(":").map(Number);

      // Check if it's reminder time and streak is pending
      if (
        now.getHours() === hours &&
        now.getMinutes() === minutes &&
        streakStatus === "pending"
      ) {
        showReminderNotification();
      }
    };

    // Check every minute
    const interval = setInterval(checkReminder, 60000);
    return () => clearInterval(interval);
  }, [isEnabled, reminderTime, streakStatus]);

  const showReminderNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("🔥 Don't break your streak!", {
        body: "You haven't committed today. Make a quick push to keep your streak alive!",
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        tag: "streak-reminder",
        requireInteraction: true,
        actions: [
          { action: "github", title: "Open GitHub" },
          { action: "dismiss", title: "Dismiss" },
        ],
      });
    }
  };

  const requestPermission = async () => {
    if ("Notification" in window) {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === "granted") {
        setIsEnabled(true);
        localStorage.setItem("notificationsEnabled", "true");

        // Show test notification
        new Notification("✅ Notifications enabled!", {
          body: "You'll be reminded daily to maintain your streak.",
          icon: "/favicon.ico",
        });
      }
    }
  };

  const toggleNotifications = () => {
    if (!isEnabled && permission !== "granted") {
      requestPermission();
    } else {
      const newState = !isEnabled;
      setIsEnabled(newState);
      localStorage.setItem("notificationsEnabled", String(newState));
    }
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setReminderTime(newTime);
    localStorage.setItem("reminderTime", newTime);
  };

  // Don't show if notifications aren't supported
  if (!("Notification" in window)) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          {isEnabled ? (
            <FaBell className="text-green-400" />
          ) : (
            <FaBellSlash className="text-gray-400" />
          )}
          Streak Reminders
        </h3>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Get a daily reminder to commit and maintain your streak.
      </p>

      {/* Permission denied message */}
      {permission === "denied" && (
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 mb-4">
          <p className="text-sm text-red-400">
            Notifications are blocked. Please enable them in your browser
            settings.
          </p>
        </div>
      )}

      {/* Enable toggle */}
      <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg mb-4">
        <span className="text-sm text-white">Enable daily reminders</span>
        <button
          onClick={toggleNotifications}
          disabled={permission === "denied"}
          className={`
            relative w-12 h-6 rounded-full transition-colors duration-200
            ${isEnabled ? "bg-green-500" : "bg-slate-600"}
            ${
              permission === "denied"
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }
          `}
        >
          <span
            className={`
              absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md
              transition-transform duration-200
              ${isEnabled ? "translate-x-6" : "translate-x-0.5"}
            `}
          />
        </button>
      </div>

      {/* Time picker */}
      {isEnabled && (
        <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
          <FaClock className="text-gray-400" />
          <span className="text-sm text-white flex-1">Remind me at</span>
          <input
            type="time"
            value={reminderTime}
            onChange={handleTimeChange}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-green-500"
          />
        </div>
      )}

      {/* Test notification button */}
      {isEnabled && (
        <button
          onClick={showReminderNotification}
          className="w-full mt-4 text-sm text-gray-400 hover:text-white transition-colors"
        >
          Test notification
        </button>
      )}
    </div>
  );
};

export default NotificationSettings;
