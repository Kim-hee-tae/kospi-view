export interface StockDetail {
  code: string;
  price: number;
  change: number;
  rate: number;
  per: number;
  pbr: number;
  eps: number;
  bps: number;
  volume: number;
  marketCap: number;
}

export async function fetchStockDetail(code: string): Promise<StockDetail> {

  console.log("Request URL:", `${import.meta.env.VITE_API_BASE_URL}/api/stock/${code}`);

  
  const response = await fetch(`/api/stock/${code}`);

  console.log("status =", response.status);

  if (!response.ok) {
    throw new Error("상세정보 조회 실패");
  }

  const result = await response.json();

  console.log("result =", result);

  return result.data;
}