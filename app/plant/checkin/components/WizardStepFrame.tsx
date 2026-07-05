'use client';

import type { ReactNode } from 'react';

export const pageShellClass =
  'w-full max-w-2xl mx-auto px-5 sm:px-0';

export const cardClass =
  'w-full rounded-[30px] bg-white shadow-lg p-5 sm:p-7 overflow-hidden';

export const helperCardClass =
  'rounded-[24px] bg-[#F8F4EC] p-5 sm:p-6 shadow-sm border border-[#E8DDCC]';

export const titleClass =
  'text-3xl sm:text-4xl font-bold text-[#5B4636]';

export const descriptionClass =
  'text-[#8B7B6F]';

export const primaryButtonClass =
  'bg-[#5C4033] text-white rounded-full px-7 py-3.5 sm:px-8 sm:py-4 font-semibold hover:bg-[#4B352A] transition-all shadow-sm';

export const secondaryButtonClass =
  'border border-[#8FAE8B] text-[#5B4636] rounded-full px-7 py-3.5 sm:px-8 sm:py-4 font-semibold hover:bg-[#F8F4EC] transition-all';

export const textareaClass =
  'w-full rounded-[24px] border border-[#E8DDCC] bg-[#F8F4EC] p-5 sm:p-6 resize-none outline-none text-[#5B4636] placeholder:text-[#A79F91] focus:ring-2 focus:ring-[#8FAE8B]';

export const progressBarClass =
  'w-full h-2 bg-[#E8DDCC] rounded-full overflow-hidden shadow-sm';

export const progressFillClass =
  'h-full bg-[#8FAE8B] rounded-full transition-all duration-500 ease-out';

type WizardStepFrameProps = {
  children: ReactNode;
  stepLabel: string;
  progressPercent?: string;
  showProgress?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
  contentClassName?: string;
};

export default function WizardStepFrame({
  children,
  stepLabel,
  progressPercent,
  showProgress = true,
  title,
  description,
  className = '',
  contentClassName = '',
}: WizardStepFrameProps) {
  return (
    <div className={`${pageShellClass} pb-20`}>
      <style>{`
        @keyframes fadeInScale {
          0% {
            opacity:0;
            transform:scale(.97);
          }
          100%{
            opacity:1;
            transform:scale(1);
          }
        }

        .fade-in-scale{
          animation:fadeInScale .6s ease-out forwards;
        }
      `}</style>

      {showProgress && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-[#8FAE8B]">
              {stepLabel}
            </h3>

            <span className="text-xs text-[#8B7B6F]">
              {progressPercent}
            </span>
          </div>

          <div className={progressBarClass}>
            <div
              className={`${progressFillClass}
              ${
                progressPercent === '25%'
                  ? 'w-1/4'
                  : progressPercent === '50%'
                  ? 'w-2/4'
                  : progressPercent === '75%'
                  ? 'w-3/4'
                  : 'w-full'
              }`}
            />
          </div>
        </div>
      )}

      <div className={`fade-in-scale ${cardClass} ${className}`}>
        {title && (
          <div className="mb-5">
            <h1 className={titleClass}>{title}</h1>

            {description && (
              <p className={`${descriptionClass} mt-2 text-base sm:text-lg`}>
                {description}
              </p>
            )}
          </div>
        )}

        <div className={contentClassName}>
          {children}
        </div>
      </div>
    </div>
  );
}