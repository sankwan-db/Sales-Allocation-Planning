import React from 'react';

export default function SalespersonAllocation() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>การจัดสรรการขาย (Allocation)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">จัดสรรระดับบุคคล (Salesperson Allocation)</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">จัดสรรระดับบุคคล (Salesperson Allocation)</h1>
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
            <option>Team: All Teams</option>
          </select>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1400px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant w-40 sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Salesperson</th>
              <th className="px-4 border-r border-outline-variant w-48 sticky left-[160px] z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Product</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-blue-50 text-blue-800">Allocation</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right text-emerald-700 font-bold">Confirmed SO</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right">Qual. Pipeline</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right bg-amber-50 text-amber-900">Wt. Pipeline</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right">Rem. Alloc.</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Sales Gap</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right">SO Coverage %</th>
              <th className="px-4 w-28 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {[
              { sp: 'สมชาย ขายดี', p: 'BL Breast (เนื้ออกลอกหนัง)', alloc: '40.00', cso: '30.00', qp: '20.00', wp: '10.00', rem: '10.00', gap: '0.00', cov: '75.0%', stat: 'On Track', statClass: 'bg-emerald-100 text-emerald-800' },
              { sp: 'สมหญิง ชิงยอด', p: 'BL Breast (เนื้ออกลอกหนัง)', alloc: '40.00', cso: '30.00', qp: '10.00', wp: '5.00', rem: '10.00', gap: '5.00', cov: '75.0%', stat: 'Watch', statClass: 'bg-amber-100 text-amber-800' },
              { sp: 'วิชัย มั่นคง', p: 'BL Breast (เนื้ออกลอกหนัง)', alloc: '40.00', cso: '45.00', qp: '5.00', wp: '2.50', rem: '-5.00', gap: '0.00', cov: '112.5%', stat: 'Over Achieved', statClass: 'bg-blue-100 text-blue-800' },
              { sp: 'มานะ ขยัน', p: 'BL Breast (เนื้ออกลอกหนัง)', alloc: '30.00', cso: '10.00', qp: '15.00', wp: '7.50', rem: '20.00', gap: '12.50', cov: '33.3%', stat: 'At Risk', statClass: 'bg-error-container text-error' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm font-medium text-on-surface truncate">{row.sp}</td>
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-[160px] z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm text-on-surface-variant truncate">{row.p}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-primary bg-blue-50/10 group-hover:bg-blue-50/30">{row.alloc}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-emerald-700 bg-emerald-50/10">{row.cso}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-on-surface-variant">{row.qp}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-amber-900 bg-amber-50/10 font-bold">{row.wp}</td>
                <td className={`px-4 text-right border-r border-outline-variant/50 font-medium ${row.rem.startsWith('-') ? 'text-error' : 'text-on-surface'}`}>{row.rem}</td>
                <td className={`px-4 text-right border-r border-outline-variant/50 font-bold ${row.gap !== '0.00' ? 'text-error' : 'text-on-surface-variant'}`}>{row.gap}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-medium">{row.cov}</td>
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
