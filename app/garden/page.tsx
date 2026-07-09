'use client';

import { useMemo, useState } from 'react';

import { getDisplayName, useProfile } from '../context/ProfileContext';

type ReactionEmoji = '❤️' | '🌱' | '🎉' | '✨' | '🙏' | '😊';

type BloomPost = {
  id: string;
  content: string;
  createdAt: string;
  flower: string;
  x: number;
  y: number;
  size: 'sm' | 'md' | 'lg';
  delay: string;
  reactions: Record<ReactionEmoji, number>;
};

const reactionEmojis: ReactionEmoji[] = ['❤️', '🌱', '🎉', '✨', '🙏', '😊'];
const flowerOptions = ['🌸', '🌷', '🌼', '🌻', '💐'];

const emptyReactions: Record<ReactionEmoji, number> = {
  '❤️': 0,
  '🌱': 0,
  '🎉': 0,
  '✨': 0,
  '🙏': 0,
  '😊': 0,
};

const mockBlooms: BloomPost[] = [
  {
    id: 'bloom-5',
    content: '今天成功完成四步骤。',
    createdAt: '2026-07-09T09:30:00.000Z',
    flower: '🌸',
    x: 48,
    y: 31,
    size: 'lg',
    delay: '0s',
    reactions: {
      ...emptyReactions,
      '🌱': 4,
      '🎉': 2,
      '✨': 1,
    },
  },
  {
    id: 'bloom-4',
    content: '今天陪妈妈一起吃晚餐。',
    createdAt: '2026-07-08T12:20:00.000Z',
    flower: '🌷',
    x: 66,
    y: 42,
    size: 'md',
    delay: '.5s',
    reactions: {
      ...emptyReactions,
      '❤️': 5,
      '🙏': 2,
    },
  },
  {
    id: 'bloom-3',
    content: '今天终于鼓起勇气跟客户报价。',
    createdAt: '2026-07-07T08:10:00.000Z',
    flower: '🌼',
    x: 34,
    y: 44,
    size: 'md',
    delay: '1s',
    reactions: {
      ...emptyReactions,
      '✨': 3,
      '😊': 1,
    },
  },
  {
    id: 'bloom-2',
    content: '今天遇到高利润客户。',
    createdAt: '2026-07-06T10:45:00.000Z',
    flower: '🌻',
    x: 26,
    y: 58,
    size: 'sm',
    delay: '1.5s',
    reactions: {
      ...emptyReactions,
      '❤️': 2,
      '🎉': 3,
    },
  },
  {
    id: 'bloom-1',
    content: '今天收到一个温柔的鼓励。',
    createdAt: '2026-07-05T14:15:00.000Z',
    flower: '💐',
    x: 73,
    y: 62,
    size: 'sm',
    delay: '2s',
    reactions: {
      ...emptyReactions,
      '🙏': 2,
      '😊': 2,
    },
  },
];

export default function GardenPage() {
  const { profile } = useProfile();
  const [blooms, setBlooms] = useState<BloomPost[]>(mockBlooms);
  const [selectedBloom, setSelectedBloom] = useState<BloomPost>();
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [userReactions, setUserReactions] = useState<Record<string, ReactionEmoji>>({});

  const sortedBlooms = useMemo(
    () =>
      [...blooms].sort(
        (firstBloom, secondBloom) =>
          new Date(secondBloom.createdAt).getTime() - new Date(firstBloom.createdAt).getTime(),
      ),
    [blooms],
  );

  const createBloom = () => {
    const content = draft.trim();

    if (!content) {
      return;
    }

    const bloomCount = blooms.length;
    const newBloom: BloomPost = {
      id: `bloom-${Date.now()}`,
      content,
      createdAt: new Date().toISOString(),
      flower: flowerOptions[bloomCount % flowerOptions.length],
      x: 42 + ((bloomCount * 11) % 26),
      y: 28 + ((bloomCount * 13) % 34),
      size: bloomCount % 3 === 0 ? 'lg' : bloomCount % 2 === 0 ? 'md' : 'sm',
      delay: `${(bloomCount % 5) * 0.35}s`,
      reactions: { ...emptyReactions },
    };

    setBlooms((currentBlooms) => [newBloom, ...currentBlooms]);
    setSelectedBloom(newBloom);
    setDraft('');
    setIsComposerOpen(false);
  };

  const reactToBloom = (postId: string, emoji: ReactionEmoji) => {
    if (userReactions[postId]) {
      return;
    }

    let updatedBloom: BloomPost | undefined;

    setBlooms((currentBlooms) =>
      currentBlooms.map((bloom) => {
        if (bloom.id !== postId) {
          return bloom;
        }

        updatedBloom = {
          ...bloom,
          reactions: {
            ...bloom.reactions,
            [emoji]: bloom.reactions[emoji] + 1,
          },
        };

        return updatedBloom;
      }),
    );
    setUserReactions((currentReactions) => ({
      ...currentReactions,
      [postId]: emoji,
    }));
    setSelectedBloom((currentBloom) => (currentBloom?.id === postId ? updatedBloom : currentBloom));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F4EC] px-4 py-6 pb-32 sm:px-6">
      <GardenStyles />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_18%,rgba(232,221,204,.92),transparent_36%),radial-gradient(circle_at_15%_76%,rgba(143,174,139,.2),transparent_30%)]" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-3xl flex-col">
        <GardenHeader />
        <CommunityTree blooms={sortedBlooms} onSelectBloom={setSelectedBloom} />
      </div>

      <button
        type="button"
        onPointerDown={() => setIsComposerOpen(true)}
        onClick={() => setIsComposerOpen(true)}
        aria-label="我要开花"
        className="fixed bottom-32 right-5 z-30 flex h-16 w-16 items-center justify-center rounded-full border border-[#E8DDCC] bg-white text-4xl text-[#5C4033] shadow-2xl transition-all hover:scale-105 sm:right-[calc(50%-22rem)]"
      >
        +
      </button>

      {selectedBloom && (
        <BloomModal
          bloom={selectedBloom}
          userReaction={userReactions[selectedBloom.id]}
          onReact={reactToBloom}
          onClose={() => setSelectedBloom(undefined)}
        />
      )}

      {isComposerOpen && (
        <ComposerModal
          draft={draft}
          onDraftChange={setDraft}
          onCreate={createBloom}
          onClose={() => setIsComposerOpen(false)}
        />
      )}
    </main>
  );
}

function GardenHeader() {
  const { profile } = useProfile();
  const displayName = getDisplayName(profile);

  return (
    <header className="relative z-10 text-center">
      <h1 className="text-3xl font-bold text-[#5B4636]">🌸 成长花园</h1>
      <p className="mt-2 text-sm leading-6 text-[#8B7B6F]">分享今天开花的一件事。</p>
      <p className="mt-3 text-sm font-semibold text-[#8FAE8B]">Welcome back, {displayName}. 🌸</p>
    </header>
  );
}

function CommunityTree({
  blooms,
  onSelectBloom,
}: {
  blooms: BloomPost[];
  onSelectBloom: (bloom: BloomPost) => void;
}) {
  return (
    <section className="relative mt-3 flex flex-1 items-end justify-center">
      <div className="relative h-[68vh] min-h-[520px] w-full max-w-[520px]">
        <TreeIllustration />

        {blooms.map((bloom) => (
          <BloomFlower key={bloom.id} bloom={bloom} onSelect={() => onSelectBloom(bloom)} />
        ))}

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-[112%] -translate-x-1/2 rounded-[50%] bg-[#DDE9D7]/80 blur-sm" />
      </div>
    </section>
  );
}

function TreeIllustration() {
  return (
    <svg
      className="absolute inset-x-0 bottom-0 mx-auto h-full w-full drop-shadow-[0_18px_28px_rgba(91,70,54,.16)]"
      viewBox="0 0 420 560"
      role="img"
      aria-label="Community tree"
    >
      <defs>
        <radialGradient id="leafGlow" cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor="#EEF4D8" />
          <stop offset="58%" stopColor="#C7D8A5" />
          <stop offset="100%" stopColor="#8FAE8B" />
        </radialGradient>
        <linearGradient id="trunkGlow" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#A88762" />
          <stop offset="100%" stopColor="#5B4636" />
        </linearGradient>
      </defs>
      <ellipse cx="210" cy="520" rx="150" ry="24" fill="#C6D6A2" opacity=".45" />
      <path
        d="M183 505c17-74 12-127-8-179-8-22 7-40 25-19 13 16 17 54 19 98 10-42 31-89 61-122 18-20 34-1 19 20-31 44-55 89-60 203h-56Z"
        fill="url(#trunkGlow)"
      />
      <path
        d="M206 501c9-88-3-135-52-194"
        fill="none"
        stroke="#D8BE8D"
        strokeLinecap="round"
        strokeWidth="5"
        opacity=".45"
      />
      <path
        d="M224 481c9-67 31-112 73-159"
        fill="none"
        stroke="#D8BE8D"
        strokeLinecap="round"
        strokeWidth="5"
        opacity=".32"
      />
      <circle cx="202" cy="214" r="128" fill="url(#leafGlow)" opacity=".86" />
      <circle cx="117" cy="260" r="84" fill="url(#leafGlow)" opacity=".77" />
      <circle cx="289" cy="264" r="91" fill="url(#leafGlow)" opacity=".8" />
      <circle cx="262" cy="157" r="82" fill="url(#leafGlow)" opacity=".72" />
      <circle cx="152" cy="149" r="73" fill="url(#leafGlow)" opacity=".68" />
      <circle cx="211" cy="304" r="103" fill="url(#leafGlow)" opacity=".82" />
      <g opacity=".28" fill="#FEFCF9">
        <circle cx="88" cy="178" r="5" />
        <circle cx="319" cy="188" r="4" />
        <circle cx="338" cy="306" r="3" />
        <circle cx="129" cy="339" r="3" />
        <circle cx="238" cy="96" r="4" />
      </g>
    </svg>
  );
}

function BloomFlower({ bloom, onSelect }: { bloom: BloomPost; onSelect: () => void }) {
  const sizeClass = {
    sm: 'text-4xl',
    md: 'text-5xl',
    lg: 'text-6xl',
  }[bloom.size];

  return (
    <button
      type="button"
      onPointerDown={onSelect}
      onClick={onSelect}
      aria-label={bloom.content}
      className={`bloom-float absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full p-2 leading-none transition-all hover:scale-110 ${sizeClass}`}
      style={{
        left: `${bloom.x}%`,
        top: `${bloom.y}%`,
        animationDelay: bloom.delay,
      }}
    >
      <span className="drop-shadow-[0_6px_10px_rgba(91,70,54,.22)]">{bloom.flower}</span>
    </button>
  );
}

function BloomModal({
  bloom,
  userReaction,
  onReact,
  onClose,
}: {
  bloom: BloomPost;
  userReaction?: ReactionEmoji;
  onReact: (postId: string, emoji: ReactionEmoji) => void;
  onClose: () => void;
}) {
  return (
    <ModalFrame onClose={onClose}>
      <div className="text-center">
        <div className="text-6xl">{bloom.flower}</div>
        <p className="mt-5 text-xl leading-9 text-[#5B4636]">{bloom.content}</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#8FAE8B]">
          {formatBloomDate(bloom.createdAt)}
        </p>
        <ReactionBar bloom={bloom} userReaction={userReaction} onReact={onReact} />
      </div>
    </ModalFrame>
  );
}

function ComposerModal({
  draft,
  onDraftChange,
  onCreate,
  onClose,
}: {
  draft: string;
  onDraftChange: (value: string) => void;
  onCreate: () => void;
  onClose: () => void;
}) {
  return (
    <ModalFrame onClose={onClose}>
      <label className="block">
        <span className="text-sm font-medium text-[#8FAE8B]">一句话分享今天开花的事情。</span>
        <textarea
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          maxLength={80}
          placeholder="今天好花开客人签了RMXXX订单。-你的名字"
          className="mt-4 min-h-[128px] w-full resize-none rounded-[24px] border border-[#E8DDCC] bg-[#F8F4EC] p-5 text-base text-[#5B4636] outline-none placeholder:text-[#A79F91] focus:ring-2 focus:ring-[#8FAE8B]"
        />
      </label>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-[#8B7B6F]">{draft.length}/80</p>
        <button
          type="button"
          onClick={onCreate}
          className="rounded-full bg-[#8FAE8B] px-7 py-3 text-sm font-semibold text-[#3E3028]"
        >
          种下花朵
        </button>
      </div>
    </ModalFrame>
  );
}

function ReactionBar({
  bloom,
  userReaction,
  onReact,
}: {
  bloom: BloomPost;
  userReaction?: ReactionEmoji;
  onReact: (postId: string, emoji: ReactionEmoji) => void;
}) {
  return (
    <div className="mt-6 flex flex-wrap justify-center gap-2">
      {reactionEmojis.map((emoji) => {
        const isSelected = userReaction === emoji;

        return (
          <button
            key={emoji}
            type="button"
            onClick={() => onReact(bloom.id, emoji)}
            disabled={Boolean(userReaction)}
            aria-label={emoji}
            className={`rounded-full border border-[#E8DDCC] px-3 py-2 text-lg transition-all ${
              isSelected ? 'bg-[#E8DDCC]' : 'bg-[#F8F4EC] hover:bg-[#E8DDCC]'
            }`}
          >
            <span>{emoji}</span>
            {bloom.reactions[emoji] > 0 && (
              <span className="ml-1 text-xs text-[#8B7B6F]">{bloom.reactions[emoji]}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ModalFrame({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#5B4636]/30 px-5 backdrop-blur-[3px]">
      <button type="button" aria-label="Close" className="absolute inset-0 cursor-default" onClick={onClose} />
      <div className="modal-rise relative w-full max-w-sm rounded-[30px] border border-[#E8DDCC] bg-[#FEFCF9] p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F8F4EC] text-lg text-[#8B7B6F]"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

function GardenStyles() {
  return (
    <style>{`
      @keyframes bloomFloat {
        0%, 100% {
          transform: translate(-50%, -50%) scale(1) rotate(-2deg);
        }
        50% {
          transform: translate(-50%, calc(-50% - 8px)) scale(1.06) rotate(2deg);
        }
      }

      @keyframes modalRise {
        0% {
          opacity: 0;
          transform: translateY(16px) scale(.98);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .bloom-float {
        animation: bloomFloat 4.8s ease-in-out infinite;
      }

      .modal-rise {
        animation: modalRise .28s ease-out forwards;
      }
    `}</style>
  );
}

function formatBloomDate(date: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}
