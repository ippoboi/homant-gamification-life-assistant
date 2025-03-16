import BodyPartMuscleIcon from "@/assets/icons/body-part-muscle-stroke-rounded";
import HealthIcon from "@/assets/icons/health-stroke-rounded";
import WorkoutKickingIcon from "@/assets/icons/workout-kicking-stroke-rounded";
import ZapIcon from "@/assets/icons/zap-stroke-rounded";
import Brain01Icon from "@/assets/icons/brain-01-stroke-rounded";
import { UserData } from "./types";
import { StatCard } from "./StatCard";

interface StatisticsSectionProps {
  userData: UserData;
}

export function StatisticsSection({ userData }: StatisticsSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Statistics</h2>
      <div className="grid grid-cols-5 gap-4">
        <StatCard
          value={userData.stats.STR}
          label="STR"
          icon={<BodyPartMuscleIcon className="text-red-500" />}
          color="border-red-500 bg-red-500/10"
        />
        <StatCard
          value={userData.stats.VIT}
          label="VIT"
          icon={<HealthIcon className="text-green-500" />}
          color="border-green-500 bg-green-500/10"
        />
        <StatCard
          value={userData.stats.AGI}
          label="AGI"
          icon={<WorkoutKickingIcon className="text-blue-500" />}
          color="border-blue-500 bg-blue-500/10"
        />
        <StatCard
          value={userData.stats.SPE}
          label="SPE"
          icon={<ZapIcon className="text-yellow-500" />}
          color="border-yellow-500 bg-yellow-500/10"
        />
        <StatCard
          value={userData.stats.INT}
          label="INT"
          icon={<Brain01Icon className="text-purple-500" />}
          color="border-purple-500 bg-purple-500/10"
        />
      </div>
    </div>
  );
}
