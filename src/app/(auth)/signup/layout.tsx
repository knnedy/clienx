import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Clienx Sign Up Page",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
