import { Progress } from "@/components/ui/progress";
import { Trophy } from "lucide-react";
import { GoalCardProps } from "./types";

export function GoalCard({ goal }: GoalCardProps) {
  return (
    <div
      key={goal.id}
      className="flex items-center gap-4 p-4 rounded-lg transition-colors duration-200 hover:bg-[#131416] cursor-pointer"
      onClick={() => console.log(`Goal ${goal.id} clicked`)}
    >
      <div className="bg-[#1E1F23] border border-[#25272C] rounded-lg p-4">
        <Trophy size={32} className="text-gray-400" />
      </div>
      <div className="flex-1">
        <p className="font-medium">{goal.name}</p>
        <div className="flex items-center gap-2">
          <Progress value={goal.progress} className="h-1 flex-1 bg-[#25272C]" />
          <span className="text-xs text-muted-foreground">
            {goal.progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
