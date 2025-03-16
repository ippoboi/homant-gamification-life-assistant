import { StatType } from "@/components/Habit";

// User profile interface
export interface UserProfile {
  id: string;
  name: string;
  level: number;
  currentExp: number;
  expToNextLevel: number;
  stats: Record<StatType, number>;
  achievements: Achievement[];
}

// Achievement interface
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

// Level requirements - exp needed for each level
export const levelRequirements: number[] = [
  0, // Level 1 (starting level)
  100, // Level 2
  250, // Level 3
  450, // Level 4
  700, // Level 5
  1000, // Level 6
  1350, // Level 7
  1750, // Level 8
  2200, // Level 9
  2700, // Level 10
  3250, // Level 11
  3850, // Level 12
  4500, // Level 13
  5200, // Level 14
  6000, // Level 15
];

// Placeholder user data
export const placeholderUser: UserProfile = {
  id: "user1",
  name: "Dimitar",
  level: 8,
  currentExp: 234,
  expToNextLevel: 1230,
  stats: {
    STR: 25,
    VIT: 18,
    AGL: 22,
    SPE: 15,
    INT: 30,
  },
  achievements: [
    {
      id: "achievement1",
      name: "Early Bird",
      description: "Complete 5 tasks before 9 AM",
      icon: "sunrise",
      unlocked: true,
      unlockedAt: new Date(2023, 9, 15),
    },
    {
      id: "achievement2",
      name: "Habit Master",
      description: "Complete all habits for 7 consecutive days",
      icon: "award",
      unlocked: true,
      unlockedAt: new Date(2023, 10, 2),
    },
    {
      id: "achievement3",
      name: "Goal Crusher",
      description: "Complete 3 goals",
      icon: "target",
      unlocked: false,
    },
    {
      id: "achievement4",
      name: "Fitness Fanatic",
      description: "Reach STR level 30",
      icon: "dumbbell",
      unlocked: false,
    },
  ],
};

/**
 * Calculate the level based on total experience points
 */
export const calculateLevel = (
  totalExp: number
): { level: number; currentExp: number; expToNextLevel: number } => {
  let level = 1;

  // Find the highest level the user has reached
  for (let i = 1; i < levelRequirements.length; i++) {
    if (totalExp >= levelRequirements[i]) {
      level = i + 1;
    } else {
      break;
    }
  }

  // Calculate experience to next level
  const currentLevelExp = level <= 1 ? 0 : levelRequirements[level - 1];
  const nextLevelExp =
    level >= levelRequirements.length ? Infinity : levelRequirements[level];

  return {
    level,
    currentExp: totalExp - currentLevelExp,
    expToNextLevel: nextLevelExp - currentLevelExp,
  };
};

/**
 * Calculate the percentage progress to the next level
 */
export const calculateLevelProgress = (
  currentExp: number,
  expToNextLevel: number
): number => {
  return Math.round((currentExp / expToNextLevel) * 100);
};

/**
 * Update user stats based on completed habits
 */
export const updateUserStats = (
  currentStats: Record<StatType, number>,
  completedHabit: { statBoosts?: { type: StatType; value: number }[] }
): Record<StatType, number> => {
  if (!completedHabit.statBoosts || completedHabit.statBoosts.length === 0) {
    return currentStats;
  }

  const newStats = { ...currentStats };

  completedHabit.statBoosts.forEach((boost) => {
    newStats[boost.type] += boost.value;
  });

  return newStats;
};

/**
 * Check if any new achievements have been unlocked
 */
export const checkAchievements = (
  user: UserProfile,
  tasksCompleted: number,
  habitsCompleted: number,
  goalsCompleted: number,
  consecutiveHabitDays: number
): Achievement[] => {
  const updatedAchievements = [...user.achievements];

  // Check for Goal Crusher achievement
  const goalCrusherAchievement = updatedAchievements.find(
    (a) => a.id === "achievement3"
  );
  if (
    goalCrusherAchievement &&
    !goalCrusherAchievement.unlocked &&
    goalsCompleted >= 3
  ) {
    goalCrusherAchievement.unlocked = true;
    goalCrusherAchievement.unlockedAt = new Date();
  }

  // Check for Fitness Fanatic achievement
  const fitnessFanaticAchievement = updatedAchievements.find(
    (a) => a.id === "achievement4"
  );
  if (
    fitnessFanaticAchievement &&
    !fitnessFanaticAchievement.unlocked &&
    user.stats.STR >= 30
  ) {
    fitnessFanaticAchievement.unlocked = true;
    fitnessFanaticAchievement.unlockedAt = new Date();
  }

  // Check for Habit Master achievement
  const habitMasterAchievement = updatedAchievements.find(
    (a) => a.id === "achievement2"
  );
  if (
    habitMasterAchievement &&
    !habitMasterAchievement.unlocked &&
    consecutiveHabitDays >= 7
  ) {
    habitMasterAchievement.unlocked = true;
    habitMasterAchievement.unlockedAt = new Date();
  }

  return updatedAchievements;
};
