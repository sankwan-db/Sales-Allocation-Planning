import React from 'react';

export default function ContractExpiry() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>สัญญาซื้อขาย (Contract)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Contract Expiry Monitoring</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Contract Expiry Monitoring</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">mail</span>
                <span>Send Renewal Notice</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-surface-container rounded p-0.5">
             <button className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded bg-surface shadow-xs text-on-surface">30 Days</button>
             <button className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded text-on-surface-variant hover:text-on-surface">60 Days</button>
             <button className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded text-on-surface-variant hover:text-on-surface">90 Days</button>
             <button className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded text-on-surface-variant hover:text-error hover:bg-error-container/20">Expired</button>
          </div>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden max-w-6xl mx-auto">
            <table className="w-full text-right border-collapse">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant text-left">
                <tr className="h-9">
                <th className="px-4 w-32 border-r border-outline-variant">Contract</th>
                <th className="px-4 w-48 border-r border-outline-variant">Customer</th>
                <th className="px-4 w-40 border-r border-outline-variant">Product</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant">Remaining Qty</th>
                <th className="px-4 w-32 text-center border-r border-outline-variant">Expiry Date</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant bg-error-container/30 text-error">Days Remaining</th>
                <th className="px-4 w-32 border-r border-outline-variant">Owner</th>
                <th className="px-4 w-32 text-center">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {[
                { no: 'CON-25-002', cust: 'Betagro', p: 'Drumstick', rem: '10.00', exp: '30 Nov 25', days: 38, owner: 'สมชาย ขายดี', statClass: 'bg-amber-100 text-amber-800' },
                { no: 'CON-25-015', cust: 'Lotus Fresh', p: 'Mixed Part', rem: '50.00', exp: '15 Nov 25', days: 23, owner: 'วิชัย มั่นคง', statClass: 'bg-error-container text-error' },
                ].map((row, i) => (
                <tr key={i} className="h-12 hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 text-left font-bold text-primary border-r border-outline-variant/50 cursor-pointer hover:underline">{row.no}</td>
                    <td className="px-4 text-left font-body-sm font-medium text-on-surface border-r border-outline-variant/50 truncate">{row.cust}</td>
                    <td className="px-4 text-left font-body-sm text-on-surface-variant border-r border-outline-variant/50 truncate">{row.p}</td>
                    <td className="px-4 font-bold text-on-surface border-r border-outline-variant/50">{row.rem}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50">{row.exp}</td>
                    <td className={`px-4 text-center font-bold text-xl border-r border-outline-variant/50 ${row.days <= 30 ? 'text-error' : 'text-amber-600'}`}>{row.days}</td>
                    <td className="px-4 text-left font-body-sm text-on-surface border-r border-outline-variant/50">{row.owner}</td>
                    <td className="px-4 text-center">
                        <button className="h-7 px-3 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 hover:bg-primary/20 rounded border border-primary/20 transition-colors">
                          Renew Contract
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </section>
    </div>
  );
}
