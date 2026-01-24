"use client";

import FreelancerContent from "./components/freelancer-content";
import EmployerContent from "./components/employer-content";
import { useUserMode } from "./providers/user-mode-provider";

export default function Dashboard() {
  const { mode } = useUserMode();

  return (
    <>{mode === "freelancer" ? <FreelancerContent /> : <EmployerContent />}</>
  );
}
