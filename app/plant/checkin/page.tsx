'use client';

import { useState } from 'react';

import WizardLayout from './components/WizardLayout';

import GoalStep from './steps/Goalstep';
import PlanAStep from './steps/PlanAStep';
import PlanBStep from './steps/PlanBStep';
import CelebrateStep from './steps/CelebrateStep';
import CompleteStep from './steps/CompleteStep';

export default function CheckinPage() {
  const [step, setStep] = useState(1);

  return (
    <WizardLayout>
      {step === 1 && <GoalStep onNext={() => setStep(2)} />}

      {step === 2 && (
        <PlanAStep
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <PlanBStep
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <CelebrateStep
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        />
      )}

      {step === 5 && <CompleteStep />}
    </WizardLayout>
  );
}