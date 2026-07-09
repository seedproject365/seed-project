'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import type {
  CheckinData,
  GratitudeData,
  HistoryRecord,
  ThreeTimeBookData,
  ThreeTimeBookEntry,
} from '../lib/history';
import { formatHistoryDate, getHistory } from '../lib/history';

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHistory(getHistory());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F4EC] px-4 py-6 pb-32 sm:px-6">
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(.97);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .fade-in-scale {
          animation: fadeInScale .6s ease-out forwards;
        }
      `}</style>

      <div className="mx-auto w-full max-w-2xl">
        <div className="fade-in-scale mb-6">
          <p className="text-sm font-medium text-[#8FAE8B]">种子记录</p>
          <h1 className="mt-2 text-3xl font-bold text-[#5B4636]">我的时间线</h1>
          <p className="mt-2 text-base text-[#8B7B6F]">
            四步骤、感恩日记、三时书都会保存在这里。
          </p>
        </div>

        {history.length === 0 ? (
          <div className="rounded-[30px] border border-[#E8DDCC] bg-white p-8 text-center shadow-lg">
            <div className="text-6xl">🌱</div>
            <h2 className="mt-4 text-xl font-semibold text-[#5B4636]">还没有记录</h2>
            <p className="mt-2 text-sm leading-6 text-[#8B7B6F]">
              完成一个练习后，记录会出现在这里。
            </p>
            <Link
              href="/plant"
              className="mt-6 inline-flex rounded-full bg-[#5C4033] px-7 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-[#4B352A]"
            >
              返回种子页
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {history.map((record) => (
              <article
                key={record.id}
                className="fade-in-scale overflow-hidden rounded-[30px] border border-[#E8DDCC] bg-white p-4 shadow-lg sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8FAE8B]">
                      {formatHistoryDate(record.date)}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-[#5B4636]">
                      {getRecordTitle(record.type)}
                    </h2>
                  </div>
                  <span className="rounded-full bg-[#F8F4EC] px-4 py-2 text-sm font-semibold text-[#8FAE8B]">
                    {getRecordIcon(record.type)}
                  </span>
                </div>

                <HistoryRecordContent record={record} />
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function HistoryRecordContent({ record }: { record: HistoryRecord }) {
  if (record.type === 'checkin') {
    const data = record.data as CheckinData;

    return (
      <div className="grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
        <Image
          src={data.poster}
          alt={`四步骤海报：${formatHistoryDate(record.date)}`}
          width={720}
          height={960}
          unoptimized
          className="w-full rounded-[24px] border border-[#E8DDCC] bg-[#FEFCF9]"
        />

        <div className="space-y-3 text-sm leading-6 text-[#5B4636]">
          <HistoryDetail label="目标" value={data.goal} />
          <HistoryDetail label="计划A" value={data.planA} />
          <HistoryDetail label="计划B" value={data.planB} />
          <HistoryDetail label="庆祝" value={data.celebration} />
        </div>
      </div>
    );
  }

  if (record.type === 'gratitude') {
    const data = record.data as GratitudeData;

    return (
      <div className="space-y-3">
        {data.items.map((item, index) => (
          <HistoryDetail key={`${record.id}-${index}`} label={`感恩 ${index + 1}`} value={item} />
        ))}
      </div>
    );
  }

  const data = record.data as ThreeTimeBookData;

  return (
    <div className="space-y-3">
      <ThreeTimeDetail title="早 · 保护生命" entry={data.morning} />
      <ThreeTimeDetail title="午 · 保护生命" entry={data.afternoon} />
      <ThreeTimeDetail title="晚 · 保护生命" entry={data.night} />
    </div>
  );
}

function HistoryDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[24px] border border-[#E8DDCC] bg-[#F8F4EC] p-4">
      <p className="text-xs font-semibold text-[#8FAE8B]">{label}</p>
      <p className="mt-1 text-[#5B4636]">{value || '还没有填写'}</p>
    </div>
  );
}

function ThreeTimeDetail({ title, entry }: { title: string; entry?: ThreeTimeBookEntry }) {
  if (!entry) {
    return (
      <div className="rounded-[24px] border border-[#E8DDCC] bg-[#F8F4EC] p-4">
        <p className="text-xs font-semibold text-[#8FAE8B]">{title}</p>
        <p className="mt-1 text-sm text-[#8B7B6F]">这个时段还没有完成。</p>
      </div>
    );
  }

  return (
    <div className="rounded-[24px] border border-[#E8DDCC] bg-[#F8F4EC] p-4">
      <p className="text-xs font-semibold text-[#8FAE8B]">{title}</p>
      <div className="mt-3 space-y-2 text-sm leading-6 text-[#5B4636]">
        <p>做得好：{entry.goodThing || '还没有填写'}</p>
        <p>需要改善：{entry.improvement || '还没有填写'}</p>
        <p>种子来源：{entry.seedSource}</p>
        <p>忏悔：{entry.repentance || '还没有填写'}</p>
        <p>承诺：{entry.commitment || '还没有填写'}</p>
        <p>平衡：{entry.balance || '还没有填写'}</p>
      </div>
    </div>
  );
}

function getRecordTitle(type: HistoryRecord['type']) {
  if (type === 'checkin') {
    return '四步骤';
  }

  if (type === 'gratitude') {
    return '感恩日记';
  }

  return '三时书';
}

function getRecordIcon(type: HistoryRecord['type']) {
  if (type === 'checkin') {
    return '🌱';
  }

  if (type === 'gratitude') {
    return '❤️';
  }

  return '📖';
}
