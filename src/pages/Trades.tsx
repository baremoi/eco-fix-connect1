
import { TradesHeader } from "@/components/trades/TradesHeader";
import { TradesController } from "@/components/trades/TradesController";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import ErrorFallback from "@/components/error/ErrorFallback";

export default function Trades() {
  return (
    <div className="container mx-auto py-8">
      <TradesHeader title="Find Tradespeople" />
      <ErrorBoundary fallback={(error) => <ErrorFallback error={error} componentName="Trades Controller" />}>
        <TradesController />
      </ErrorBoundary>
    </div>
  );
}
