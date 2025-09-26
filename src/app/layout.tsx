import React from "react";

import { ToastContainer } from "react-toastify";

import Footer from "@/components/navbars/Footer";
import Header from "@/components/navbars/Header";
import ThemeProvider from "@/components/providers/ThemeProvider";
import UserDataProvider from "@/components/providers/UserDataProvider";

import "react-confirm-alert/src/react-confirm-alert.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserDataProvider>
          <ThemeProvider>
            <a href="#main" className="skip-to-content">
              Skip to content
            </a>
            <Header />
            <main id="main" className="pb-5 vh-100">
              {children}
            </main>
            <Footer />
            <ToastContainer position="bottom-right" />
          </ThemeProvider>
        </UserDataProvider>
      </body>
    </html>
  );
}

export default App;
