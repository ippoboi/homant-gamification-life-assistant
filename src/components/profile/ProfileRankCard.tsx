import { Card, CardContent } from "@/components/ui/card";
import { UserData, UserRank } from "./types";

interface ProfileRankCardProps {
  userData: UserData;
  userRank: UserRank;
}

export function ProfileRankCard({ userData, userRank }: ProfileRankCardProps) {
  return (
    <Card className="bg-[#1E1F23] border-[#25272C] flex-1 h-fit pb-8">
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 bg-[#25272C] rounded-xl">{userRank.icon}</div>
          <div>
            <h3 className="font-semibold text-lg">{userRank.title}</h3>
            <p className="text-sm text-muted-foreground">
              {userRank.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-3xl font-semibold">{userData.goals.achieved}</p>
            <p className="text-sm text-muted-foreground">Goals achieved</p>
          </div>
          <div>
            <p className="text-3xl font-semibold">{userData.goals.active}</p>
            <p className="text-sm text-muted-foreground">Active goals</p>
          </div>
          <div>
            <p className="text-3xl font-semibold">
              {userData.goals.completionRate}%
            </p>
            <p className="text-sm text-muted-foreground">
              Goals completion rate
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
