"use client";

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();
  return (
    <>
      {/* display session data */}
      session: {JSON.stringify(session)}
      <div>Dashboard</div>
      <Button
        onClick={() => {
          signOut({
            fetchOptions: {
              onSuccess: () => {
                router.replace("/signin");
              },
            },
          });
        }}>
        Log Out
      </Button>
    </>
  );
}
