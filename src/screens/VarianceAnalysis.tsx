import React from 'react';

export default function VarianceAnalysis() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ประสิทธิภาพ (KPI)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Variance Analysis</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Variance Analysis</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">troubleshoot</span>
                <span>Log Root Cause</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
           <div className="flex gap-4 mr-4">
              <div className="bg-surface border border-outline-variant px-3 py-1.5 rounded flex items-center gap-2">
                 <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                 <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider leading-none">Planning Variance</span>
                    <span className="text-xs font-bold leading-none mt-0.5">(Replan - Plan)</span>
                 </div>
              </div>
              <div className="bg-surface border border-outline-variant px-3 py-1.5 rounded flex items-center gap-2">
                 <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                 <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider leading-none">Execution Variance</span>
                    <span className="text-xs font-bold leading-none mt-0.5">(Actual - Replan)</span>
                 </div>
              </div>
              <div className="bg-surface border border-outline-variant px-3 py-1.5 rounded flex items-center gap-2">
                 <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                 <div className="flex flex-col">
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider leading-none">Total Variance</span>
                    <span className="text-xs font-bold leading-none mt-0.5">(Actual - Plan)</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-right border-collapse min-w-[1500px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant text-left">
                <tr className="h-9">
                <th className="px-4 w-40 border-r border-outline-variant sticky left-0 z-10 bg-surface-container">Product</th>
                <th className="px-4 w-32 border-r border-outline-variant">Channel</th>
                <th className="px-4 w-40 border-r border-outline-variant">Customer</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">Plan</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">Replan</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant bg-surface-container-high">Actual</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant font-bold text-primary">Variance Qty</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant">Variance %</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Severity</th>
                <th className="px-4 w-40 text-center">Root Cause Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {[
                { p: 'BL Breast', ch: 'Industrial', cst: 'Siam Fresh Food', pln: '5,000', rpl: '4,800', act: '4,300', vq: '-700', vp: '-14.0%', sev: 'High', sevClass: 'text-error', rc: 'Pending Logging', rcClass: 'bg-error-container text-error' },
                { p: 'Drumstick', ch: 'Export', cst: 'Export Co Ltd', pln: '2,000', rpl: '2,000', act: '1,750', vq: '-250', vp: '-12.5%', sev: 'Medium', sevClass: 'text-amber-600', rc: 'Logged (RC-045)', rcClass: 'bg-amber-100 text-amber-800' },
                { p: 'Whole Wing', ch: 'Domestic', cst: 'Thai Union', pln: '3,000', rpl: '3,200', act: '3,250', vq: '+250', vp: '+8.3%', sev: 'Low', sevClass: 'text-emerald-600', rc: 'No Action Req.', rcClass: 'bg-surface-container text-on-surface-variant' },
                ].map((row, i) => (
                <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 text-left font-body-sm font-bold text-on-surface border-r border-outline-variant/50 sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low truncate">{row.p}</td>
                    <td className="px-4 text-left font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.ch}</td>
                    <td className="px-4 text-left font-body-sm text-on-surface-variant border-r border-outline-variant/50 truncate">{row.cst}</td>
                    <td className="px-4 border-r border-outline-variant/50">{row.pln}</td>
                    <td className="px-4 border-r border-outline-variant/50">{row.rpl}</td>
                    <td className="px-4 font-bold bg-surface-container/20 border-r border-outline-variant/50">{row.act}</td>
                    <td className={`px-4 font-bold border-r border-outline-variant/50 ${row.vq.startsWith('-') ? 'text-error' : 'text-emerald-600'}`}>{row.vq}</td>
                    <td className={`px-4 border-r border-outline-variant/50 ${row.vp.startsWith('-') ? 'text-error' : 'text-emerald-600'}`}>{row.vp}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50">
                        <span className={`font-bold ${row.sevClass}`}>{row.sev}</span>
                    </td>
                    <td className="px-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.rcClass}`}>
                          {row.rc}
                        </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </section>
    </div>
  );
}
