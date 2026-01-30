import React, { useState, useRef, useEffect } from "react";
import { PERSONAL_INFO, SKILLS, EXPERIENCE, PROJECTS } from "../constants";
import { Terminal as TerminalIcon } from "lucide-react";

interface CommandHistory {
  type: "command" | "output";
  content: React.ReactNode;
}

// Matrix Rain Effect Component
const MatrixRain: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const nums = "0123456789";
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = Array.from({ length: Math.ceil(columns) }).fill(
      1,
    ) as number[];

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Much softer green/slate color
      ctx.fillStyle = "#4ade80"; // Green 400
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(
          Math.floor(Math.random() * alphabet.length),
        );
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black cursor-pointer"
      onClick={onExit}
    >
      <canvas ref={canvasRef} className="block" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 border border-zinc-700 p-6 rounded-xl text-center backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-green-400 mb-2 tracking-widest uppercase glitch-text">
          System Hacked
        </h1>
        <p className="text-zinc-400 font-mono text-sm blinking-cursor">
          Press any key or click to return...
        </p>
      </div>
    </div>
  );
};

// External Link Loader Component
interface ExternalLinkLoaderProps {
  platform: string;
  url: string;
  colorClass: string;
  onSuccess?: () => void;
}

const ExternalLinkLoader: React.FC<ExternalLinkLoaderProps> = ({
  platform,
  url,
  colorClass,
  onSuccess,
}) => {
  const [stage, setStage] = useState<"loading" | "success" | "done">("loading");

  useEffect(() => {
    // 1. Loading Phase is automatic via CSS animation on mount (1.2s duration)

    // 2. Success Phase (Text turns green, 'glitch' effect)
    const t1 = setTimeout(() => {
      setStage("success");
      if (onSuccess) onSuccess();
    }, 1200);

    // 3. Open Phase
    const t2 = setTimeout(() => {
      window.open(url, "_blank");
      setStage("done");
    }, 1800); // 600ms after success to let the user see the "Access Granted" effect

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className={`space-y-2 font-mono ${stage === "done" ? "opacity-50" : ""}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-zinc-500 text-xs">Target:</span>
        <span
          className={`font-bold transition-all duration-300 ${stage === "success" ? "text-emerald-400 tracking-widest" : colorClass}`}
        >
          {platform}
        </span>
        {stage === "success" && (
          <span className="text-emerald-500 text-xs font-bold animate-pulse ml-2">
            [ SECURE ]
          </span>
        )}
      </div>

      {/* Progress Bar Container */}
      <div
        className={`w-full max-w-[240px] h-1.5 bg-zinc-800 rounded overflow-hidden border transition-colors duration-300 ${stage === "success" ? "border-emerald-500/50" : "border-zinc-700"}`}
      >
        {/* The Bar */}
        <div
          className={`h-full ${colorClass.replace("text-", "bg-")} transition-all duration-300 ${stage === "success" ? "!bg-emerald-500" : "animate-progress"}`}
          style={{
            width: stage === "success" || stage === "done" ? "100%" : undefined,
          }}
        />
      </div>

      {/* Status Log */}
      <div className="flex flex-col text-[10px] text-zinc-500 font-mono h-8 justify-end">
        {stage === "loading" && (
          <>
            <span>{">"} Resolving DNS...</span>
            <span className="animate-pulse">{">"} Handshaking...</span>
          </>
        )}
        {stage === "success" && (
          <span className="text-emerald-400 font-bold animate-pulse">
            {">"} UPLINK ESTABLISHED.
          </span>
        )}
        {stage === "done" && (
          <span className="text-zinc-600">{">"} Transfer complete.</span>
        )}
      </div>
    </div>
  );
};

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      type: "output",
      content: (
        <span className="text-zinc-400">
          Welcome. Type <span className="text-zinc-200 font-bold">help</span> to
          view commands.
        </span>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const [isErrorShake, setIsErrorShake] = useState(false);
  const [isSuccessFlash, setIsSuccessFlash] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);

  // Using a ref for the scrollable container instead of a dummy element at the bottom
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const availableCommands = [
    "help",
    "about",
    "skills",
    "experience",
    "projects",
    "contact",
    "email",
    "clear",
    "github",
    "linkedin",
    "leetcode",
    "twitter",
    "matrix",
    "sudo",
  ];

  const suggestionFlow: Record<string, string> = {
    help: "about",
    about: "skills",
    skills: "projects",
    projects: "experience",
    experience: "contact",
    contact: "email",
    email: "linkedin",
    linkedin: "github",
    github: "leetcode",
    leetcode: "twitter",
    twitter: "sudo",
    sudo: "matrix",
    matrix: "clear",
  };

  useEffect(() => {
    // Scroll to bottom logic adapted for mobile to prevent whole-page scrolling
    if (scrollContainerRef.current) {
      // Use scrollTop instead of scrollIntoView to contain the scroll within the div
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val.trim()) {
      const matches = availableCommands.filter((cmd) =>
        cmd.startsWith(val.toLowerCase()),
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const triggerShake = (error = false) => {
    if (error) {
      setIsErrorShake(true);
      setTimeout(() => setIsErrorShake(false), 400);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 300);
    }
  };

  const triggerSuccessFlash = () => {
    setIsSuccessFlash(true);
    setTimeout(() => setIsSuccessFlash(false), 300);
  };

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const isSudo = cleanCmd.startsWith("sudo");

    // Visual Feedback
    if (isSudo) {
      triggerShake(true);
    } else {
      triggerShake();
    }

    // Special Action: Matrix
    if (cleanCmd === "matrix") {
      setShowMatrix(true);
    }

    // Special Action: Clear
    if (cleanCmd === "clear") {
      setHistory([]);
      setInput("");
      setSuggestions([]);
      return;
    }

    const newHistory: CommandHistory[] = [
      ...history,
      { type: "command", content: cmd },
    ];
    let output: React.ReactNode = "";

    if (isSudo) {
      output = (
        <span className="text-red-400 font-bold bg-red-400/10 px-2 py-1 rounded">
          ACCESS DENIED. This incident will be reported.
        </span>
      );
    } else {
      switch (cleanCmd) {
        case "help":
          output = (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-zinc-300">
              {availableCommands.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
          );
          break;
        case "about":
          output = (
            <div className="space-y-2">
              <p>
                User:{" "}
                <span className="text-zinc-200 font-bold">
                  {PERSONAL_INFO.name}
                </span>
              </p>
              <p className="text-zinc-400">{PERSONAL_INFO.bio}</p>
              <p className="text-zinc-500 text-xs">
                Location: {PERSONAL_INFO.location}
              </p>
            </div>
          );
          break;
        case "skills":
          output = (
            <div className="space-y-2">
              {SKILLS.map((s) => (
                <div key={s.category}>
                  <span className="text-zinc-400 font-bold text-xs uppercase tracking-wide">
                    {s.category}:
                  </span>{" "}
                  <span className="text-zinc-300">{s.items.join(", ")}</span>
                </div>
              ))}
            </div>
          );
          break;
        case "experience":
          output = (
            <div className="space-y-4">
              {EXPERIENCE.map((exp) => (
                <div key={exp.id}>
                  <div className="text-zinc-200 font-bold">{exp.role}</div>
                  <div className="text-zinc-500 text-sm">@ {exp.company}</div>
                  <div className="text-zinc-500 text-xs">{exp.period}</div>
                </div>
              ))}
            </div>
          );
          break;
        case "projects":
          output = (
            <div className="space-y-3">
              {PROJECTS.map((p) => (
                <div key={p.id}>
                  <div className="text-zinc-200 font-bold">{p.title}</div>
                  <div className="text-xs text-zinc-500">
                    {p.tech.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          );
          break;
        case "contact":
          output = (
            <div className="space-y-1">
              <p>
                Email:{" "}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-zinc-300 hover:underline"
                >
                  {PERSONAL_INFO.email}
                </a>
              </p>
              <p>
                Phone:{" "}
                <span className="text-zinc-400">{PERSONAL_INFO.phone}</span>
              </p>
            </div>
          );
          break;
        case "email":
          output = (
            <ExternalLinkLoader
              platform="Gmail"
              url={`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}`}
              colorClass="text-red-400"
              onSuccess={triggerSuccessFlash}
            />
          );
          break;
        case "github":
          output = (
            <ExternalLinkLoader
              platform="GitHub"
              url={PERSONAL_INFO.github}
              colorClass="text-zinc-300"
              onSuccess={triggerSuccessFlash}
            />
          );
          break;
        case "linkedin":
          output = (
            <ExternalLinkLoader
              platform="LinkedIn"
              url={PERSONAL_INFO.linkedin}
              colorClass="text-blue-400"
              onSuccess={triggerSuccessFlash}
            />
          );
          break;
        case "leetcode":
          output = (
            <ExternalLinkLoader
              platform="LeetCode"
              url={PERSONAL_INFO.leetcode}
              colorClass="text-amber-400"
              onSuccess={triggerSuccessFlash}
            />
          );
          break;
        case "twitter":
          output = (
            <ExternalLinkLoader
              platform="Twitter"
              url={PERSONAL_INFO.twitter}
              colorClass="text-sky-400"
              onSuccess={triggerSuccessFlash}
            />
          );
          break;
        case "matrix":
          output = <span className="text-emerald-500">Wake up, Neo...</span>;
          break;
        case "":
          output = "";
          break;
        default:
          output = (
            <span className="text-red-400">
              Command not found: {cleanCmd}. Type "help".
            </span>
          );
      }
    }

    // Append Suggestion Logic
    const commandKey = isSudo ? "sudo" : cleanCmd;
    const nextCmd = suggestionFlow[commandKey];

    // If there is output and a next suggested command exists
    if (output && nextCmd) {
      output = (
        <div className="flex flex-col gap-2">
          <div>{output}</div>
          <div className="text-zinc-500 text-xs flex items-center gap-2 pt-2 border-t border-zinc-800 mt-1 w-full sm:w-max">
            <span className="text-zinc-500">💡 Tip:</span>
            <span>Try</span>
            <button
              onClick={() => {
                setInput(nextCmd);
                inputRef.current?.focus();
              }}
              className="text-zinc-300 hover:text-white hover:underline cursor-pointer bg-transparent border-none p-0 font-mono transition-colors"
            >
              '{nextCmd}'
            </button>
            <span>next?</span>
          </div>
        </div>
      );
    }

    if (cleanCmd !== "") {
      setHistory([...newHistory, { type: "output", content: output }]);
    } else {
      setHistory([...newHistory]);
    }
    setInput("");
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
      }
    }
  };

  return (
    <>
      {showMatrix && <MatrixRain onExit={() => setShowMatrix(false)} />}

      {/* Styles for Animations */}
      <style>{`
        @keyframes subtle-shake {
          0% { transform: translate(0, 0); }
          25% { transform: translate(0, 4px); }
          50% { transform: translate(0, -2px); }
          75% { transform: translate(0, 1px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes violent-shake {
          0% { transform: translate(1px, 1px) rotate(0deg); }
          10% { transform: translate(-3px, -2px) rotate(-1deg); }
          20% { transform: translate(-3px, 0px) rotate(1deg); }
          30% { transform: translate(3px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 2px) rotate(-1deg); }
          60% { transform: translate(-3px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-1px, -1px) rotate(1deg); }
          90% { transform: translate(1px, 2px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }
        @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        .animate-subtle-shake {
          animation: subtle-shake 0.2s ease-in-out;
        }
        .animate-error-shake {
          animation: violent-shake 0.4s ease-in-out;
          border-color: rgba(239, 68, 68, 0.5) !important;
        }
        .animate-progress {
            animation: progress 1.2s ease-in-out forwards;
        }
      `}</style>

      <div
        className={`w-full max-w-2xl mx-auto my-12 rounded-xl bg-[#0f0f11] border overflow-hidden shadow-xl font-mono text-sm transition-all duration-100 
          ${isShaking ? "animate-subtle-shake" : ""} 
          ${isErrorShake ? "animate-error-shake border-red-500/50" : "border-zinc-800"}
          ${isSuccessFlash ? "border-emerald-500 shadow-md" : ""}
      `}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#18181b] border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
            <TerminalIcon size={12} />
            <span>guest@prajwal: ~</span>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Terminal Body */}
        <div
          ref={scrollContainerRef}
          className="h-80 overflow-y-auto p-4 space-y-2 scrollbar-hide cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((entry, idx) => (
            <div key={idx} className="space-y-1">
              {entry.type === "command" && (
                <div className="flex items-center gap-2 text-zinc-500">
                  <span className="text-blue-400">➜</span>
                  <span className="text-zinc-600">~</span>
                  <span className="text-zinc-300">{entry.content}</span>
                </div>
              )}
              {entry.type === "output" && (
                <div className="ml-5 text-zinc-400 leading-relaxed">
                  {entry.content}
                </div>
              )}
            </div>
          ))}

          {/* Input Line */}
          <div className="flex items-center gap-2 text-zinc-500 relative">
            <span className="text-blue-400">➜</span>
            <span className="text-zinc-600">~</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-zinc-300 flex-1 placeholder-zinc-700"
              placeholder="try 'help'..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>

          {/* Suggestions */}
          {input.trim() && suggestions.length > 0 && (
            <div className="ml-5 mt-1 flex gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={(e) => {
                    e.stopPropagation();
                    setInput(s);
                    inputRef.current?.focus();
                  }}
                  className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs rounded hover:bg-zinc-700 hover:text-white transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Terminal;
