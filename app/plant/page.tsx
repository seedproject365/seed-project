'use client';

import Link from 'next/link';
import { QuoteCard } from '@/app/components/QuoteCard';

export default function PlantPage() {
  return (
    <>
      <style>{`
        @keyframes sway {
          0%, 100% { transform: translateX(-4px) translateY(0); }
          50% { transform: translateX(4px) translateY(-2px); }
        }
        
        @keyframes bookOpen {
          0%, 100% { transform: perspective(100px) rotateY(0deg); }
          50% { transform: perspective(100px) rotateY(12deg); }
        }
        
        @keyframes leafSway {
          0%, 100% { transform: rotateZ(-2deg); }
          50% { transform: rotateZ(2deg); }
        }
        
        @keyframes leafFloat {
          0%, 100% { transform: translateY(0px) rotateZ(-15deg); }
          50% { transform: translateY(-8px) rotateZ(-15deg); }
        }
        
        @keyframes heartBreathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        
        .animate-sway {
          animation: sway 3s ease-in-out infinite;
        }
        
        .animate-leaf-sway {
          animation: leafSway 2.5s ease-in-out infinite;
        }
        
        .animate-leaf-float {
          animation: leafFloat 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .animate-heart-breathe {
          animation: heartBreathe 2s ease-in-out infinite;
        }
        
        .card-wrapper {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-wrapper:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(91, 70, 54, 0.12);
        }
        
        .card-wrapper:hover .book-icon {
          animation: bookOpen 1.2s ease-in-out infinite;
        }
      `}</style>

      <main className="min-h-screen bg-[#F8F4EC] flex flex-col pb-24">
        {/* Cards List */}
        <div className="flex-1 px-4 sm:px-6 pt-4 sm:pt-6">
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
            {/* Card 1: Today's Seed */}
            <Link href="/plant/checkin">
              <div className="card-wrapper bg-[#E8DDCC] rounded-[24px] px-5 sm:px-6 py-4 h-24 sm:h-28 shadow-sm flex items-center">
                <div className="text-2xl sm:text-3xl mr-4 flex-shrink-0 animate-sway">🌱</div>
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <h2 className="text-base font-semibold text-[#5B4636]">
                    Today's Seed
                  </h2>
                  <p className="text-xs text-[#8B7B6F] leading-relaxed">
                    打卡四步骤
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 2: My Records */}
            <Link href="/plant/history">
              <div className="card-wrapper bg-[#E8DDCC] rounded-[24px] px-5 sm:px-6 py-4 h-24 sm:h-28 shadow-sm flex items-center">
                <div className="text-2xl sm:text-3xl mr-4 flex-shrink-0 book-icon">📖</div>
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <h2 className="text-base font-semibold text-[#5B4636]">
                    My Records
                  </h2>
                  <p className="text-xs text-[#8B7B6F] leading-relaxed">
                    View previous check-ins
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 3: Three Times Book */}
            <Link href="/garden">
              <div className="card-wrapper bg-[#E8DDCC] rounded-[24px] px-5 sm:px-6 py-4 h-24 sm:h-28 shadow-sm flex items-center">
                <div className="text-2xl sm:text-3xl mr-4 flex-shrink-0 flex items-center">
                  <span className="animate-leaf-sway">🌳</span>
                </div>
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <h2 className="text-base font-semibold text-[#5B4636]">
                    Three Times Book
                  </h2>
                  <p className="text-xs text-[#8B7B6F] leading-relaxed">
                    打卡三时书
                  </p>
                </div>
              </div>
            </Link>

            {/* Card 4: Gratitude */}
            <Link href="/reflection">
              <div className="card-wrapper bg-[#E8DDCC] rounded-[24px] px-5 sm:px-6 py-4 h-24 sm:h-28 shadow-sm flex items-center">
                <div className="text-2xl sm:text-3xl mr-4 flex-shrink-0 animate-heart-breathe">❤️</div>
                <div className="flex-1 flex flex-col justify-center min-w-0">
                  <h2 className="text-base font-semibold text-[#5B4636]">
                    Gratitude
                  </h2>
                  <p className="text-xs text-[#8B7B6F] leading-relaxed">
                    写下今天的感恩
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Quote Section */}
        <div className="px-4 sm:px-6 py-6 sm:py-8 max-w-2xl mx-auto w-full">
          <QuoteCard />
        </div>
      </main>
    </>
  );
}