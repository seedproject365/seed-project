'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { getDisplayName, useProfile } from '../../context/ProfileContext';
import type { ThreeTimePeriod } from '../lib/history';
import { saveThreeTimeBookEntry } from '../lib/history';

type TimeSlot = {
  period: ThreeTimePeriod;
  icon: string;
  label: string;
  // optional virtue id (refer to tenVirtues below)
  virtueId?: string;
  range: string;
  completeIcon: string;
  completeTitle: string;
  completeSubtitle: string;
};

const tenVirtues = [
  {
    id: 'body-protect-life',
    category: '身',
    name: '保护生命',
  },
  {
    id: 'body-respect-property',
    category: '身',
    name: '尊重他人财物 / 慷慨大度',
  },
  {
    id: 'body-respect-relationship',
    category: '身',
    name: '尊重他人伴侣关系',
  },
  {
    id: 'speech-honest',
    category: '语',
    name: '诚实的言语',
  },
  {
    id: 'speech-harmony',
    category: '语',
    name: '和谐的语言',
  },
  {
    id: 'speech-gentle',
    category: '语',
    name: '柔和言语',
  },
  {
    id: 'speech-meaningful',
    category: '语',
    name: '有意义的言语',
  },
  {
    id: 'mind-happy',
    category: '意',
    name: '为他人感到开心',
  },
  {
    id: 'mind-compassion',
    category: '意',
    name: '同情他人的不幸',
  },
  {
    id: 'mind-worldview',
    category: '意',
    name: '正确世界观（想起笔）',
  },
];

const timeSlots: TimeSlot[] = [
  {
    period: 'morning',
    icon: '☀️',
    // only time period label here; virtue is referenced by virtueId
    label: '早',
    virtueId: 'body-protect-life',
    range: '07:00 - 12:00',
    completeIcon: '🌤',
    completeTitle: '早上的记录完成了。',
    completeSubtitle: '下午见。',
  },
  {
    period: 'afternoon',
    icon: '🌤',
    label: '午',
    virtueId: 'body-respect-relationship',
    range: '12:00 - 17:00',
    completeIcon: '🌙',
    completeTitle: '下午的记录完成了。',
    completeSubtitle: '今晚见。',
  },
  {
    period: 'night',
    icon: '🌙',
    label: '晚',
    virtueId: 'speech-harmony',
    range: '17:00 - 22:00',
    completeIcon: '🌱',
    completeTitle: '今天的三时书完成了。',
    completeSubtitle: '谢谢你今天照顾自己。',
  },
];

const seedSourceOptions = [
  '我的起心动念（自己刚刚创造的种子）',
  '外在环境触发（他人产生的种子）',
  '我过去所创造（过去的坏种子已经开花）',
  '预感或直觉（潜意识产生的种子）',
];

export default function ThreeTimeBookPage() {
  const { profile } = useProfile();
  const displayName = getDisplayName(profile);
  const currentSlot = useMemo(() => getCurrentTimeSlot(), []);
  const initialVirtueMap: Record<ThreeTimePeriod, string | undefined> = {
    morning: timeSlots[0]?.virtueId,
    afternoon: timeSlots[1]?.virtueId,
    night: timeSlots[2]?.virtueId,
  };
  const [virtueMap, setVirtueMap] = useState<Record<ThreeTimePeriod, string | undefined>>(initialVirtueMap);
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
          <p className="mt-2 text-sm font-semibold text-[#8FAE8B]">Good evening, {displayName} ✨</p>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mt-2 text-sm font-bold text-[#8FAE8B]">{currentSlot.icon} {currentSlot.label}</p>
              <p className="mt-2 text-sm text-[#8B7B6F]">{currentSlot.range}</p>
              <p className="mt-2 text-sm text-[#8B7B6F]">助力我目标达成的美德.</p>
            </div>

            <div className="w-1/2">
              <VirtueSelector
                currentVirtueId={virtueMap[currentSlot.period]}
                onChange={(newId) => {
                  setVirtueMap((prev) => ({ ...prev, [currentSlot.period]: newId }));
                }}
              />
              <div className="mt-3 text-sm text-[#5B4636]">
                {renderVirtueDisplay(virtueMap[currentSlot.period])}
              </div>
            </div>
          </div>
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
              title="➕ 根据10美德，今天我做得好的一件事"
              value={goodThing}
              onChange={setGoodThing}
            />
          )}

          {step === 2 && (
            <TextStep
              label="步骤二"
              title="➖ 根据10美德，今天我需要改善的一件事"
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
              placeholder="我对于过去的（行为）感到忏悔，我决心要停止坏种子持续翻倍。"
              value={repentance}
              onChange={setRepentance}
            />
          )}

          {step === 5 && (
            <TextStep
              label="步骤五 · 四力量③"
              title="承诺"
              placeholder="我承诺（在一个我能够做到的时间段内），停止做该行为。"
              value={commitment}
              onChange={setCommitment}
            />
          )}

          {step === 6 && (
            <TextStep
              label="步骤六 · 四力量④"
              title="平衡"
              placeholder="我计划（在某个时间段内）种下正向承诺的好种子。"
              value={balance}
              onChange={setBalance}
            />
          )}
        </section>

        <div className="mt-5 flex justify-between gap-3">
  {/* 上一步 */}
  <button
    type="button"
    onClick={() =>
      setStep((currentStep) => Math.max(1, currentStep - 1))
    }
    className="rounded-full border border-[#8FAE8B] px-7 py-3.5 font-semibold text-[#5B4636]"
  >
    上一步
  </button>

  {/* Step 2 特别处理 */}
  {step === 2 ? (
    <div className="flex gap-3">
      <button
        type="button"
        onClick={completeBook}
        className="rounded-full border border-[#8FAE8B] px-7 py-3.5 font-semibold text-[#5B4636]"
      >
        结束三时书
      </button>

      <button
        type="button"
        onClick={() => setStep(3)}
        className="rounded-full bg-[#5C4033] px-7 py-3.5 font-semibold text-white shadow-sm transition"
      >
        继续四力量
      </button>
    </div>
  ) : step < 6 ? (
    /* Step 1、3、4、5 */
    <button
      type="button"
      onClick={() =>
        setStep((currentStep) => currentStep + 1)
      }
      className="rounded-full bg-[#5C4033] px-7 py-3.5 font-semibold text-white shadow-sm transition"
    >
      下一步
    </button>
  ) : (
    /* Step 6 */
    <button
      type="button"
      onClick={completeBook}
      className="rounded-full bg-[#5C4033] px-7 py-3.5 font-semibold text-white shadow-sm transition"
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
        placeholder={placeholder ?? '例：+我今天早起做瑜伽。 -我昨天晚上熬夜。'}
        className="mt-5 min-h-[180px] w-full resize-none rounded-[24px] border border-[#E8DDCC] bg-[#F8F4EC] p-5 text-base text-[#5B4636] outline-none placeholder:text-[#A79F91] focus:ring-2 focus:ring-[#8FAE8B]"
      />
    </div>
  );
}

function VirtueSelector({
  currentVirtueId,
  onChange,
}: {
  currentVirtueId?: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#8FAE8B]">选择美德</label>
      <select
        value={currentVirtueId ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-[12px] border border-[#E8DDCC] bg-[#F8F4EC] p-3 text-sm text-[#5B4636]"
      >
        <option value="">（选择美德）</option>
        {tenVirtues.map((v) => (
          <option key={v.id} value={v.id}>
            {v.category} · {v.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function renderVirtueDisplay(virtueId?: string) {
  if (!virtueId) return null;
  const v = tenVirtues.find((t) => t.id === virtueId);
  if (!v) return null;
  return (
    <div>
      <div className="text-sm text-[#8FAE8B]">{v.category} · {v.name}</div>
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
