'use client';

import { useState } from 'react';
import WizardStepFrame, { helperCardClass, primaryButtonClass, secondaryButtonClass, textareaClass } from '../components/WizardStepFrame';

type Props = {
  onBack: () => void;
  onNext: () => void;
};

export default function CelebrateStep({ onBack, onNext }: Props) {
  const [reflection, setReflection] = useState('');

  return (
    <div className="w-full">
      <WizardStepFrame
        stepLabel="🌱 第四步"
        progressPercent="100%"
        title="☕ 庆祝一下"
        description="今天，你已经种下了一颗善的种子。"
        contentClassName="space-y-6"
      >
        <div className={`${helperCardClass} border border-[#E8DDCC]p-5`}>
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder={`今天帮助了谁？
有什么收获？
现在的心情如何？`}
            rows={3}
            className={`${textareaClass} min-h-[90px] bg-[#ECE4D8] border border-[#E8DDCC]`}
          />

          <div className="mt-6 rounded-[24px] border border-[#E8DDCC] bg-[#F8F4EC] p-5">
            <p className="text-sm text-[#8B7B6F]">
              🌱 每一个善意，都会在未来开花结果。
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-[20px] border border-[#EFE6DA] bg-[#FFFDF9] p-4 text-center">
          <div className="mb-2 text-2xl">☕</div>
          <h2 className="mb-2 text-xl font-semibold text-[#5B4636]">
            去奖励自己一杯咖啡吧！
          </h2>
          <p className="leading-6 text-sm text-[#8B7B6F]">
            庆祝，不是因为你完成了目标，
            <br />
            而是因为你开始了行动。
          </p>
        </div>
      </WizardStepFrame>

      <div className="mt-0 flex justify-between gap-3">
        <button onClick={onBack} className={secondaryButtonClass}>
          ← 返回
        </button>

        <button onClick={onNext} className={primaryButtonClass}>
          完成 →
        </button>
      </div>
    </div>
  );
}