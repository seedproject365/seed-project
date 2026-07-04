'use client';

import { useState } from 'react';

type Props = {
  onBack: () => void;
  onNext: () => void;
};

export default function PlanBStep({
  onBack,
  onNext,
}: Props) {
  const [plan, setPlan] = useState('');

  return (
    <div className="max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#5B4636] mb-3">
          ❤️ 计划 B
        </h1>

        <p className="text-[#8B7B6F]">
          今天，你准备如何帮助对方？
        </p>
      </div>

      {/* Card */}
      <div className="bg-[#F8F4EC] rounded-[32px] p-8 shadow-sm mb-8">

        <textarea
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          placeholder="例如：今天转 RM1 给妈妈的 TNG，给她一个惊喜……"
          rows={5}
          className="
            w-full
            rounded-[20px]
            bg-[#ECE4D8]
            p-6
            resize-none
            outline-none
            text-[#5B4636]
            placeholder:text-[#A79F91]
            focus:ring-2
            focus:ring-[#8FAE8B]
          "
        />

        <div className="flex gap-3 mt-6">

          <span className="text-[#8FAE8B]">
            💡
          </span>

          <p className="text-sm text-[#8B7B6F]">
            行动越具体，种子成长得越快。
            每一个微小的善意都是未来的果实。
          </p>

        </div>

      </div>

      {/* Growing Seed */}
<div className="bg-white rounded-[24px] p-5 shadow-sm mb-10">

  <div className="flex items-center gap-3 mb-4">
    <span className="text-2xl">💧</span>

    <span className="text-[#8B7B6F] font-medium">
      灌溉你的种子中...
    </span>
  </div>

<div className="flex items-center gap-3 mt-3">

    <div className="relative flex-1 h-4 bg-[#E8DDCC] rounded-full overflow-hidden">

        <div className="water-flow"></div>

        <div className="water-shine"></div>

    </div>

    <div className="seed-grow">
        🌱
    </div>

</div>

</div>

      {/* Bottom Buttons */}
      <div className="flex justify-between">

        <button
          onClick={onBack}
          className="
            px-8
            py-4
            rounded-full
            border
            border-[#8FAE8B]
            hover:bg-[#F8F4EC]
          "
        >
          ← 返回
        </button>

        <button
          onClick={onNext}
          className="
            bg-[#5C4033]
            text-white
            px-8
            py-4
            rounded-full
            hover:bg-[#4B352A]
          "
        >
          继续 →
        </button>

      </div>

    </div>
  );
}