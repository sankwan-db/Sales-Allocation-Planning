import React from 'react';

export default function RawMaterialRequirement() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>สมดุลความต้องการ (Balance)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">RM Requirement</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">ความต้องการวัตถุดิบ (Raw Material Requirement)</h1>
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
            <option>Month: October 2025</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Plant: All Plants</option>
          </select>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1200px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant w-64 sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">FG Product</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right bg-amber-50 text-amber-900">FG Demand (MT)</th>
              <th className="px-4 border-r border-outline-variant w-64">RM Product</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Yield %</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right font-bold text-primary bg-surface-container-high">Required RM</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right">Available RM</th>
              <th className="px-4 w-32 text-right">RM Gap</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {[
              { fg: 'Karaage Chicken (ไก่คาราเกะ)', fgd: '250.00', rm: 'BL Breast (เนื้ออกลอกหนัง)', y: '85.00%', rrm: '294.12', arm: '200.00', gap: '-94.12', gapClass: 'text-error' },
              { fg: 'Spicy Wing (ปีกไก่สไปซี่)', fgd: '100.00', rm: 'Mid Joint Wing (ปีกกลาง)', y: '90.00%', rrm: '111.11', arm: '141.90', gap: '+30.79', gapClass: 'text-emerald-600' },
              { fg: 'Chicken Sausage (ไส้กรอกไก่)', fgd: '150.00', rm: 'Minced Meat (เนื้อบด)', y: '95.00%', rrm: '157.89', arm: '150.00', gap: '-7.89', gapClass: 'text-error' },
              { fg: 'Marinated Drumstick', fgd: '50.00', rm: 'Drumstick (น่องไก่)', y: '88.00%', rrm: '56.82', arm: '100.00', gap: '+43.18', gapClass: 'text-emerald-600' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm font-medium text-on-surface truncate">{row.fg}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-amber-900 bg-amber-50/10 group-hover:bg-amber-50/30">{row.fgd}</td>
                <td className="px-4 text-left border-r border-outline-variant/50 font-body-sm text-on-surface-variant truncate">{row.rm}</td>
                <td className="px-4 text-right border-r border-outline-variant/50">{row.y}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-primary bg-surface-container/20 group-hover:bg-surface-container/40">{row.rrm}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-medium text-on-surface">{row.arm}</td>
                <td className={`px-4 text-right font-bold ${row.gapClass}`}>{row.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
