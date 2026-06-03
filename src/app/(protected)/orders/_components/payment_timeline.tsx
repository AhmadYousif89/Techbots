import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import type { PaymentTimeline } from "../_lib/types";
import { formatDatetime } from "@/lib/utils";

type PaymentTimelineCardProps = {
  timeline: PaymentTimeline | null;
  className?: string;
};

export function PaymentTimelineCard({
  timeline,
  className,
}: PaymentTimelineCardProps) {
  return (
    <Card className={className ? `p-4 ${className}` : "p-4"}>
      <CardHeader className="p-0 py-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle className="pb-2 text-lg font-semibold text-muted-foreground">
              Payment Timeline
            </CardTitle>
            <CardDescription>
              Checkout attempts, Stripe events, and the saved order projection.
            </CardDescription>
          </div>
          <Badge variant={timeline?.currentStatus.variant ?? "outline"}>
            {timeline?.currentStatus.label ?? "Unavailable"}
          </Badge>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="px-0 pb-0 pt-6">
        {timeline?.entries.length ? (
          <div className="space-y-4">
            {timeline.entries.map((entry) => (
              <div key={entry.id} className="rounded-lg border p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold">{entry.title}</h4>
                      <Badge variant={entry.variant}>
                        {entry.kind === "checkout_attempt"
                          ? "Checkout"
                          : entry.kind === "stripe_event"
                            ? "Stripe"
                            : "Projection"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {entry.description}
                    </p>
                    {entry.reference ? (
                      <p className="text-xs text-muted-foreground">
                        {entry.reference.label}: {entry.reference.value}
                      </p>
                    ) : null}
                  </div>

                  <time className="text-xs text-muted-foreground">
                    {formatDatetime(entry.occurredAt)}
                  </time>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No payment activity was recorded for this order.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
