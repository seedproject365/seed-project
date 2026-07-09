'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { CheckinHistoryRecord } from '../lib/history';
import { formatHistoryDate, getLatestCheckin } from '../lib/history';

export default function SharePage() {
  const [latestCheckin, setLatestCheckin] = useState<CheckinHistoryRecord>();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLatestCheckin(getLatestCheckin());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center bg-[#FDFBF7] p-6">
      <div className="w-full rounded-[30px] bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-[#5B4636]">🌱 分享你的种子</h1>

        {latestCheckin ? (
          <>
            <p className="mt-2 text-[#8B7B6F]">{formatHistoryDate(latestCheckin.date)}</p>
            <Image
              src={latestCheckin.data.poster}
              alt={`四步骤海报：${formatHistoryDate(latestCheckin.date)}`}
              width={720}
              height={960}
              unoptimized
              className="mt-6 w-full rounded-[24px] border border-[#E8DDCC] bg-[#FEFCF9]"
            />
          </>
        ) : (
          <p className="mt-2 text-[#8B7B6F]">
            完成四步骤打卡后，你的分享海报会出现在这里。
          </p>
        )}
      </div>
    </main>
  );
}
