import React from 'react';

export default function ContractBalance() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>สัญญาซื้อขาย (Contract)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Contract Balance</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Contract Balance Monitoring</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">file_download</span>
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Customer: All</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Status: Active</option>
          </select>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1400px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant w-32 sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Contract No</th>
              <th className="px-4 border-r border-outline-variant w-40 sticky left-[128px] z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Customer</th>
              <th className="px-4 border-r border-outline-variant w-32">Product</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-blue-50 text-blue-800">Contract Qty</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">SO Qty</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right text-emerald-700">Delivered Qty</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-surface-container-high text-on-surface font-bold">Remaining Qty</th>
              <th className="px-4 border-r border-outline-variant w-32 text-left">Utilization %</th>
              <th className="px-4 border-r border-outline-variant w-24 text-center">Start Date</th>
              <th className="px-4 border-r border-outline-variant w-24 text-center">End Date</th>
              <th className="px-4 w-28 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {[
              { no: 'CON-25-001', cust: 'Thai Union', p: 'Whole Wing', cqty: '300.00', so: '150.00', del: '120.00', rem: '150.00', util: 50, sd: '01 Jul 25', ed: '31 Dec 25', stat: 'Active', statClass: 'bg-emerald-100 text-emerald-800' },
              { no: 'CON-25-002', cust: 'Betagro', p: 'Drumstick', cqty: '200.00', so: '190.00', del: '190.00', rem: '10.00', util: 95, sd: '01 Sep 25', ed: '30 Nov 25', stat: 'Near Depletion', statClass: 'bg-amber-100 text-amber-800' },
              { no: 'CON-25-003', cust: 'Siam Fresh Food', p: 'BL Breast', cqty: '100.00', so: '10.00', del: '0.00', rem: '90.00', util: 10, sd: '01 Oct 25', ed: '31 Mar 26', stat: 'Active', statClass: 'bg-emerald-100 text-emerald-800' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-bold text-primary cursor-pointer hover:underline truncate">{row.no}</td>
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-[128px] z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm font-medium text-on-surface truncate">{row.cust}</td>
                <td className="px-4 text-left border-r border-outline-variant/50 font-body-sm text-on-surface-variant truncate">{row.p}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-primary bg-blue-50/10">{row.cqty}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-on-surface">{row.so}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-emerald-700 bg-emerald-50/10">{row.del}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-on-surface bg-surface-container/20 group-hover:bg-surface-container/40">{row.rem}</td>
                <td className="px-4 text-left border-r border-outline-variant/50">
                    <div className="flex items-center gap-2">
                       <span className={`w-8 text-right font-bold ${row.util > 90 ? 'text-amber-600' : 'text-on-surface'}`}>{row.util}%</span>
                       <div className="flex-1 h-2 bg-surface-container rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${row.util > 90 ? 'bg-amber-500' : 'bg-primary'}`} style={{ width: `${row.util}%` }}></div>
                       </div>
                    </div>
                </td>
                <td className="px-4 text-center border-r border-outline-variant/50">{row.sd}</td>
                <td className="px-4 text-center border-r border-outline-variant/50">{row.ed}</td>
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
