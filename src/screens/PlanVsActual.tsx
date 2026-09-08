import React from 'react';

export default function PlanVsActual() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ประสิทธิภาพ (KPI)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Plan vs Actual Analysis</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Plan vs Actual Analysis</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">file_download</span>
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Period: October 2025</option>
          </select>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1500px]">
          <thead className="sticky top-0 z-20 shadow-sm text-left">
            <tr className="bg-surface-container border-b border-outline font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant w-40 sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Product</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-blue-50/50 text-blue-800">Master Plan</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-blue-50/50 text-blue-800">Latest Replan</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-indigo-50/50 text-indigo-800">Allocation</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-indigo-50/50 text-indigo-800">SO</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-emerald-50/50 text-emerald-800 font-bold">Actual Delivery</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right">Planning Adj. (Replan - Master)</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right">Exec Variance (Actual - Replan)</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right font-bold text-on-surface bg-surface-container-high">Total Variance</th>
              <th className="px-4 w-28 text-center font-bold">Achievement %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {[
              { p: 'BL Breast', m: '5,000', r: '4,800', a: '4,800', so: '4,500', act: '4,300', pAdj: '-200', eV: '-500', tV: '-700', ach: 86.0 },
              { p: 'Whole Wing', m: '3,000', r: '3,200', a: '3,200', so: '3,300', act: '3,250', pAdj: '+200', eV: '+50', tV: '+250', ach: 108.3 },
              { p: 'Drumstick', m: '2,000', r: '2,000', a: '1,800', so: '1,800', act: '1,750', pAdj: '0', eV: '-250', tV: '-250', ach: 87.5 },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-left font-body-sm font-bold text-on-surface border-r border-outline-variant/50 sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low truncate">{row.p}</td>
                <td className="px-4 text-right border-r border-outline-variant/50">{row.m}</td>
                <td className="px-4 text-right border-r border-outline-variant/50">{row.r}</td>
                <td className="px-4 text-right border-r border-outline-variant/50">{row.a}</td>
                <td className="px-4 text-right border-r border-outline-variant/50">{row.so}</td>
                <td className="px-4 text-right font-bold text-emerald-700 bg-surface-container/20 border-r border-outline-variant/50">{row.act}</td>
                <td className={`px-4 text-right border-r border-outline-variant/50 ${row.pAdj.startsWith('-') ? 'text-error' : row.pAdj !== '0' ? 'text-emerald-600' : 'text-on-surface-variant'}`}>{row.pAdj}</td>
                <td className={`px-4 text-right border-r border-outline-variant/50 ${row.eV.startsWith('-') ? 'text-error' : row.eV !== '0' ? 'text-emerald-600' : 'text-on-surface-variant'}`}>{row.eV}</td>
                <td className={`px-4 text-right font-bold bg-surface-container/30 border-r border-outline-variant/50 ${row.tV.startsWith('-') ? 'text-error' : row.tV !== '0' ? 'text-emerald-600' : 'text-on-surface-variant'}`}>{row.tV}</td>
                <td className="px-4 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${row.ach >= 100 ? 'bg-emerald-100 text-emerald-800' : row.ach > 90 ? 'bg-amber-100 text-amber-800' : 'bg-error-container text-error'}`}>
                      {row.ach.toFixed(1)}%
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
