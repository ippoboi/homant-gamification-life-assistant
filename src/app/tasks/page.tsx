"use client";

import { useState } from "react";
import { DailyTasks } from "@/components/DailyTasks";
import { Goals } from "@/components/Goals";
import { Button } from "@/components/ui/button";
import { Menu, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  placeholderUser,
  placeholderGoals,
  calculateLevelProgress,
} from "@/lib";
import { Calendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Tasks() {
  const [activeTab, setActiveTab] = useState<"daily" | "backlog" | "goals">(
    "daily"
  );
  const [user] = useState(placeholderUser);
  const [goals] = useState(placeholderGoals);

  // Calculate level progress
  const levelProgress = calculateLevelProgress(
    user.currentExp,
    user.expToNextLevel
  );

  return (
    <div className="flex relative h-screen p-8">
      {/* Main content */}
      <div className="flex-1 space-y-8">
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
        </div>

        {/* Navigation tabs */}
        <div className="flex space-x-4">
          <Button
            variant={activeTab === "daily" ? "default" : "ghost"}
            onClick={() => setActiveTab("daily")}
            className="cursor-pointer"
          >
            Daily tasks
          </Button>
          <Button
            variant={activeTab === "backlog" ? "default" : "ghost"}
            onClick={() => setActiveTab("backlog")}
            className="cursor-pointer"
          >
            Backlog
          </Button>
          <Button
            variant={activeTab === "goals" ? "default" : "ghost"}
            onClick={() => setActiveTab("goals")}
            className="cursor-pointer"
          >
            Goals
          </Button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "daily" && <DailyTasks user={user} goals={goals} />}
        {activeTab === "backlog" && (
          <div className="p-8 bg-card rounded-lg border border-border">
            <h2 className="text-xl font-semibold mb-4">Backlog</h2>
            <p className="text-muted-foreground">
              Backlog content will be implemented here.
            </p>
          </div>
        )}
        {activeTab === "goals" && <Goals goals={goals} />}
      </div>
    </div>
  );
}
