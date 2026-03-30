module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'nintendo-red': '#e60012',
        'nintendo-blue': '#1b7bb8',
        'accent-blue': '#3b82f6',
        'dark-bg': '#0f172a',
        'dark-card': '#1e293b',
      },
      backgroundImage: {
        'wave': 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 120%22 preserveAspectRatio=%22none%22%3E%3Cpath d=%22M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z%22 fill=%22%233b82f6%22 opacity=%220.1%22/%3E%3C/svg%3E")',
      },
    },
  },
  plugins: [],
}