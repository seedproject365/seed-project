'use client';
import type { Dispatch, SetStateAction } from 'react';
import WizardStepFrame, { helperCardClass, primaryButtonClass, secondaryButtonClass, textareaClass } from '../components/WizardStepFrame';

interface Props {
  partner: string;
  setPartner: Dispatch<SetStateAction<string>>;
  onBack: () => void;
  onNext: () => void;
}

export default function PlanAStep({ partner, setPartner, onBack, onNext }: Props) {
  return (
    <div className="w-full">
     <WizardStepFrame
     showFrame={false}
  stepLabel="🌱 第二步"
  progressPercent={50}
  title="👥 Seed Partner"
  description="找一个与你有共同目标，或值得帮助的对象。"
  contentClassName="space-y-6"
>
 <textarea
  value={partner}
  onChange={(e) => setPartner(e.target.value)}
  placeholder="例如：爸爸、媽媽、朋友、客戶……"
  className={`${textareaClass} h-40 sm:h-48 mt-6 text-base placeholder:text-sm`}
/>

<p className="mt-4 text-sm text-[#8B7B6F] leading-6">
  💡 先帮助别人得到他们想要的，你的种子就开始成长。
</p>
</WizardStepFrame>

      <div className="mt-3 flex justify-between gap-3">
        <button onClick={onBack} className={secondaryButtonClass}>
          ← 🌱
        </button>

        <button onClick={onNext} className={primaryButtonClass}>
          🍃 →
        </button>
      </div>
    </div>
  );
}