import { UserData, UserRank } from "./types";
import {
  Award,
  Compass,
  Footprints,
  Lightbulb,
  Map,
  Medal,
  Mountain,
  Rocket,
  Search,
  Sparkles,
  Target,
} from "lucide-react";

// Mock data based on the screenshot
export const userData: UserData = {
  name: "Dimitar",
  location: "Paris, France",
  level: 8,
  expToNextLevel: 784,
  stats: {
    STR: 43,
    VIT: 23,
    AGI: 2,
    SPE: 24,
    INT: 4,
  },
  goals: {
    achieved: 20,
    active: 3,
    completionRate: 76,
  },
  achievements: [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ],
  activeGoals: [
    { id: 1, name: "Run a Marathon", progress: 18 },
    { id: 2, name: "Run a Marathon", progress: 18 },
    { id: 3, name: "Run a Marathon", progress: 18 },
    { id: 4, name: "Run a Marathon", progress: 18 },
    { id: 5, name: "Run a Marathon", progress: 18 },
    { id: 6, name: "Run a Marathon", progress: 18 },
  ],
};

// Determine user title and description based on completion rate
export const getUserRank = (completionRate: number): UserRank => {
  if (completionRate >= 100)
    return {
      title: "Master",
      description:
        "You've completed your goal with excellence, truly mastering the challenge.",
      icon: <Award className="text-white" size={56} strokeWidth={1} />,
    };
  if (completionRate >= 90)
    return {
      title: "Achiever",
      description:
        "Success is within your reach, and you've done an amazing job.",
      icon: <Medal className="text-white" size={56} strokeWidth={1} />,
    };
  if (completionRate >= 80)
    return {
      title: "Trailblazer",
      description: "Almost there! You're leading the way to success.",
      icon: <Footprints className="text-white" size={56} strokeWidth={1} />,
    };
  if (completionRate >= 70)
    return {
      title: "Pathfinder",
      description: "You're creating your own path and making great strides.",
      icon: <Map className="text-white" size={56} strokeWidth={1} />,
    };
  if (completionRate >= 60)
    return {
      title: "Pioneer",
      description:
        "You're exploring new territories and overcoming challenges.",
      icon: <Mountain className="text-white" size={56} strokeWidth={1} />,
    };
  if (completionRate >= 50)
    return {
      title: "Aspiring",
      description: "You're on track and pushing forward to new heights.",
      icon: <Rocket className="text-white" size={56} strokeWidth={1} />,
    };
  if (completionRate >= 40)
    return {
      title: "Novice",
      description: "Still learning, but making real progress!",
      icon: <Sparkles className="text-white" size={56} strokeWidth={1} />,
    };
  if (completionRate >= 30)
    return {
      title: "Seeker",
      description: "You're seeking success, moving steadily toward your goal.",
      icon: <Search className="text-white" size={56} strokeWidth={1} />,
    };
  if (completionRate >= 20)
    return {
      title: "Dreamer",
      description:
        "You have a vision, and you're taking the first steps toward it.",
      icon: <Lightbulb className="text-white" size={56} strokeWidth={1} />,
    };
  if (completionRate >= 10)
    return {
      title: "Initiator",
      description: "You've begun the path, and every step counts.",
      icon: <Target className="text-white" size={56} strokeWidth={1} />,
    };
  return {
    title: "Explorer",
    description: "Just starting to explore the journey ahead.",
    icon: <Compass className="text-white" size={56} strokeWidth={1} />,
  };
};
