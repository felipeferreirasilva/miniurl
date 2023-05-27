import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Main } from "@/components/Main/Main";

export default function Home() {
  return (
    <div className="grid h-screen" style={{ gridTemplateRows: '250px auto 100px' }}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

