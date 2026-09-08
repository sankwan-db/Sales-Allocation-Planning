import React from 'react';

export default function QuotationHistory() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ใบเสนอราคา (Quotation)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Version History</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Quotation Version History: QTN-2510-046</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">compare_arrows</span>
                <span>Compare Selected</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden max-w-5xl mx-auto">
            <table className="w-full text-right border-collapse">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant text-left">
                <tr className="h-9">
                <th className="px-4 w-12 text-center border-r border-outline-variant">Select</th>
                <th className="px-4 w-20 text-center border-r border-outline-variant">Version</th>
                <th className="px-4 w-32 border-r border-outline-variant text-center">Created Date</th>
                <th className="px-4 w-32 border-r border-outline-variant">Created By</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant">Total Qty (MT)</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant">Avg Price</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">Avg Margin</th>
                <th className="px-4 w-28 text-center">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                <tr className="h-12 bg-blue-50/10 transition-colors group">
                    <td className="px-4 text-center border-r border-outline-variant/50">
                        <input type="checkbox" defaultChecked className="rounded border-outline-variant text-primary focus:ring-primary" />
                    </td>
                    <td className="px-4 text-center font-bold text-on-surface border-r border-outline-variant/50">V3</td>
                    <td className="px-4 text-center text-on-surface-variant border-r border-outline-variant/50">22 Oct 25, 14:30</td>
                    <td className="px-4 text-left font-body-sm text-on-surface border-r border-outline-variant/50">สมชาย ขายดี</td>
                    <td className="px-4 text-right border-r border-outline-variant/50">20.00</td>
                    <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-primary">85.00</td>
                    <td className="px-4 text-right border-r border-outline-variant/50 text-emerald-600">22.5%</td>
                    <td className="px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                          Pending Approval
                        </span>
                    </td>
                </tr>
                <tr className="h-12 hover:bg-surface-container-low transition-colors group opacity-80">
                    <td className="px-4 text-center border-r border-outline-variant/50">
                        <input type="checkbox" defaultChecked className="rounded border-outline-variant text-primary focus:ring-primary" />
                    </td>
                    <td className="px-4 text-center font-bold text-on-surface border-r border-outline-variant/50">V2</td>
                    <td className="px-4 text-center text-on-surface-variant border-r border-outline-variant/50">21 Oct 25, 10:15</td>
                    <td className="px-4 text-left font-body-sm text-on-surface border-r border-outline-variant/50">สมชาย ขายดี</td>
                    <td className="px-4 text-right border-r border-outline-variant/50">20.00</td>
                    <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-on-surface bg-error-container/20">83.50</td>
                    <td className="px-4 text-right border-r border-outline-variant/50 text-emerald-600">21.0%</td>
                    <td className="px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-error-container text-error">
                          Rejected
                        </span>
                    </td>
                </tr>
                <tr className="h-12 hover:bg-surface-container-low transition-colors group opacity-60">
                    <td className="px-4 text-center border-r border-outline-variant/50">
                        <input type="checkbox" className="rounded border-outline-variant text-primary focus:ring-primary" />
                    </td>
                    <td className="px-4 text-center font-bold text-on-surface border-r border-outline-variant/50">V1</td>
                    <td className="px-4 text-center text-on-surface-variant border-r border-outline-variant/50">20 Oct 25, 09:00</td>
                    <td className="px-4 text-left font-body-sm text-on-surface border-r border-outline-variant/50">สมชาย ขายดี</td>
                    <td className="px-4 text-right border-r border-outline-variant/50">15.00</td>
                    <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-on-surface">86.00</td>
                    <td className="px-4 text-right border-r border-outline-variant/50 text-emerald-600">23.4%</td>
                    <td className="px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-container-high text-on-surface-variant">
                          Superseded
                        </span>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
      </section>
    </div>
  );
}
