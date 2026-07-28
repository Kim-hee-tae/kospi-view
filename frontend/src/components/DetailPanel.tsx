import StockChart from "./StockChart";
import type { StockItem } from "../types/stock";
import { useEffect, useState } from "react";
import { fetchStockDetail, type StockDetail } from "../api/stock";

interface Props {
  stock: StockItem | null;
}

export default function DetailPanel({ stock }: Props) {
  const [detail, setDetail] = useState<StockDetail | null>(null);

  useEffect(() => {

      if (!stock) return;

      async function load() {

          try {

              const data = await fetchStockDetail(stock.code);

              setDetail(data);

          } catch (e) {

              console.error("DETAIL ERROR", e);

          }

      }

      load();

  }, [stock]);

  if (!stock) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        종목을 선택하세요.
      </div>
    );
  }
console.log("detail =", detail);
  return (
    <div className="bg-white rounded-xl shadow p-6 h-full">

      <h2 className="text-3xl font-bold">
        {stock.name}
      </h2>

      <p className="text-gray-500">
        {stock.code}
      </p>

      <div className="mt-6">

          <StockChart
              code={stock.code}
          />

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="rounded-lg bg-slate-100 p-4">
          <div className="text-gray-500">현재가</div>
          <div className="text-2xl font-bold">
            {detail ? detail.price.toLocaleString() : stock.price.toLocaleString()}원
          </div>
        </div>

        <div className="rounded-lg bg-slate-100 p-4">
          <div className="text-gray-500">등락률</div>
          <div
            className={
              stock.rate >= 0
                ? "text-2xl font-bold text-red-500"
                : "text-2xl font-bold text-blue-500"
            }
          >
            {detail ? detail.rate : stock.rate}%
          </div>
        </div>

        <div className="rounded-lg bg-slate-100 p-4">
          <div className="text-gray-500">PER</div>
          <div className="text-2xl font-bold">
            {detail?.per ?? "-"}
          </div>
        </div>

        <div className="rounded-lg bg-slate-100 p-4">
          <div className="text-gray-500">PBR</div>
          <div className="text-2xl font-bold">
            {detail?.pbr ?? "-"}
          </div>
        </div>

        <div className="rounded-lg bg-slate-100 p-4">
          <div className="text-gray-500">EPS</div>
          <div className="text-2xl font-bold">
            {detail?.eps?.toLocaleString() ?? "-"}
          </div>
        </div>

        <div className="rounded-lg bg-slate-100 p-4">
          <div className="text-gray-500">거래량</div>
          <div className="text-2xl font-bold">
            {detail?.volume?.toLocaleString() ?? "-"}
          </div>
        </div>

      </div>

    </div>
  );
}