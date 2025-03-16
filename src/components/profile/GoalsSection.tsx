import { UserData } from "./types";
import { GoalCard } from "./GoalCard";

interface GoalsSectionProps {
  userData: UserData;
}

export function GoalsSection({ userData }: GoalsSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Goals</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {userData.activeGoals.map(
          (goal, index) => index < 6 && <GoalCard key={goal.id} goal={goal} />
        )}
      </div>
    </div>
  );
}
