import {
  TaskData,
  HabitData,
  placeholderTasks,
  placeholderHabits,
} from "./placeholderData";

/**
 * Get tasks for today (could be filtered by various criteria in a real app)
 */
export const getTodaysTasks = (): TaskData[] => {
  // In a real app, this would filter tasks based on date, etc.
  return placeholderTasks;
};

/**
 * Get habits for today (could be filtered by various criteria in a real app)
 */
export const getTodaysHabits = (): HabitData[] => {
  // In a real app, this would filter habits based on date, etc.
  return placeholderHabits;
};

/**
 * Toggle the completion status of a task
 */
export const toggleTaskCompletion = (
  tasks: TaskData[],
  taskId: string
): TaskData[] => {
  return tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
};

/**
 * Toggle the completion status of a habit
 */
export const toggleHabitCompletion = (
  habits: HabitData[],
  habitId: string
): HabitData[] => {
  return habits.map((habit) =>
    habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
  );
};

/**
 * Calculate progress for a specific goal based on completed tasks and habits
 */
export const calculateGoalProgress = (
  goalName: string,
  tasks: TaskData[],
  habits: HabitData[]
): number => {
  const goalTasks = tasks.filter((task) => task.goalName === goalName);
  const goalHabits = habits.filter((habit) => habit.goalName === goalName);

  if (goalTasks.length === 0 && goalHabits.length === 0) {
    return 0;
  }

  const completedTasks = goalTasks.filter((task) => task.completed).length;
  const completedHabits = goalHabits.filter((habit) => habit.completed).length;

  const totalItems = goalTasks.length + goalHabits.length;
  const completedItems = completedTasks + completedHabits;

  return Math.round((completedItems / totalItems) * 100);
};

/**
 * Calculate total experience points earned today
 */
export const calculateTodaysExp = (
  tasks: TaskData[],
  habits: HabitData[]
): number => {
  const taskExp = tasks
    .filter((task) => task.completed)
    .reduce((total, task) => total + task.expPoints, 0);

  const habitExp = habits
    .filter((habit) => habit.completed)
    .reduce((total, habit) => total + habit.expPoints, 0);

  return taskExp + habitExp;
};

/**
 * Get count of completed and total tasks
 */
export const getTasksCount = (
  tasks: TaskData[]
): { completed: number; total: number } => {
  const completed = tasks.filter((task) => task.completed).length;
  return {
    completed,
    total: tasks.length,
  };
};

/**
 * Get count of completed and total habits
 */
export const getHabitsCount = (
  habits: HabitData[]
): { completed: number; total: number } => {
  const completed = habits.filter((habit) => habit.completed).length;
  return {
    completed,
    total: habits.length,
  };
};
