"use client";

import { Bot, Home, List, Mic, User, Video } from "lucide-react";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "./ui/breadcrumb";

export default function AppBreadcrumb() {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/").filter(Boolean);

  // Function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Function to get the appropriate icon based on the pathname
  const getIconForPathname = () => {
    switch (pathname) {
      case "/":
        return <Home className="w-4 h-4" />;
      case "/tasks":
        return <List className="w-4 h-4" />;
      case "/profile":
        return <User className="w-4 h-4" />;
      case "/cameras":
        return <Video className="w-4 h-4" />;
      case "/voice":
        return <Mic className="w-4 h-4" />;
      default:
        // Default to Bot icon for unknown paths
        return <Bot className="w-4 h-4" />;
    }
  };

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-8">
        <Breadcrumb>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-muted">
                  {getIconForPathname()}
                </div>
                {pathnameParts[1]
                  ? capitalizeFirstLetter(pathnameParts[1])
                  : pathname === "/"
                  ? "Overview"
                  : ""}
              </div>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </header>
    </div>
  );
}
