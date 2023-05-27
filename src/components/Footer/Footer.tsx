import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] flex items-center justify-center border-t-2 border-gray-700">
      <span className="text-sm text-gray-500">Created with <Heart size={20} className="inline" color="var(--red-500)" /> by Felipe Silva</span>
    </footer>
  )
}