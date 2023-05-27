import { Unlink } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className=" bg-gray-700 flex items-center justify-center gap-4">
      <Unlink size={50} />
      <Link href="/"><span className="text-2xl">MiniURL</span></Link>
    </header>
  );
}
