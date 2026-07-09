'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { AnimatedBackground } from '../components/AnimatedBackground';
import { useProfile } from '../context/ProfileContext';

export default function ProfilePage() {
  const router = useRouter();
  const { profile, setProfile } = useProfile();
  const [displayName, setDisplayName] = useState(profile?.displayName ?? '');
  const [error, setError] = useState('');

  const isEditing = useMemo(() => Boolean(profile?.displayName?.trim()), [profile]);

  const handleSave = () => {
    const nextName = displayName.trim();

    if (!nextName) {
      setError('请输入你的展示名称。');
      return;
    }

    setProfile({ displayName: nextName });
    setError('');
    router.push('/');
  };

  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10 flex min-h-screen items-center justify-center bg-transparent px-4 pb-24 sm:px-6">
        <div className="w-full max-w-md rounded-[32px] border border-[#E8DDCC] bg-[#FEFCF9]/95 p-6 shadow-2xl backdrop-blur">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8FAE8B]">Profile</p>
            <h1 className="mt-2 text-3xl font-bold text-[#5C4033]">输入你的名称</h1>
            <p className="mt-3 text-sm leading-6 text-[#8B7B6F]">
              让种子项目更像你自己。
            </p>
          </div>

          <div className="mt-6 rounded-[24px] border border-[#E8DDCC] bg-[#F8F4EC] p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8DDCC] text-2xl text-[#5C4033]">
                👤
              </div>
              <div>
                <p className="text-sm font-semibold text-[#5C4033]">头像(coming soon)</p>
                <p className="text-sm text-[#8B7B6F]">目前只开放名字</p>
              </div>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-medium text-[#5C4033]">Name</span>
              <input
                value={displayName}
                onChange={(event) => {
                  setDisplayName(event.target.value);
                  if (error) {
                    setError('');
                  }
                }}
                placeholder="例如：小明"
                className="w-full rounded-[20px] border border-[#E8DDCC] bg-white px-4 py-3 text-base text-[#5B4636] outline-none placeholder:text-[#A79F91] focus:ring-2 focus:ring-[#8FAE8B]"
              />
            </label>

            {error ? <p className="mt-3 text-sm text-[#C96B5F]">{error}</p> : null}
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="mt-6 w-full rounded-full bg-[#5C4033] px-6 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-[#4B352A]"
          >
            {isEditing ? '保存并继续' : 'Save'}
          </button>
        </div>
      </main>
    </>
  );
}
