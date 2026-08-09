import { useState, useEffect, useCallback, useRef } from 'react';

type Board = number[][];
const SIZE = 4;

const getEmptyBoard = (): Board => Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));

const getRandomEmptyCell = (board: Board) => {
  const emptyCells: { r: number; c: number }[] = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) {
        emptyCells.push({ r, c });
      }
    }
  }
  if (emptyCells.length === 0) return null;
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

const addRandomTile = (board: Board): Board => {
  const newBoard = board.map(row => [...row]);
  const cell = getRandomEmptyCell(newBoard);
  if (cell) {
    newBoard[cell.r][cell.c] = Math.random() < 0.9 ? 2 : 4;
  }
  return newBoard;
};

// Check if game is over
const checkGameOver = (board: Board) => {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) return false;
      if (c < SIZE - 1 && board[r][c] === board[r][c + 1]) return false;
      if (r < SIZE - 1 && board[r][c] === board[r + 1][c]) return false;
    }
  }
  return true;
};

const getTileColor = (val: number) => {
  switch (val) {
    case 2: return 'bg-[#eee4da] text-[#776e65]';
    case 4: return 'bg-[#ede0c8] text-[#776e65]';
    case 8: return 'bg-[#f2b179] text-[#f9f6f2]';
    case 16: return 'bg-[#f59563] text-[#f9f6f2]';
    case 32: return 'bg-[#f67c5f] text-[#f9f6f2]';
    case 64: return 'bg-[#f65e3b] text-[#f9f6f2]';
    case 128: return 'bg-[#edcf72] text-[#f9f6f2] shadow-[0_0_10px_rgba(243,215,116,0.5)]';
    case 256: return 'bg-[#edcc61] text-[#f9f6f2] shadow-[0_0_15px_rgba(243,215,116,0.6)]';
    case 512: return 'bg-[#edc850] text-[#f9f6f2] shadow-[0_0_20px_rgba(243,215,116,0.7)]';
    case 1024: return 'bg-[#edc53f] text-[#f9f6f2] shadow-[0_0_25px_rgba(243,215,116,0.8)] text-sm';
    case 2048: return 'bg-[#edc22e] text-[#f9f6f2] shadow-[0_0_30px_rgba(243,215,116,0.9)] text-sm';
    default: return 'bg-[#cdc1b4] text-transparent'; // 0 or empty
  }
};

export function Game2048App() {
  const [board, setBoard] = useState<Board>(() => addRandomTile(addRandomTile(getEmptyBoard())));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetGame = () => {
    setBoard(addRandomTile(addRandomTile(getEmptyBoard())));
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    containerRef.current?.focus();
  };

  const slide = useCallback((row: number[]) => {
    // Remove zeros
    let filtered = row.filter(val => val !== 0);
    let newScore = 0;
    
    // Merge
    for (let i = 0; i < filtered.length - 1; i++) {
      if (filtered[i] !== 0 && filtered[i] === filtered[i + 1]) {
        filtered[i] *= 2;
        newScore += filtered[i];
        filtered[i + 1] = 0;
      }
    }
    
    // Remove zeros again
    filtered = row.filter(val => val !== 0);
    
    // Add zeros back
    while (filtered.length < SIZE) {
      filtered.push(0);
    }
    
    return { newRow: filtered, points: newScore };
  }, []);

  const move = useCallback((direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (gameOver || !isPlaying) return;

    let newBoard = board.map(row => [...row]);
    let pointsEarned = 0;
    let hasChanged = false;

    if (direction === 'LEFT' || direction === 'RIGHT') {
      for (let r = 0; r < SIZE; r++) {
        let row = newBoard[r];
        if (direction === 'RIGHT') row.reverse();
        
        const { newRow, points } = slide(row);
        pointsEarned += points;
        
        if (direction === 'RIGHT') newRow.reverse();
        
        if (newBoard[r].join(',') !== newRow.join(',')) hasChanged = true;
        newBoard[r] = newRow;
      }
    } else {
      for (let c = 0; c < SIZE; c++) {
        let col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
        if (direction === 'DOWN') col.reverse();
        
        const { newRow, points } = slide(col);
        pointsEarned += points;
        
        if (direction === 'DOWN') newRow.reverse();
        
        for (let r = 0; r < SIZE; r++) {
          if (newBoard[r][c] !== newRow[r]) hasChanged = true;
          newBoard[r][c] = newRow[r];
        }
      }
    }

    if (hasChanged) {
      newBoard = addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(s => s + pointsEarned);
      if (checkGameOver(newBoard)) {
        setGameOver(true);
        setIsPlaying(false);
      }
    }
  }, [board, gameOver, isPlaying, slide]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        move('UP');
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        move('DOWN');
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        move('LEFT');
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        move('RIGHT');
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full bg-[#1e1e2e] items-center justify-center p-4 outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => containerRef.current?.focus()}
    >
      <div className="flex justify-between items-center w-full max-w-[320px] mb-4 text-white">
        <div>
          <h2 className="font-bold text-3xl flex items-center gap-2 text-[#edc22e]">
            2048
          </h2>
          <p className="text-xs text-gray-400 mt-1">Join the numbers!</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="bg-[#bbada0] px-4 py-1.5 rounded-md flex flex-col items-center justify-center min-w-[70px]">
            <span className="text-[10px] text-[#eee4da] font-bold uppercase leading-none mb-1">Score</span>
            <span className="text-white font-bold text-lg leading-none">{score}</span>
          </div>
        </div>
      </div>

      <div
        className="relative bg-[#bbada0] p-3 rounded-lg shadow-2xl"
        style={{ width: 320, height: 320 }}
      >
        <div className="grid grid-cols-4 grid-rows-4 gap-3 w-full h-full">
          {board.map((row, r) =>
            row.map((val, c) => (
              <div
                key={`${r}-${c}`}
                className={`flex items-center justify-center rounded-md font-bold text-2xl transition-all duration-150 ${getTileColor(val)}`}
              >
                {val !== 0 ? val : ''}
              </div>
            ))
          )}
        </div>

        {/* Overlays */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-sm rounded-lg z-10">
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-[#f59563] hover:bg-[#f67c5f] text-white rounded-full font-bold transition-colors shadow-lg active:scale-95"
            >
              Start Game
            </button>
            <span className="text-xs text-gray-300 mt-4">Use WASD or Arrow Keys</span>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white backdrop-blur-md rounded-lg z-10">
            <span className="text-3xl font-bold text-white mb-2">Game Over!</span>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-[#f59563] hover:bg-[#f67c5f] text-white rounded-full font-bold transition-colors shadow-lg active:scale-95 mt-4"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
