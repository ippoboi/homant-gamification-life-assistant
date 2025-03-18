import AppBreadcrumb from "@/components/app-breadcrumb";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/auth/protected-route";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppBreadcrumb />
          <main className="w-full">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
