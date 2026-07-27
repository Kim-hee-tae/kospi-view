import type { StockItem } from "../types/stock";
import StockCard from "./StockCard";

interface Props {
  stocks: StockItem[];
  selectedStock: StockItem | null;
  onSelect: (stock: StockItem) => void;
}

export default function StockList({
  stocks,
  selectedStock,
  onSelect,
}: Props) {
  return (
    <div className="space-y-4">
      {stocks.map((stock) => (
        <StockCard
          key={stock.code}
          stock={stock}
          selected={selectedStock?.code === stock.code}
          onClick={() => onSelect(stock)}
        />
      ))}
    </div>
  );
}