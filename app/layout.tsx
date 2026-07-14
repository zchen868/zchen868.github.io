import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Zhenyu Chen | AI & Software Engineer",
  description: "Portfolio of Zhenyu Chen, featuring AI, machine learning, software engineering, and database systems projects.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
