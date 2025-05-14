"use client";

import { Provider } from "react-redux";
import store, { persistor } from "./State/store";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>

         <div>
            <ToastContainer position="top-center" />
        </div>
      </body>
    </html>
  );
}