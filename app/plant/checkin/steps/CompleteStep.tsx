'use client';

import Link from 'next/link';
import WizardStepFrame, { helperCardClass, primaryButtonClass } from '../components/WizardStepFrame';

export default function CompleteStep() {
  return (
    <div className="w-full">
      <WizardStepFrame
        stepLabel="🌱 第五步"
        showProgress={false}
        title="打卡完成！"
        description="你已成功完成今日四步骤打卡"
        contentClassName="space-y-6"
      >
        <div className="flex justify-center">
          <div className="inline-block text-7xl sm:text-8xl">✨</div>
        </div>

        <div className={`${helperCardClass} border border-[#E8DDCC] text-center`}>
          <p className="text-base leading-relaxed text-[#5B4636]">
            🌱 每一个小步骤，都是通往梦想的阶梯。
          </p>
          <p className="mt-3 text-sm text-[#8B7B6F]">
            坚持每日打卡，你的成长会被看见。
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className={`${helperCardClass} border border-[#E8DDCC] text-center`}>
            <p className="text-2xl font-bold text-[#8FAE8B]">1</p>
            <p className="mt-1 text-xs text-[#8B7B6F]">今天又种了一颗种子</p>
          </div>
          <div className={`${helperCardClass} border border-[#E8DDCC] text-center`}>
            <p className="text-xl font-bold text-[#8FAE8B]">🌱</p>
            <p className="mt-1 text-xs text-[#8B7B6F]">分享我的种子</p>
          </div>
        </div>
      </WizardStepFrame>

      <div className="mt-6 flex justify-center">
        <Link href="/plant" className="w-full max-w-sm">
          <button className={`${primaryButtonClass} w-full`}>
            🌱 返回首页
          </button>
        </Link>
      </div>
    </div>
  );
}