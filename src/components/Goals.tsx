"use client";

import { GoalData, UserProfile } from "@/lib";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  MoreHorizontal,
  Calendar,
  CheckSquare,
  Target,
  Footprints,
} from "lucide-react";
import { Separator } from "./ui/separator";

interface GoalsProps {
  user?: UserProfile;
  goals: GoalData[];
}

export function Goals({ goals }: GoalsProps) {
  // Format date to display in a readable format
  const formatDate = (date?: Date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="bg-card border-border space-y-8">
      {/* Header with goal count and new goal button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Today&apos;s Tasks</h2>
          <p className="text-muted-foreground text-sm">
            You have{" "}
            <span className="font-medium text-white">{goals.length}</span> tasks
            today
          </p>
        </div>
        <Button variant="outline" className="text-sm">
          New goal
        </Button>
      </div>

      {/* Goals list */}
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="bg-secondary border-border">
            <CardHeader className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <CardTitle className="text-xl">{goal.name}</CardTitle>
                </div>
                {goal.description && (
                  <p className="text-muted-foreground text-sm mt-1">
                    {goal.description}
                  </p>
                )}
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="text-muted-foreground" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-6 mt-6">
              <Separator className="bg-[#2F3037]" />

              {/* Steps section */}
              <div className="flex justify-between  items-center rounded-md p-4 flex-1">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Footprints className="w-4 h-4 text-primary" />
                    <h3 className="font-medium">Steps</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You have complete <span className="text-white">1</span> step
                  </p>
                </div>

                <Button size="sm">View</Button>
              </div>

              {/* Habits section */}
              <div className="flex justify-between  items-center rounded-md p-4 flex-1">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    <h3 className="font-medium">Habits</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You have to do <span className="text-white">7</span> times
                    your habit this week
                  </p>
                </div>

                <Button size="sm">View</Button>
              </div>

              <Separator className="bg-[#2F3037]" />
              {/* Deadline and exp */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    {goal.deadline ? formatDate(goal.deadline) : "No deadline"}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">+1234 exp</span>
                </div>
                {/* Progress bar */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{goal.progress}%</span>
                  <div className="min-w-36">
                    <Progress value={goal.progress} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>
  );
}
