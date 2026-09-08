import React from 'react';

export default function SalesPipelineBoard() {
  const stages = [
    { name: 'Lead', color: 'bg-surface-container' },
    { name: 'Qualified', color: 'bg-blue-50' },
    { name: 'Requirement', color: 'bg-indigo-50' },
    { name: 'Quotation', color: 'bg-purple-50' },
    { name: 'Negotiation', color: 'bg-amber-50' },
    { name: 'Approval', color: 'bg-orange-50' },
    { name: 'Contract', color: 'bg-emerald-50' },
  ];

  const cards = [
    { id: 1, stage: 'Requirement', cust: 'Siam Fresh Food', p: 'BL Breast', qty: '20 MT', rev: '฿ 1.7M', prob: '50%', date: 'Oct 31', owner: 'สมชาย' },
    { id: 2, stage: 'Negotiation', cust: 'Thai Union', p: 'Whole Wing', qty: '50 MT', rev: '฿ 5.5M', prob: '75%', date: 'Oct 15', owner: 'วิชัย' },
    { id: 3, stage: 'Quotation', cust: 'Betagro', p: 'Drumstick', qty: '15 MT', rev: '฿ 0.9M', prob: '40%', date: 'Nov 05', owner: 'มานะ' },
    { id: 4, stage: 'Lead', cust: 'Foodland', p: 'Mixed Part', qty: '5 MT', rev: '฿ 0.3M', prob: '10%', date: 'Nov 20', owner: 'สมหญิง' },
    { id: 5, stage: 'Contract', cust: 'CP Freshmart', p: 'Chicken Frame', qty: '100 MT', rev: '฿ 1.5M', prob: '95%', date: 'Oct 10', owner: 'สมชาย' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ลูกค้าสัมพันธ์ (CRM)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Sales Pipeline Board</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Sales Pipeline Board</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>New Deal</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* KANBAN BOARD */}
      <section className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar bg-surface-container-lowest p-space-lg flex gap-4">
        {stages.map(stage => (
           <div key={stage.name} className="flex flex-col w-[260px] shrink-0 h-full">
              <div className={`h-10 flex items-center justify-between px-3 rounded-t-lg border border-outline-variant border-b-0 ${stage.color}`}>
                 <span className="font-label-sm text-xs font-bold text-on-surface uppercase tracking-wider">{stage.name}</span>
                 <span className="font-data-mono-num text-[10px] bg-white/50 px-1.5 py-0.5 rounded text-on-surface-variant font-bold">{cards.filter(c => c.stage === stage.name).length}</span>
              </div>
              <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-b-lg p-2 overflow-y-auto space-y-2">
                 {cards.filter(c => c.stage === stage.name).map(card => (
                    <div key={card.id} className="bg-surface border border-outline-variant rounded p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab">
                       <div className="flex justify-between items-start mb-2">
                          <div className="font-body-sm font-semibold text-on-surface leading-tight truncate pr-2">{card.cust}</div>
                          <span className="text-[10px] font-bold text-primary font-data-mono-num">{card.prob}</span>
                       </div>
                       <div className="text-[11px] text-on-surface-variant mb-1">{card.p}</div>
                       <div className="flex items-center justify-between text-[11px] mb-2 font-data-mono-num">
                          <span className="font-bold text-on-surface">{card.qty}</span>
                          <span className="text-emerald-700 font-bold">{card.rev}</span>
                       </div>
                       <div className="flex items-center justify-between border-t border-outline-variant pt-2 mt-2 text-[10px] text-on-surface-variant">
                          <div className="flex items-center gap-1">
                             <span className="material-symbols-outlined text-[12px]">calendar_today</span>
                             <span className="font-data-mono-num">{card.date}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-surface-container px-1.5 py-0.5 rounded">
                             <span className="material-symbols-outlined text-[12px]">person</span>
                             <span>{card.owner}</span>
                          </div>
                       </div>
                    </div>
                 ))}
                 <div className="h-full min-h-[40px] rounded border-2 border-dashed border-transparent hover:border-outline-variant transition-colors"></div>
              </div>
           </div>
        ))}
      </section>
    </div>
  );
}
