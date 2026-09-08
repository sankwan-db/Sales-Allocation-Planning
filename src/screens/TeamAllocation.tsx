import React from 'react';

export default function TeamAllocation() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>การจัดสรรการขาย (Allocation)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">จัดสรรระดับทีม (Team Allocation)</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">จัดสรรระดับทีม (Team Allocation)</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">file_download</span>
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Product: BL Breast (เนื้ออกลอกหนัง)</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Month: October 2025</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Channel: All</option>
          </select>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1200px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant w-40 sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Team</th>
              <th className="px-4 border-r border-outline-variant w-40">Channel</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right bg-blue-50 text-blue-800">Allocation</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right text-emerald-700 font-bold">Confirmed SO</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right text-amber-700">Pipeline</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right">Remaining Alloc.</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right">Achievement %</th>
              <th className="px-4 w-32 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {[
              { team: 'Team Alpha', ch: 'Modern Trade', alloc: '80.00', cso: '60.00', pipe: '15.00', rem: '20.00', ach: '75.0%', stat: 'On Track', statClass: 'bg-emerald-100 text-emerald-800' },
              { team: 'Team Beta', ch: 'Modern Trade', alloc: '70.00', cso: '60.00', pipe: '10.00', rem: '10.00', ach: '85.7%', stat: 'On Track', statClass: 'bg-emerald-100 text-emerald-800' },
              { team: 'Team Gamma', ch: 'Export', alloc: '120.00', cso: '120.00', pipe: '30.00', rem: '0.00', ach: '100.0%', stat: 'Target Met', statClass: 'bg-blue-100 text-blue-800 border border-blue-200' },
              { team: 'Team Delta', ch: 'Export', alloc: '80.00', cso: '40.00', pipe: '20.00', rem: '40.00', ach: '50.0%', stat: 'Behind', statClass: 'bg-amber-100 text-amber-800' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm font-medium text-on-surface truncate">{row.team}</td>
                <td className="px-4 text-left border-r border-outline-variant/50 font-body-sm text-on-surface-variant truncate">{row.ch}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-primary bg-blue-50/10 group-hover:bg-blue-50/30">{row.alloc}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-emerald-700 bg-emerald-50/10">{row.cso}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-amber-700 bg-amber-50/10">{row.pipe}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-on-surface font-medium">{row.rem}</td>
                <td className="px-4 text-right border-r border-outline-variant/50">{row.ach}</td>
                <td className="px-4 text-center">
                   <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.statClass}`}>
                    {row.stat}
                  </span>
                </td>
              </tr>
            ))}
             <tr className="h-10 bg-surface-container sticky bottom-0 z-20 border-t-2 border-outline font-bold">
                <td colSpan={2} className="px-4 text-left border-r border-outline-variant sticky left-0 z-30 bg-surface-container">Total (MT)</td>
                <td className="px-4 text-right border-r border-outline-variant text-primary">350.00</td>
                <td className="px-4 text-right border-r border-outline-variant text-emerald-700">280.00</td>
                <td className="px-4 text-right border-r border-outline-variant text-amber-700">75.00</td>
                <td className="px-4 text-right border-r border-outline-variant text-on-surface">70.00</td>
                <td className="px-4 text-right border-r border-outline-variant">80.0%</td>
                <td className="px-4 text-center"></td>
             </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
