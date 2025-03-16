import { StatType } from "@/components/Habit";

// Task type definition based on Task component
export interface TaskData {
  id: string;
  title: string;
  goalName?: string;
  expPoints: number;
  completed: boolean;
}

// Habit type definition based on Habit component
export interface StatBoost {
  type: StatType;
  value: number;
}

export interface HabitData {
  id: string;
  title: string;
  description?: string;
  goalName?: string;
  expPoints: number;
  statBoosts?: StatBoost[];
  completed: boolean;
}

// Goal type definition
export interface GoalData {
  id: string;
  name: string;
  description?: string;
  deadline?: Date;
  progress: number; // 0-100
}

// Placeholder tasks
export const placeholderTasks: TaskData[] = [
  {
    id: "task1",
    title: "Complete project proposal",
    goalName: "Work Project",
    expPoints: 50,
    completed: false,
  },
  {
    id: "task2",
    title: "Go for a 30-minute run",
    goalName: "Fitness",
    expPoints: 40,
    completed: false,
  },
  {
    id: "task3",
    title: "Read 20 pages",
    goalName: "Reading",
    expPoints: 30,
    completed: false,
  },
  {
    id: "task4",
    title: "Meditate for 10 minutes",
    expPoints: 25,
    completed: true,
  },
  {
    id: "task5",
    title: "Plan meals for the week",
    goalName: "Health",
    expPoints: 35,
    completed: true,
  },
  {
    id: "task6",
    title: "Call parents",
    expPoints: 20,
    completed: false,
  },
  {
    id: "task7",
    title: "Clean the apartment",
    goalName: "Home",
    expPoints: 45,
    completed: false,
  },
  {
    id: "task8",
    title: "Study for 1 hour",
    goalName: "Education",
    expPoints: 60,
    completed: false,
  },
];

// Placeholder habits
export const placeholderHabits: HabitData[] = [
  {
    id: "habit1",
    title: "Morning workout",
    description: "30 minutes of exercise to start the day",
    goalName: "Fitness",
    expPoints: 40,
    statBoosts: [
      { type: "STR", value: 3 },
      { type: "VIT", value: 2 },
    ],
    completed: false,
  },
  {
    id: "habit2",
    title: "Drink 2L of water",
    description: "Stay hydrated throughout the day",
    goalName: "Health",
    expPoints: 25,
    statBoosts: [
      { type: "VIT", value: 3 },
      { type: "SPE", value: 1 },
    ],
    completed: false,
  },
  {
    id: "habit3",
    title: "Read for 30 minutes",
    description: "Daily reading to expand knowledge",
    goalName: "Education",
    expPoints: 35,
    statBoosts: [{ type: "INT", value: 4 }],
    completed: true,
  },
  {
    id: "habit4",
    title: "Practice meditation",
    description: "15 minutes of mindfulness",
    expPoints: 30,
    statBoosts: [
      { type: "INT", value: 2 },
      { type: "VIT", value: 2 },
    ],
    completed: false,
  },
  {
    id: "habit5",
    title: "Stretch before bed",
    description: "Improve flexibility and sleep quality",
    goalName: "Fitness",
    expPoints: 20,
    statBoosts: [
      { type: "AGL", value: 3 },
      { type: "VIT", value: 1 },
    ],
    completed: false,
  },
];

// Placeholder goals
export const placeholderGoals: GoalData[] = [
  {
    id: "goal1",
    name: "Work Project",
    description: "Complete the quarterly project",
    deadline: new Date(2023, 11, 15), // December 15, 2023
    progress: 65,
  },
  {
    id: "goal2",
    name: "Fitness",
    description: "Exercise regularly and improve strength",
    deadline: new Date(2023, 11, 31), // December 31, 2023
    progress: 40,
  },
  {
    id: "goal3",
    name: "Reading",
    description: "Read 12 books this year",
    deadline: new Date(2023, 11, 31), // December 31, 2023
    progress: 75,
  },
  {
    id: "goal4",
    name: "Health",
    description: "Improve overall health and wellness",
    progress: 50,
  },
  {
    id: "goal5",
    name: "Education",
    description: "Learn new skills and knowledge",
    deadline: new Date(2024, 5, 30), // June 30, 2024
    progress: 25,
  },
  {
    id: "goal6",
    name: "Home",
    description: "Maintain and improve living space",
    progress: 30,
  },
];

// Helper function to get tasks by goal
export const getTasksByGoal = (goalName: string): TaskData[] => {
  return placeholderTasks.filter((task) => task.goalName === goalName);
};

// Helper function to get habits by goal
export const getHabitsByGoal = (goalName: string): HabitData[] => {
  return placeholderHabits.filter((habit) => habit.goalName === goalName);
};

// Helper function to calculate total experience points earned
export const calculateTotalExp = (): number => {
  const taskExp = placeholderTasks
    .filter((task) => task.completed)
    .reduce((total, task) => total + task.expPoints, 0);

  const habitExp = placeholderHabits
    .filter((habit) => habit.completed)
    .reduce((total, habit) => total + habit.expPoints, 0);

  return taskExp + habitExp;
};
