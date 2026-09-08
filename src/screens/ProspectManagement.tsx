import React from 'react';

export default function ProspectManagement() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ลูกค้าสัมพันธ์ (CRM)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Prospect Management</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Prospect Management</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">close</span>
                <span>Close Prospect</span>
              </button>
              <button className="h-8 px-3 text-xs font-semibold text-primary bg-surface-container-lowest border border-outline-variant hover:bg-surface-container rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">monetization_on</span>
                <span>Create Opportunity</span>
              </button>
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">save</span>
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FORM CONTENT */}
      <section className="flex-1 overflow-auto custom-scrollbar p-space-2xl bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto space-y-6">
           
           <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-sm">
             <h2 className="font-headline-sm font-semibold text-on-surface mb-4 pb-2 border-b border-outline-variant">Prospect Information</h2>
             <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Prospect Name</label>
                  <input type="text" defaultValue="Siam Fresh Food Co., Ltd." className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-medium" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Status</label>
                  <select className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-medium text-emerald-700 bg-emerald-50">
                    <option>Active</option>
                    <option>Converted</option>
                    <option>Closed Lost</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Industry</label>
                  <input type="text" defaultValue="Food Manufacturing" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Channel</label>
                  <select className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm">
                    <option>Food Service</option>
                    <option>Modern Trade</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Region</label>
                  <input type="text" defaultValue="Bangkok & Vicinity" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Lead Source</label>
                  <select className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm">
                    <option>Trade Show (Thaifex 2025)</option>
                    <option>Referral</option>
                    <option>Cold Call</option>
                  </select>
                </div>
             </div>
           </div>

           <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-sm">
             <h2 className="font-headline-sm font-semibold text-on-surface mb-4 pb-2 border-b border-outline-variant">Contact & Assignment</h2>
             <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Contact Person</label>
                  <input type="text" defaultValue="คุณสมศักดิ์ เจริญพร (Purchasing Manager)" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Salesperson (Owner)</label>
                  <select className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-medium">
                    <option>สมชาย ขายดี</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Phone</label>
                  <input type="text" defaultValue="089-123-4567" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Email</label>
                  <input type="email" defaultValue="somsak@siamfresh.com" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm" />
                </div>
             </div>
           </div>

           <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-sm border-l-4 border-l-primary">
             <h2 className="font-headline-sm font-semibold text-on-surface mb-4 pb-2 border-b border-outline-variant">Expected Demand Details</h2>
             <div className="grid grid-cols-3 gap-x-6 gap-y-4">
                <div className="col-span-3 md:col-span-1">
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Expected Product</label>
                  <select className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm">
                    <option>BL Breast (เนื้ออกลอกหนัง)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Expected Qty (MT/Month)</label>
                  <input type="text" defaultValue="20.00" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-data-mono-num font-bold text-primary text-right" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Target Price (THB/KG)</label>
                  <input type="text" defaultValue="85.00" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-data-mono-num text-right" />
                </div>
                <div className="col-span-3 md:col-span-1">
                  <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Expected Close Date</label>
                  <input type="date" defaultValue="2025-10-31" className="w-full h-9 px-3 border border-outline-variant rounded bg-surface focus:ring-1 focus:ring-primary text-body-sm font-data-mono-num text-on-surface" />
                </div>
             </div>
           </div>

        </div>
      </section>
    </div>
  );
}
