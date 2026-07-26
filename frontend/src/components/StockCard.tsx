import type { StockItem } from "../types/stock";


interface Props {
  stock: StockItem;
}

export default function StockCard({ stock }: Props) {
  const up = stock.rate >= 0;

  return (
    <div className="rounded-xl bg-white shadow hover:shadow-lg transition p-5">

      <div className="flex justify-between items-center">

        <div>

          <div className="text-xl font-bold">
            {stock.name}
          </div>

          <div className="text-gray-400 text-sm">
            {stock.code}
          </div>

        </div>

        <div className="text-right">

          <div className="text-2xl font-bold">
            {stock.price.toLocaleString()}원
          </div>

          <div
            className={
              up
                ? "text-red-500 font-semibold"
                : "text-blue-500 font-semibold"
            }
          >
            {stock.rate}%
          </div>

        </div>

      </div>

      <div className="mt-4 h-16 rounded bg-slate-100 flex items-center justify-center text-gray-400">
        Mini Chart (다음 단계)
      </div>

    </div>
  );
}