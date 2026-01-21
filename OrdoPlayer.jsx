import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Shield, Zap, Flame, Infinity, ChevronRight, ChevronLeft, 
  Power, Headphones, Coffee, Code, Binary, Ghost, Terminal, Activity
} from 'lucide-react';

/**
 * ════════════════════════════════════════════════════════════════════════════
 * ORDO RUBIM: DEVELOPER'S FLOW (CYBER-HUB V3)
 * 15 MODULES — 15 NEURO-STATES
 * ════════════════════════════════════════════════════════════════════════════
 */

const ALBUM_DATA = [
  { id: 0, module: "MODULE 00", title: "INITIATION", psychotype: "Seeker", genre: "Deep Focus Ambient", color: "text-gray-500", bg: "bg-gray-950", audio: "/audio/Red Meat.mp3", cover: "/img/0.jpg" },
  { id: 1, module: "MODULE 01", title: "THE SPARK", psychotype: "Pyrokine", genre: "Melodic Techno", color: "text-blue-400", bg: "bg-blue-950", audio: "/audio/The Spark.mp3", cover: "/img/1.jpg" },
  { id: 2, module: "MODULE 02", title: "HIDDEN LOGIC", psychotype: "Data Shaman", genre: "Psybient", color: "text-indigo-500", bg: "bg-indigo-950", audio: "/audio/Hidden Logic.mp3", cover: "/img/2.jpg" },
  { id: 3, module: "MODULE 03", title: "CREATIVITY", psychotype: "Aesthete", genre: "Lo-Fi Hip Hop", color: "text-pink-400", bg: "bg-pink-950", audio: "/audio/Creativity.mp3", cover: "/img/3.jpg" },
  { id: 4, module: "MODULE 04", title: "STRUCTURE", psychotype: "Hardcore Engineer", genre: "Industrial Metal", color: "text-red-600", bg: "bg-red-950", audio: "/audio/StructureStructure.mp3", cover: "/img/4.jpg" },
  { id: 5, module: "MODULE 05", title: "ORDER", psychotype: "Corporate Arch", genre: "Synthwave", color: "text-cyan-500", bg: "bg-cyan-950", audio: "/audio/Order.mp3", cover: "/img/5.jpg" },
  { id: 6, module: "MODULE 06", title: "ECOSYSTEM", psychotype: "Visualist", genre: "Future Bass", color: "text-purple-400", bg: "bg-purple-950", audio: "/audio/Velocity.mp3", cover: "/img/6.jpg" },
  { id: 7, module: "MODULE 07", title: "VELOCITY", psychotype: "Rustacean", genre: "Liquid DnB", color: "text-orange-500", bg: "bg-orange-950", audio: "/audio/Velocity.mp3", cover: "/img/7.jpg" },
  { id: 8, module: "MODULE 08", title: "ENDURANCE", psychotype: "Worker", genre: "Minimal Techno", color: "text-emerald-500", bg: "bg-emerald-950", audio: "/audio/Endurance.mp3", cover: "/img/8.jpg" },
  { id: 9, module: "MODULE 09", title: "ISOLATION", psychotype: "IDM Guru", genre: "IDM / Glitch", color: "text-slate-400", bg: "bg-slate-900", audio: "/audio/Isolation.mp3", cover: "/img/9.jpg" },
  { id: 10, module: "MODULE 10", title: "THE LOOP", psychotype: "DevOps", genre: "Breakbeat", color: "text-yellow-600", bg: "bg-yellow-950", audio: "/audio/Loop.mp3", cover: "/img/10.jpg" },
  { id: 11, module: "MODULE 11", title: "COMPILATION", psychotype: "Swift Arch", genre: "Cinematic Hybrid", color: "text-blue-600", bg: "bg-blue-900", audio: "/audio/Compilation.mp3", cover: "/img/11.jpg" },
  { id: 12, module: "MODULE 12", title: "THE WAIT", psychotype: "Admin", genre: "Dark Ambient", color: "text-zinc-500", bg: "bg-zinc-950", audio: "/audio/Wait.mp3", cover: "/img/12.jpg" },
  { id: 13, module: "MODULE 13", title: "TRANSITION", psychotype: "Phoenix", genre: "Noise / Ethereal", color: "text-white", bg: "bg-black", audio: "/audio/Transition.mp3", cover: "/img/13.jpg" },
  { id: 14, module: "MODULE 14", title: "THE NEXUS", psychotype: "Full Stack God", genre: "Glitch-Opera", color: "text-red-500", bg: "bg-red-950", audio: "/audio/THE NEXUS.mp3", cover: "/img/14.jpg" },
];

const App = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAscended, setIsAscended] = useState(false);
  const [isInitiated, setIsInitiated] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [coverError, setCoverError] = useState(false);
  const audioRef = useRef(null);

  const track = ALBUM_DATA[currentIdx];

  useEffect(() => {
    const timer = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          setTimeout(() => setIsInitiated(true), 500);
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  const handleTrackEnd = () => {
    if (currentIdx === ALBUM_DATA.length - 1) {
      setIsAscended(true);
      setIsPlaying(false);
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentIdx, isPlaying]);

  useEffect(() => {
    setCoverError(false);
  }, [currentIdx]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const currentStage = useMemo(() => {
    if (currentIdx < 5) return "COGNITIVE_LOAD";
    if (currentIdx < 10) return "HYPER_FLOW";
    return "SYSTEM_MERGE";
  }, [currentIdx]);

  if (!isInitiated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-red-600 font-mono p-4">
        <Terminal className="w-16 h-16 mb-6 animate-pulse" />
        <h1 className="text-xl tracking-[0.4em] mb-2 uppercase text-center font-bold">Initializing Hub</h1>
        <div className="text-[10px] text-gray-500 mb-8 font-bold">ACCESSING CORE: 406976513</div>
        
        <div className="w-64 h-1 bg-gray-900 overflow-hidden relative border border-gray-800">
          <div className="h-full bg-red-600 transition-all duration-100" style={{ width: `${bootProgress}%` }}></div>
        </div>
        
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-2 text-[9px] text-gray-700 uppercase">
           <div>Sync: Linked</div>
           <div>Buffers: Ready</div>
           <div>Flow: _Enabled</div>
           <div>UI: _Clean</div>
        </div>
      </div>
    );
  }

  if (isAscended) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white animate-fade-in relative overflow-hidden font-mono">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-red-600/50 shadow-[0_0_10px_#f00]"></div>

        <div className="z-10 flex flex-col items-center text-center space-y-6 p-10 border border-gray-900 bg-black/90 backdrop-blur-md max-w-xl mx-4">
           <h1 className="text-3xl md:text-4xl font-bold tracking-[0.5em] text-red-600 mb-2">
             ARCHITECTUS
           </h1>
           <div className="w-12 h-0.5 bg-gray-700"></div>

           <div className="py-4">
             <h2 className="text-2xl md:text-3xl font-serif text-white tracking-widest mb-2" style={{ direction: 'rtl' }}>
               הָאָדָם בּוֹנֶה כְּלִי לְאֵל
             </h2>
             <p className="text-[9px] font-mono text-gray-600 tracking-[0.3em] uppercase mt-2">
               Construction of the Vessel Complete
             </p>
           </div>
           
           <p className="text-xs italic text-gray-500 font-serif max-w-sm">
             "Код завершен. Сосуд готов. Реальность синхронизирована с замыслом."
           </p>

           <div className="text-[10px] font-mono text-red-900 mt-8 border px-4 py-1 border-red-900/20 uppercase tracking-tighter">
             Full Stack Synchronization: 100%
           </div>
        </div>

        <button 
            onClick={() => { setIsAscended(false); setCurrentIdx(0); setIsPlaying(false); }}
            className="mt-12 text-[10px] text-gray-600 hover:text-red-500 tracking-[0.4em] transition-all uppercase"
        >
          [ RELOAD_SYSTEM ]
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-mono selection:bg-red-900 overflow-hidden relative">
      
      {/* Background Ambient */}
      <div className={`absolute inset-0 transition-all duration-[2000ms] opacity-10 ${track.bg}`}></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_80%)]"></div>

      {/* TOP HUD */}
      <div className="absolute top-8 w-full max-w-xl px-8 flex justify-between items-start z-20">
        <div className="space-y-1">
           <div className="flex items-center gap-2">
              <Activity size={12} className="text-red-600 animate-pulse" />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">System Status</span>
           </div>
           <div className="text-xs font-bold tracking-tight text-white border-l border-red-600 pl-3">
             {track.module} // {track.psychotype}
           </div>
        </div>
        <div className="text-right space-y-1">
           <div className="text-[10px] text-gray-500 uppercase tracking-widest">Neuro Mode</div>
           <div className="text-xs font-bold text-red-600">{currentStage}</div>
        </div>
      </div>

      {/* HUB VISUALIZER */}
      <div className="relative z-10 my-10 group transition-transform duration-700">
        <div className={`w-80 h-[460px] border border-gray-900 bg-gray-950/40 backdrop-blur-sm relative overflow-hidden transition-all duration-700 shadow-2xl ${isPlaying ? 'border-red-900/40' : 'border-gray-900'}`}>
            
            {/* Image Cover from ALBUM_DATA */}
            {!coverError && (
              <div className={`absolute inset-0 transition-all duration-1000 ${isPlaying ? 'opacity-70' : 'opacity-50'}`}>
                  <img 
                    src={track.cover} 
                    alt={track.title}
                    className="w-full h-full object-cover brightness-110 contrast-125 saturate-110"
                    onError={() => setCoverError(true)}
                  />
              </div>
            )}

            {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            {/* Card Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-between py-12 px-6">
                <div className={`text-[9px] tracking-[0.5em] font-bold uppercase opacity-50`}>{track.module}</div>
                
                <div className="relative">
                    <div className={`w-36 h-36 border border-gray-900 rounded-full flex items-center justify-center transition-all duration-[30s] linear ${isPlaying ? 'animate-spin' : ''}`}>
                        <div className={`w-24 h-24 border border-dashed border-gray-800 rounded-full`}></div>
                    </div>
                </div>

                <div className="text-center w-full">
                    <div className="text-[10px] text-gray-500 tracking-widest uppercase mb-1">{track.genre}</div>
                    <div className="text-3xl font-black tracking-tighter uppercase mb-6 leading-none tracking-[-0.05em]">{track.title}</div>
                    <div className="flex justify-center gap-3">
                       <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                       <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                       <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Scan Line */}
            {isPlaying && (
              <div className="absolute top-0 left-0 w-full h-px bg-red-600/40 animate-scan"></div>
            )}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="z-20 flex flex-col items-center space-y-10 w-full max-w-xs">
        <div className="flex items-center justify-between w-full px-4">
            <button 
              onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} 
              className="p-2 text-gray-700 hover:text-white transition-colors"
            >
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
            
            <button 
              onClick={togglePlay} 
              className={`group relative w-20 h-20 flex items-center justify-center border-2 transition-all duration-500 rounded-full ${isPlaying ? 'border-red-600 bg-red-600/5 shadow-[0_0_40px_rgba(220,38,38,0.15)]' : 'border-gray-900 hover:border-gray-700'}`}
            >
                {isPlaying ? <Zap className="text-red-600 fill-current animate-pulse" size={24} /> : <Power className="text-white" size={24} />}
            </button>

            <button 
              onClick={() => setCurrentIdx(Math.min(ALBUM_DATA.length - 1, currentIdx + 1))} 
              className="p-2 text-gray-700 hover:text-white transition-colors"
            >
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>
        </div>

        <div className="w-full space-y-3">
            <div className="flex justify-between text-[9px] text-gray-600 uppercase tracking-[0.2em] font-bold">
                <span>Signal {track.id + 1} // 15</span>
                <span className={isPlaying ? "text-red-600" : ""}>{isPlaying ? 'Active' : 'Standby'}</span>
            </div>
            <div className="h-0.5 w-full bg-gray-950 rounded-full relative overflow-hidden">
                <div 
                  className={`h-full ${track.color.replace('text', 'bg')} transition-all duration-700 shadow-[0_0_8px_currentColor] opacity-60`} 
                  style={{ width: `${((currentIdx + 1) / ALBUM_DATA.length) * 100}%` }}
                ></div>
            </div>
        </div>
      </div>

      {/* HIDDEN AUDIO */}
      <audio ref={audioRef} src={track.audio} onEnded={handleTrackEnd} />

      {/* FOOTER */}
      <div className="absolute bottom-10 flex flex-col items-center gap-1 opacity-20">
        <div className="flex gap-10 text-[8px] text-gray-500 tracking-[0.5em] font-bold uppercase">
          <span>OR_DEV_FLOW</span>
          <span>GATE_406976513</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 5s linear infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out forwards;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 20s linear infinite;
        }
      `}} />
    </div>
  );
};

export default App;