import React from 'react';

export default function MySalesActionPlan() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>แผนปฏิบัติการขาย (Action Plan)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">My Sales Action Plan</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">My Sales Action Plan</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>Add Prospect</span>
              </button>
            </div>
          </div>
        </div>

        {/* Top Summary / KPIs */}
        <div className="grid grid-cols-6 gap-3 mb-4">
           <div className="bg-surface border border-outline-variant rounded p-3 flex flex-col justify-center shadow-xs">
               <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mb-1">My Allocation (MT)</div>
               <div className="font-data-mono-num font-bold text-xl text-on-surface">150.00</div>
           </div>
           <div className="bg-emerald-50/50 border border-emerald-100 rounded p-3 flex flex-col justify-center shadow-xs">
               <div className="text-[10px] font-badge-caps uppercase tracking-wider text-emerald-800 mb-1">Confirmed SO</div>
               <div className="font-data-mono-num font-bold text-xl text-emerald-700">85.00</div>
           </div>
           <div className="bg-amber-50/50 border border-amber-100 rounded p-3 flex flex-col justify-center shadow-xs">
               <div className="text-[10px] font-badge-caps uppercase tracking-wider text-amber-900 mb-1">Weighted Pipeline</div>
               <div className="font-data-mono-num font-bold text-xl text-amber-700">45.00</div>
           </div>
           <div className="bg-error-container/20 border border-error-container/50 rounded p-3 flex flex-col justify-center shadow-xs">
               <div className="text-[10px] font-badge-caps uppercase tracking-wider text-error mb-1">Sales Gap</div>
               <div className="font-data-mono-num font-bold text-xl text-error">20.00</div>
           </div>
           <div className="bg-surface border border-outline-variant rounded p-3 flex flex-col justify-center shadow-xs">
               <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mb-1">Required Speed (MT/Wk)</div>
               <div className="font-data-mono-num font-bold text-xl text-on-surface">10.00</div>
           </div>
           <div className="bg-surface border border-outline-variant rounded p-3 flex flex-col justify-center shadow-xs">
               <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mb-1">Actual Speed (MT/Wk)</div>
               <div className="font-data-mono-num font-bold text-xl text-primary">12.50</div>
           </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Product: All</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Status: Active Pipeline</option>
          </select>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-left border-collapse min-w-[1400px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant w-48 sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Customer/Prospect</th>
              <th className="px-4 border-r border-outline-variant w-28 text-center">Type</th>
              <th className="px-4 border-r border-outline-variant w-40">Product</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-blue-50 text-blue-800">Plan Qty (MT)</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Tgt Price</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Prob. %</th>
              <th className="px-4 border-r border-outline-variant w-28 text-center">Exp. Close</th>
              <th className="px-4 border-r border-outline-variant w-24 text-center">Status</th>
              <th className="px-4 border-r border-outline-variant w-48">Next Action</th>
              <th className="px-4 w-28 text-center">Action Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-body-sm text-body-sm">
            {[
              { cust: 'Lotus Fresh', type: 'Existing', p: 'BL Breast', qty: '30.00', prc: '85.00', prob: '90%', dt: '25 Oct 25', stat: 'Negotiating', statClass: 'bg-blue-100 text-blue-800', act: 'Send final quotation', adt: '20 Oct 25', adtClass: 'text-error font-bold' },
              { cust: 'BKK Food Services', type: 'Prospect', p: 'Drumstick', qty: '15.00', prc: '65.00', prob: '50%', dt: '30 Oct 25', stat: 'Pitching', statClass: 'bg-amber-100 text-amber-800', act: 'Follow up on sample test', adt: '22 Oct 25', adtClass: 'text-on-surface' },
              { cust: 'Export Co Ltd', type: 'Existing', p: 'Whole Wing', qty: '50.00', prc: '110.00', prob: '100%', dt: '15 Oct 25', stat: 'Closed Won', statClass: 'bg-emerald-100 text-emerald-800', act: '-', adt: '-', adtClass: 'text-outline' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 font-medium text-on-surface sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low border-r border-outline-variant/50 truncate">{row.cust}</td>
                <td className="px-4 text-center border-r border-outline-variant/50 text-on-surface-variant"><span className="bg-surface-container px-2 py-0.5 rounded text-[10px]">{row.type}</span></td>
                <td className="px-4 text-on-surface-variant border-r border-outline-variant/50 truncate">{row.p}</td>
                <td className="px-4 text-right font-data-mono-num font-bold text-primary bg-blue-50/10 border-r border-outline-variant/50">{row.qty}</td>
                <td className="px-4 text-right font-data-mono-num text-on-surface border-r border-outline-variant/50">{row.prc}</td>
                <td className="px-4 text-right font-data-mono-num font-medium text-amber-700 border-r border-outline-variant/50">{row.prob}</td>
                <td className="px-4 text-center font-data-mono-num text-on-surface border-r border-outline-variant/50">{row.dt}</td>
                <td className="px-4 text-center border-r border-outline-variant/50">
                   <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.statClass}`}>
                    {row.stat}
                  </span>
                </td>
                <td className="px-4 text-on-surface border-r border-outline-variant/50 truncate">{row.act}</td>
                <td className={`px-4 text-center font-data-mono-num ${row.adtClass}`}>{row.adt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
