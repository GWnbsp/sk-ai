import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 基础色彩系统
        background: "hsl(220 13% 9%)",
        foreground: "hsl(220 9% 95%)",
        
        // 卡片和表面
        card: "hsl(220 13% 11%)",
        "card-foreground": "hsl(220 9% 95%)",
        
        // 主要色彩
        primary: {
          DEFAULT: "hsl(262 83% 58%)",
          foreground: "hsl(220 9% 95%)",
          50: "hsl(262 100% 97%)",
          100: "hsl(262 100% 94%)",
          500: "hsl(262 83% 58%)",
          600: "hsl(262 83% 48%)",
          700: "hsl(262 83% 38%)",
          900: "hsl(262 83% 18%)",
        },
        
        // 次要色彩
        secondary: {
          DEFAULT: "hsl(220 13% 15%)",
          foreground: "hsl(220 9% 95%)",
        },
        
        // 静音色彩
        muted: {
          DEFAULT: "hsl(220 13% 15%)",
          foreground: "hsl(220 9% 65%)",
        },
        
        // 强调色彩
        accent: {
          DEFAULT: "hsl(220 13% 15%)",
          foreground: "hsl(220 9% 95%)",
        },
        
        // 边框和输入
        border: "hsl(220 13% 20%)",
        input: "hsl(220 13% 20%)",
        ring: "hsl(262 83% 58%)",
        
        // 状态色彩
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(220 9% 95%)",
        },
        
        // AI智能体专用色彩
        agent: {
          thinking: "hsl(45 93% 58%)",
          processing: "hsl(262 83% 58%)",
          success: "hsl(142 76% 36%)",
          error: "hsl(0 84% 60%)",
          tool: "hsl(200 98% 39%)",
        },
        
        // 工具状态色彩
        tool: {
          idle: "hsl(220 9% 46%)",
          running: "hsl(45 93% 58%)",
          success: "hsl(142 76% 36%)",
          error: "hsl(0 84% 60%)",
        }
      },
      
      // 动画
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "thinking": "thinking 2s ease-in-out infinite",
        "tool-pulse": "toolPulse 1.5s ease-in-out infinite",
        "gradient-shift": "gradientShift 3s ease-in-out infinite",
      },
      
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        thinking: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        toolPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      
      // 字体
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
        mono: ["Consolas", "monospace"],
      },
      
      // 阴影
      boxShadow: {
        "agent": "0 4px 20px -2px rgba(139, 92, 246, 0.1)",
        "tool": "0 2px 10px -1px rgba(14, 165, 233, 0.2)",
        "glow": "0 0 20px rgba(139, 92, 246, 0.3)",
      },
      
      // 背景渐变
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "agent-gradient": "linear-gradient(135deg, hsl(262 83% 48%), hsl(262 83% 38%))",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 