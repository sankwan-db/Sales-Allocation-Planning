import React from 'react';

export default function KPIScorecard() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ประสิทธิภาพ (KPI)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">KPI Scorecard</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Executive KPI Scorecard</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">file_download</span>
                <span>Export Scorecard</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Period: October 2025</option>
            <option>Period: Q3 2025</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Owner: All</option>
            <option>Sales Dept</option>
            <option>Supply Chain</option>
          </select>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-right border-collapse min-w-[1500px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant text-left">
                <tr className="h-9">
                <th className="px-4 w-10 border-r border-outline-variant text-center"></th>
                <th className="px-4 w-48 border-r border-outline-variant">KPI</th>
                <th className="px-4 w-32 border-r border-outline-variant">Owner</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Frequency</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant bg-surface-container-high">Target</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant">Actual</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant font-bold text-primary">Achievement</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Score</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant text-on-surface-variant">Prev Period</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Trend</th>
                <th className="px-4 w-28 text-center">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {[
                { kpi: 'Sales Volume (MT)', own: 'Sales Director', freq: 'Monthly', tgt: '12,000', act: '12,500', ach: '104.2%', scr: '5/5', prev: '11,800', trnd: 'up', stat: 'Exceeded', statClass: 'bg-emerald-100 text-emerald-800' },
                { kpi: 'Forecast Accuracy', own: 'Demand Planner', freq: 'Weekly', tgt: '95.0%', act: '92.5%', ach: '97.4%', scr: '3/5', prev: '96.0%', trnd: 'down', stat: 'Watch', statClass: 'bg-amber-100 text-amber-800' },
                { kpi: 'Delivery OTIF', own: 'Logistics Mgr', freq: 'Weekly', tgt: '98.0%', act: '91.5%', ach: '93.4%', scr: '2/5', prev: '95.0%', trnd: 'down', stat: 'At Risk', statClass: 'bg-error-container text-error' },
                ].map((row, i) => (
                <tr key={i} className="h-12 hover:bg-surface-container-low transition-colors group">
                    <td className="px-2 text-center border-r border-outline-variant/50">
                        <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-surface-container-high text-on-surface-variant">
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        </button>
                    </td>
                    <td className="px-4 text-left font-body-sm font-bold text-on-surface border-r border-outline-variant/50 truncate">{row.kpi}</td>
                    <td className="px-4 text-left font-body-sm text-on-surface border-r border-outline-variant/50 truncate">{row.own}</td>
                    <td className="px-4 text-center text-on-surface-variant border-r border-outline-variant/50">{row.freq}</td>
                    <td className="px-4 font-bold bg-surface-container/20 border-r border-outline-variant/50">{row.tgt}</td>
                    <td className="px-4 font-bold text-on-surface border-r border-outline-variant/50">{row.act}</td>
                    <td className="px-4 font-bold text-primary border-r border-outline-variant/50">{row.ach}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-container-high font-bold">{row.scr}</span>
                    </td>
                    <td className="px-4 text-on-surface-variant border-r border-outline-variant/50">{row.prev}</td>
                    <td className="px-4 text-center text-on-surface-variant border-r border-outline-variant/50">
                        <span className={`material-symbols-outlined text-[20px] ${row.trnd === 'up' ? 'text-emerald-600' : 'text-error'}`}>
                           {row.trnd === 'up' ? 'trending_up' : 'trending_down'}
                        </span>
                    </td>
                    <td className="px-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.statClass}`}>
                          {row.stat}
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
