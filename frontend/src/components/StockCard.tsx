import type { StockItem } from "../types/stock";

interface Props {
  stock: StockItem;
  selected: boolean;
  onClick: () => void;
}

export default function StockCard({
  stock,
  selected,
  onClick,
}: Props) {
  const up = stock.rate >= 0;

  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer
        rounded-xl
        p-5
        transition
        shadow
        ${
          selected
            ? "bg-blue-50 border-2 border-blue-500"
            : "bg-white hover:shadow-lg"
        }
      `}
    >
      <div className="flex justify-between">

        <div>
          <div className="text-xl font-bold">
            {stock.name}
          </div>

          <div className="text-sm text-gray-400">
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