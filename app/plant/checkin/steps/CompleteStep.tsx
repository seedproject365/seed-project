'use client';

import Image from 'next/image';
import Link from 'next/link';

import type { CheckinHistoryRecord } from '../../lib/history';
import { formatHistoryDate } from '../../lib/history';
import WizardStepFrame, { helperCardClass, primaryButtonClass } from '../components/WizardStepFrame';

type Props = {
  checkin?: CheckinHistoryRecord;
  completedCount: number;
};

export default function CompleteStep({ checkin, completedCount }: Props) {
  return (
    <div className="w-full">
      <WizardStepFrame
        stepLabel="🌱 完成"
        showProgress={false}
        title="✅ 完成"
        description="你已完成今天的四步骤打卡"
        contentClassName="space-y-6"
      >
        <div className="flex justify-center">
          <div className="inline-block text-7xl sm:text-8xl">✨</div>
        </div>

        <div className={`${helperCardClass} border border-[#E8DDCC] text-center`}>
          <p className="text-base leading-relaxed text-[#5B4636]">
            你已经种下 {completedCount} 颗种子
          </p>
          <p className="mt-3 text-sm text-[#8B7B6F]">
            每一次行动，都会被保存在你的记录里。
          </p>
        </div>

        {checkin && (
          <div className="overflow-hidden rounded-[30px] border border-[#E8DDCC] bg-[#FEFCF9] shadow-lg">
            <Image
              src={checkin.data.poster}
              alt={`四步骤海报：${formatHistoryDate(checkin.date)}`}
              width={720}
              height={960}
              unoptimized
              className="w-full"
            />
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className={`${helperCardClass} border border-[#E8DDCC] text-center`}>
            <p className="text-2xl font-bold text-[#8FAE8B]">{completedCount}</p>
            <p className="mt-1 text-xs text-[#8B7B6F]">已种下的种子</p>
          </div>

          <div className={`${helperCardClass} border border-[#E8DDCC] text-center`}>
            <Link href="/plant/Share">
              <p className="text-2xl font-bold text-[#8FAE8B]">🌱</p>
              <p className="mt-4 text-xs text-[#8B7B6F]">分享海报</p>
            </Link>
          </div>
        </div>
      </WizardStepFrame>

      <div className="mt-3 flex justify-center">
        <Link href="/plant/checkin" className={`${primaryButtonClass} w-full max-w-sm text-center`}>
          🌱 返回
        </Link>
      </div>
    </div>
  );
}
