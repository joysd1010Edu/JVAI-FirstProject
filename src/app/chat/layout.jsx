import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Nav from "../../components/Chat/Shared/Nav";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import ProfileDialog from "@/components/Profile/ProfileDialog";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"], // Add weights as needed
  variable: "--font-playfair",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mental Health Chat",
  description: "A chat application focused on mental health support",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProtectedRoute>
          <div className="flex min-h-screen flex-col lg:flex-row">
            <Nav />
            <div className="flex-1  transition-all ml-0 lg:ml-[250px] main-content duration-300 relative">
              <div className="absolute lg:top-5 -top-10 right-2 lg:right-5 z-50">
                <ProfileDialog />
              </div>
              <div className=" relative min-h-screen bg-black overflow-hidden">
                <div className="absolute top-[-100px] -rotate-30 right-[-150px] w-[1200px] h-[800px] bg-[#0056F6]/20 rounded-[50%] blur-[120px] pointer-events-none z-0"></div>
                {children}
              </div>
            </div>
          </div>
        </ProtectedRoute>
      </body>
    </html>
  );
}
