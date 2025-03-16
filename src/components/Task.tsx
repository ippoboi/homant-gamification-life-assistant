import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface TaskProps {
  id: string;
  title: string;
  goalName?: string;
  expPoints: number;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Task({
  id,
  title,
  goalName,
  expPoints,
  checked,
  onCheckedChange,
}: TaskProps) {
  return (
    <>
      <div
        className={`grid grid-cols-[auto_1fr_auto] gap-4 items-center cursor-pointer ${
          checked ? "opacity-40" : ""
        }`}
        onClick={() => onCheckedChange(!checked)}
      >
        <div className="flex items-center gap-2">
          <Checkbox
            id={id}
            checked={checked}
            onCheckedChange={() => onCheckedChange(!checked)}
            onClick={(e) => e.stopPropagation()} // Prevent double triggering when clicking directly on checkbox
          />
          <span>{title}</span>
        </div>
        <div>
          {goalName && (
            <span className="bg-destructive/20 text-destructive text-xs py-1 px-2 rounded">
              {goalName}
            </span>
          )}
        </div>
        <div className="text-right whitespace-nowrap">
          <span className="text-sm">+ {expPoints} Exp</span>
        </div>
      </div>
      <Separator className="bg-[#25272C]" />
    </>
  );
}
