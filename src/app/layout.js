import NavBar from "./NavBar";
import { AuthProvider } from '../context/AuthContext';
import "./globals.css";
import Footer from "./Footer";

export const metadata = {
  title: "EduWave",
  description: "EduWave conecta a estudiantes con profesores",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full flex flex-col">
        <AuthProvider>
          <NavBar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
