import type { StockItem } from "../types/stock";


export async function fetchWatchList(): Promise<StockItem[]> {

  const response = await fetch("/api/watchlist");

  if (!response.ok) {
    throw new Error("관심종목 조회 실패");
  }

  const result = await response.json();

  return result.data;

}