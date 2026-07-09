'use client';

import { useEffect, useMemo, useState } from 'react';

import type { HistoryRecord } from '../plant/lib/history';
import { getHistory } from '../plant/lib/history';

type GardenStats = {
  checkin: number;
  gratitude: number;
  threeTimeBook: number;
};

const emptyStats: GardenStats = {
  checkin: 0,
  gratitude: 0,
  threeTimeBook: 0,
};

export default function GardenPage() {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHistory(getHistory());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const stats = useMemo(
    () =>
      history.reduce<GardenStats>((currentStats, record) => {
        if (record.type === 'checkin') {
          return {
            ...currentStats,
            checkin: currentStats.checkin + 1,
          };
        }

        if (record.type === 'gratitude') {
          return {
            ...currentStats,
            gratitude: currentStats.gratitude + 1,
          };
        }

        return {
          ...currentStats,
          threeTimeBook: currentStats.threeTimeBook + 1,
        };
      }, emptyStats),
    [history],
  );
  const totalSeeds = history.length;
  const seeds = Array.from({ length: totalSeeds }, (_, index) => index);

  return (
    <main className="min-h-screen bg-[#F8F4EC] px-4 py-6 pb-32 sm:px-6">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#5B4636]">🌱 成长花园</h1>
          <p className="mt-2 whitespace-pre-line text-base leading-7 text-[#8B7B6F]">
            每一次善念，
            {'\n'}都会种下一颗新的种子。
          </p>
        </div>

        <section className="rounded-[30px] border border-[#E8DDCC] bg-white p-5 shadow-lg sm:p-7">
          <div className="grid gap-4 sm:grid-cols-3">
            <GardenStat icon="🌱" label="已完成四步骤" value={stats.checkin} />
            <GardenStat icon="❤️" label="感恩日记" value={stats.gratitude} />
            <GardenStat icon="🌞" label="三时书" value={stats.threeTimeBook} />
          </div>
        </section>

        <section className="mt-5 rounded-[30px] border border-[#E8DDCC] bg-white p-6 text-center shadow-lg sm:p-8">
          {totalSeeds === 0 ? (
            <div>
              <div className="text-6xl">🌱</div>
              <p className="mt-5 whitespace-pre-line text-base leading-7 text-[#8B7B6F]">
                你的第一颗种子，
                {'\n'}正在等待发芽。
                {'\n'}完成今天的练习吧。
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3 text-4xl leading-none">
              {seeds.map((seed) => (
                <span key={seed} aria-label="Seed" role="img">
                  🌱
                </span>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function GardenStat({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div className="rounded-[24px] border border-[#E8DDCC] bg-[#F8F4EC] p-4 text-center">
      <div className="text-3xl">{icon}</div>
      <p className="mt-3 text-2xl font-bold text-[#8FAE8B]">{value}</p>
      <p className="mt-1 text-xs text-[#8B7B6F]">{label}</p>
    </div>
  );
}
