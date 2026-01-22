import "./globals.css";
import type { ReactNode } from "react";
import { ReactQueryProvider } from "@/lib/queryClient";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
