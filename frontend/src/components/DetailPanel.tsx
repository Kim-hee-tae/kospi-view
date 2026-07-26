export default function DetailPanel() {
  return (
    <div className="bg-white rounded-xl shadow p-6 h-full">

      <h2 className="text-2xl font-bold">
        종목 상세
      </h2>

      <div className="mt-6 h-80 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">

        Chart Area

      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="rounded-lg bg-slate-100 p-4">
          <div className="text-gray-500">현재가</div>
          <div className="text-2xl font-bold">-</div>
        </div>

        <div className="rounded-lg bg-slate-100 p-4">
          <div className="text-gray-500">등락률</div>
          <div className="text-2xl font-bold">-</div>
        </div>

        <div className="rounded-lg bg-slate-100 p-4">
          <div className="text-gray-500">PER</div>
          <div className="text-2xl font-bold">-</div>
        </div>

        <div className="rounded-lg bg-slate-100 p-4">
          <div className="text-gray-500">PBR</div>
          <div className="text-2xl font-bold">-</div>
        </div>

      </div>

    </div>
  );
}