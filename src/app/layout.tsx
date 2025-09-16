import Header from "@/components/navbars/Header";
import Footer from "@/components/navbars/Footer";
import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ToastContainer } from "react-toastify";
import UserDataProvider from "@/components/providers/UserDataProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserDataProvider>
          <a href="#main" className="skip-to-content">
            Skip to content
          </a>
          <Header />
          <main id="main" className="pb-5 vh-100">
            {children}
          </main>
          <Footer />
          <ToastContainer position="bottom-right" />
        </UserDataProvider>
      </body>
    </html>
  );
}
