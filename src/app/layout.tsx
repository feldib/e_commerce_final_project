"use client";
import React from "react";

import { ToastContainer } from "react-toastify";

import SkipToContentLink from "@/components/accessibility/SkipToContentLink";
import Footer from "@/components/navbars/Footer";
import Header from "@/components/navbars/Header";
import I18nProvider, { useI18n } from "@/components/providers/I18nProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import UserDataProvider from "@/components/providers/UserDataProvider";

import "react-confirm-alert/src/react-confirm-alert.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

function AppContent({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();

  return (
    <html lang={locale}>
      <body>
        <SkipToContentLink />
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
