'use client';

import Link from 'next/link';
import { useState } from 'react';

import { getDisplayName, useProfile } from '../../context/ProfileContext';
import { saveGratitudeJournal } from '../lib/history';

const emptyItems = ['', '', ''];

export default function GratitudeJournalPage() {
  const { profile } = useProfile();
  const displayName = getDisplayName(profile);
  const [items, setItems] = useState(emptyItems);
  const [isComplete, setIsComplete] = useState(false);

  const updateItem = (index: number, value: string) => {
    setItems((currentItems) =>
      currentItems.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  };

  const addItem = () => {
    setItems((currentItems) => [...currentItems, '']);
  };

  const completeJournal = () => {
    const savedItems = items.map((item) => item.trim()).filter(Boolean);

    saveGratitudeJournal(savedItems);
    setIsComplete(true);
  };

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
        <div className="mb-6">
          <p className="text-sm font-medium text-[#8FAE8B]">Gratitude Journal</p>
          <h1 className="mt-2 text-3xl font-bold text-[#5B4636]">
            {displayName === 'Seed User' ? 'Gratitude Journal ❤️' : `${displayName}'s Gratitude Journal ❤️`}
          </h1>
          <p className="mt-2 text-base text-[#8B7B6F]">今天你想感恩什么？</p>
          <p className="mt-2 text-base text-[#8B7B6F]">
            简单写下三件事。
          </p>
        </div>

        <div className="rounded-[30px] border border-[#E8DDCC] bg-white p-5 shadow-lg sm:p-7">
          <div className="space-y-4">
            {items.map((item, index) => (
              <label
                key={index}
                className="flex items-center gap-3 rounded-[24px] border border-[#E8DDCC] bg-[#F8F4EC] px-4 py-3"
              >
                <span className="text-lg text-[#F59BB5]">♥</span>
                <input
                  value={item}
                  onChange={(event) => updateItem(index, event.target.value)}
                  maxLength={90}
                  placeholder={`感恩 ${index + 1}`}
                  className="min-w-0 flex-1 bg-transparent text-sm text-[#5B4636] outline-none placeholder:text-[#A79F91]"
                />
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-5 rounded-full border border-[#8FAE8B] px-6 py-3 text-sm font-semibold text-[#5B4636] transition-all hover:bg-[#F8F4EC]"
          >
            +
          </button>

          <button
            type="button"
            onClick={completeJournal}
            className="mt-5 w-full rounded-full bg-[#5C4033] px-7 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-[#4B352A]"
          >
            完成
          </button>
        </div>

        {isComplete && (
          <div className="mt-5 rounded-[30px] border border-[#E8DDCC] bg-white p-5 text-center shadow-lg">
            <p className="text-base font-semibold text-[#5B4636]">
              感恩日记完成了。
            </p>
            <p className="mt-2 text-sm text-[#8B7B6F]">
              这份记录已经加入你的时间线。
            </p>
            <Link
              href="/plant/history"
              className="mt-4 inline-flex rounded-full bg-[#8FAE8B] px-6 py-3 text-sm font-semibold text-[#3E3028]"
            >
              查看记录
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
