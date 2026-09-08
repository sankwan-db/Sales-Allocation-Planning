import React from 'react';

export default function PriceValidation() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ใบเสนอราคา (Quotation)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Price Validation</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Quotation Price Validation: QTN-2510-046</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">verified</span>
                <span>Submit to Approval Workflow</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="flex-1 overflow-auto custom-scrollbar p-space-2xl bg-surface-container-lowest">
        <div className="max-w-5xl mx-auto space-y-6">
           
           <div className="bg-surface border border-outline-variant rounded-lg p-6 shadow-sm text-center">
             <h2 className="font-headline-sm font-semibold text-on-surface mb-6">Price Waterfall Analysis</h2>
             
             <div className="flex items-center justify-center font-data-mono-num text-sm">
                <div className="flex flex-col items-center">
                   <div className="w-24 h-16 bg-surface-container-high rounded-t flex items-center justify-center font-bold text-on-surface-variant text-lg">65.85</div>
                   <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mt-2 font-bold">Cost</div>
                </div>
                
                <div className="w-12 border-b-2 border-dashed border-outline-variant mx-2 mt-[-30px]"></div>
                
                <div className="flex flex-col items-center relative">
                   <div className="absolute -top-6 bg-error-container text-error text-[10px] px-1.5 py-0.5 rounded font-bold">Floor Limit</div>
                   <div className="w-24 h-24 bg-surface-container rounded-t flex items-center justify-center font-bold text-error text-lg border-2 border-error/50">84.00</div>
                   <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mt-2 font-bold">Floor Price</div>
                </div>
                
                <div className="w-12 border-b-2 border-dashed border-outline-variant mx-2 mt-[-30px]"></div>

                <div className="flex flex-col items-center relative">
                   <div className="absolute -top-6 bg-emerald-50 text-emerald-700 text-[10px] px-1.5 py-0.5 rounded font-bold border border-emerald-200">Proposed</div>
                   <div className="w-24 h-[104px] bg-primary/10 rounded-t flex items-center justify-center font-bold text-primary text-xl border-2 border-primary">85.00</div>
                   <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mt-2 font-bold">Quoted Price</div>
                </div>
                
                <div className="w-12 border-b-2 border-dashed border-outline-variant mx-2 mt-[-30px]"></div>

                <div className="flex flex-col items-center">
                   <div className="w-24 h-[120px] bg-surface-container-low rounded-t flex items-center justify-center font-bold text-on-surface text-lg">90.00</div>
                   <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mt-2 font-bold">Std / Target Price</div>
                </div>
             </div>

             <div className="mt-8 flex justify-center gap-8 border-t border-outline-variant pt-6">
                <div>
                   <div className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold mb-1">Proposed Margin</div>
                   <div className="font-data-mono-num text-2xl font-bold text-emerald-600">22.5%</div>
                </div>
                <div>
                   <div className="text-[11px] text-on-surface-variant uppercase tracking-wider font-bold mb-1">Variance to Target</div>
                   <div className="font-data-mono-num text-2xl font-bold text-error">-5.5%</div>
                </div>
             </div>
           </div>

           <div className="bg-surface border border-outline-variant rounded-lg p-6 shadow-sm">
             <h2 className="font-headline-sm font-semibold text-on-surface mb-4 border-b border-outline-variant pb-2">Approval Route Required</h2>
             
             <div className="flex items-center gap-4">
                <div className="flex-1 border border-emerald-200 bg-emerald-50 rounded-lg p-4 text-center">
                   <span className="material-symbols-outlined text-emerald-600 mb-1">check_circle</span>
                   <div className="font-body-sm font-bold text-emerald-800">Auto Approve</div>
                   <div className="text-[10px] text-emerald-600 mt-1">If Quoted &ge; Target Price</div>
                </div>
                <div className="material-symbols-outlined text-outline">arrow_right_alt</div>
                <div className="flex-1 border border-primary/30 bg-primary/5 rounded-lg p-4 text-center shadow-[0_0_0_2px_rgba(var(--primary),0.3)]">
                   <span className="material-symbols-outlined text-primary mb-1">person</span>
                   <div className="font-body-sm font-bold text-primary">Sales Manager</div>
                   <div className="text-[10px] text-primary/70 mt-1">Required (Below Target, Above Floor)</div>
                </div>
                <div className="material-symbols-outlined text-outline-variant">arrow_right_alt</div>
                <div className="flex-1 border border-outline-variant bg-surface-container-lowest rounded-lg p-4 text-center opacity-50">
                   <span className="material-symbols-outlined text-on-surface-variant mb-1">group</span>
                   <div className="font-body-sm font-bold text-on-surface">Sales Director</div>
                   <div className="text-[10px] text-on-surface-variant mt-1">Required if Below Floor Price</div>
                </div>
             </div>

             <div className="mt-6 bg-blue-50 text-blue-800 p-3 rounded text-body-sm flex gap-2 items-start">
               <span className="material-symbols-outlined text-[18px]">info</span>
               <span>The quoted price of <strong>85.00 THB</strong> is below the Target Price (90.00) but above the Floor Price (84.00). This requires approval from the <strong>Sales Manager</strong>.</span>
             </div>
           </div>

        </div>
      </section>
    </div>
  );
}
