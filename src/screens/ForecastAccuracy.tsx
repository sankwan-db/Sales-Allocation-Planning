import React from 'react';

export default function ForecastAccuracy() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ประสิทธิภาพ (KPI)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Forecast Accuracy</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Forecast Accuracy Monitoring</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">file_download</span>
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Period: Week</option>
            <option>Period: Month</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Channel: All</option>
          </select>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden max-w-6xl mx-auto">
            <table className="w-full text-right border-collapse">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant text-left">
                <tr className="h-9">
                <th className="px-4 w-28 border-r border-outline-variant">Period</th>
                <th className="px-4 w-40 border-r border-outline-variant">Product</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant text-blue-800 bg-blue-50/50">Forecast</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant text-emerald-800 bg-emerald-50/50">Actual</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant">Error</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant">Absolute Error</th>
                <th className="px-4 w-32 text-center border-r border-outline-variant bg-surface-container-high font-bold text-on-surface">Accuracy %</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Bias</th>
                <th className="px-4 w-24 text-center">Trend</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {[
                { pd: 'W41 (Oct)', p: 'BL Breast', f: '1,200', a: '1,150', e: '-50', abs: '50', acc: 95.8, bias: 'Over-FCST', trend: 'down' },
                { pd: 'W41 (Oct)', p: 'Whole Wing', f: '800', a: '920', e: '+120', abs: '120', acc: 85.0, bias: 'Under-FCST', trend: 'up' },
                { pd: 'W42 (Oct)', p: 'BL Breast', f: '1,200', a: '1,180', e: '-20', abs: '20', acc: 98.3, bias: 'Over-FCST', trend: 'up' },
                ].map((row, i) => (
                <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 text-left font-body-sm font-medium text-on-surface border-r border-outline-variant/50">{row.pd}</td>
                    <td className="px-4 text-left font-body-sm text-on-surface border-r border-outline-variant/50 truncate">{row.p}</td>
                    <td className="px-4 text-right border-r border-outline-variant/50">{row.f}</td>
                    <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-emerald-700">{row.a}</td>
                    <td className={`px-4 text-right border-r border-outline-variant/50 ${row.e.startsWith('-') ? 'text-error' : 'text-primary'}`}>{row.e}</td>
                    <td className="px-4 text-right border-r border-outline-variant/50 font-bold">{row.abs}</td>
                    <td className="px-4 text-center bg-surface-container/20 border-r border-outline-variant/50">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${row.acc >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-error-container text-error'}`}>
                          {row.acc.toFixed(1)}%
                        </span>
                    </td>
                    <td className="px-4 text-center border-r border-outline-variant/50">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${row.bias === 'Over-FCST' ? 'text-amber-600' : 'text-primary'}`}>{row.bias}</span>
                    </td>
                    <td className="px-4 text-center text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px]">
                           {row.trend === 'up' ? 'trending_up' : 'trending_down'}
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
