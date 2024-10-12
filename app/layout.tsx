import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StoreProvider from '@/app/redux/StoreProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Toaster } from "react-hot-toast";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trust Vote",
  description: "A Decentralized Electronic Voting application built to ease and secure the process of voting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <body style={{ backgroundColor: "#101010" }} className={`${inter.className} flex flex-col min-h-screen`}>
            <Navbar />
            <Toaster position="top-center" />
            <main className="flex flex-grow">{children}</main>
            <Footer />
          </body>
        </StoreProvider>
      </ThemeProvider>
    </html>
  );
}
