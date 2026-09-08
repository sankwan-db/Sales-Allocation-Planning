import React from 'react';

export default function SalesGapPlan() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>แผนปฏิบัติการขาย (Action Plan)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Sales Gap & Prospect Plan</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Sales Gap & Prospect Plan</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">person_add</span>
                <span>Create Prospect</span>
              </button>
              <button className="h-8 px-3 text-xs font-semibold text-primary bg-surface border border-outline-variant hover:bg-surface-container rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">monetization_on</span>
                <span>Create Opportunity</span>
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
            <option>Product: All</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Status: Uncovered Gap</option>
          </select>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1200px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant w-40 sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Salesperson</th>
              <th className="px-4 border-r border-outline-variant w-48">Product</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-blue-50 text-blue-800">Allocation</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right font-bold text-emerald-700">Confirmed SO</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right text-amber-700">Pipeline</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right bg-error-container/30 text-error font-bold">Uncovered Gap</th>
              <th className="px-4 border-r border-outline-variant w-40 text-right bg-surface-container-high">Req. Prospect Qty</th>
              <th className="px-4 w-40 text-center">Action Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {[
              { sp: 'สมชาย ขายดี', p: 'BL Breast (เนื้ออกลอกหนัง)', alloc: '100.00', cso: '60.00', pipe: '20.00', gap: '20.00', req: '60.00', stat: 'Action Needed', statClass: 'bg-error-container text-error' },
              { sp: 'วิชัย มั่นคง', p: 'Drumstick (น่องไก่)', alloc: '80.00', cso: '50.00', pipe: '10.00', gap: '20.00', req: '60.00', stat: 'Prospect Created', statClass: 'bg-amber-100 text-amber-800' },
              { sp: 'มานะ ขยัน', p: 'Whole Wing (ปีกเต็ม)', alloc: '120.00', cso: '80.00', pipe: '40.00', gap: '0.00', req: '0.00', stat: 'Covered', statClass: 'bg-emerald-100 text-emerald-800' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm font-medium text-on-surface truncate">{row.sp}</td>
                <td className="px-4 text-left border-r border-outline-variant/50 font-body-sm text-on-surface-variant truncate">{row.p}</td>
                <td className="px-4 text-right border-r border-outline-variant/50">{row.alloc}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-emerald-700 bg-emerald-50/10">{row.cso}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-amber-700">{row.pipe}</td>
                <td className={`px-4 text-right border-r border-outline-variant/50 font-bold ${row.gap !== '0.00' ? 'text-error bg-error-container/10' : 'text-on-surface-variant'}`}>{row.gap}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-on-surface bg-surface-container/20 group-hover:bg-surface-container/40">{row.req}</td>
                <td className="px-4 text-center flex items-center justify-center gap-2 h-10">
                   <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.statClass}`}>
                    {row.stat}
                  </span>
                  {row.gap !== '0.00' && (
                     <button className="h-6 px-2 text-[10px] font-semibold text-primary bg-surface border border-outline-variant hover:bg-surface-container rounded shadow-xs">Assign Action</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
