import React from 'react';

export default function SalesReallocation() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>การจัดสรรการขาย (Allocation)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">โอนย้ายโควต้า (Reallocation)</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">โอนย้ายโควต้า (Sales Reallocation)</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">swap_horiz</span>
                <span>New Transfer Request</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-lowest font-body-sm font-semibold flex items-center gap-2">
               <span className="material-symbols-outlined text-[18px]">history</span> Transfer History & Audit Trail
            </div>
            <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider">
                <tr className="border-b border-outline-variant h-9">
                <th className="px-4 w-40">Product</th>
                <th className="px-4 w-32">From Salesperson</th>
                <th className="px-4 w-32">To Salesperson</th>
                <th className="px-4 w-28 text-right bg-blue-50 text-blue-800">Transfer Qty (MT)</th>
                <th className="px-4 w-40">Reason Code</th>
                <th className="px-4">Comment</th>
                <th className="px-4 w-32 text-center">Effective Date</th>
                <th className="px-4 w-32">Requested By</th>
                <th className="px-4 w-32">Approver</th>
                <th className="px-4 w-28 text-center">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-body-sm text-body-sm">
                {[
                { p: 'BL Breast', from: 'มานะ ขยัน', to: 'วิชัย มั่นคง', qty: '10.00', rc: 'REQ-01: Client Demand Surge', cmt: 'วิชัย has excess orders', dt: '22 Oct 2025', req: 'วิชัย มั่นคง', app: 'หัวหน้าทีม A', stat: 'Approved', statClass: 'bg-emerald-100 text-emerald-800' },
                { p: 'Drumstick', from: 'สมหญิง ชิงยอด', to: 'สมชาย ขายดี', qty: '5.00', rc: 'REQ-02: Target Adjustment', cmt: 'Rebalance KPI', dt: '23 Oct 2025', req: 'สมชาย ขายดี', app: 'Pending', stat: 'Pending', statClass: 'bg-amber-100 text-amber-800' },
                ].map((row, i) => (
                <tr key={i} className="h-12 hover:bg-surface-container-low transition-colors">
                    <td className="px-4 font-medium text-on-surface truncate">{row.p}</td>
                    <td className="px-4 text-on-surface-variant">{row.from}</td>
                    <td className="px-4 text-on-surface-variant">{row.to}</td>
                    <td className="px-4 text-right font-data-mono-num font-bold text-primary bg-blue-50/10">{row.qty}</td>
                    <td className="px-4 text-on-surface-variant truncate">{row.rc}</td>
                    <td className="px-4 text-on-surface-variant truncate max-w-[200px]">{row.cmt}</td>
                    <td className="px-4 text-center font-data-mono-num text-on-surface-variant">{row.dt}</td>
                    <td className="px-4 text-on-surface-variant">{row.req}</td>
                    <td className="px-4 text-on-surface-variant">{row.app}</td>
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
