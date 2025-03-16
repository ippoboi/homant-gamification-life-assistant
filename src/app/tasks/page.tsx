"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Star, Menu } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Task } from "@/components/Task";
import { Habit } from "@/components/Habit";
import {
  TaskData,
  HabitData,
  placeholderUser,
  placeholderGoals,
  getTodaysTasks,
  getTodaysHabits,
  toggleTaskCompletion,
  toggleHabitCompletion,
  getTasksCount,
  getHabitsCount,
  calculateLevelProgress,
  updateUserStats,
} from "@/lib";

export default function Tasks() {
  // Initialize state with placeholder data
  const [tasks, setTasks] = useState<TaskData[]>(getTodaysTasks());
  const [habits, setHabits] = useState<HabitData[]>(getTodaysHabits());
  const [user, setUser] = useState(placeholderUser);
  const [goals] = useState(placeholderGoals);

  // Calculate task and habit counts
  const taskCounts = getTasksCount(tasks);
  const habitCounts = getHabitsCount(habits);

  // Calculate level progress
  const levelProgress = calculateLevelProgress(
    user.currentExp,
    user.expToNextLevel
  );

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
        setUser((prev) => ({
          ...prev,
          currentExp: prev.currentExp + toggledTask.expPoints,
        }));
      } else {
        // Task was uncompleted, remove exp
        setUser((prev) => ({
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
        setUser((prev) => ({
          ...prev,
          currentExp: prev.currentExp + toggledHabit.expPoints,
          // Update stats if habit has stat boosts
          stats: updateUserStats(prev.stats, toggledHabit),
        }));
      } else if (!completed && toggledHabit.completed) {
        // Habit was uncompleted
        // Remove exp points from user
        setUser((prev) => ({
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
    <div className="flex relative h-screen p-8">
      {/* Main content */}
      <div className="flex-1 space-y-4">
        {/* Header with user info and level */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium">
                Hello,{" "}
                <span className="text-muted-foreground">{user.name}.</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                You have currently{" "}
                <span className="font-medium text-white">{goals.length}</span>{" "}
                goals
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-2">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-1">
                    <Star size={18} className="fill-primary text-primary" />
                    <span className="font-medium">Level {user.level}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {user.currentExp}/{user.expToNextLevel}
                  </span>
                </div>
                <Progress value={levelProgress} className="h-2 w-[300px]" />
              </div>

              {/* Sheet trigger button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-fit">
                  <SheetHeader>
                    <SheetTitle>Calendar & Goals</SheetTitle>
                  </SheetHeader>

                  <div className="space-y-6 w-fit px-4">
                    {/* Calendar */}
                    <div>
                      <Calendar mode="single" className="rounded-md border" />
                    </div>

                    {/* Goals deadlines */}
                    <div>
                      <h3 className="font-medium mb-4">Goals deadlines</h3>
                      <div className="space-y-2">
                        {goals.map(
                          (goal) =>
                            goal.deadline && (
                              <div
                                key={goal.id}
                                className="flex justify-between"
                              >
                                <span>{goal.name}</span>
                                <span className="text-muted-foreground">
                                  {goal.deadline.toLocaleDateString()}
                                </span>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="mt-4 flex space-x-4">
            <Button variant="ghost">Daily tasks</Button>
            <Button variant="ghost">Backlog</Button>
            <Button variant="ghost">Goals</Button>
          </div>
        </div>

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
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Today&apos;s Habits</CardTitle>
              <p className="text-muted-foreground text-sm">
                You have{" "}
                <span className="font-medium text-white">
                  {habitCounts.total}
                </span>{" "}
                habits today
              </p>
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
    </div>
  );
}
