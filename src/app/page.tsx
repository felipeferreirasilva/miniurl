'use client'

import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Main } from "@/components/Main/Main";

export default function Home() {
  return (
    <div className="grid h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

