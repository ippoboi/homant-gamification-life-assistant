"use client";

import {
  AchievementsSection,
  GoalsSection,
  ProfileHeader,
  ProfileRankCard,
  StatisticsSection,
  getUserRank,
  userData,
} from "@/components/profile";

export default function ProfilePage() {
  const userRank = getUserRank(userData.goals.completionRate);

  return (
    <div className="p-8 space-y-8">
      {/* Profile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex-1 flex flex-col gap-8">
          <ProfileHeader userData={userData} />
          <StatisticsSection userData={userData} />
          <AchievementsSection userData={userData} />
        </div>

        <div className="flex flex-col gap-8">
          <ProfileRankCard userData={userData} userRank={userRank} />
          <GoalsSection userData={userData} />
        </div>
      </div>
    </div>
  );
}
