import type { StockItem } from "../types/stock";
import StockCard from "./StockCard";

interface Props {
  stocks: StockItem[];
}

export default function StockList({ stocks }: Props) {

  return (

    <div className="space-y-4">

      {stocks.map((stock) => (

        <StockCard
          key={stock.code}
          stock={stock}
        />

      ))}

    </div>

  );

}