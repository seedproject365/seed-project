'use client';

import { getDisplayName, getStoredProfile } from '../../context/ProfileContext';

export type HistoryRecordType = 'checkin' | 'gratitude' | 'three-time-book';

export type CheckinData = {
  goal: string;
  planA: string;
  planB: string;
  celebration: string;
  poster: string;
};

export type GratitudeData = {
  items: string[];
};

export type ThreeTimePeriod = 'morning' | 'afternoon' | 'night';

export type ThreeTimeBookEntry = {
  goodThing: string;
  improvement: string;
  seedSource: string;
  repentance: string;
  commitment: string;
  balance: string;
  completedAt: string;
};

export type ThreeTimeBookData = {
  morning?: ThreeTimeBookEntry;
  afternoon?: ThreeTimeBookEntry;
  night?: ThreeTimeBookEntry;
};

export type HistoryRecord<TData = CheckinData | GratitudeData | ThreeTimeBookData> = {
  id: string;
  type: HistoryRecordType;
  date: string;
  createdAt: string;
  data: TData;
};

export type CheckinHistoryRecord = HistoryRecord<CheckinData> & {
  type: 'checkin';
};

export type GratitudeHistoryRecord = HistoryRecord<GratitudeData> & {
  type: 'gratitude';
};

export type ThreeTimeBookHistoryRecord = HistoryRecord<ThreeTimeBookData> & {
  type: 'three-time-book';
};

const HISTORY_KEY = 'seed-project.history';
const OLD_CHECKIN_HISTORY_KEY = 'seed-project.checkin-history';
const LATEST_CHECKIN_KEY = 'seed-project.latest-checkin-id';

type OldCheckin = {
  id: string;
  date: string;
  goal: string;
  planA: string;
  planB: string;
  celebration: string;
  poster: string;
};

function escapeSvgText(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function splitLines(value: string, maxLength = 32) {
  const words = value.trim().split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (nextLine.length > maxLength && currentLine) {
      lines.push(currentLine);
      currentLine = word;
      return;
    }

    currentLine = nextLine;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.length ? lines.slice(0, 3) : ['还没有填写'];
}

function renderPosterSection(label: string, value: string, y: number) {
  const lines = splitLines(value);
  const textLines = lines
    .map(
      (line, index) =>
        `<text x="68" y="${y + 44 + index * 24}" fill="#5B4636" font-size="18" font-family="Arial, sans-serif">${escapeSvgText(line)}</text>`,
    )
    .join('');

  return `
    <text x="68" y="${y}" fill="#8FAE8B" font-size="15" font-weight="700" font-family="Arial, sans-serif">${escapeSvgText(label)}</text>
    ${textLines}
  `;
}

export function formatHistoryDate(date: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function generateCheckinPoster(checkin: Omit<CheckinHistoryRecord, 'data'> & { data: Omit<CheckinData, 'poster'> }) {
  const displayDate = formatHistoryDate(checkin.date);
  const profileName = getDisplayName(getStoredProfile());
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="960" viewBox="0 0 720 960">
      <rect width="720" height="960" rx="42" fill="#F8F4EC"/>
      <rect x="34" y="34" width="652" height="892" rx="36" fill="#FEFCF9" stroke="#E8DDCC" stroke-width="3"/>
      <circle cx="592" cy="122" r="66" fill="#E8DDCC"/>
      <circle cx="126" cy="802" r="96" fill="#DDE9D7"/>
      <text x="68" y="112" fill="#5B4636" font-size="44" font-weight="800" font-family="Arial, sans-serif">四步骤打卡</text>
      <text x="68" y="154" fill="#8B7B6F" font-size="20" font-family="Arial, sans-serif">${escapeSvgText(displayDate)}</text>
      <text x="68" y="190" fill="#8FAE8B" font-size="18" font-weight="700" font-family="Arial, sans-serif">分享人：${escapeSvgText(profileName)}</text>
      ${renderPosterSection('目标', checkin.data.goal, 244)}
      ${renderPosterSection('计划A', checkin.data.planA, 390)}
      ${renderPosterSection('计划B', checkin.data.planB, 536)}
      ${renderPosterSection('庆祝', checkin.data.celebration, 682)}
      <text x="68" y="872" fill="#8FAE8B" font-size="24" font-weight="800" font-family="Arial, sans-serif">今天又种下一颗种子。</text>
      <text x="68" y="904" fill="#8B7B6F" font-size="17" font-family="Arial, sans-serif">微小的善意，会成为未来的果实。</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function readStoredHistory() {
  if (typeof window === 'undefined') {
    return [] as HistoryRecord[];
  }

  try {
    const savedHistory = window.localStorage.getItem(HISTORY_KEY);
    return savedHistory ? (JSON.parse(savedHistory) as HistoryRecord[]) : migrateOldCheckins();
  } catch {
    return [];
  }
}

function migrateOldCheckins() {
  const savedOldHistory = window.localStorage.getItem(OLD_CHECKIN_HISTORY_KEY);

  if (!savedOldHistory) {
    return [] as HistoryRecord[];
  }

  try {
    const oldCheckins = JSON.parse(savedOldHistory) as OldCheckin[];
    const migratedHistory: CheckinHistoryRecord[] = oldCheckins.map((checkin) => ({
      id: checkin.id,
      type: 'checkin',
      date: checkin.date,
      createdAt: checkin.date,
      data: {
        goal: checkin.goal,
        planA: checkin.planA,
        planB: checkin.planB,
        celebration: checkin.celebration,
        poster: checkin.poster,
      },
    }));

    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(migratedHistory));
    return migratedHistory;
  } catch {
    return [];
  }
}

export function getHistory() {
  return readStoredHistory().sort(
    (firstRecord, secondRecord) =>
      new Date(secondRecord.createdAt).getTime() - new Date(firstRecord.createdAt).getTime(),
  );
}

export function saveHistoryRecord<TData>(type: HistoryRecordType, data: TData) {
  const createdAt = new Date().toISOString();
  const record: HistoryRecord<TData> = {
    id: `${Date.now()}`,
    type,
    date: createdAt,
    createdAt,
    data,
  };
  const history = [record, ...getHistory()];

  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

  return record;
}

export function saveCompletedCheckin(
  checkinInput: Pick<CheckinData, 'goal' | 'planA' | 'planB' | 'celebration'>,
) {
  const createdAt = new Date().toISOString();
  const recordWithoutPoster = {
    id: `${Date.now()}`,
    type: 'checkin' as const,
    date: createdAt,
    createdAt,
    data: checkinInput,
  };
  const record: CheckinHistoryRecord = {
    ...recordWithoutPoster,
    data: {
      ...checkinInput,
      poster: generateCheckinPoster(recordWithoutPoster),
    },
  };
  const history = [record, ...getHistory()];

  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  window.localStorage.setItem(LATEST_CHECKIN_KEY, record.id);

  return record;
}

export function saveGratitudeJournal(items: string[]) {
  return saveHistoryRecord<GratitudeData>('gratitude', { items }) as GratitudeHistoryRecord;
}

export function saveThreeTimeBookEntry(period: ThreeTimePeriod, entry: Omit<ThreeTimeBookEntry, 'completedAt'>) {
  const history = getHistory();
  const dateKey = getLocalDateKey();
  const existingRecord = history.find(
    (record): record is ThreeTimeBookHistoryRecord =>
      record.type === 'three-time-book' && getLocalDateKey(new Date(record.date)) === dateKey,
  );
  const completedAt = new Date().toISOString();
  const data: ThreeTimeBookData = {
    ...(existingRecord?.data ?? {}),
    [period]: {
      ...entry,
      completedAt,
    },
  };
  const record: ThreeTimeBookHistoryRecord = existingRecord
    ? {
        ...existingRecord,
        createdAt: completedAt,
        data,
      }
    : {
        id: `${Date.now()}`,
        type: 'three-time-book',
        date: completedAt,
        createdAt: completedAt,
        data,
      };
  const nextHistory = existingRecord
    ? history.map((historyRecord) => (historyRecord.id === existingRecord.id ? record : historyRecord))
    : [record, ...history];

  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));

  return record;
}

export function getLatestCheckin() {
  const history = getHistory();

  if (typeof window === 'undefined') {
    return history.find((record): record is CheckinHistoryRecord => record.type === 'checkin');
  }

  const latestId = window.localStorage.getItem(LATEST_CHECKIN_KEY);
  return (
    history.find((record): record is CheckinHistoryRecord => record.type === 'checkin' && record.id === latestId) ??
    history.find((record): record is CheckinHistoryRecord => record.type === 'checkin')
  );
}

export function countHistoryRecords(type: HistoryRecordType) {
  return getHistory().filter((record) => record.type === type).length;
}

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
}
