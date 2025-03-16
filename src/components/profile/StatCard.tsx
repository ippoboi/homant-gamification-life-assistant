import { StatCardProps } from "./types";

export function StatCard({ value, label, icon, color }: StatCardProps) {
  return (
    <div
      className={`border ${color} rounded-lg p-4 flex flex-col justify-center`}
    >
      <div className="mb-2">{icon}</div>
      <p className="text-2xl font-semibold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
