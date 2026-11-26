/**
 * Minimal example for a shadcn/ui + Tailwind project in any ThunderOne Workspace.
 * Prerequisites: the theme CSS is imported in the main stylesheet
 *   @import "tailwindcss";
 *   @import "@rdthunderthailand/thunderone-theme/tailwind/v4.css";
 * and the shadcn components (Button, Badge, Card) exist in src/components/ui.
 * Workspace extras: '@rdthunderthailand/thunderone-theme/workspaces/<key>' (e.g. mediaStatusTone, assetNav).
 */
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { T1Icon } from '@rdthunderthailand/thunderone-theme/icons';
import { statusTone, t1Status } from '@rdthunderthailand/thunderone-theme/status';

function StatusBadge({ status }: { status: string }) {
  const s = t1Status[statusTone(status)];
  return (
    <Badge variant="outline" className={`gap-1.5 border-transparent ${s.badge}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} aria-hidden />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default function Example() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 p-6">
      <Card className="shadow-panel">
        <CardHeader>
          <CardTitle className="text-label-sm">Devices</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-display-kpi t1-num">206</p>
          <div className="flex gap-2">
            <StatusBadge status="online" />
            <StatusBadge status="pending" />
            <StatusBadge status="offline" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <T1Icon.filter className="size-4" aria-hidden />
              Filter
            </Button>
            <Button size="sm">
              <T1Icon.create className="size-4" aria-hidden />
              Create
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <T1Icon.notifications className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
