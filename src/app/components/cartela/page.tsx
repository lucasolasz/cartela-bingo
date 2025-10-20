"use client";

import { useState } from "react";

type BingoCard = number[][];

function generateBingoCard(): BingoCard {
  const columns = [
    Array.from({ length: 15 }, (_, i) => i + 1), // B
    Array.from({ length: 15 }, (_, i) => i + 16), // I
    Array.from({ length: 15 }, (_, i) => i + 31), // N
    Array.from({ length: 15 }, (_, i) => i + 46), // G
    Array.from({ length: 15 }, (_, i) => i + 61), // O
  ];

  return columns.map((col, colIndex) => {
    const shuffled = col.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  });
}

export default function Cartela() {
  const [card, setCard] = useState<BingoCard>(generateBingoCard());
  const [marked, setMarked] = useState<boolean[][]>(
    Array(5)
      .fill(null)
      .map(() => Array(5).fill(false))
  );

  const handleClick = (row: number, col: number) => {
    // “FREE” do centro
    if (row === 2 && col === 2) return;
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
  };

  const headers = ["B", "I", "N", "G", "O"];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-4">
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
                className={`text-black w-16 h-16 flex items-center justify-center text-lg font-semibold rounded-lg border cursor-pointer select-none
                  ${
                    isMarked
                      ? "bg-green-500 text-white"
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
        className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full text-lg font-medium shadow"
      >
        🔄 New Card
      </button>
    </div>
  );
}
