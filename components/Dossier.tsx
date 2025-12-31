
import React from 'react';
import { X, FileText, User, Calendar } from 'lucide-react';
import { INITIAL_DOSSIER } from '../constants';

interface DossierProps {
  onClose: () => void;
}

export const Dossier: React.FC<DossierProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex flex-col shadow-2xl">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-2 text-white font-bold tracking-tight">
            <FileText size={20} className="text-red-500" />
            绝密档案: GBOS-潜航行动
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 text-zinc-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-1 space-y-4">
              <div className="aspect-square bg-zinc-800 border border-zinc-700 relative flex items-center justify-center overflow-hidden grayscale">
                <img src="https://picsum.photos/seed/agent/400" alt="Agent Photo" className="opacity-40" />
                <div className="absolute inset-0 border-[20px] border-zinc-900/50" />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-600 text-[10px] font-bold text-white uppercase tracking-tighter">
                  身份已失效 / 重点监控
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span className="text-zinc-500">目标姓名</span>
                  <span>{INITIAL_DOSSIER.agent.name}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span className="text-zinc-500">编号</span>
                  <span>{INITIAL_DOSSIER.agent.id}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1">
                  <span className="text-zinc-500">专长</span>
                  <span>深度渗透</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Calendar size={14} /> 任务时间线与情报
                </h3>
                <div className="space-y-6">
                  {INITIAL_DOSSIER.reports.map((report, idx) => (
                    <div key={idx} className="relative pl-6 border-l border-zinc-800 group">
                      <div className="absolute -left-1 top-0 w-2 h-2 rounded-full bg-zinc-800 group-hover:bg-red-500 transition-colors" />
                      <div className="text-xs text-zinc-500 mb-1">{report.date}</div>
                      <p className="text-sm leading-relaxed">{report.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-950/10 border border-red-900/20 p-6 rounded italic text-sm text-red-200/80 font-serif">
            “我们在一家酒吧发现了他，手里紧握着一份多年前就已经不再提供的菜谱。过去十年里，他在每个犯罪现场都留下了指纹。但他保留了日志，保留了汇报记录。他要么是我们失去的最伟大的英雄，要么是我们制造出的最危险的罪犯。潜入进去，找到真相。” —— 局长 范斯
          </div>
        </div>

        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex justify-end gap-4">
           <div className="text-[10px] text-zinc-600 self-center uppercase tracking-widest">
             简报结束 // Project GBOS v4.1
           </div>
        </div>
      </div>
    </div>
  );
};
