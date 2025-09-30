import React from "react";

import { ToastContainer } from "react-toastify";

import SkipToContentLink from "@/components/accessibility/SkipToContentLink";
import Footer from "@/components/navbars/Footer";
import Header from "@/components/navbars/Header";
import I18nProvider from "@/components/providers/I18nProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import UserDataProvider from "@/components/providers/UserDataProvider";

import "react-confirm-alert/src/react-confirm-alert.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          <UserDataProvider>
            <ThemeProvider>
              <SkipToContentLink />
              <Header />
              <main id="main" className="pb-5 vh-100">
                {children}
              </main>
              <Footer />
              <ToastContainer position="bottom-right" />
            </ThemeProvider>
          </UserDataProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

export default App;
