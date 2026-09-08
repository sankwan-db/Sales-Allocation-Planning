import React from 'react';

export default function CustomerFollowUp() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ลูกค้าสัมพันธ์ (CRM)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Customer Follow-up</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Customer Follow-up Timeline</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>Log Activity</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
              <input className="w-full h-8 pl-8 pr-3 text-body-sm font-body-sm bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline" placeholder="Search Customer..." type="text" />
          </div>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Customer: Siam Fresh Food Co., Ltd.</option>
          </select>
        </div>
      </section>

      {/* TIMELINE CONTENT */}
      <section className="flex-1 overflow-auto custom-scrollbar p-space-2xl bg-surface-container-lowest">
        
        {/* Alerts */}
        <div className="mb-6 space-y-2 max-w-4xl mx-auto">
           <div className="bg-error-container/20 border border-error-container text-error px-4 py-2 rounded-lg text-body-sm font-medium flex items-center gap-2 shadow-xs">
              <span className="material-symbols-outlined text-[18px]">warning</span>
              Follow-up Overdue: Quotation follow up was due on Oct 20, 2025.
           </div>
        </div>

        <div className="max-w-4xl mx-auto relative">
           <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-outline-variant"></div>

           <div className="space-y-6">
              
              {/* Activity 1 (Future / Next Action) */}
              <div className="relative pl-16">
                 <div className="absolute left-[20px] top-1 w-3.5 h-3.5 bg-error rounded-full ring-4 ring-surface-container-lowest z-10"></div>
                 <div className="font-label-sm text-xs font-bold text-error mb-2 tracking-wider">NEXT ACTION (OVERDUE)</div>
                 <div className="bg-surface border border-error-container rounded-lg p-4 shadow-sm relative">
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-error">call</span>
                          <span className="font-body-sm font-bold text-on-surface">Call to negotiate quotation price</span>
                       </div>
                       <span className="text-[10px] font-data-mono-num font-bold bg-error-container text-error px-2 py-0.5 rounded">Due: 20 Oct 25</span>
                    </div>
                    <div className="text-body-sm text-on-surface-variant mb-2">Target price is 85 THB/KG, need to close within this week.</div>
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-outline-variant">
                       <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Owner:</span>
                       <span className="text-[11px] font-medium text-on-surface bg-surface-container px-2 py-0.5 rounded">สมชาย ขายดี</span>
                    </div>
                 </div>
              </div>

              {/* Activity 2 */}
              <div className="relative pl-16 opacity-80">
                 <div className="absolute left-[18px] top-1 w-4 h-4 bg-purple-500 rounded-full ring-4 ring-surface-container-lowest z-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[10px] text-white">request_quote</span>
                 </div>
                 <div className="font-data-mono-num text-[11px] font-bold text-on-surface-variant mb-1">15 Oct 2025, 14:30</div>
                 <div className="bg-surface border border-outline-variant rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                       <div className="font-body-sm font-bold text-on-surface">Sent Quotation</div>
                    </div>
                    <div className="text-body-sm text-on-surface-variant mb-2">Sent QTN-2510-045 via email. Quoted 20 MT at 86.50 THB/KG.</div>
                    <div className="flex items-center gap-2">
                       <div className="flex items-center gap-1 text-[11px] text-primary bg-primary/10 px-2 py-1 rounded cursor-pointer hover:bg-primary/20">
                          <span className="material-symbols-outlined text-[14px]">attachment</span>
                          QTN-2510-045.pdf
                       </div>
                    </div>
                 </div>
              </div>

              {/* Activity 3 */}
              <div className="relative pl-16 opacity-80">
                 <div className="absolute left-[18px] top-1 w-4 h-4 bg-indigo-500 rounded-full ring-4 ring-surface-container-lowest z-10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[10px] text-white">science</span>
                 </div>
                 <div className="font-data-mono-num text-[11px] font-bold text-on-surface-variant mb-1">10 Oct 2025, 10:00</div>
                 <div className="bg-surface border border-outline-variant rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                       <div className="font-body-sm font-bold text-on-surface">Sample Testing</div>
                    </div>
                    <div className="text-body-sm text-on-surface-variant mb-2">Customer tested 5KG sample of BL Breast. Result: Approved. Color and trimming match spec.</div>
                    <div className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block mt-1">Result: Approved</div>
                 </div>
              </div>

           </div>
        </div>
      </section>
    </div>
  );
}
