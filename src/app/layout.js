import NavBar from "./NavBar";
import "./globals.css";
import { AuthProvider } from '../context/AuthContext';


export const metadata = {
  title: "EduWave",
  description: "EduWave conecta a estudiantes con profesores ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      
      <body className="h-full">
        <AuthProvider>
          <NavBar />  
          {children}
        </AuthProvider>
      </body >  
    </html>
  );
}
