import Image from "next/image";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F2EA] flex items-center justify-center">
    <div className="text-center">

<Image
  src="/seed homepage.png"
  alt="Seed Project Logo"
  width={400}
  height={400}
  className="mx-auto mb-6"
/>
<button
  className="rounded-full bg-[#5C4033] px-6 py-3 text-base text-white shadow-md transition duration-300 hover:scale-105 hover:bg-[#6B4B3E]"
>
  🌱 Plant your seed now 🌱
</button>
</div>
    </main>
  )
}