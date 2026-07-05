'use client';

import { useState } from 'react';
import WizardStepFrame, { helperCardClass, primaryButtonClass, secondaryButtonClass, textareaClass } from '../components/WizardStepFrame';

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
    <div className="w-full">
      <WizardStepFrame
        stepLabel="🌱 第三步"
        progressPercent="75%"
        title="今天的行动"
        description="今天，你准备如何帮助对方？"
        contentClassName="space-y-6"
      >
        <div className={`${helperCardClass} border border-[#E8DDCC]`}>
          <textarea
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            placeholder="例如：今天转 RM1 给妈妈的 TNG，给她一个惊喜……"
            rows={5}
            className={`${textareaClass} min-h-[180px] bg-[#ECE4D8] border border-[#E8DDCC]`}
          />

          <div className="mt-6 flex gap-3">
            <span className="text-[#8FAE8B]">💡</span>
            <p className="text-sm text-[#8B7B6F]">
              行动越具体，种子成长得越快。
              每一个微小的善意都是未来的果实。
            </p>
          </div>
        </div>

        <div className="rounded-[30px] bg-white p-5 shadow-lg border border-[#EFE6DA]">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl">💧</span>
            <span className="font-medium text-[#8B7B6F]">灌溉你的种子中...</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-[#E8DDCC]">
              <div className="h-full w-3/4 bg-[#8FAE8B]" />
            </div>
            <div className="text-2xl">🌱</div>
          </div>
        </div>
      </WizardStepFrame>

      <div className="mt-0 flex justify-between gap-3">
        <button onClick={onBack} className={secondaryButtonClass}>
          ← 返回
        </button>

        <button onClick={onNext} className={primaryButtonClass}>
          继续 →
        </button>
      </div>
    </div>
  );
}