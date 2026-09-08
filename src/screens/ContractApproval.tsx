import React from 'react';

export default function ContractApproval() {
  const workflow = [
    { step: 'Sales', owner: 'สมชาย ขายดี', status: 'Approved', date: '25 Oct 25, 09:00', cmt: 'Submitted for approval.' },
    { step: 'Sales Manager', owner: 'หัวหน้าทีม A', status: 'Approved', date: '25 Oct 25, 11:30', cmt: 'Volume looks good, aligned with plan.' },
    { step: 'Finance', owner: 'สมศรี การเงิน', status: 'Pending', date: '-', cmt: '-' },
    { step: 'Legal', owner: 'นิติกร ประจำบริษัท', status: 'Waiting', date: '-', cmt: '-' },
    { step: 'Sales Director', owner: 'ผู้อำนวยการฝ่ายขาย', status: 'Waiting', date: '-', cmt: '-' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>สัญญาซื้อขาย (Contract)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Contract Approval</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Contract Approval: CON-25-001</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">send</span>
                <span>Send Reminder</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar p-space-2xl bg-surface-container-lowest">
        <div className="max-w-5xl mx-auto space-y-6">
           
           <div className="bg-surface border border-outline-variant rounded-lg p-6 shadow-sm text-center">
             <h2 className="font-headline-sm font-semibold text-on-surface mb-6">Approval Workflow</h2>
             <div className="flex items-center justify-center">
                {workflow.map((item, idx) => (
                  <React.Fragment key={item.step}>
                    <div className="flex flex-col items-center w-28 relative">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 bg-surface ${
                         item.status === 'Approved' ? 'border-emerald-600 text-emerald-600 bg-emerald-50' :
                         item.status === 'Pending' ? 'border-amber-500 text-amber-600 bg-amber-50' :
                         'border-outline-variant text-outline-variant'
                       }`}>
                         <span className="material-symbols-outlined text-[18px]">
                           {item.status === 'Approved' ? 'check' : item.status === 'Pending' ? 'hourglass_empty' : 'lock'}
                         </span>
                       </div>
                       <div className={`mt-3 text-[11px] font-bold uppercase tracking-wider ${item.status === 'Approved' ? 'text-emerald-700' : item.status === 'Pending' ? 'text-amber-700' : 'text-on-surface-variant'}`}>{item.step}</div>
                       <div className="text-[10px] text-on-surface-variant mt-0.5 truncate w-full px-1">{item.owner}</div>
                    </div>
                    {idx < workflow.length - 1 && (
                      <div className={`flex-1 h-1 max-w-[60px] mx-1 rounded ${item.status === 'Approved' ? 'bg-emerald-500' : 'bg-outline-variant'}`}></div>
                    )}
                  </React.Fragment>
                ))}
             </div>
             
             <div className="mt-8 pt-6 border-t border-outline-variant bg-amber-50/50 rounded p-4 inline-flex flex-col items-center min-w-[300px]">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800 mb-1">Current Action Required By</div>
                <div className="font-body-sm font-bold text-on-surface">สมศรี การเงิน (Finance)</div>
                <div className="text-[11px] text-on-surface-variant mt-1">Pending since: 25 Oct 25, 11:30</div>
             </div>
           </div>

           <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-outline-variant bg-surface">
                 <h2 className="font-headline-sm font-semibold text-on-surface">Approval Timeline & Comments</h2>
              </div>
              <div className="p-6">
                 <div className="space-y-6 relative">
                    <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-outline-variant"></div>
                    
                    {workflow.filter(w => w.status !== 'Waiting').map((item, i) => (
                       <div key={i} className="relative pl-12">
                          <div className={`absolute left-2 top-1 w-4 h-4 rounded-full ring-4 ring-surface z-10 flex items-center justify-center ${
                             item.status === 'Approved' ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}>
                            <span className="material-symbols-outlined text-[10px] text-white">
                               {item.status === 'Approved' ? 'check' : 'pending'}
                            </span>
                          </div>
                          
                          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4">
                             <div className="flex justify-between items-start mb-2">
                                <div className="font-body-sm font-bold text-on-surface">{item.step} <span className="text-on-surface-variant font-normal">({item.owner})</span></div>
                                <span className="text-[10px] font-data-mono-num text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">{item.date}</span>
                             </div>
                             <div className="text-body-sm text-on-surface-variant bg-surface-container-low p-2 rounded border border-outline-variant/50">
                                {item.cmt}
                             </div>
                             
                             {item.step === 'Sales' && (
                                <div className="mt-3 pt-3 border-t border-outline-variant flex gap-2">
                                   <div className="flex items-center gap-1 text-[11px] text-primary bg-primary/10 px-2 py-1 rounded cursor-pointer hover:bg-primary/20">
                                      <span className="material-symbols-outlined text-[14px]">attachment</span>
                                      Contract_Draft_CON-25-001.pdf
                                   </div>
                                </div>
                             )}
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

        </div>
      </section>
    </div>
  );
}
