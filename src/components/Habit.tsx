import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

// Import all the icons
import BodyPartMuscleIcon from "@/assets/icons/body-part-muscle-stroke-rounded";
import HealthIcon from "@/assets/icons/health-stroke-rounded";
import WorkoutKickingIcon from "@/assets/icons/workout-kicking-stroke-rounded";
import ZapIcon from "@/assets/icons/zap-stroke-rounded";
import Brain01Icon from "@/assets/icons/brain-01-stroke-rounded";

// Define the stat types and their properties
export type StatType = "STR" | "VIT" | "AGL" | "SPE" | "INT";

interface StatConfig {
  color: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const STAT_CONFIG: Record<StatType, StatConfig> = {
  STR: { color: "#FF2020", icon: BodyPartMuscleIcon },
  VIT: { color: "#34FF7B", icon: HealthIcon },
  AGL: { color: "#0033EC", icon: WorkoutKickingIcon },
  SPE: { color: "#C4EC00", icon: ZapIcon },
  INT: { color: "#A500EC", icon: Brain01Icon },
};

// Define the stat boost interface
interface StatBoost {
  type: StatType;
  value: number;
}

// Define the Habit component props
interface HabitProps {
  id: string;
  title: string;
  description?: string;
  goalName?: string;
  expPoints: number;
  statBoosts?: StatBoost[];
  completed?: boolean;
  onComplete: (id: string, completed: boolean) => void;
}

export function Habit({
  id,
  title,
  description,
  goalName,
  expPoints,
  statBoosts = [],
  completed = false,
  onComplete,
}: HabitProps) {
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleComplete = () => {
    const newCompletedState = !isCompleted;
    setIsCompleted(newCompletedState);
    onComplete(id, newCompletedState);
  };

  return (
    <div className="bg-secondary rounded-md p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="text-muted-foreground" />
        </Button>
      </div>

      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {goalName && (
            <span className="bg-destructive/20 text-destructive text-xs py-1 px-2 rounded">
              {goalName}
            </span>
          )}

          <span className="text-sm">+ {expPoints} exp</span>

          {statBoosts.map((boost, index) => {
            const { color, icon: Icon } = STAT_CONFIG[boost.type];
            return (
              <div
                key={`${id}-stat-${index}`}
                className="flex items-center gap-1"
              >
                <Icon className="w-4 h-4" style={{ color }} />
                <span style={{ color }}>+{boost.value}</span>
              </div>
            );
          })}
        </div>

        {isCompleted ? (
          <span className="text-muted-foreground text-sm">Completed</span>
        ) : (
          <Button size="sm" className="h-7 rounded-md" onClick={handleComplete}>
            Done
          </Button>
        )}
      </div>
    </div>
  );
}
