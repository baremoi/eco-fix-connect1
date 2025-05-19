
import { TradesHeader } from "@/components/trades/TradesHeader";
import { TradesController } from "@/components/trades/TradesController";

export default function Trades() {
  return (
    <div className="container mx-auto py-8">
      <TradesHeader title="Find Tradespeople" />
      <TradesController />
    </div>
  );
}
