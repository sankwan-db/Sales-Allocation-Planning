import React from 'react';

export default function SalesOpportunity() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ลูกค้าสัมพันธ์ (CRM)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Sales Opportunity</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Sales Opportunity: OPP-202510-001</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">save</span>
                <span>Save Opportunity</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stage Stepper */}
        <div className="flex items-center justify-between bg-surface-container border border-outline-variant rounded p-1 mb-2">
           {['Lead', 'Qualified', 'Contacted', 'Requirement', 'Sample', 'Quotation', 'Negotiation', 'Approval', 'Contract', 'SO'].map((stage, idx) => (
             <div key={stage} className={`flex-1 text-center py-1.5 text-[10px] font-badge-caps uppercase tracking-wider font-bold rounded ${idx === 6 ? 'bg-primary text-white shadow-sm' : (idx < 6 ? 'text-primary' : 'text-on-surface-variant')}`}>
               {stage}
             </div>
           ))}
        </div>
      </section>

      {/* FORM CONTENT */}
      <section className="flex-1 overflow-auto custom-scrollbar p-space-2xl bg-surface-container-lowest">
        <div className="max-w-5xl mx-auto space-y-6">
           
           {/* Top Summary Info */}
           <div className="grid grid-cols-4 gap-4">
              <div className="bg-surface border border-outline-variant rounded p-3 shadow-xs">
                 <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mb-1">Expected Revenue</div>
                 <div className="font-data-mono-num font-bold text-xl text-primary">฿ 1,700,000</div>
              </div>
              <div className="bg-surface border border-outline-variant rounded p-3 shadow-xs">
                 <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mb-1">Expected Margin</div>
                 <div className="font-data-mono-num font-bold text-xl text-emerald-700">22.5%</div>
              </div>
              <div className="bg-surface border border-outline-variant rounded p-3 shadow-xs">
                 <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mb-1">Probability</div>
                 <div className="font-data-mono-num font-bold text-xl text-amber-700">75%</div>
              </div>
              <div className="bg-surface border border-outline-variant rounded p-3 shadow-xs">
                 <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mb-1">Weighted Value</div>
                 <div className="font-data-mono-num font-bold text-xl text-on-surface">฿ 1,275,000</div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
             {/* General Info */}
             <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-sm space-y-4">
                <h2 className="font-headline-sm font-semibold text-on-surface pb-2 border-b border-outline-variant">General Information</h2>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Customer / Prospect</label>
                  <input type="text" defaultValue="Siam Fresh Food Co., Ltd." className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-medium" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Salesperson</label>
                  <input type="text" defaultValue="สมชาย ขายดี" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Allocation Reference</label>
                  <input type="text" defaultValue="ALLOC-2510-MT" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface-container text-on-surface-variant text-body-sm font-data-mono-num" readOnly />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Stage</label>
                     <select className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-medium text-primary">
                       <option>Negotiation</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Expected Close Date</label>
                     <input type="date" defaultValue="2025-10-31" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-data-mono-num text-on-surface" />
                   </div>
                </div>
             </div>

             {/* Deal Details */}
             <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-sm space-y-4">
                <h2 className="font-headline-sm font-semibold text-on-surface pb-2 border-b border-outline-variant">Deal Details</h2>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Product</label>
                  <select className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm">
                    <option>BL Breast (เนื้ออกลอกหนัง)</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Expected Qty (MT)</label>
                     <input type="text" defaultValue="20.00" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-data-mono-num text-right" />
                   </div>
                   <div>
                     <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Expected Price (THB/KG)</label>
                     <input type="text" defaultValue="85.00" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-data-mono-num text-right" />
                   </div>
                   <div>
                     <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Estimated Cost (THB/KG)</label>
                     <input type="text" defaultValue="65.85" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface-container text-on-surface-variant text-body-sm font-data-mono-num text-right" readOnly />
                   </div>
                   <div>
                     <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Probability (%)</label>
                     <input type="text" defaultValue="75" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-data-mono-num text-right text-amber-700 font-bold" />
                   </div>
                </div>
             </div>
           </div>

           <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-sm space-y-4">
              <h2 className="font-headline-sm font-semibold text-on-surface pb-2 border-b border-outline-variant">Requirements & Intelligence</h2>
              <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Customer Requirement (Spec)</label>
                   <textarea rows={3} className="w-full p-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm resize-none" defaultValue="ต้องการเนื้ออกสีชมพู ไม่ช้ำ ตัดแต่งมันออก 90%"></textarea>
                 </div>
                 <div>
                   <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Competitor Information</label>
                   <textarea rows={3} className="w-full p-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm resize-none" defaultValue="คู่แข่งเสนอราคาที่ 83 THB/KG แต่ลูกค้ายอมรับเรื่องคุณภาพของเราได้มากกว่า"></textarea>
                 </div>
                 <div className="grid grid-cols-2 gap-4 col-span-2">
                   <div>
                     <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Delivery Requirement</label>
                     <input type="text" defaultValue="ส่งมอบทุกวันจันทร์และพฤหัส" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm" />
                   </div>
                   <div>
                     <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Payment Term</label>
                     <select className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm">
                       <option>Credit 30 Days</option>
                     </select>
                   </div>
                 </div>
              </div>
           </div>

        </div>
      </section>
    </div>
  );
}
