'use client';

import { useEffect, useState } from 'react';

import WizardLayout from '../components/WizardLayout';
import type { CheckinHistoryRecord } from '../../lib/history';
import { countHistoryRecords, getLatestCheckin } from '../../lib/history';
import CompleteStep from '../steps/CompleteStep';

export default function CheckinCompletePage() {
  const [completedCount, setCompletedCount] = useState(0);
  const [latestCheckin, setLatestCheckin] = useState<CheckinHistoryRecord>();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCompletedCount(countHistoryRecords('checkin'));
      setLatestCheckin(getLatestCheckin());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <WizardLayout>
      <CompleteStep checkin={latestCheckin} completedCount={completedCount} />
    </WizardLayout>
  );
}
