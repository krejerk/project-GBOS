
import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronRight, Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  onSearch: (query: string) => void;
  history: Array<{ type: string; content: string; timestamp: number }>;
  isProcessing: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({ onSearch, history, isProcessing }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/40 border-l border-green-900/30 font-mono">
      <div className="p-3 border-b border-green-900/30 flex items-center gap-2 text-xs font-bold tracking-widest text-green-500 uppercase">
        <TerminalIcon size={14} />
        认知终端 (Cognitive Terminal) v0.92
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 text-sm scroll-smooth"
      >
        {history.map((item, i) => (
          <div key={i} className={`animate-in fade-in slide-in-from-left-2 duration-300`}>
            {item.type === 'search' && (
              <div className="text-gray-500 flex items-start gap-2">
                <ChevronRight size={14} className="mt-1" />
                <span>搜索查询: <span className="text-blue-400">"{item.content}"</span></span>
              </div>
            )}
            {item.type === 'info' && (
              <div className="text-green-500/80 leading-relaxed border-l-2 border-green-900/50 pl-2 whitespace-pre-wrap">
                {item.content}
              </div>
            )}
            {item.type === 'unlock' && (
              <div className="text-amber-400 font-bold bg-amber-950/20 p-2 rounded border border-amber-900/30">
                [!] 核心记忆节点已激活: {item.content}
              </div>
            )}
          </div>
        ))}
        {isProcessing && (
          <div className="flex items-center gap-2 text-blue-400 animate-pulse">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            正在解码神经数据...
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-black/60 border-t border-green-900/30">
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-green-900" size={18} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            placeholder="输入关键词以探测记忆..."
            className="w-full bg-transparent border border-green-900/50 rounded py-2 pl-10 pr-4 text-green-400 placeholder-green-900 focus:outline-none focus:border-green-500 transition-colors"
          />
        </div>
      </form>
    </div>
  );
};
