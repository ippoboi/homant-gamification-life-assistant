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

type TaskId = "task1" | "task2" | "task3" | "task4" | "task5";
type HabitId = "habit1" | "habit2" | "habit3";

export default function Tasks() {
  const [checkedTasks, setCheckedTasks] = useState({
    task1: false,
    task2: false,
    task3: false,
    task4: true,
    task5: true,
  });

  const [completedHabits, setCompletedHabits] = useState({
    habit1: false,
    habit2: false,
    habit3: true,
  });

  const handleCheckboxChange = (taskId: TaskId) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleHabitComplete = (habitId: HabitId, completed: boolean) => {
    setCompletedHabits((prev) => ({
      ...prev,
      [habitId]: completed,
    }));
  };

  return (
    <div className="flex relative h-screen p-8">
      {/* Main content */}
      <div className="flex-1 space-y-4">
        {/* Header with user info and level */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium">
                Hello, <span className="text-muted-foreground">Dimitar.</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                You have currently{" "}
                <span className="font-medium text-white">8</span> goals
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end gap-2">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-1">
                    <Star size={18} className="fill-primary text-primary" />
                    <span className="font-medium">Level 8</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    234/1230
                  </span>
                </div>
                <Progress value={18} className="h-2 w-[300px]" />
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
                        {/* Goal deadline items would go here */}
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
                  You have <span className="font-medium text-white">8</span>{" "}
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
                {/* Task 1 */}
                <Task
                  id="task1"
                  title="Task #1"
                  goalName="Goal #1"
                  expPoints={32}
                  checked={checkedTasks.task1}
                  onCheckedChange={() => handleCheckboxChange("task1")}
                />

                {/* Task 2 */}
                <Task
                  id="task2"
                  title="Task #1"
                  expPoints={32}
                  checked={checkedTasks.task2}
                  onCheckedChange={() => handleCheckboxChange("task2")}
                />

                {/* Task 3 */}
                <Task
                  id="task3"
                  title="Task #1"
                  goalName="Goal #1"
                  expPoints={32}
                  checked={checkedTasks.task3}
                  onCheckedChange={() => handleCheckboxChange("task3")}
                />

                {/* Task 4 */}
                <Task
                  id="task4"
                  title="Task #1"
                  goalName="Goal #1"
                  expPoints={32}
                  checked={checkedTasks.task4}
                  onCheckedChange={() => handleCheckboxChange("task4")}
                />

                {/* Task 5 */}
                <Task
                  id="task5"
                  title="Task #1"
                  goalName="Goal #1"
                  expPoints={32}
                  checked={checkedTasks.task5}
                  onCheckedChange={() => handleCheckboxChange("task5")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Today's Habits */}
          <Card className="bg-card border-border space-y-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Today&apos;s Habits</CardTitle>
              <p className="text-muted-foreground text-sm">
                You have <span className="font-medium text-white">3</span>{" "}
                habits today
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Habit 1 */}
              <Habit
                id="habit1"
                title="Habit #1"
                description="This is a description for the habit"
                goalName="Goal #1"
                expPoints={32}
                statBoosts={[
                  { type: "STR", value: 3 },
                  { type: "AGL", value: 3 },
                ]}
                completed={completedHabits.habit1}
                onComplete={(id, completed) =>
                  handleHabitComplete(id as HabitId, completed)
                }
              />

              {/* Habit 2 */}
              <Habit
                id="habit2"
                title="Habit #2"
                description="This is a description for the habit"
                goalName="Goal #1"
                expPoints={32}
                statBoosts={[
                  { type: "VIT", value: 3 },
                  { type: "SPE", value: 3 },
                ]}
                completed={completedHabits.habit2}
                onComplete={(id, completed) =>
                  handleHabitComplete(id as HabitId, completed)
                }
              />

              {/* Habit 3 */}
              <Habit
                id="habit3"
                title="Habit #3"
                description="This is a description for the habit"
                goalName="Goal #1"
                expPoints={32}
                statBoosts={[
                  { type: "INT", value: 3 },
                  { type: "STR", value: 2 },
                ]}
                completed={completedHabits.habit3}
                onComplete={(id, completed) =>
                  handleHabitComplete(id as HabitId, completed)
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
