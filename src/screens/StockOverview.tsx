import React from 'react';

export default function StockOverview() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>สินค้าคงคลัง (Stock)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Stock Overview</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Stock Overview</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">file_download</span>
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Warehouse: All</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Product: All</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Condition: Chill & Frozen</option>
          </select>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1500px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant w-40 sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Product</th>
              <th className="px-4 border-r border-outline-variant w-32">Warehouse</th>
              <th className="px-4 border-r border-outline-variant w-28">Lot</th>
              <th className="px-4 border-r border-outline-variant w-24 text-center">Prod Date</th>
              <th className="px-4 border-r border-outline-variant w-24 text-center">Expiry Date</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-surface-container-high">On Hand</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right text-amber-700">Reserved</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right text-error">QA Hold</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right text-error font-bold">Blocked</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-emerald-50 text-emerald-800 font-bold">Available (MT)</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Stock Age</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Shelf Life Rem.</th>
              <th className="px-4 w-28 text-center">Risk Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {[
              { p: 'BL Breast', wh: 'WH-Chill-A', lot: 'L-251020', pd: '20 Oct 25', ed: '27 Oct 25', oh: '25.00', res: '20.00', qa: '0.00', blk: '0.00', avl: '5.00', age: '5 Days', rem: '2 Days', stat: 'High Risk', statClass: 'bg-error-container text-error' },
              { p: 'Whole Wing', wh: 'WH-Froz-B', lot: 'F-250815', pd: '15 Aug 25', ed: '15 Aug 27', oh: '150.00', res: '50.00', qa: '0.00', blk: '0.00', avl: '100.00', age: '2.5 Mos', rem: '21.5 Mos', stat: 'Healthy', statClass: 'bg-emerald-100 text-emerald-800' },
              { p: 'Drumstick', wh: 'WH-Froz-B', lot: 'F-241010', pd: '10 Oct 24', ed: '10 Oct 26', oh: '40.00', res: '0.00', qa: '0.00', blk: '10.00', avl: '30.00', age: '12 Mos', rem: '12 Mos', stat: 'Watch', statClass: 'bg-amber-100 text-amber-800' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm font-medium text-on-surface truncate">{row.p}</td>
                <td className="px-4 text-left border-r border-outline-variant/50 font-body-sm text-on-surface-variant truncate">{row.wh}</td>
                <td className="px-4 text-left border-r border-outline-variant/50 text-on-surface-variant">{row.lot}</td>
                <td className="px-4 text-center border-r border-outline-variant/50 text-on-surface-variant">{row.pd}</td>
                <td className="px-4 text-center border-r border-outline-variant/50 font-medium">{row.ed}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold bg-surface-container/30">{row.oh}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-amber-700">{row.res}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-error">{row.qa}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-error font-bold">{row.blk}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-emerald-700 bg-emerald-50/20 group-hover:bg-emerald-50/50">{row.avl}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-on-surface-variant">{row.age}</td>
                <td className={`px-4 text-right border-r border-outline-variant/50 font-bold ${row.stat === 'High Risk' ? 'text-error' : 'text-on-surface'}`}>{row.rem}</td>
                <td className="px-4 text-center">
                   <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.statClass}`}>
                    {row.stat}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
