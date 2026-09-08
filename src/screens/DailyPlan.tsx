import React from 'react';

export default function DailyPlan() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>การวางแผน (Planning)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">แผนรายวัน (Daily Sales Plan)</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">แผนรายวัน (Daily Sales Plan)</h1>
            <div className="flex items-center gap-2">
               <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">file_download</span>
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-surface-container p-0.5 rounded border border-outline-variant">
              <button className="px-3 py-1 font-label-sm text-label-sm rounded bg-surface-container-lowest text-primary font-bold shadow-sm border border-outline-variant/50" type="button">Today</button>
              <button className="px-3 py-1 font-label-sm text-label-sm rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button">WTD</button>
              <button className="px-3 py-1 font-label-sm text-label-sm rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button">MTD</button>
            </div>
            <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
              <option>Date: 22 Oct 2025</option>
            </select>
            <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
              <option>Product Group: All</option>
            </select>
            <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
              <option>Status: All</option>
            </select>
          </div>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1200px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant w-28 sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Date</th>
              <th className="px-4 border-r border-outline-variant min-w-[200px] sticky left-[112px] z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Product</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Supply</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right bg-blue-50 text-blue-800">Allocation</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">SO</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Load</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Delivery</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Actual</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Gap</th>
              <th className="px-4 w-28 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {[
              { d: '22 Oct 25', p: 'เนื้ออกลอกหนัง (BL Breast)', sup: '45.0', alloc: '40.0', so: '42.0', load: '38.0', del: '38.0', act: '38.0', gap: '-2.0', status: 'Warning', statusClass: 'bg-amber-100 text-amber-800' },
              { d: '22 Oct 25', p: 'น่องไก่ (Drumstick)', sup: '35.0', alloc: '35.0', so: '35.0', load: '35.0', del: '15.0', act: '15.0', gap: '-20.0', status: 'In Transit', statusClass: 'bg-blue-100 text-blue-800' },
              { d: '22 Oct 25', p: 'ปีกเต็ม (Whole Wing)', sup: '60.0', alloc: '60.0', so: '60.0', load: '60.0', del: '60.0', act: '60.0', gap: '0.0', status: 'Completed', statusClass: 'bg-emerald-100 text-emerald-800' },
              { d: '22 Oct 25', p: 'โครงไก่ (Chicken Frame)', sup: '28.0', alloc: '25.0', so: '22.0', load: '22.0', del: '22.0', act: '22.0', gap: '-3.0', status: 'Shortage SO', statusClass: 'bg-error-container text-error' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm text-on-surface-variant">{row.d}</td>
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-[112px] z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm font-medium text-on-surface truncate">{row.p}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-on-surface-variant">{row.sup}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-primary bg-blue-50/30 group-hover:bg-blue-50/50">{row.alloc}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-amber-700">{row.so}</td>
                <td className="px-4 text-right border-r border-outline-variant/50">{row.load}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-emerald-600">{row.del}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-on-surface">{row.act}</td>
                <td className={`px-4 text-right border-r border-outline-variant/50 font-bold ${parseFloat(row.gap) < 0 ? 'text-error' : (parseFloat(row.gap) > 0 ? 'text-emerald-600' : 'text-on-surface-variant')}`}>{row.gap}</td>
                <td className="px-4 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.statusClass}`}>
                    {row.status}
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
