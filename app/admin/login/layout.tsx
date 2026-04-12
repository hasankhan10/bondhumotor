import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Bondhu Motor",
  robots: "noindex, nofollow",
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
