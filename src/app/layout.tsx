import type { Metadata } from "next";
import { JosefinSans } from "@/lib/fonts";
import "./globals.css";

// Global context importation

import ContextComponent from "@/components/Context/Context";

export const metadata: Metadata = {
  title: "Todo app task manager",
  description: "This app is a task manager built using NextJS and styled with TailwindCSS. You're able to create, edit, exclude or mark as done all the tasks existents tasks or the created ones by yourself.",
  openGraph: {
    title: "Todo app task manager",
    authors: "Luiz Carlos Lima",
    images: ["../../design/desktop-preview.jpg"],
  }
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${ JosefinSans.className }`}
      >
        <ContextComponent>
          {children}
        </ContextComponent>
      </body>
    </html>
  );
};

export default RootLayout;