"use client";
import React from "react";

import { ToastContainer } from "react-toastify";

import SkipToContent from "@/components/accessibility/SkipToContent/SkipToContent";
import Footer from "@/components/navbars/Footer/Footer";
import Header from "@/components/navbars/Header/Header";
import I18nProvider, {
  useI18n,
} from "@/components/providers/I18nProvider/I18nProvider";
import ThemeProvider from "@/components/providers/ThemeProvider/ThemeProvider";
import UserDataProvider from "@/components/providers/UserDataProvider/UserDataProvider";

import "react-confirm-alert/src/react-confirm-alert.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

function AppContent({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();

  return (
    <html lang={locale}>
      <body>
        <SkipToContent />
        <Header />
        <main className="pb-5 vh-100" id="main">
          {children}
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}

function App({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <UserDataProvider>
        <ThemeProvider>
          <AppContent>{children}</AppContent>
        </ThemeProvider>
      </UserDataProvider>
    </I18nProvider>
  );
}

export default App;
