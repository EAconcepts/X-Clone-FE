import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "./(helpers)/authContext";
import { LeftMenu } from "./(components)/LeftMenu";
import { Providers } from "./(helpers)/providers";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "X ",
  description: "X clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <Toaster position="bottom-right" />
            <div className="w-ful flex bg-background text-foreground">
              <LeftMenu />
              <main className="w-full overflow-hidden overflow-y-scroll ">
                {children}
              </main>
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
