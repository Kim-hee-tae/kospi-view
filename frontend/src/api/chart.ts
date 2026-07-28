export interface ChartItem {
  stck_bsop_date: string;
  stck_clpr: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  acml_vol: string;
}

export async function fetchChart(code: string): Promise<ChartItem[]> {

  const response = await fetch(`/api/chart/${code}`);

  if (!response.ok) {
    throw new Error("차트 조회 실패");
  }

  const result = await response.json();

  return result.data;

}