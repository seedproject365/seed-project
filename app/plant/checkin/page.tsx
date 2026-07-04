'use client';

import WizardLayout from './components/WizardLayout';
import GoalStep from './steps/Goalstep';

export default function CheckinPage() {
  return (
    <WizardLayout>
      <GoalStep />
    </WizardLayout>
  );
}