// Tailwind v3 config for a Lovable / shadcn project using the Media Workspace preset.
// Keep your project's own plugins; the preset only adds theme values.
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import mwPreset from '@rdthunderthailand/mw-theme/tailwind/preset';

export default {
  darkMode: ['class'],
  presets: [mwPreset],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { container: { center: true, padding: '1rem' } },
  plugins: [animate],
} satisfies Config;
