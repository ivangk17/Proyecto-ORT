import NavBar from "./NavBar";
import { AuthProvider } from '../context/AuthContext';
import "./globals.css";

export const metadata = {
  title: "EduWave",
  description: "EduWave conecta a estudiantes con profesores",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full">
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
