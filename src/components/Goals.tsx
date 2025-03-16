"use client";

import { GoalData, UserProfile } from "@/lib";

interface GoalsProps {
  user?: UserProfile;
  goals: GoalData[];
}

export function Goals({ goals }: GoalsProps) {
  return (
    <div className="flex-1 space-y-4">
      {/* Goals content placeholder */}
      <div className="p-8 bg-card rounded-lg border border-border">
        <h2 className="text-xl font-semibold mb-4">Goals</h2>
        <p className="text-muted-foreground">
          You have {goals.length} active goals. Goals content will be
          implemented here.
        </p>
      </div>
    </div>
  );
}
