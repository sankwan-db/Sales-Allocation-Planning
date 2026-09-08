import React from 'react';

export default function StockAtRisk() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>สินค้าคงคลัง (Stock)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Stock at Risk</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight text-error">Stock at Risk (High Aging / Slow Moving)</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-error hover:bg-error/90 rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">campaign</span>
                <span>Trigger Promotion</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-right border-collapse min-w-[1400px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant text-left">
                <tr className="h-9">
                <th className="px-4 w-40 border-r border-outline-variant">Product</th>
                <th className="px-4 w-28 border-r border-outline-variant">Lot</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant bg-surface-container-high">Available Qty</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">Age</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">Shelf Life Rem.</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">No SO Qty</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant text-primary">Forecast Dmd</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Risk Score</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Risk Status</th>
                <th className="px-4 w-48 text-left border-r border-outline-variant">Recommended Action</th>
                <th className="px-4 w-32 text-left">Owner</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {[
                { p: 'BL Breast (Chill)', lot: 'L-251020', avl: '5.00', age: '5 Days', sl: '2 Days', noso: '5.00', fcst: '1.00', score: '95', stat: 'Critical', statClass: 'bg-error-container text-error', act: 'Freeze immediately or discount 50%', own: 'WH Manager' },
                { p: 'Drumstick (Froz)', lot: 'F-241010', avl: '15.00', age: '20 Mos', sl: '4 Mos', noso: '15.00', fcst: '5.00', score: '75', stat: 'High Risk', statClass: 'bg-amber-100 text-amber-800', act: 'Push to Export / Process to Cooked', own: 'Sales Director' },
                ].map((row, i) => (
                <tr key={i} className="h-12 hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 text-left font-body-sm font-bold text-on-surface border-r border-outline-variant/50 truncate">{row.p}</td>
                    <td className="px-4 text-left font-medium text-on-surface-variant border-r border-outline-variant/50">{row.lot}</td>
                    <td className="px-4 font-bold text-on-surface bg-surface-container/20 border-r border-outline-variant/50">{row.avl}</td>
                    <td className="px-4 font-medium text-error border-r border-outline-variant/50">{row.age}</td>
                    <td className="px-4 font-bold text-error border-r border-outline-variant/50">{row.sl}</td>
                    <td className="px-4 font-bold text-on-surface border-r border-outline-variant/50">{row.noso}</td>
                    <td className="px-4 font-bold text-primary border-r border-outline-variant/50">{row.fcst}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50">
                        <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold text-[11px] ${
                          Number(row.score) > 90 ? 'bg-error text-white' : 'bg-amber-500 text-white'
                        }`}>{row.score}</div>
                    </td>
                    <td className="px-4 text-center border-r border-outline-variant/50">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.statClass}`}>
                          {row.stat}
                        </span>
                    </td>
                    <td className="px-4 text-left font-body-sm text-on-surface-variant border-r border-outline-variant/50 truncate">{row.act}</td>
                    <td className="px-4 text-left font-body-sm text-on-surface">{row.own}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </section>
    </div>
  );
}
