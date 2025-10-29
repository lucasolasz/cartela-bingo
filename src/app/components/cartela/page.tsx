"use client";

import confetti from "canvas-confetti";
import { useState, useEffect } from "react";

type BingoCard = number[][];

function generateBingoCard(): BingoCard {
  const columns = [
    Array.from({ length: 15 }, (_, i) => i + 1), // B
    Array.from({ length: 15 }, (_, i) => i + 16), // I
    Array.from({ length: 15 }, (_, i) => i + 31), // N
    Array.from({ length: 15 }, (_, i) => i + 46), // G
    Array.from({ length: 15 }, (_, i) => i + 61), // O
  ];

  return columns.map((col) => {
    const shuffled = col.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  });
}

export default function BingoPage() {
  const [card, setCard] = useState<BingoCard>(generateBingoCard());
  const [marked, setMarked] = useState<boolean[][]>(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(false))
  );
  const [bingo, setBingo] = useState(false);

  const handleClick = (row: number, col: number) => {
    if (row === 2 && col === 2) return; // skip FREE
    setMarked((prev) => {
      const copy = prev.map((r) => [...r]);
      copy[row][col] = !copy[row][col];
      return copy;
    });
  };

  const regenerate = () => {
    setCard(generateBingoCard());
    setMarked(
      Array(5)
        .fill(null)
        .map(() => Array(5).fill(false))
    );
    setBingo(false);
  };

  // Check if all cells are marked (excluding FREE)
  useEffect(() => {
    const allMarked = marked.every((row, rIdx) =>
      row.every((m, cIdx) => (rIdx === 2 && cIdx === 2) || m)
    );
    if (allMarked && !bingo) {
      setBingo(true);
      launchConfetti();
    }
  }, [marked]);

  const launchConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const headers = ["B", "I", "N", "G", "O"];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-green-100 p-4 overflow-hidden">
      <h1 className="text-4xl font-bold mb-4 text-green-800">🎱 Bingo Card</h1>

      <div className="grid grid-cols-5 gap-2 bg-white p-4 rounded-2xl shadow-lg">
        {headers.map((h) => (
          <div
            key={h}
            className="text-2xl font-bold text-center text-green-700"
          >
            {h}
          </div>
        ))}

        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 5 }).map((_, col) => {
            const isFree = row === 2 && col === 2;
            const number = isFree ? "FREE" : card[col][row];
            const isMarked = isFree || marked[row][col];

            return (
              <div
                key={`${row}-${col}`}
                onClick={() => handleClick(row, col)}
                className={`text-black w-16 h-16 flex items-center justify-center text-lg font-semibold rounded-lg border cursor-pointer select-none transition-all duration-200
                  ${
                    isMarked
                      ? "bg-green-500 text-white scale-95"
                      : "bg-gray-100 hover:bg-green-200"
                  }
                `}
              >
                {number}
              </div>
            );
          })
        )}
      </div>

      <button
        onClick={regenerate}
        className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full text-lg font-medium shadow transition-transform active:scale-95"
      >
        🔄 New Card
      </button>

      {bingo && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
          <h2 className="text-6xl font-extrabold text-yellow-300 animate-bounce drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]">
            🎉 BINGO! 🎉
          </h2>
          <button
            onClick={() => setBingo(false)}
            className="absolute right-4 top-4 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full shadow transition-transform active:scale-95"
          >
            ✖ Close
          </button>
        </div>
      )}
    </div>
  );
}
