'use client';

import WizardStepFrame, { helperCardClass, primaryButtonClass, secondaryButtonClass, textareaClass } from '../components/WizardStepFrame';

type Props = {
  onBack: () => void;
  onNext: () => void;
};

export default function PlanAStep({
  onBack,
  onNext,
}: Props) {
  return (
    <div className="w-full">
      <WizardStepFrame
        stepLabel="🌱 第二步"
        progressPercent="50%"
        title="帮助对象"
        description="找一个与你有共同目标，或值得帮助的对象。"
        contentClassName="space-y-6"
      >
        <div className={`${helperCardClass} border border-[#E8DDCC]`}>
          <label className="mb-3 block font-semibold text-[#8FAE8B]">
            帮助对象
          </label>
          <textarea
            placeholder="例如：父母、伙伴、客户、朋友……"
            className={`${textareaClass} min-h-[92px] bg-transparent border-0 p-0 shadow-none focus:ring-0 text-xl sm:text-2xl`}
            rows={2}
          />
        </div>

        <div className={`${helperCardClass} border border-[#E8DDCC]`}>
          <p className="text-[#8B7B6F]">
            💡 先帮助别人得到他们想要的，
            你的种子就开始成长。
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-[#ECE4D8] px-4 py-2 text-sm text-[#5B4636]">
            家庭成员
          </button>
          <button className="rounded-full bg-[#ECE4D8] px-4 py-2 text-sm text-[#5B4636]">
            事业伙伴
          </button>
          <button className="rounded-full bg-[#ECE4D8] px-4 py-2 text-sm text-[#5B4636]">
            社会弱势
          </button>
          <button className="rounded-full bg-[#ECE4D8] px-4 py-2 text-sm text-[#5B4636]">
            亲密朋友
          </button>
        </div>
      </WizardStepFrame>

      <div className="mt-6 flex justify-between gap-3">
        <button onClick={onBack} className={secondaryButtonClass}>
          ← 返回
        </button>

        <button onClick={onNext} className={primaryButtonClass}>
          🌱 下一步
        </button>
      </div>
    </div>
  );
}