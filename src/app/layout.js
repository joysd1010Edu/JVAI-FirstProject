import { Geist, Geist_Mono, Playfair_Display, Inter, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { AxiosProvider } from "@/providers/AxiosProvider";
import AuthProvider from "@/providers/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'], // Add weights as needed
  variable: '--font-playfair',
  display: 'swap',
});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] })

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '600', '700'], // optional, depending on your needs
  display: 'swap',
});


export const metadata = {
  title: {
    default: "Home | Emothrive",
    template: "%s | Emothrive",
  },
   description: "Emothrive is a modern web platform designed to enhance emotional well-being through personalized resources and user-friendly tools.",
    keywords: ["Emothrive", "mental health", "emotional well-being", "self-care", "wellness platform"],
};




export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.variable} >

      <body
        className={`${inter.variable} antialiased ${nunito.variable}`}
      >
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <AxiosProvider>
              <Navbar/>
              {children}
              <Footer/>
            </AxiosProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
