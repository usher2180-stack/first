/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import CollaborationForm from "./components/CollaborationForm";
import DisqusComments from "./components/DisqusComments";
import { motion, AnimatePresence } from "motion/react";
import { Palette, Layers, Minimize2 } from "lucide-react";

type Theme = "minimal" | "professional" | "neo";

export default function App() {
  const [theme, setTheme] = useState<Theme>("minimal");

  const getPageStyles = () => {
    switch (theme) {
      case "professional":
        return "bg-slate-50 text-slate-800";
      case "neo":
        return "bg-indigo-50/30 text-slate-900";
      default:
        return "bg-white text-slate-900";
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${getPageStyles()}`}>
      <nav className={`sticky top-0 z-50 backdrop-blur-md h-16 border-b transition-all duration-500 ${
        theme === 'professional' ? 'bg-indigo-950 text-white border-indigo-900' : 
        theme === 'neo' ? 'bg-white/80 border-slate-900/10' : 
        'bg-white/80 border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 flex items-center justify-center transition-all ${
              theme === 'professional' ? 'bg-indigo-500 rotate-12 rounded-lg' : 
              theme === 'neo' ? 'bg-yellow-400 border-2 border-slate-900 rounded-none' : 
              'bg-slate-900 rounded-2xl'
            }`}>
              <div className="w-3 h-3 bg-white rounded-xs" />
            </div>
            <span className={`text-xl font-black tracking-tight ${theme === 'professional' ? 'font-serif italic' : ''}`}>디에스엘 컴퍼니</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full">
            {(["minimal", "professional", "neo"] as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all ${
                  theme === t 
                    ? "bg-white text-slate-900 shadow-sm" 
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {t === 'minimal' && <Minimize2 size={14} />}
                {t === 'professional' && <Layers size={14} />}
                {t === 'neo' && <Palette size={14} />}
                <span className="hidden sm:inline">{t}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}>
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <span className={`text-xs font-black uppercase tracking-[0.3em] ${
                  theme === 'professional' ? 'text-indigo-600' : 
                  theme === 'neo' ? 'text-blue-500' : 
                  'text-slate-400'
                }`}>
                  Business Collaboration
                </span>
                <h1 className={`text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter ${
                  theme === 'professional' ? 'font-serif italic text-slate-900' : ''
                }`}>
                  우리의 가치를 <br />
                  <span className={
                    theme === 'professional' ? 'text-indigo-600' : 
                    theme === 'neo' ? 'text-blue-600' : 
                    'text-slate-500'
                  }>함께 키워나갈</span> <br />
                  파트너를 찾습니다
                </h1>
                <p className="text-xl text-slate-500 leading-relaxed max-w-lg font-medium">
                  대표 : 김 두철 <br />
                  부대표 : 임 성아 <br />
                  <span className={`inline-block mt-2 font-bold px-2 py-0.5 rounded-sm ${theme === 'neo' ? 'bg-yellow-200 text-slate-900' : 'bg-slate-100 text-slate-900'}`}>
                    책임 매니저 : 김라엘 010-0429-5959
                  </span>
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-slate-100">
              {[
                { title: "전문적인 검토", desc: "분야별 전문가가 직접 검토합니다." },
                { title: "신속한 피드백", desc: "평균 48시간 이내 회신드립니다." },
                { title: "기밀 유지", desc: "제안 내용은 보안이 유지됩니다." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    theme === 'professional' ? 'bg-indigo-100 group-hover:bg-indigo-600' : 
                    theme === 'neo' ? 'bg-blue-100 group-hover:bg-blue-500' : 
                    'bg-slate-100 group-hover:bg-slate-900'
                  }`}>
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            {theme === 'neo' && (
              <div className="absolute inset-0 bg-blue-100/50 blur-[100px] -z-10 rounded-full" />
            )}
            <motion.div
              key={theme}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <CollaborationForm theme={theme} />
            </motion.div>
          </div>
        </div>
      </main>

      <DisqusComments />

      <footer className={`mt-24 py-16 border-t transition-all duration-500 ${
        theme === 'professional' ? 'bg-slate-900 text-white border-transparent' : 
        'bg-slate-50 border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="flex items-center gap-3 grayscale opacity-70">
            <div className="w-6 h-6 bg-slate-900 rounded" />
            <span className="font-bold text-lg tracking-tight">디에스엘 컴퍼니</span>
          </div>
          <div className="text-center font-medium text-slate-400 text-sm">
            © 2026 디에스엘 컴퍼니. All rights reserved.
          </div>
          <div className="flex justify-end gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
