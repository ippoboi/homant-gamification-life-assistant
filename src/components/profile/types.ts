export interface UserData {
  name: string;
  location: string;
  level: number;
  expToNextLevel: number;
  stats: {
    STR: number;
    VIT: number;
    AGI: number;
    SPE: number;
    INT: number;
  };
  goals: {
    achieved: number;
    active: number;
    completionRate: number;
  };
  achievements: { id: number }[];
  activeGoals: { id: number; name: string; progress: number }[];
}

export interface StatCardProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export interface GoalCardProps {
  goal: {
    id: number;
    name: string;
    progress: number;
  };
}

export interface UserRank {
  title: string;
  description: string;
  icon: React.ReactNode;
}
