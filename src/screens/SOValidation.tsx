import React from 'react';

export default function SOValidation() {
  const rules = [
    { name: 'Customer Active', status: 'Pass', icon: 'check_circle', color: 'text-emerald-600', msg: 'Customer account is active and in good standing.' },
    { name: 'Ship-To Valid', status: 'Pass', icon: 'check_circle', color: 'text-emerald-600', msg: 'Ship-To address is registered in master data.' },
    { name: 'Item Active', status: 'Pass', icon: 'check_circle', color: 'text-emerald-600', msg: 'All requested items are active in product master.' },
    { name: 'Price Approved', status: 'Pass', icon: 'check_circle', color: 'text-emerald-600', msg: 'Price matches approved quotation QTN-2510-046.' },
    { name: 'Credit Valid', status: 'Warning', icon: 'warning', color: 'text-amber-600', msg: 'Credit limit utilization at 85%. Proceed with caution.' },
    { name: 'Allocation Available', status: 'Pass', icon: 'check_circle', color: 'text-emerald-600', msg: 'Sufficient allocation volume exists in ALLOC-2510-MT.' },
    { name: 'Warehouse Valid', status: 'Pass', icon: 'check_circle', color: 'text-emerald-600', msg: 'WH-A is valid for this product group.' },
    { name: 'Delivery Date Valid', status: 'Error', icon: 'cancel', color: 'text-error', msg: 'Requested delivery date falls on a public holiday (Logistics closed).' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ใบสั่งขาย (Sales Order)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">SO Validation</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Validation Checklist: DRAFT-SO-001</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container-highest border border-outline-variant rounded flex items-center gap-1.5 shadow-sm opacity-50 cursor-not-allowed">
                <span className="material-symbols-outlined text-[15px]">send_to_mobile</span>
                <span>Send to ERP</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar p-space-2xl bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto space-y-6">
           
           <div className="bg-error-container/20 border border-error-container text-error px-4 py-3 rounded-lg text-body-sm font-medium flex items-start gap-3 shadow-sm">
              <span className="material-symbols-outlined text-[20px] mt-0.5">block</span>
              <div>
                 <div className="font-bold text-[13px] mb-0.5">Validation Failed</div>
                 <div>One or more critical errors were found. The Sales Order cannot interface with the ERP system until resolved.</div>
              </div>
           </div>

           <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-outline-variant bg-surface flex justify-between items-center">
                 <h2 className="font-headline-sm font-semibold text-on-surface">System Checks</h2>
                 <span className="text-xs font-bold font-data-mono-num text-on-surface-variant">7/8 Rules Passed</span>
              </div>
              <div className="divide-y divide-outline-variant">
                 {rules.map((rule, idx) => (
                    <div key={idx} className="p-4 flex items-start gap-4 hover:bg-surface-container-low transition-colors">
                       <span className={`material-symbols-outlined text-[24px] ${rule.color}`}>{rule.icon}</span>
                       <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                             <span className="font-body-sm font-bold text-on-surface">{rule.name}</span>
                             <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                               rule.status === 'Pass' ? 'bg-emerald-50 text-emerald-700' :
                               rule.status === 'Warning' ? 'bg-amber-50 text-amber-800' :
                               'bg-error-container text-error'
                             }`}>{rule.status}</span>
                          </div>
                          <div className="text-body-sm text-on-surface-variant">{rule.msg}</div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

        </div>
      </section>
    </div>
  );
}
