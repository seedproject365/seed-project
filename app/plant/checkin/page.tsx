'use client';

import { useState } from 'react';

import WizardLayout from './components/WizardLayout';

import GoalStep from './steps/GoalStep';
import PlanAStep from './steps/PlanAStep';
import PlanBStep from './steps/PlanBStep';
import CelebrateStep from './steps/CelebrateStep';
import CompleteStep from './steps/CompleteStep';

export default function CheckinPage() {
  const [step, setStep] = useState(1);

  const [goal, setGoal] = useState('');
  const [partner, setPartner] = useState('');
  const [plan, setPlan] = useState('');
  const [reflection, setReflection] = useState('');

  return (
    <WizardLayout>

      {step === 1 && (
        <GoalStep
          goal={goal}
          setGoal={setGoal}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <PlanAStep
          partner={partner}
          setPartner={setPartner}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <PlanBStep
          plan={plan}
          setPlan={setPlan}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <CelebrateStep
          reflection={reflection}
          setReflection={setReflection}
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        />
      )}

      {step === 5 && (
        <CompleteStep
          goal={goal}
          partner={partner}
          plan={plan}
          reflection={reflection}
          onRestart={() => {
            setGoal('');
            setPartner('');
            setPlan('');
            setReflection('');
            setStep(1);
          }}
        />
      )}

    </WizardLayout>
  );
}