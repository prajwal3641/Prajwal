"use client";

interface Room { id: string; label: string; x: number; y: number; w: number; h: number; }
interface Line { x1: number; y1: number; x2: number; y2: number; }

const ROOMS: Room[] = [
  { id: "2-4-roof-room", label: "Roof Room", x: 4,   y: 36, w: 68, h: 28 },
  { id: "1-3-rooftop",   label: "Rooftop",   x: 86,  y: 36, w: 68, h: 28 },
  { id: "0-1-entrance",  label: "Entrance",  x: 86,  y: 88, w: 68, h: 28 },
  { id: "3-5-kitchen",   label: "Kitchen",   x: 168, y: 88, w: 60, h: 28 },
];

const LINES: Line[] = [
  { x1: 72,  y1: 50,  x2: 86,  y2: 50  },
  { x1: 120, y1: 64,  x2: 120, y2: 88  },
  { x1: 154, y1: 102, x2: 168, y2: 102 },
];

interface Props {
  activeSceneId: string;
  onNavigate: (id: string) => void;
  className?: string;
}

export function MiniMap({ activeSceneId, onNavigate, className = "" }: Props) {
  return (
    <div className={`absolute bottom-6 right-4 bg-black/60 backdrop-blur-sm border border-stone-700/70 rounded-xl p-2 ${className}`}>
      <p className="text-[8px] text-stone-500 tracking-[0.2em] uppercase text-center mb-1">Floor Plan</p>
      <svg width="232" height="124" viewBox="0 0 232 124" xmlns="http://www.w3.org/2000/svg">
        {LINES.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#44403c" strokeWidth="1.5" strokeDasharray="3 2.5" />
        ))}
        {ROOMS.map((room) => {
          const active = room.id === activeSceneId;
          return (
            <g key={room.id} onClick={() => onNavigate(room.id)} style={{ cursor: "pointer" }}>
              <rect x={room.x} y={room.y} width={room.w} height={room.h} rx="5"
                fill={active ? "rgba(251,191,36,0.16)" : "rgba(28,25,23,0.75)"}
                stroke={active ? "#fbbf24" : "#57534e"}
                strokeWidth={active ? 1.5 : 1}
              />
              {active && <circle cx={room.x + room.w / 2} cy={room.y + room.h / 2 - 5} r="2.5" fill="#fbbf24" />}
              <text x={room.x + room.w / 2} y={active ? room.y + room.h / 2 + 8 : room.y + room.h / 2 + 4}
                textAnchor="middle" fontSize="8.5" fontFamily="system-ui,sans-serif"
                fontWeight={active ? "600" : "400"} fill={active ? "#fbbf24" : "#78716c"}
              >
                {room.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
