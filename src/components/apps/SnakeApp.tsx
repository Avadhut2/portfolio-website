import { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };

type Point = { x: number; y: number };

export function SnakeApp() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to place food
  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Make sure food is not on snake
      // eslint-disable-next-line no-loop-func
      const isOnSnake = currentSnake.some((s) => s.x === newFood.x && s.y === newFood.y);
      if (!isOnSnake) break;
    }
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    generateFood(INITIAL_SNAKE);
    setIsPlaying(true);
    containerRef.current?.focus();
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          generateFood(newSnake);
        } else {
          newSnake.pop(); // Remove tail
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(moveSnake, 150);
    return () => clearInterval(intervalId);
  }, [direction, food, gameOver, isPlaying, generateFood]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (gameOver) return;

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (direction.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (direction.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (direction.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (direction.x !== -1) setDirection({ x: 1, y: 0 });
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
      <div className="flex justify-between w-full max-w-[300px] mb-4 text-white">
        <h2 className="font-bold text-xl flex items-center gap-2">
          🐍 <span className="text-green-400">Snake</span>
        </h2>
        <div className="text-xl font-mono bg-black/40 px-3 py-1 rounded-lg border border-white/10 shadow-inner">
          {score.toString().padStart(4, '0')}
        </div>
      </div>

      <div
        className="relative bg-black/50 border-2 border-white/10 rounded-lg shadow-2xl overflow-hidden"
        style={{
          width: 300,
          height: 300,
        }}
      >
        {/* Render Food */}
        <div
          className="absolute bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"
          style={{
            width: 300 / GRID_SIZE - 2,
            height: 300 / GRID_SIZE - 2,
            left: food.x * (300 / GRID_SIZE) + 1,
            top: food.y * (300 / GRID_SIZE) + 1,
          }}
        />

        {/* Render Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute rounded-[2px]"
            style={{
              width: 300 / GRID_SIZE,
              height: 300 / GRID_SIZE,
              left: segment.x * (300 / GRID_SIZE),
              top: segment.y * (300 / GRID_SIZE),
              background: index === 0 ? '#4ade80' : '#22c55e', // Head is lighter green
              border: '1px solid rgba(0,0,0,0.2)',
              zIndex: index === 0 ? 10 : 1,
            }}
          />
        ))}

        {/* Overlays */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white backdrop-blur-sm">
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-full font-bold transition-colors shadow-lg shadow-green-500/30 active:scale-95"
            >
              Play
            </button>
            <span className="text-xs text-gray-400 mt-4">Use WASD or Arrow Keys</span>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white backdrop-blur-md">
            <span className="text-4xl mb-2">💀</span>
            <span className="text-xl font-bold text-red-400 mb-1">Game Over!</span>
            <span className="text-sm text-gray-300 mb-6">Final Score: {score}</span>
            <button
              onClick={resetGame}
              className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-full font-bold transition-colors shadow-lg shadow-green-500/30 active:scale-95"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
