module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'nintendo-red': '#e60012',
        'nintendo-blue': '#1b7bb8',
        'accent-blue': '#3b82f6',
        'accent-magenta': '#d946ef',
        'accent-orange': '#f97316',
        'accent-cyan': '#06b6d4',
        'dark-bg': '#1a1a1a',
        'dark-card': '#2a2a2a',
        'warm-gray': '#e8dcc8',
        'warm-beige': '#f5f1eb',
        'neutral-light': '#e5e5e5',
      },
      backgroundImage: {
        'wave': 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 120%22 preserveAspectRatio=%22none%22%3E%3Cpath d=%22M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z%22 fill=%22%233b82f6%22 opacity=%220.1%22/%3E%3C/svg%3E")',
        'gradient-insider': 'linear-gradient(135deg, rgba(233, 213, 255, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
      },
    },
  },
  plugins: [],
}