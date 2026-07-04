'use client';

import { useState } from 'react';

type Props = {
  onNext?: () => void;
}

export default function GoalStep({ onNext }: Props) {
  const [goal, setGoal] = useState('');

  const handleContinue = () => {
    if (onNext) {
      onNext();
    }
  };

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

        .fade-in-scale {
          animation: fadeInScale 0.6s ease-out forwards;
        }
      `}</style>

      <div className="w-full flex-1 flex flex-col items-center fade-in-scale">
        {/* Progress Section */}
        <div className="w-full mb-12">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[#8FAE8B]">🌱 第一步</h3>
            <span className="text-xs text-[#8B7B6F]">25%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-[#E8DDCC] rounded-full overflow-hidden shadow-sm">
            <div className="h-full w-1/4 bg-[#8FAE8B] rounded-full transition-all duration-500 ease-out"></div>
          </div>
        </div>

        {/* Card Container */}
        <div className="w-full bg-white rounded-[32px] shadow-lg p-8 sm:p-12 mb-8">
          {/* Title and Subtitle */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#5B4636] mb-3">
              🎯 我的目标
            </h1>
            <p className="text-base sm:text-lg text-[#8B7B6F]">
              写下一个近期最想实现的目标
            </p>
          </div>

          {/* Textarea */}
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder={`例如：
我想在2026年8月31日前
完成RM20,000业绩。`}
            className="w-full h-40 sm:h-48 rounded-[24px] p-6 border-2 border-[#E8DDCC] bg-[#FEFCF9] text-[#5B4636] placeholder-[#C4B5A0] font-medium text-base sm:text-lg focus:outline-none focus:border-[#8FAE8B] focus:ring-2 focus:ring-[#8FAE8B] focus:ring-opacity-20 transition-all resize-none"
          />

          {/* Helper Tip Card */}
          <div className="mt-8 p-6 rounded-[24px] bg-[#F8F4EC] border border-[#E8DDCC]">
            <h3 className="text-base font-semibold text-[#5B4636] mb-4 flex items-center gap-2">
              💡 小提示
            </h3>
            <ul className="space-y-2 text-sm text-[#8B7B6F]">
              <li className="flex gap-3">
                <span className="text-[#8FAE8B] font-bold">•</span>
                <span>有日期</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#8FAE8B] font-bold">•</span>
                <span>可以衡量</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#8FAE8B] font-bold">•</span>
                <span>越具体越容易实现</span>
              </li>
            </ul>
          </div>
        </div>

    {/* Continue Button */}
<button
  onClick={onNext}
  className="w-full max-w-md bg-[#5C4033] text-white font-semibold py-4 sm:py-5 rounded-full text-lg hover:bg-[#4B352A] active:scale-95 transition-all shadow-lg"
>
  🌱 继续
</button>
      </div>
    </>
  );
}