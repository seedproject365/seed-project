'use client';
import WizardStepFrame, { primaryButtonClass, secondaryButtonClass, textareaClass } from '../components/WizardStepFrame';
import { getDisplayName, useProfile } from '../../../context/ProfileContext';

interface Props {
  reflection: string;
  onReflectionChange: (reflection: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function CelebrateStep({ reflection, onReflectionChange, onBack, onNext }: Props) {
  const { profile } = useProfile();
  const displayName = getDisplayName(profile);

  return (
    <div className="w-full">
      <WizardStepFrame
      showFrame={false}
        stepLabel="🌱 Step 4"
        progressPercent={100}
        title="☕ Celebrate"
               contentClassName="space-y-6"
      >
        <div className="mt-6">
  <p className="mb-4 text-sm font-semibold text-[#8FAE8B]">Well done, {displayName}! 🌸</p>
  <p className="mb-4 text-sm leading-6 text-[#8B7B6F]">Today your seed has bloomed.</p>
  <textarea
    value={reflection}
    onChange={(e) => onReflectionChange(e.target.value)}
    placeholder={`今天帮助了谁？
有什么收获？
现在的心情如何？`}
    rows={3}
    className={`${textareaClass} min-h-[150px] text-base placeholder:text-sm`}
  />

  <p className="mt-4 text-sm text-[#8B7B6F] leading-6">
    🌱 每一个善意，都会在未来开花结果。
  </p>
</div>
<div className="mt-8 text-center">
   <h2 className="mb-1 text-base font-semibold text-[#5B4636]">
    去奖励自己一杯咖啡吧！
  </h2>

  <p className="text-xs leading-5 text-[#8B7B6F]">
    庆祝，不是因为你完成了目标，
    <br />
    而是因为你开始了行动。
  </p>
</div>


      </WizardStepFrame>

      <div className="mt-0 flex justify-between gap-3">
        <button onClick={onBack} className={secondaryButtonClass}>
        ← 🌳
           
        </button>

        <button onClick={onNext} className={primaryButtonClass}>
          ☕️→
        </button>
      </div>
    </div>
  );
}
