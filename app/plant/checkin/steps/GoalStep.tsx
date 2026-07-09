'use client';
import WizardStepFrame, { primaryButtonClass, textareaClass } from '../components/WizardStepFrame';

interface Props {
  goal: string;
  onGoalChange: (goal: string) => void;
  onNext: () => void;
}

export default function GoalStep({ goal, onGoalChange, onNext }: Props) {
  return (
    <div className="w-full">
      <WizardStepFrame
      showFrame={false}
        stepLabel="🌱 第一步"
        progressPercent={25}
        title="🎯 你的目标是什么？"
        description="写下一个近期最想实现的目标"
        contentClassName="space-y-6"
      >
        <textarea
          value={goal}
          onChange={(e) => onGoalChange(e.target.value)}
          placeholder={`例如：
我想在2026年8月31日前
完成RM20,000业绩。`}
          className={`${textareaClass} h-40 sm:h-48 bg-[#FEFCF9] border-2 text-base placeholder:text-sm`}
        />

       <p className="mt-2 text-s text-[#8B7B6F] leading-6">
  💡 有日期 · 可以衡量 · 越具体越容易实现
</p>
      </WizardStepFrame>

      <div className="mt-0 flex justify-center">
        <button
          onClick={onNext}
          className={`${primaryButtonClass} w-full max-w-sm text-s`}
        >
         🌱→
           
        </button>
      </div>
    </div>
  );
}
