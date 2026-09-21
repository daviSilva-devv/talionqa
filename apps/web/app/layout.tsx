import type { Metadata } from "next";
import "@xyflow/react/dist/style.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TalionQA",
    template: "%s · TalionQA",
  },
  description:
    "Project intelligence for websites and repositories — evidence-driven findings in a living X-Ray.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
