'use client';

import { useState } from 'react';
import WizardStepFrame, { helperCardClass, primaryButtonClass, textareaClass } from '../components/WizardStepFrame';

type Props = {
  onNext?: () => void;
};

export default function GoalStep({ onNext }: Props) {
  const [goal, setGoal] = useState('');

  return (
    <div className="w-full">
      <WizardStepFrame
        stepLabel="🌱 第一步"
        progressPercent="25%"
        title="🎯 我的目标"
        description="写下一个近期最想实现的目标"
        contentClassName="space-y-6"
      >
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder={`例如：
我想在2026年8月31日前
完成RM20,000业绩。`}
          className={`${textareaClass} h-40 sm:h-48 bg-[#FEFCF9] border-2`}
        />

        <div className={`${helperCardClass} border border-[#E8DDCC]`}>
          <h3 className="mb-2 flex items-center gap-2 text-base font-semibold text-[#5B4636]">
            💡 小提示
          </h3>
          <ul className="space-y-2 text-sm text-[#8B7B6F]">
            <li className="flex gap-3">
              <span className="font-bold text-[#8FAE8B]">•</span>
              <span>有日期</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#8FAE8B]">•</span>
              <span>可以衡量</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-[#8FAE8B]">•</span>
              <span>越具体越容易实现</span>
            </li>
          </ul>
        </div>
      </WizardStepFrame>

      <div className="mt-0 flex justify-center">
        <button
          onClick={onNext}
          className={`${primaryButtonClass} w-full max-w-sm`}
        >
          🌱 继续
        </button>
      </div>
    </div>
  );
}