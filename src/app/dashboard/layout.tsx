import { headers } from "next/headers";
import DashboardShell from "./_shell/dashboard-shell";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return <DashboardShell session={session}>{children}</DashboardShell>;
}
