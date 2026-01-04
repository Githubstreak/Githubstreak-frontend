import { useEffect, useState, useCallback } from "react";

// Confetti particle component
const ConfettiParticle = ({ x, color, delay, size }) => {
  return (
    <div
      className="absolute pointer-events-none animate-confetti-fall"
      style={{
        left: `${x}%`,
        animationDelay: `${delay}s`,
        top: "-20px",
      }}
    >
      <div
        className="animate-confetti-spin"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          borderRadius: Math.random() > 0.5 ? "50%" : "0",
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    </div>
  );
};

// Milestone definitions for celebration triggers
const MILESTONES = [7, 14, 21, 30, 50, 75, 100, 150, 200, 365];

const CONFETTI_COLORS = [
  "#22c55e", // green
  "#3b82f6", // blue
  "#f59e0b", // amber
  "#ec4899", // pink
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#f97316", // orange
];

const ConfettiCelebration = ({ currentStreak, previousStreak = 0 }) => {
  const [isActive, setIsActive] = useState(false);
  const [milestone, setMilestone] = useState(null);
  const [particles, setParticles] = useState([]);

  // Check if we just hit a milestone
  const checkMilestone = useCallback(() => {
    if (currentStreak > previousStreak) {
      const hitMilestone = MILESTONES.find(
        (m) => currentStreak >= m && previousStreak < m
      );
      if (hitMilestone) {
        setMilestone(hitMilestone);
        triggerConfetti();
      }
    }
  }, [currentStreak, previousStreak]);

  const triggerConfetti = () => {
    // Generate particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color:
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      delay: Math.random() * 0.5,
      size: Math.random() * 8 + 4,
    }));

    setParticles(newParticles);
    setIsActive(true);

    // Clear after animation
    setTimeout(() => {
      setIsActive(false);
      setParticles([]);
      setMilestone(null);
    }, 4000);
  };

  useEffect(() => {
    checkMilestone();
  }, [currentStreak, checkMilestone]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Confetti particles */}
      {particles.map((particle) => (
        <ConfettiParticle key={particle.id} {...particle} />
      ))}

      {/* Milestone banner */}
      {milestone && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 animate-bounce-in">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-6 rounded-2xl shadow-2xl text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-2xl font-bold mb-1">{milestone} Day Streak!</h2>
            <p className="text-green-100 text-sm">
              {getMilestoneMessage(milestone)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Get milestone-specific message
function getMilestoneMessage(milestone) {
  const messages = {
    7: "You've built a week-long habit! Keep it going!",
    14: "Two weeks strong! You're unstoppable!",
    21: "21 days - habit scientists say you're locked in!",
    30: "A full month of coding! You're a machine!",
    50: "50 days! You're in the top tier of developers!",
    75: "75 days! Almost at legendary status!",
    100: "CENTURY! You're officially a coding legend!",
    150: "150 days! You're inspiring the community!",
    200: "200 days! Nothing can stop you now!",
    365: "ONE YEAR! You've achieved the impossible!",
  };
  return messages[milestone] || "Amazing achievement!";
}

export default ConfettiCelebration;
