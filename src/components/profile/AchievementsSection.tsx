import { Trophy } from "lucide-react";
import { UserData } from "./types";

interface AchievementsSectionProps {
  userData: UserData;
}

export function AchievementsSection({ userData }: AchievementsSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Achievements</h2>
      <div className="grid grid-cols-6 gap-4">
        {userData.achievements.map((achievement) => (
          <div
            key={achievement.id}
            className="bg-[#1E1F23] border border-[#25272C] rounded-lg p-4 flex items-center justify-center"
          >
            <Trophy size={32} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}
