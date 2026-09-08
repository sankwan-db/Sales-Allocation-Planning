import React from 'react';

export default function SalesContract() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>สัญญาซื้อขาย (Contract)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Sales Contract Details</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Sales Contract: CON-25-001</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">print</span>
                <span>Print Contract</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FORM CONTENT */}
      <section className="flex-1 overflow-auto custom-scrollbar p-space-2xl bg-surface-container-lowest">
        <div className="max-w-6xl mx-auto space-y-6">
           
           <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-sm space-y-4">
              <h2 className="font-headline-sm font-semibold text-on-surface pb-2 border-b border-outline-variant flex justify-between">
                <span>Header Information</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">Active</span>
              </h2>
              <div className="grid grid-cols-4 gap-4">
                 <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Customer</label>
                    <input type="text" defaultValue="Thai Union Group PCL." className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-medium" />
                 </div>
                 <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Salesperson</label>
                    <input type="text" defaultValue="วิชัย มั่นคง" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface-container text-on-surface-variant text-body-sm" readOnly />
                 </div>
                 <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Contract Type</label>
                    <select className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-medium">
                       <option>Long-Term (6 Months)</option>
                    </select>
                 </div>

                 <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Start Date</label>
                    <input type="date" defaultValue="2025-07-01" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-data-mono-num" />
                 </div>
                 <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">End Date</label>
                    <input type="date" defaultValue="2025-12-31" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-data-mono-num" />
                 </div>
                 <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Payment Term</label>
                    <select className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm">
                       <option>Credit 45 Days</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Credit Limit (THB)</label>
                    <input type="text" defaultValue="5,000,000" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-data-mono-num text-right" />
                 </div>
              </div>
           </div>

           <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="px-5 py-3 border-b border-outline-variant bg-surface">
                 <h2 className="font-headline-sm font-semibold text-on-surface">Contract Line Items</h2>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="w-full text-right border-collapse min-w-[1200px]">
                  <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant">
                     <tr className="h-9">
                        <th className="px-4 text-left w-48 sticky left-0 z-10 bg-surface-container border-r border-outline-variant">Product</th>
                        <th className="px-4 w-28 border-r border-outline-variant">Total Qty (MT)</th>
                        <th className="px-4 w-24 border-r border-outline-variant">Min Qty</th>
                        <th className="px-4 w-24 border-r border-outline-variant">Max Qty</th>
                        <th className="px-4 w-24 border-r border-outline-variant">Tolerance %</th>
                        <th className="px-4 w-32 border-r border-outline-variant bg-blue-50 text-blue-800">Fixed Price</th>
                        <th className="px-4 w-40 border-r border-outline-variant text-left">Pricing Formula</th>
                        <th className="px-4 w-32 text-center">Delivery Freq.</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                     <tr className="h-10 bg-surface">
                        <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface font-body-sm font-medium text-on-surface">Whole Wing</td>
                        <td className="px-4 border-r border-outline-variant/50 font-bold">300.00</td>
                        <td className="px-4 border-r border-outline-variant/50">280.00</td>
                        <td className="px-4 border-r border-outline-variant/50">320.00</td>
                        <td className="px-4 border-r border-outline-variant/50">+/- 5%</td>
                        <td className="px-4 border-r border-outline-variant/50 font-bold text-primary bg-blue-50/10">110.00</td>
                        <td className="px-4 border-r border-outline-variant/50 text-left text-on-surface-variant text-[11px] truncate">Fixed for 6 months</td>
                        <td className="px-4 text-center font-body-sm">Weekly</td>
                     </tr>
                     <tr className="h-10 bg-surface">
                        <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface font-body-sm font-medium text-on-surface">Drumstick</td>
                        <td className="px-4 border-r border-outline-variant/50 font-bold">150.00</td>
                        <td className="px-4 border-r border-outline-variant/50">140.00</td>
                        <td className="px-4 border-r border-outline-variant/50">160.00</td>
                        <td className="px-4 border-r border-outline-variant/50">+/- 5%</td>
                        <td className="px-4 border-r border-outline-variant/50 font-bold text-primary bg-blue-50/10">-</td>
                        <td className="px-4 border-r border-outline-variant/50 text-left text-on-surface-variant text-[11px] truncate">Market Price - 2%</td>
                        <td className="px-4 text-center font-body-sm">Bi-weekly</td>
                     </tr>
                  </tbody>
                </table>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
