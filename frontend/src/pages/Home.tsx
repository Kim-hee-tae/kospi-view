import DetailPanel from "../components/DetailPanel";
import StockList from "../components/StockList";
import { useEffect, useState } from "react";
import { fetchWatchList } from "../api/watchlist";
import type { StockItem } from "../types/stock";

export default function Home() {

  const [stocks, setStocks] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState<StockItem | null>(null);

  useEffect(() => {

    async function load() {

      try {

        const data = await fetchWatchList();

        setStocks(data);

        if (data.length > 0) {
            setSelectedStock(data[0]);
        }

      } catch (e) {

        console.error(e);

      } finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  return (

    <div className="min-h-screen bg-slate-100">

      <header className="bg-slate-900 text-white p-5 shadow">

        <h1 className="text-3xl font-bold">
          📈 KOSPI VIEW
        </h1>

      </header>

      <main className="max-w-6xl mx-auto p-6">

        {loading && (

          <div className="text-center text-gray-500">
            Loading...
          </div>

        )}

        {!loading && (

        <div className="grid grid-cols-12 gap-6">

            <div className="col-span-4">

                <StockList
                    stocks={stocks}
                    selectedStock={selectedStock}
                    onSelect={setSelectedStock}
                />

            </div>

            <div className="col-span-8">

                <DetailPanel
                    stock={selectedStock}
                />

            </div>

        </div>

        )}

      </main>

    </div>

  );

}