'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { ThreeTimePeriod } from '../lib/history';
import { saveThreeTimeBookEntry } from '../lib/history';

type TimeSlot = {
  period: ThreeTimePeriod;
  icon: string;
  label: string;
  range: string;
  completeIcon: string;
  completeTitle: string;
  completeSubtitle: string;
};

const timeSlots: TimeSlot[] = [
  {
    period: 'morning',
    icon: '☀️',
    label: '早 · 保护生命',
    range: '07:00 - 12:00',
    completeIcon: '🌤',
    completeTitle: '早上的记录完成了。',
    completeSubtitle: '下午见。',
  },
  {
    period: 'afternoon',
    icon: '🌤',
    label: '午 · 尊重伴侣或他人的关系',
    range: '12:00 - 17:00',
    completeIcon: '🌙',
    completeTitle: '下午的记录完成了。',
    completeSubtitle: '今晚见。',
  },
  {
    period: 'night',
    icon: '🌙',
    label: '晚 · 和谐的言语',
    range: '17:00 - 22:00',
    completeIcon: '🌱',
    completeTitle: '今天的三时书完成了。',
    completeSubtitle: '谢谢你今天照顾自己。',
  },
];

const seedSourceOptions = [
  '我的起心动念（自己创造的种子）',
  '外在环境触发（环境产生的种子）',
  '两者都有',
];

export default function ThreeTimeBookPage() {
  const currentSlot = useMemo(() => getCurrentTimeSlot(), []);
  const [step, setStep] = useState(1);
  const [goodThing, setGoodThing] = useState('');
  const [improvement, setImprovement] = useState('');
  const [seedSource, setSeedSource] = useState(seedSourceOptions[0]);
  const [repentance, setRepentance] = useState('');
  const [commitment, setCommitment] = useState('');
  const [balance, setBalance] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const completeBook = () => {
    if (!currentSlot) {
      return;
    }

    saveThreeTimeBookEntry(currentSlot.period, {
      goodThing,
      improvement,
      seedSource,
      repentance,
      commitment,
      balance,
    });
    setIsComplete(true);
  };

  if (!currentSlot) {
    return (
      <main className="min-h-screen bg-[#F8F4EC] px-4 py-6 pb-32 sm:px-6">
        <div className="mx-auto w-full max-w-2xl rounded-[30px] border border-[#E8DDCC] bg-white p-6 text-center shadow-lg">
          <div className="text-6xl">🌙</div>
          <h1 className="mt-4 text-2xl font-bold text-[#5B4636]">现在是休息时间</h1>
          <p className="mt-3 text-sm leading-6 text-[#8B7B6F]">
            三时书会在 07:00 - 22:00 之间，根据当前时间显示对应时段。
          </p>
          <Link
            href="/plant"
            className="mt-6 inline-flex rounded-full bg-[#5C4033] px-7 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-[#4B352A]"
          >
            返回
          </Link>
        </div>
      </main>
    );
  }

  if (isComplete) {
    return (
      <main className="min-h-screen bg-[#F8F4EC] px-4 py-6 pb-32 sm:px-6">
        <div className="fade-in-scale mx-auto w-full max-w-2xl rounded-[30px] border border-[#E8DDCC] bg-white p-8 text-center shadow-lg">
          <div className="text-7xl">{currentSlot.completeIcon}</div>
          <h1 className="mt-5 text-2xl font-bold text-[#5B4636]">
            {currentSlot.completeTitle}
          </h1>
          <p className="mt-3 text-base text-[#8B7B6F]">{currentSlot.completeSubtitle}</p>
          <Link
            href="/plant/history"
            className="mt-6 inline-flex rounded-full bg-[#8FAE8B] px-7 py-3.5 font-semibold text-[#3E3028]"
          >
            查看记录
          </Link>
        </div>
      </main>
    );
  }

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

      <div className="fade-in-scale mx-auto w-full max-w-2xl">
        <div className="mb-4">
          
          <h1 className="mt-0 text-2xl font-bold text-[#5B4636]">三时书</h1>
          <p className="mt-2 text-sm font-bold text-[#8FAE8B]">{currentSlot.label}</p>
          <p className="mt-2 text-sm text-[#8B7B6F]">{currentSlot.range}</p>
        </div>

        <div className="mb-5 h-2 overflow-hidden rounded-full bg-[#E8DDCC]">
          <div
            className="h-full rounded-full bg-[#8FAE8B] transition-all duration-500"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>

        <section className="rounded-[30px] border border-[#E8DDCC] bg-white p-5 shadow-lg sm:p-7">
          {step === 1 && (
            <TextStep
              label="步骤一"
              title="➕ 今天我做得好的一件事"
              value={goodThing}
              onChange={setGoodThing}
            />
          )}

          {step === 2 && (
            <TextStep
              label="步骤二"
              title="➖ 今天我需要改善的一件事"
              value={improvement}
              onChange={setImprovement}
            />
          )}

          {step === 3 && (
            <div>
              <p className="text-sm font-medium text-[#8FAE8B]">步骤三 · 四力量①</p>
              <h2 className="mt-2 text-2xl font-bold text-[#5B4636]">想起笔</h2>
              <p className="mt-3 text-base text-[#8B7B6F]">这个种子来自哪里？</p>

              <div className="mt-5 space-y-3">
                {seedSourceOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-start gap-3 rounded-[24px] border border-[#E8DDCC] bg-[#F8F4EC] p-4 text-sm text-[#5B4636]"
                  >
                    <input
                      type="radio"
                      checked={seedSource === option}
                      onChange={() => setSeedSource(option)}
                      className="mt-1 accent-[#8FAE8B]"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <TextStep
              label="步骤四 · 四力量②"
              title="明智的忏悔"
              placeholder="我对于过去的行为感到抱歉，我决心要停止坏种子持续翻倍。"
              value={repentance}
              onChange={setRepentance}
            />
          )}

          {step === 5 && (
            <TextStep
              label="步骤五 · 四力量③"
              title="承诺"
              placeholder="我承诺在一个我能够做到的时间段内，停止做该行为。"
              value={commitment}
              onChange={setCommitment}
            />
          )}

          {step === 6 && (
            <TextStep
              label="步骤六 · 四力量④"
              title="平衡"
              placeholder="我计划在某个时间段内种下一颗好种子。"
              value={balance}
              onChange={setBalance}
            />
          )}
        </section>

        <div className="mt-5 flex justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((currentStep) => Math.max(1, currentStep - 1))}
            className="rounded-full border border-[#8FAE8B] px-7 py-3.5 font-semibold text-[#5B4636] transition-all hover:bg-[#F8F4EC]"
          >
            上一步
          </button>

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep((currentStep) => currentStep + 1)}
              className="rounded-full bg-[#5C4033] px-7 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-[#4B352A]"
            >
              下一步
            </button>
          ) : (
            <button
              type="button"
              onClick={completeBook}
              className="rounded-full bg-[#5C4033] px-7 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-[#4B352A]"
            >
              完成
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

function TextStep({
  label,
  title,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  title: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-[#8FAE8B]">{label}</p>
      <h2 className="mt-2 text-2xl font-bold text-[#5B4636]">{title}</h2>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? '写下一句就好。'}
        className="mt-5 min-h-[180px] w-full resize-none rounded-[24px] border border-[#E8DDCC] bg-[#F8F4EC] p-5 text-base text-[#5B4636] outline-none placeholder:text-[#A79F91] focus:ring-2 focus:ring-[#8FAE8B]"
      />
    </div>
  );
}

function getCurrentTimeSlot() {
  const hour = new Date().getHours();

  if (hour >= 7 && hour < 12) {
    return timeSlots[0];
  }

  if (hour >= 12 && hour < 17) {
    return timeSlots[1];
  }

  if (hour >= 17 && hour < 22) {
    return timeSlots[2];
  }

  return undefined;
}
