'use client';

import WizardStepFrame, { primaryButtonClass, secondaryButtonClass, textareaClass } from '../components/WizardStepFrame';
import { getDisplayName, useProfile } from '../../../context/ProfileContext';

interface Props {
  plan: string;
  progress: number;
  onPlanChange: (plan: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function PlanBStep({
  plan,
  progress,
  onPlanChange,
  onBack,
  onNext,
}: Props) {
  const { profile } = useProfile();
  const displayName = getDisplayName(profile);

  return (
    <div className="w-full">
      <WizardStepFrame
      showFrame={false}
        stepLabel="🌱 Step 3"
        progressPercent={75}
        title="🌱 Plant Your Seed"
        description="今天，你准备如何帮助对方？"
        contentClassName="space-y-5"
      >
        <div className="mt-6">
         <p className="mb-4 text-sm font-semibold text-[#8FAE8B]">Every seed has another way to grow, {displayName}.</p>
         <textarea
  value={plan}
  onChange={(e) => onPlanChange(e.target.value)}
  placeholder="例如：今天转 RM1 给妈妈的 TNG，给她一个惊喜……"
  rows={5}
  className={`${textareaClass} min-h-[180px] text-base placeholder:text-sm`}
/>

<p className="mt-4 text-sm text-[#8B7B6F] leading-6">
  💡 行动越具体，种子成长得越快。每一个微小的善意都是未来的果实。
</p>
          
        </div>

        <div className="rounded-[30px] bg-white p-5 shadow-lg border border-[#EFE6DA]">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl">💧</span>
            <span className="font-medium text-[#8B7B6F]">灌溉你的种子中...</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-[#E8DDCC]">
             <div
                 className="h-full bg-[#8FAE8B] transition-all duration-200"
               style={{ width: `${progress}%` }}
                />
            </div>
           <div className="relative h-3 w-full rounded-full bg-[#E8DDCC]">
  <div
    className="h-full bg-[#8FAE8B] transition-all duration-300"
    style={{ width: `${progress}%` }}
  />

 <div
  className="absolute transition-all duration-300"
  style={{
    left: `calc(${progress}% - 14px)`,
    top: "-30px",              // 🌱 固定在进度条上方
    transform: "translateX(-50%)",
    fontSize: `${16 + progress * 0.2}px`,
    zIndex: 30,
  }}
>
  {progress < 20
    ? "🌰"
    : progress < 45
    ? "🌱"
    : progress < 65
    ? "🌿"
    : "🌱"}
</div>
</div>
         </div>
          </div>
  
     </WizardStepFrame>

      <div className="mt-0 flex justify-between gap-3">
        <button onClick={onBack} className={secondaryButtonClass}>
         ←🍃
         
        </button>

        <button onClick={onNext} className={primaryButtonClass}>
          🌳 →
        </button>
      </div>
    </div>
  );
}
