import React from 'react';

export default function TeamSalesActionPlan() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>แผนปฏิบัติการขาย (Action Plan)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Team Sales Action Plan</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Team Sales Action Plan (Manager View)</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">notifications</span>
                <span>Send Reminders</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Team: Alpha Team</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Month: October 2025</option>
          </select>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1200px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant w-40 sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Salesperson</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-blue-50 text-blue-800">Allocation</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right">Action Plan Qty</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right text-emerald-700 font-bold">Confirmed SO</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right">Weighted Pipe</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Sales Gap</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right">Req. Speed</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right">Act. Speed</th>
              <th className="px-4 border-r border-outline-variant w-28 text-center text-error">Overdue Follow-up</th>
              <th className="px-4 w-28 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {[
              { sp: 'สมชาย ขายดี', alloc: '150.00', apq: '170.00', cso: '85.00', wp: '45.00', gap: '20.00', rs: '10.00', as: '12.50', od: '1', stat: 'On Track', statClass: 'bg-emerald-100 text-emerald-800' },
              { sp: 'สมหญิง ชิงยอด', alloc: '120.00', apq: '100.00', cso: '40.00', wp: '30.00', gap: '50.00', rs: '25.00', as: '15.00', od: '3', stat: 'Behind', statClass: 'bg-amber-100 text-amber-800' },
              { sp: 'มานะ ขยัน', alloc: '80.00', apq: '60.00', cso: '20.00', wp: '10.00', gap: '50.00', rs: '25.00', as: '5.00', od: '5', stat: 'At Risk', statClass: 'bg-error-container text-error' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm font-medium text-on-surface truncate">{row.sp}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-primary bg-blue-50/10 group-hover:bg-blue-50/30">{row.alloc}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-on-surface-variant">{row.apq}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-emerald-700 bg-emerald-50/10">{row.cso}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-amber-700">{row.wp}</td>
                <td className={`px-4 text-right border-r border-outline-variant/50 font-bold ${row.gap !== '0.00' ? 'text-error' : 'text-on-surface'}`}>{row.gap}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-on-surface-variant">{row.rs}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-on-surface font-medium">{row.as}</td>
                <td className={`px-4 text-center border-r border-outline-variant/50 font-bold ${row.od !== '0' ? 'text-error' : 'text-on-surface-variant'}`}>{row.od}</td>
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
