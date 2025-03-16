"use client";

import { Habit } from "@/components/Habit";
import { Task } from "@/components/Task";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GoalData,
  HabitData,
  TaskData,
  UserProfile,
  getHabitsCount,
  getTasksCount,
  getTodaysHabits,
  getTodaysTasks,
  toggleHabitCompletion,
  toggleTaskCompletion,
  updateUserStats,
} from "@/lib";
import { useState } from "react";

interface DailyTasksProps {
  user: UserProfile;
  goals: GoalData[];
}

export function DailyTasks({ user }: DailyTasksProps) {
  // Initialize state with placeholder data
  const [tasks, setTasks] = useState<TaskData[]>(getTodaysTasks());
  const [habits, setHabits] = useState<HabitData[]>(getTodaysHabits());

  // We'll keep track of user state changes locally but not display them
  // This allows us to track XP changes without duplicating the header
  const [, setUserState] = useState(user);

  // Calculate task and habit counts
  const taskCounts = getTasksCount(tasks);
  const habitCounts = getHabitsCount(habits);

  // Handle task checkbox change
  const handleTaskChange = (taskId: string) => {
    const updatedTasks = toggleTaskCompletion(tasks, taskId);
    setTasks(updatedTasks);

    // Find the task that was toggled
    const toggledTask = tasks.find((task) => task.id === taskId);
    if (toggledTask) {
      // If task was completed, add exp points to user
      const wasCompleted = toggledTask.completed;
      if (!wasCompleted) {
        // Task was just completed, add exp
        setUserState((prev) => ({
          ...prev,
          currentExp: prev.currentExp + toggledTask.expPoints,
        }));
      } else {
        // Task was uncompleted, remove exp
        setUserState((prev) => ({
          ...prev,
          currentExp: Math.max(0, prev.currentExp - toggledTask.expPoints),
        }));
      }
    }
  };

  // Handle habit completion
  const handleHabitComplete = (habitId: string, completed: boolean) => {
    const updatedHabits = toggleHabitCompletion(habits, habitId);
    setHabits(updatedHabits);

    // Find the habit that was toggled
    const toggledHabit = habits.find((habit) => habit.id === habitId);
    if (toggledHabit) {
      if (completed && !toggledHabit.completed) {
        // Habit was just completed
        // Add exp points to user
        setUserState((prev) => ({
          ...prev,
          currentExp: prev.currentExp + toggledHabit.expPoints,
          // Update stats if habit has stat boosts
          stats: updateUserStats(prev.stats, toggledHabit),
        }));
      } else if (!completed && toggledHabit.completed) {
        // Habit was uncompleted
        // Remove exp points from user
        setUserState((prev) => ({
          ...prev,
          currentExp: Math.max(0, prev.currentExp - toggledHabit.expPoints),
          // Note: We don't remove stat boosts when uncompleting a habit
        }));
      }
    }
  };

  // Sort tasks - incomplete tasks first
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  // Sort habits - incomplete habits first
  const sortedHabits = [...habits].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="flex-1 space-y-4">
      {/* Main content area with tasks and habits */}
      <div className="grid grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <Card className="bg-card border-border space-y-8">
          <CardHeader className="flex justify-between items-center">
            <div className="flex flex-col">
              <CardTitle className="text-xl">Today&apos;s Tasks</CardTitle>
              <p className="text-muted-foreground text-sm">
                You have{" "}
                <span className="font-medium text-white">
                  {taskCounts.total}
                </span>{" "}
                tasks today
              </p>
            </div>

            <Button variant="outline" className="text-sm">
              Add task
            </Button>
          </CardHeader>
          <CardContent>
            {/* Task items */}
            <div className="space-y-4 bg-secondary rounded-md p-4">
              {sortedTasks.map((task, index) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  goalName={task.goalName}
                  expPoints={task.expPoints}
                  checked={task.completed}
                  onCheckedChange={() => handleTaskChange(task.id)}
                  isLast={index === sortedTasks.length - 1}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Habits */}
        <Card className="bg-card border-border space-y-6">
          <CardHeader>
            <div className="flex flex-col">
              <CardTitle className="text-xl">Today&apos;s Habits</CardTitle>
              <p className="text-muted-foreground text-sm">
                You have{" "}
                <span className="font-medium text-white">
                  {habitCounts.total}
                </span>{" "}
                habits today
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {sortedHabits.map((habit) => (
              <Habit
                key={habit.id}
                id={habit.id}
                title={habit.title}
                description={habit.description}
                goalName={habit.goalName}
                expPoints={habit.expPoints}
                statBoosts={habit.statBoosts}
                completed={habit.completed}
                onComplete={(id, completed) =>
                  handleHabitComplete(id, completed)
                }
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
