
import { TradesHeader } from "@/components/trades/TradesHeader";
import { TradesController } from "@/components/trades/TradesController";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export default function Trades() {
  return (
    <div className="container mx-auto py-8">
      <TradesHeader title="Find Tradespeople" />
      <ErrorBoundary>
        <TradesController />
      </ErrorBoundary>
    </div>
  );
}
