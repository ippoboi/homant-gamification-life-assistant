import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit2, Star } from "lucide-react";
import { UserData } from "./types";

interface ProfileHeaderProps {
  userData: UserData;
}

export function ProfileHeader({ userData }: ProfileHeaderProps) {
  return (
    <div className="flex gap-6 items-center">
      <Avatar className="w-32 h-32 bg-[#1E1F23]">
        <AvatarImage src="" alt={userData.name} />
        <AvatarFallback className="text-4xl">
          {userData.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold">
            Hello, <span className="text-[#A2A3A8]">{userData.name}.</span>
          </h1>
          <Button
            variant="ghost"
            className="text-muted-foreground flex items-center gap-2"
          >
            <Edit2 size={16} />
            Edit
          </Button>
        </div>
        <p className="text-muted-foreground">{userData.location}</p>

        {/* Level progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="flex items-center gap-1">
              <Star size={16} />
              <span className="font-semibold">Level {userData.level}</span>
            </span>
            <span className="text-xs text-muted-foreground">
              <span className="text-white text-base">
                {userData.expToNextLevel}
              </span>{" "}
              to next level
            </span>
          </div>
          <Progress value={30} className="h-1 w-full bg-[#25272C]" />
        </div>
      </div>
    </div>
  );
}
