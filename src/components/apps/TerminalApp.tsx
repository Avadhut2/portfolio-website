import { useState, useRef, useEffect } from 'react';
import { useWindowManager } from '../window/WindowManagerProvider';
import type { AppType } from '../../types';

interface HistoryLine {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string | React.ReactNode;
}

const FILE_SYSTEM: Record<string, string> = {
  'about.txt': 'Hi! I am Avadhut. I am a first-year AI/ML BTech student building cool stuff.',
  'projects.txt': 'Use the Projects app to view my work.',
  'contact.txt': 'Use the Contact app to send me a message.',
};

export function TerminalApp() {
  const { openApp } = useWindowManager();
  const [history, setHistory] = useState<HistoryLine[]>([
    {
      id: 'init-1',
      type: 'output',
      content: 'Welcome to AvadhutOS Terminal v1.0.0',
    },
    {
      id: 'init-2',
      type: 'output',
      content: 'Type "help" for a list of available commands.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isHacking, setIsHacking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input on click anywhere in terminal
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const addHistory = (type: HistoryLine['type'], content: string | React.ReactNode) => {
    setHistory((prev) => [...prev, { id: Date.now().toString() + Math.random(), type, content }]);
  };

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    addHistory('input', `guest@avadhutos:~$ ${trimmed}`);

    const args = trimmed.split(' ');
    const cmd = args[0].toLowerCase();

    switch (cmd) {
      case 'help':
        addHistory(
          'output',
          <div className="flex flex-col gap-1 mt-1">
            <span>Available commands:</span>
            <span className="text-gray-300">  help      - Show this help message</span>
            <span className="text-gray-300">  whoami    - Print current user</span>
            <span className="text-gray-300">  ls        - List directory contents</span>
            <span className="text-gray-300">  cat       - Print file contents</span>
            <span className="text-gray-300">  open      - Open an application (e.g., open projects)</span>
            <span className="text-gray-300">  clear     - Clear terminal history</span>
            <span className="text-gray-300">  neofetch  - System information</span>
          </div>
        );
        break;

      case 'whoami':
        addHistory('output', 'guest');
        break;

      case 'ls':
        addHistory(
          'output',
          <div className="flex gap-4 text-blue-400 mt-1">
            {Object.keys(FILE_SYSTEM).map((file) => (
              <span key={file}>{file}</span>
            ))}
            <span className="text-green-400">projects.app</span>
            <span className="text-green-400">about.app</span>
          </div>
        );
        break;

      case 'cat':
        if (args.length < 2) {
          addHistory('error', 'cat: missing file operand');
        } else {
          const file = args[1];
          if (FILE_SYSTEM[file]) {
            addHistory('output', FILE_SYSTEM[file]);
          } else {
            addHistory('error', `cat: ${file}: No such file or directory`);
          }
        }
        break;

      case 'open':
        if (args.length < 2) {
          addHistory('error', 'open: missing application name');
        } else {
          const appMap: Record<string, AppType> = {
            projects: 'projects',
            about: 'about',
            resume: 'resume',
            contact: 'contact',
            settings: 'settings',
            snake: 'snake',
            '2048': 'game2048',
          };
          const target = args[1].toLowerCase().replace('.app', '');
          if (appMap[target]) {
            addHistory('output', `Opening ${target}...`);
            openApp(appMap[target]);
          } else {
            addHistory('error', `open: application '${args[1]}' not found`);
          }
        }
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'neofetch':
        addHistory(
          'output',
          <div className="flex gap-4 mt-2">
            <pre className="text-blue-500 font-bold leading-tight">
{`       .::::.       
     .::::::::.     
    :::::::::::     
  ..:::::::::::..   
 .::::::::::::::::. 
 :::::::::::::::::: 
 :::::::::::::::::: 
 '::::::::::::::::' 
   '::::::::::::'   
     '::::::::'     `}
            </pre>
            <div className="flex flex-col gap-1">
              <span className="text-blue-400 font-bold">guest@avadhutos</span>
              <span>-----------</span>
              <span><strong className="text-blue-400">OS:</strong> AvadhutOS 24.04 LTS x86_64</span>
              <span><strong className="text-blue-400">Host:</strong> Web Browser</span>
              <span><strong className="text-blue-400">Uptime:</strong> {Math.floor(performance.now() / 60000)} mins</span>
              <span><strong className="text-blue-400">Packages:</strong> 42 (npm)</span>
              <span><strong className="text-blue-400">Shell:</strong> bash 5.1.16</span>
              <span><strong className="text-blue-400">DE:</strong> GNOME/React</span>
              <span><strong className="text-blue-400">CPU:</strong> AI/ML Brain v1</span>
              <span><strong className="text-blue-400">Memory:</strong> Infinite GB</span>
            </div>
          </div>
        );
        break;

      // --- Easter Eggs ---
      case 'sudo':
        if (args[1] === 'rm' && args[2] === '-rf' && args[3] === '/') {
          addHistory('error', 'Nice try, but you do not have root privileges here.');
        } else {
          addHistory('error', `guest is not in the sudoers file. This incident will be reported.`);
        }
        break;

      case 'matrix':
        addHistory('output', <span className="text-green-500">Wake up, Neo...</span>);
        setTimeout(() => addHistory('output', <span className="text-green-500">The Matrix has you...</span>), 2000);
        setTimeout(() => addHistory('output', <span className="text-green-500">Follow the white rabbit.</span>), 4000);
        break;

      case 'hack':
        setIsHacking(true);
        addHistory('output', <span className="text-green-500 animate-pulse">Bypassing mainframe security...</span>);
        setTimeout(() => addHistory('output', <span className="text-green-500">Downloading classified portfolio data... 25%</span>), 1500);
        setTimeout(() => addHistory('output', <span className="text-green-500">Downloading classified portfolio data... 78%</span>), 2500);
        setTimeout(() => addHistory('output', <span className="text-green-500">Downloading classified portfolio data... 100%</span>), 3500);
        setTimeout(() => {
          addHistory('output', <span className="text-red-500 font-bold">ACCESS DENIED. FBI HAS BEEN NOTIFIED.</span>);
          setIsHacking(false);
        }, 5000);
        break;

      case 'cowsay':
        if (args.length < 2) {
          addHistory('error', 'cowsay: missing message');
        } else {
          const msg = args.slice(1).join(' ');
          const line = '-'.repeat(msg.length + 2);
          addHistory(
            'output',
            <pre className="text-gray-300 leading-tight mt-2">
{` ${line} 
< ${msg} >
 ${line} 
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}
            </pre>
          );
        }
        break;

      default:
        addHistory('error', `bash: ${cmd}: command not found`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div
      className="w-full h-full p-4 font-mono text-sm overflow-auto"
      style={{
        background: '#1e1e1e', // VS Code-ish terminal background
        color: '#cccccc',
      }}
      onClick={handleContainerClick}
    >
      {/* History */}
      {history.map((line) => (
        <div
          key={line.id}
          className="mb-1"
          style={{
            color: line.type === 'error' ? '#f44747' : line.type === 'input' ? '#d4d4d4' : '#9cdcfe',
          }}
        >
          {line.content}
        </div>
      ))}

      {/* Input */}
      {!isHacking && (
        <div className="flex items-center gap-2 mt-1">
          <span className="text-green-500 font-bold">guest@avadhutos:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-[#d4d4d4]"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
