
'use client';

import { cn } from "@/lib/utils";

export function CodingAnimation() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <style>
          {`
            .fade-in {
              animation: fadeIn 1s ease-in-out forwards;
            }
            .typing-cursor {
                animation: typing 1s steps(2, end) infinite, blink-caret .75s step-end infinite;
                stroke-width: 2;
                stroke-linecap: round;
            }

            .float {
                animation: float 3s ease-in-out infinite;
            }
            
            @keyframes typing {
              from { width: 0 }
              to { width: 100% }
            }

            @keyframes blink-caret {
              from, to { stroke-opacity: 1 }
              50% { stroke-opacity: 0 }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes float {
	            0% { transform: translatey(0px); }
	            50% { transform: translatey(-10px); }
	            100% { transform: translatey(0px); }
            }
          `}
        </style>
        <g className="fade-in float">
          {/* Desk */}
          <rect x="10" y="150" width="180" height="10" rx="2" className="fill-muted" />
          <rect x="20" y="160" width="10" height="30" rx="2" className="fill-muted" />
          <rect x="170" y="160" width="10" height="30" rx="2" className="fill-muted" />

          {/* Laptop */}
          <g transform="translate(65, 80)">
            <rect x="0" y="50" width="70" height="5" rx="2" className="fill-muted" />
            <path d="M 0 50 L 10 0 L 60 0 L 70 50 Z" className="fill-card stroke-border" strokeWidth="2" />
            <rect x="15" y="10" width="40" height="30" className="fill-background" />
             <path d="M20 20 H 40" stroke="hsl(var(--accent))" className="typing-cursor" />
             <path d="M20 25 H 45" stroke="hsl(var(--accent))" style={{animationDelay: '0.2s'}} className="typing-cursor" />
             <path d="M20 30 H 35" stroke="hsl(var(--accent))" style={{animationDelay: '0.4s'}} className="typing-cursor" />

          </g>

          {/* Person */}
          <g transform="translate(100, 100)">
            {/* Head */}
            <circle cx="0" cy="-35" r="15" className="fill-muted" />
             {/* Body */}
            <path d="M -15 -20 C -15 -5, 15 -5, 15 -20 L 20 50 L -20 50 Z" className="fill-card stroke-border" strokeWidth="2" />
          </g>

        </g>
      </svg>
    </div>
  );
}
