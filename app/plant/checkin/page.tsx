'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import WizardLayout from './components/WizardLayout';
import { saveCompletedCheckin } from '../lib/history';

import GoalStep from './steps/GoalStep';
import PlanAStep from './steps/PlanAStep';
import PlanBStep from './steps/PlanBStep';
import CelebrateStep from './steps/CelebrateStep';

export default function CheckinPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [goal, setGoal] = useState('');
  const [partner, setPartner] = useState('');
  const [plan, setPlan] = useState('');
  const [reflection, setReflection] = useState('');
  const [planProgress, setPlanProgress] = useState(0);

  const showPlanStep = () => {
    setPlanProgress(0);
    setStep(3);
  };

  const completeCheckin = () => {
    saveCompletedCheckin({
      goal,
      planA: partner,
      planB: plan,
      celebration: reflection,
    });

    router.push('/plant/checkin/complete');
  };

  useEffect(() => {
    if (step !== 3) {
      return;
    }

    const timer = setInterval(() => {
      setPlanProgress((previousProgress) => {
        if (previousProgress >= 100) {
          clearInterval(timer);
          return 100;
        }

        return previousProgress + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [step]);

  return (
    <WizardLayout>

      {step === 1 && (
        <GoalStep
          goal={goal}
          onGoalChange={setGoal}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <PlanAStep
          partner={partner}
          onPartnerChange={setPartner}
          onBack={() => setStep(1)}
          onNext={showPlanStep}
        />
      )}

      {step === 3 && (
        <PlanBStep
          plan={plan}
          progress={planProgress}
          onPlanChange={setPlan}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <CelebrateStep
          reflection={reflection}
          onReflectionChange={setReflection}
          onBack={showPlanStep}
          onNext={completeCheckin}
        />
      )}

    </WizardLayout>
  );
}
