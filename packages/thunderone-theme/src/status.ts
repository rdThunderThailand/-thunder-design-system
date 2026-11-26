/**
 * ThunderOne semantic status (DS-04). Five tones, shared by every Workspace.
 * Workspace states map onto these in skills/thunderone-ui/references/workspaces/<key>.md.
 *
 *   import { statusTone, t1Status } from '@rdthunderthailand/thunderone-theme/status';
 *   const s = t1Status[statusTone('offline')];   // → danger
 *   <Badge className={s.badge}><span className={s.dot} />Offline</Badge>
 */
import { t1Tokens, type T1Tone } from './tokens.js';

export type { T1Tone };

const c = t1Tokens.color;

/** Tone → Tailwind classes (StatusBadge = soft background + strong text + 6px dot) and raw colors for charts. */
export const t1Status = {
  success: { badge: 'bg-success-soft text-success', dot: 'bg-current', color: c.success, soft: c.successSoft },
  warning: { badge: 'bg-warning-soft text-warning', dot: 'bg-current', color: c.warning, soft: c.warningSoft },
  danger: { badge: 'bg-danger-soft text-danger', dot: 'bg-current', color: c.danger, soft: c.dangerSoft },
  info: { badge: 'bg-info-soft text-info', dot: 'bg-current', color: c.info, soft: c.infoSoft },
  neutral: { badge: 'bg-muted text-muted-foreground', dot: 'bg-current', color: c.mutedForeground, soft: c.muted },
} as const satisfies Record<T1Tone, { badge: string; dot: string; color: string; soft: string }>;

/**
 * State name → tone, using the default StatusBadge map in tokens.json.
 * `extra` adds Workspace states (from the Workspace profile); it is checked first.
 * Unknown states are neutral.
 */
export function statusTone(state: string, extra?: Readonly<Record<string, T1Tone>>): T1Tone {
  const s = state.trim().toLowerCase();
  if (extra && Object.prototype.hasOwnProperty.call(extra, s)) return extra[s];
  for (const [tone, states] of Object.entries(t1Tokens.statusMap) as [T1Tone, readonly string[]][]) {
    if (states.includes(s)) return tone;
  }
  return 'neutral';
}
