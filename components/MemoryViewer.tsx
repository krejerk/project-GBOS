
import React, { useState } from 'react';
import { MemoryNode, MemoryLayer } from '../types';
import { Shield, Eye, Lock, BrainCircuit } from 'lucide-react';

interface MemoryViewerProps {
  node: MemoryNode;
}

const LAYER_LABELS = {
  [MemoryLayer.SURFACE]: "表层 (认知)",
  [MemoryLayer.DEEP]: "深层 (真相)",
  [MemoryLayer.CORE]: "核心 (本质)"
};

export const MemoryViewer: React.FC<MemoryViewerProps> = ({ node }) => {
  const [activeLayer, setActiveLayer] = useState<MemoryLayer>(MemoryLayer.SURFACE);
  // Get active layer data for safer rendering
  const activeContent = node.layers[activeLayer];

  return (
    <div className="h-full flex flex-col p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter glitch-text text-green-500 uppercase italic">
            {node.title}
          </h2>
          <p className="text-xs text-green-900 uppercase tracking-widest mt-1">
            神经地址: 0x{node.id.toUpperCase()} // 片段状态: 已恢复
          </p>
        </div>
        <div className="flex gap-2">
          {Object.values(MemoryLayer).map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-3 py-1 text-xs border transition-all ${
                activeLayer === layer 
                  ? 'bg-green-500 text-black border-green-500' 
                  : 'text-green-900 border-green-900/30 hover:border-green-500/50'
              }`}
            >
              {LAYER_LABELS[layer]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="space-y-6">
          <div className="bg-green-950/10 border border-green-900/30 p-6 rounded-lg relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 text-green-900/20 group-hover:text-green-500/20 transition-colors">
              <BrainCircuit size={48} />
            </div>
            
            <div className="flex items-center gap-2 text-green-500 mb-4 font-bold text-sm uppercase tracking-widest">
              {activeLayer === MemoryLayer.SURFACE && <Eye size={16} />}
              {activeLayer === MemoryLayer.DEEP && <Shield size={16} />}
              {activeLayer === MemoryLayer.CORE && <Lock size={16} />}
              {LAYER_LABELS[activeLayer]} 数据流
            </div>

            <p className="text-lg leading-relaxed text-gray-300 first-letter:text-4xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
              {/* Fix: Access .event instead of rendering the whole object */}
              {activeContent?.event || "该层数据已损坏或需要进一步交叉比对。"}
            </p>
            
            {activeLayer === MemoryLayer.CORE && !node.layers[MemoryLayer.CORE] && (
              <div className="mt-8 flex items-center justify-center border-2 border-dashed border-red-900/30 p-12 text-red-900 rounded italic">
                [ 访问拒绝：检测到创伤屏障 ]
              </div>
            )}
          </div>

          <div className="p-4 border border-green-900/30 rounded flex items-center gap-4 bg-black/40">
            <div className="w-12 h-12 rounded bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
              <BrainCircuit size={24} />
            </div>
            <div>
              <div className="text-xs text-green-900 uppercase">认知关联性</div>
              <div className="flex gap-2 mt-1">
                {node.connectedTo.map(id => (
                  <span key={id} className="text-[10px] px-2 py-0.5 bg-green-900/20 text-green-500 border border-green-900/40 rounded uppercase">
                    索引: {id}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-full">
           <div className="relative aspect-video rounded-lg overflow-hidden border border-green-900/30 bg-black group">
             {/* Fix: Access visual from the layer content instead of node root */}
             {activeContent?.visual ? (
               <>
                 <img 
                   src={activeContent.visual} 
                   alt="潜意识一瞥" 
                   className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                 <div className="absolute bottom-4 left-4 right-4">
                   <div className="text-[10px] text-green-500 uppercase tracking-widest mb-1 opacity-50">视觉残留重构</div>
                   <div className="text-xs text-gray-400 italic font-serif">“……闻起来有雨水和铜的味道。灯光每秒正好闪烁3次。”</div>
                 </div>
               </>
             ) : (
               <div className="w-full h-full flex flex-col items-center justify-center text-green-900 space-y-4">
                 <Lock size={48} className="opacity-20" />
                 <div className="text-xs uppercase tracking-widest animate-pulse">正在扫描视觉基质……</div>
               </div>
             )}
           </div>
           
           <div className="mt-6 flex-1 bg-green-900/5 rounded-lg border border-green-900/20 p-4">
              <div className="text-[10px] text-green-900 uppercase font-bold mb-4 tracking-widest border-b border-green-900/30 pb-1">
                现实档案同步 (Field Evidence)
              </div>
              <ul className="space-y-3">
                <li className="text-xs text-gray-500 flex gap-2">
                  <span className="text-green-500">[新闻]</span>
                  <span>FBI 报告称凤凰城地区犯罪率飙升。消息人士称“辛迪加”已重启。</span>
                </li>
                <li className="text-xs text-gray-500 flex gap-2">
                  <span className="text-amber-500">[情报]</span>
                  <span>在亚利桑那州荒漠检测到生物武器特征。代码：GBOS 已确认。</span>
                </li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
};
