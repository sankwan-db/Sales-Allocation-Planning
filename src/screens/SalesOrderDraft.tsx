import React from 'react';

export default function SalesOrderDraft() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ใบสั่งขาย (Sales Order)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Sales Order Draft</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Sales Order Draft: DRAFT-SO-001</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-primary bg-surface border border-outline-variant hover:bg-surface-container rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">contract</span>
                <span>Create from Contract</span>
              </button>
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">fact_check</span>
                <span>Validate & Next</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar p-space-2xl bg-surface-container-lowest">
        <div className="max-w-6xl mx-auto space-y-6">
           
           <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-sm space-y-4">
              <h2 className="font-headline-sm font-semibold text-on-surface pb-2 border-b border-outline-variant">Order Header</h2>
              <div className="grid grid-cols-4 gap-4">
                 <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Customer</label>
                    <input type="text" defaultValue="Siam Fresh Food Co., Ltd." className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-medium" />
                 </div>
                 <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Salesperson</label>
                    <input type="text" defaultValue="สมชาย ขายดี" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface-container text-on-surface-variant text-body-sm" readOnly />
                 </div>
                 <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Request Date</label>
                    <input type="date" defaultValue="2025-10-25" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-data-mono-num" />
                 </div>

                 <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Bill-To</label>
                    <input type="text" defaultValue="Head Office, BKK" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm" />
                 </div>
                 <div className="col-span-2">
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Ship-To</label>
                    <input type="text" defaultValue="Factory 1, Samut Prakan" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm" />
                 </div>

                 <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Warehouse</label>
                    <select className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm">
                       <option>WH-A (Main Storage)</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Payment Term</label>
                    <select className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm">
                       <option>Credit 30 Days</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Shipping Method</label>
                    <select className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm">
                       <option>Company Truck</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Currency</label>
                    <select className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm">
                       <option>THB</option>
                    </select>
                 </div>
              </div>
           </div>

           <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden flex flex-col">
              <div className="px-5 py-3 border-b border-outline-variant bg-surface flex justify-between items-center">
                 <h2 className="font-headline-sm font-semibold text-on-surface">Order Lines</h2>
                 <button className="h-7 px-2 text-[11px] font-semibold text-primary bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 shadow-xs flex items-center gap-1 transition-colors">
                    <span className="material-symbols-outlined text-[14px]">add</span> Add Item
                 </button>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="w-full text-right border-collapse min-w-[1300px]">
                  <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant">
                     <tr className="h-9">
                        <th className="px-4 text-left w-48 sticky left-0 z-10 bg-surface-container border-r border-outline-variant">Item</th>
                        <th className="px-4 w-24 border-r border-outline-variant">Qty</th>
                        <th className="px-4 w-16 text-center border-r border-outline-variant">UOM</th>
                        <th className="px-4 w-28 bg-blue-50 text-blue-800 border-r border-outline-variant">Price</th>
                        <th className="px-4 w-32 text-left border-r border-outline-variant">Alloc. Ref</th>
                        <th className="px-4 w-32 text-left border-r border-outline-variant">Contract Ref</th>
                        <th className="px-4 w-32 text-left border-r border-outline-variant">Quotation Ref</th>
                        <th className="px-4 w-28 text-center">Request Date</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                     <tr className="h-12 bg-surface">
                        <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface font-body-sm font-medium text-on-surface">
                           <select className="w-full h-8 px-1 bg-transparent border-0 focus:ring-0 text-body-sm font-medium text-on-surface">
                             <option>BL Breast (เนื้ออกลอกหนัง)</option>
                           </select>
                        </td>
                        <td className="px-2 border-r border-outline-variant/50">
                           <input type="text" defaultValue="5,000" className="w-full h-8 px-2 text-right bg-surface border border-outline-variant rounded focus:ring-1 focus:ring-primary" />
                        </td>
                        <td className="px-2 text-center border-r border-outline-variant/50 text-on-surface-variant">KG</td>
                        <td className="px-2 border-r border-outline-variant/50 bg-blue-50/30">
                           <input type="text" defaultValue="85.00" className="w-full h-8 px-2 text-right bg-surface border border-outline-variant rounded focus:ring-1 focus:ring-primary font-bold text-primary" />
                        </td>
                        <td className="px-2 border-r border-outline-variant/50">
                           <input type="text" defaultValue="ALLOC-2510-MT" className="w-full h-8 px-2 text-left bg-surface border border-outline-variant rounded focus:ring-1 focus:ring-primary text-[11px]" />
                        </td>
                        <td className="px-2 border-r border-outline-variant/50">
                           <input type="text" placeholder="Optional" className="w-full h-8 px-2 text-left bg-surface border border-outline-variant rounded focus:ring-1 focus:ring-primary text-[11px]" />
                        </td>
                        <td className="px-2 border-r border-outline-variant/50">
                           <input type="text" defaultValue="QTN-2510-046" className="w-full h-8 px-2 text-left bg-surface border border-outline-variant rounded focus:ring-1 focus:ring-primary text-[11px]" />
                        </td>
                        <td className="px-2 text-center">
                           <input type="date" defaultValue="2025-10-30" className="w-full h-8 px-1 text-center bg-surface border border-outline-variant rounded focus:ring-1 focus:ring-primary text-xs" />
                        </td>
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
