import React from 'react';

export default function RootCause() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>วิเคราะห์ปัญหา (Root Cause)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Root Cause Analysis</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Root Cause Log</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>Log New Issue</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Status: All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Category: All</option>
            <option>Sales & Demand</option>
            <option>Production & Supply</option>
            <option>Logistics</option>
          </select>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse min-w-[1800px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant">
                <tr className="h-9">
                <th className="px-4 w-28 sticky left-0 z-10 bg-surface-container border-r border-outline-variant font-bold text-primary">Issue ID</th>
                <th className="px-4 w-24 border-r border-outline-variant text-center">Period</th>
                <th className="px-4 w-32 border-r border-outline-variant">Product</th>
                <th className="px-4 w-40 border-r border-outline-variant">Customer</th>
                <th className="px-4 w-28 border-r border-outline-variant">Channel</th>
                <th className="px-4 w-32 border-r border-outline-variant">Salesperson</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant">Variance Qty</th>
                <th className="px-4 w-32 text-right border-r border-outline-variant">Impact Value</th>
                <th className="px-4 w-32 border-r border-outline-variant">Reason Category</th>
                <th className="px-4 w-32 border-r border-outline-variant">Reason Code</th>
                <th className="px-4 w-48 border-r border-outline-variant">Root Cause Detail</th>
                <th className="px-4 w-32 border-r border-outline-variant">Owner</th>
                <th className="px-4 w-28 text-center">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {[
                { id: 'RC-2510-045', pd: 'Oct 25', p: 'BL Breast', cust: 'Siam Fresh Food', ch: 'Industrial', sp: 'สมชาย ขายดี', vq: '-700', iv: '59,500', cat: 'Production & Supply', code: 'PRD-YIELD', dtl: 'Yield drop due to small bird size.', own: 'Plant Manager', stat: 'Open', statClass: 'bg-error-container text-error' },
                { id: 'RC-2510-042', pd: 'Oct 25', p: 'Drumstick', cust: 'Export Co Ltd', ch: 'Export', sp: 'วิชัย มั่นคง', vq: '-250', iv: '15,000', cat: 'Logistics', code: 'LOG-TRUCK', dtl: 'Vessel delayed by 3 days.', own: 'Logistics Mgr', stat: 'In Progress', statClass: 'bg-amber-100 text-amber-800' },
                { id: 'RC-2509-088', pd: 'Sep 25', p: 'Whole Wing', cust: 'Betagro', ch: 'Domestic', sp: 'สุดาพร รับยอด', vq: '-500', iv: '40,000', cat: 'Sales & Demand', code: 'SLS-CUST', dtl: 'Customer postponed order to next month.', own: 'Sales Director', stat: 'Resolved', statClass: 'bg-emerald-100 text-emerald-800' },
                ].map((row, i) => (
                <tr key={i} className="h-12 hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 font-bold text-primary sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50 cursor-pointer hover:underline">{row.id}</td>
                    <td className="px-4 text-center text-on-surface-variant border-r border-outline-variant/50">{row.pd}</td>
                    <td className="px-4 font-body-sm text-on-surface border-r border-outline-variant/50 truncate">{row.p}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50 truncate">{row.cust}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.ch}</td>
                    <td className="px-4 font-body-sm text-on-surface border-r border-outline-variant/50">{row.sp}</td>
                    <td className={`px-4 text-right font-bold border-r border-outline-variant/50 ${row.vq.startsWith('-') ? 'text-error' : 'text-on-surface'}`}>{row.vq}</td>
                    <td className="px-4 text-right border-r border-outline-variant/50">{row.iv}</td>
                    <td className="px-4 font-body-sm text-on-surface border-r border-outline-variant/50 truncate">{row.cat}</td>
                    <td className="px-4 font-body-sm font-medium border-r border-outline-variant/50">{row.code}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50 truncate max-w-xs">{row.dtl}</td>
                    <td className="px-4 font-body-sm text-on-surface border-r border-outline-variant/50">{row.own}</td>
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
