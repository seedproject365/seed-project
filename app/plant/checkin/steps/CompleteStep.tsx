'use client';

import Link from 'next/link';

export default function CompleteStep() {
  return (
    <>
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes celebrate {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(-5deg); }
          75% { transform: scale(1.1) rotate(5deg); }
        }

        .fade-in-scale {
          animation: fadeInScale 0.6s ease-out forwards;
        }

        .celebrate-emoji {
          animation: celebrate 0.8s ease-in-out;
        }
      `}</style>

      <div className="w-full flex-1 flex flex-col items-center justify-center fade-in-scale">
        {/* Progress Section */}
        <div className="w-full mb-12">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[#8FAE8B]">🌱 第五步</h3>
            <span className="text-xs text-[#8B7B6F]">100%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-[#E8DDCC] rounded-full overflow-hidden shadow-sm">
            <div className="h-full w-full bg-[#8FAE8B] rounded-full transition-all duration-500 ease-out"></div>
          </div>
        </div>

        {/* Card Container */}
        <div className="w-full bg-white rounded-[32px] shadow-lg p-8 sm:p-12 mb-8 text-center">
          {/* Celebration Emoji */}
          <div className="text-7xl sm:text-8xl mb-8 celebrate-emoji inline-block">
            ✨
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-[#5B4636] mb-3">
            打卡完成！
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#8B7B6F] mb-6">
            你已成功完成今日四步骤打卡
          </p>

          {/* Message */}
          <div className="bg-[#F8F4EC] rounded-[24px] p-6 border border-[#E8DDCC] mb-8">
            <p className="text-base text-[#5B4636] leading-relaxed">
              🌱 每一个小步骤，都是通往梦想的阶梯。
            </p>
            <p className="text-sm text-[#8B7B6F] mt-3">
              坚持每日打卡，你的成长会被看见。
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#F8F4EC] rounded-[16px] p-4">
              <p className="text-2xl font-bold text-[#8FAE8B]">1</p>
              <p className="text-xs text-[#8B7B6F] mt-1">连续打卡天数</p>
            </div>
            <div className="bg-[#F8F4EC] rounded-[16px] p-4">
              <p className="text-2xl font-bold text-[#8FAE8B]">4</p>
              <p className="text-xs text-[#8B7B6F] mt-1">完成步骤数</p>
            </div>
          </div>
        </div>

        {/* Return Button */}
        <Link href="/plant" className="w-full max-w-md">
          <button className="w-full bg-[#5C4033] text-white font-semibold py-4 sm:py-5 rounded-full text-lg hover:bg-[#4B352A] active:scale-95 transition-all shadow-lg hover:shadow-xl">
            🌱 返回首页
          </button>
        </Link>
      </div>
    </>
  );
}