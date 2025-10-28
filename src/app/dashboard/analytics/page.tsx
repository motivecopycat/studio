import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Analytics Dashboard
        </h3>
        <p className="text-sm text-muted-foreground">
          This feature is coming soon.
        </p>
      </div>
    </div>
  );
}
