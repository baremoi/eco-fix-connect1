
interface TradesHeaderProps {
  title: string;
}

export function TradesHeader({ title }: TradesHeaderProps) {
  return (
    <h1 className="text-2xl font-bold mb-6">{title}</h1>
  );
}
