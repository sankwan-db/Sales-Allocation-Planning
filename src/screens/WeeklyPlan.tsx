import React from 'react';

export default function WeeklyPlan() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>การวางแผน (Planning)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">จัดสรรรายสัปดาห์ (Weekly Sales Plan)</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">จัดสรรรายสัปดาห์ (Weekly Sales Plan)</h1>
            <div className="flex items-center gap-2">
               <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">save</span>
                <span>Save Plan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar & Weekly Weights */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
              <option>Month: October 2025</option>
            </select>
            <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
              <option>Channel: All</option>
            </select>
            <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
              <option>Product Group: All</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 bg-surface-container border border-outline-variant rounded p-1.5 shadow-xs">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mr-1">Weekly Weight:</span>
            {['W1', 'W2', 'W3', 'W4', 'W5'].map((w, idx) => (
              <div key={w} className="flex items-center gap-1">
                <span className="text-xs font-medium text-on-surface">{w}</span>
                <input type="text" defaultValue={idx === 4 ? "0" : "25"} className="w-8 h-6 text-xs text-center border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary outline-none" />
                <span className="text-[10px] text-on-surface-variant">%</span>
              </div>
            ))}
            <button className="ml-1 h-6 px-2 bg-surface border border-outline-variant text-[10px] font-bold rounded hover:bg-surface-container-low text-primary">Apply</button>
          </div>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1400px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0] min-w-[200px]">Product</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-surface-container-low">Monthly Plan</th>
              {['W1', 'W2', 'W3', 'W4', 'W5'].map((w) => (
                <th key={w} className="px-3 border-r border-outline-variant w-24 text-right bg-blue-50 text-blue-800">{w}</th>
              ))}
              <th className="px-4 border-r border-outline-variant w-24 text-right">SO</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Actual</th>
              <th className="px-4 w-24 text-right">Gap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {[
              { p: 'เนื้ออกลอกหนัง (BL Breast)', mp: '1,100.00', w: ['275.00', '275.00', '275.00', '275.00', '0.00'], so: '300.00', act: '280.00', gap: '+5.00', gapClass: 'text-emerald-600' },
              { p: 'น่องไก่ (Drumstick)', mp: '900.00', w: ['225.00', '225.00', '225.00', '225.00', '0.00'], so: '200.00', act: '190.00', gap: '-35.00', gapClass: 'text-error' },
              { p: 'ปีกเต็ม (Whole Wing)', mp: '1,400.00', w: ['350.00', '350.00', '350.00', '350.00', '0.00'], so: '350.00', act: '350.00', gap: '0.00', gapClass: 'text-on-surface-variant' },
              { p: 'โครงไก่ (Chicken Frame)', mp: '720.00', w: ['180.00', '180.00', '180.00', '180.00', '0.00'], so: '185.00', act: '185.00', gap: '+5.00', gapClass: 'text-emerald-600' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm font-medium text-on-surface truncate">{row.p}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-on-surface">{row.mp}</td>
                {row.w.map((val, j) => (
                  <td key={j} className="border-r border-outline-variant/50 p-0 bg-blue-50/30 group-hover:bg-blue-50/50">
                    <input 
                      type="text" 
                      defaultValue={val}
                      className="w-full h-full px-3 text-right bg-transparent focus:bg-surface focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary text-primary font-bold"
                    />
                  </td>
                ))}
                <td className="px-4 text-right border-r border-outline-variant/50 text-amber-700">{row.so}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-emerald-700">{row.act}</td>
                <td className={`px-4 text-right font-bold ${row.gapClass}`}>{row.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
