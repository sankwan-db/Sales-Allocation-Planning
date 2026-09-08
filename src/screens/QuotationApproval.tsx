import React from 'react';

export default function QuotationApproval() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ใบเสนอราคา (Quotation)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Quotation Approval Inbox</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Approval Inbox</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">history</span>
                <span>Approval History</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Status: Pending My Approval</option>
          </select>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-right border-collapse min-w-[1400px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant text-left">
                <tr className="h-9">
                <th className="px-4 w-32 sticky left-0 z-10 bg-surface-container border-r border-outline-variant">Quotation No</th>
                <th className="px-4 w-48 border-r border-outline-variant">Customer</th>
                <th className="px-4 w-32 border-r border-outline-variant">Salesperson</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">Qty (MT)</th>
                <th className="px-4 w-32 text-right border-r border-outline-variant">Revenue (THB)</th>
                <th className="px-4 w-28 text-right bg-blue-50 text-blue-800 border-r border-outline-variant">Quoted Price</th>
                <th className="px-4 w-28 text-right bg-surface-container-high border-r border-outline-variant">Target</th>
                <th className="px-4 w-28 text-right bg-error-container/30 text-error border-r border-outline-variant">Floor</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">Margin %</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">Deviation</th>
                <th className="px-4 w-40 text-center">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {[
                { no: 'QTN-2510-046', cust: 'Siam Fresh Food', sp: 'สมชาย ขายดี', qty: '20.00', rev: '1.7M', qp: '85.00', tgt: '90.00', flr: '84.00', mgn: '22.5%', dev: '-5.5%', devClass: 'text-amber-600' },
                { no: 'QTN-2510-047', cust: 'BKK Food Services', sp: 'วิชัย มั่นคง', qty: '15.00', rev: '0.9M', qp: '60.00', tgt: '65.00', flr: '62.00', mgn: '15.0%', dev: '-7.6%', devClass: 'text-error font-bold' },
                ].map((row, i) => (
                <tr key={i} className="h-12 hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 text-left font-bold text-primary sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50 cursor-pointer hover:underline">{row.no}</td>
                    <td className="px-4 text-left font-body-sm font-medium text-on-surface border-r border-outline-variant/50 truncate">{row.cust}</td>
                    <td className="px-4 text-left font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.sp}</td>
                    <td className="px-4 border-r border-outline-variant/50">{row.qty}</td>
                    <td className="px-4 border-r border-outline-variant/50">{row.rev}</td>
                    <td className="px-4 border-r border-outline-variant/50 font-bold text-primary bg-blue-50/10">{row.qp}</td>
                    <td className="px-4 border-r border-outline-variant/50 bg-surface-container-lowest">{row.tgt}</td>
                    <td className="px-4 border-r border-outline-variant/50 text-error">{row.flr}</td>
                    <td className="px-4 border-r border-outline-variant/50 text-emerald-600">{row.mgn}</td>
                    <td className={`px-4 border-r border-outline-variant/50 ${row.devClass}`}>{row.dev}</td>
                    <td className="px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                           <button className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center border border-emerald-200" title="Approve">
                             <span className="material-symbols-outlined text-[16px]">check</span>
                           </button>
                           <button className="w-7 h-7 rounded-full bg-error-container/30 text-error hover:bg-error-container flex items-center justify-center border border-error-container" title="Reject">
                             <span className="material-symbols-outlined text-[16px]">close</span>
                           </button>
                           <button className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest flex items-center justify-center border border-outline-variant" title="Return for Revision">
                             <span className="material-symbols-outlined text-[16px]">reply</span>
                           </button>
                        </div>
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
