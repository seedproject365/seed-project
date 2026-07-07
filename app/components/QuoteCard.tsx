'use client';

import { useEffect, useState } from 'react';
import { quotes } from '@/lib/quotes';

export function QuoteCard() {
  const [quote, setQuote] = useState(quotes[0]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Get previous quote ID from localStorage
    const previousQuoteId = localStorage.getItem('previousQuoteId');
    const previousId = previousQuoteId ? parseInt(previousQuoteId) : null;

    // Get random quote that's different from previous
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    let attempts = 0;

    while (randomQuote.id === previousId && attempts < 5) {
      randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      attempts++;
    }

    // Save current quote ID for next time
    localStorage.setItem('previousQuoteId', randomQuote.id.toString());

    // Set quote and trigger fade-in
    setQuote(randomQuote);
    setTimeout(() => setIsLoaded(true), 0);
  }, []);

  return (
    <div
      className={`bg-[#f3f9d1] rounded-[28px] p-3 sm:p-5 shadow-md text-center transition-opacity duration-500 ease-in ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex justify-center mb-3">
        <span className="text-3xl">🌱</span>
      </div>

      <p className="text-[#5B4636] text-sm sm:text-base leading-relaxed mb-4 font-medium">
        {quote.english}
      </p>

      <div className="border-t border-[#D4C4B0] pt-1">
        <p className="text-[#8FAE8B] text-xs sm:text-sm leading-relaxed noto-sans-sc">
          {quote.chinese}
        </p>
      </div>
    </div>
  );
}
