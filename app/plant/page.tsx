import { Sprout } from "lucide-react";
export default function PlantPage() {
  return (
  <main className="min-h-screen flex flex-col items-center justify-center">

    <h1 className="flex items-center gap-2 noto-sans-sc text-4xl font-bold">
      <Sprout size={36} color="#6B8E23" />
      今天想种下什么？
    </h1>

    <p className="text-gray-500 mb-8">
      Every seed you plant becomes your future.
    </p>

     <button className="w-72 bg-[#5C4033] noto-sans-sc text-white py-4 rounded-full mb-4 text-lg font-medium hover:bg-[#4B352A] transition">
      💰打卡四步骤
     </button>

      <button className="bg-[#5C4033] noto-sans-sc text-white px-8 py-3 rounded-full mb-4">
       ❤️感恩记录
     </button>
      
      <button className="bg-[#5C4033] noto-sans-sc text-white px-8 py-3 rounded-full mb-4">
       🍎三时书（7:00-12:00）
     </button>

      <button className="bg-[#5C4033] noto-sans-sc text-white px-8 py-3 rounded-full mb-4">
       💏三时书（12:00-18:00）
     </button>

      <button className="bg-[#5C4033] noto-sans-sc text-white px-8 py-3 rounded-full mb-4">
       🤝三时书（17:00-22:00）
     </button>
   
      <button className="bg-[#5C4033] noto-sans-sc   text-white px-8 py-3 rounded-full mb-4">
       🌳成长树
    </button>
    </main>
  );
}