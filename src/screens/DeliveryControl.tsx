import React from 'react';

export default function DeliveryControl() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>การจัดส่ง (Delivery)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Delivery Control</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Delivery Control</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">file_download</span>
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Status: All</option>
            <option>Pending Delivery</option>
            <option>Delivered</option>
            <option>Delayed</option>
          </select>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-right border-collapse min-w-[1600px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant text-left">
                <tr className="h-9">
                <th className="px-4 w-32 sticky left-0 z-10 bg-surface-container border-r border-outline-variant">SO</th>
                <th className="px-4 w-40 border-r border-outline-variant">Customer</th>
                <th className="px-4 w-32 border-r border-outline-variant">Product</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">Order Qty</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant text-blue-700">Allocated</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant text-amber-700">Loaded</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant text-emerald-700 font-bold bg-surface-container-high">Delivered</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Req Date</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Ship Date</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Deliv Date</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Status</th>
                <th className="px-4 w-48 text-left">Delay Reason</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {[
                { so: 'SO-2510-001', cust: 'Thai Union', p: 'Whole Wing', qty: '10,000', alloc: '10,000', load: '10,000', deliv: '10,000', req: '24 Oct 25', ship: '24 Oct 25', deld: '25 Oct 25', stat: 'Completed', statClass: 'bg-emerald-100 text-emerald-800', rsn: '-' },
                { so: 'SO-2510-005', cust: 'Siam Fresh Food', p: 'BL Breast', qty: '5,000', alloc: '5,000', load: '5,000', deliv: '-', req: '26 Oct 25', ship: '26 Oct 25', deld: '27 Oct 25 (Est)', stat: 'In Transit', statClass: 'bg-blue-100 text-blue-800', rsn: '-' },
                { so: 'SO-2510-012', cust: 'Betagro', p: 'Drumstick', qty: '2,000', alloc: '1,500', load: '0', deliv: '-', req: '25 Oct 25', ship: '-', deld: '-', stat: 'Delayed', statClass: 'bg-error-container text-error', rsn: 'Shortage of truck capacity (Carrier ABC)' },
                ].map((row, i) => (
                <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 text-left font-bold text-primary sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50 cursor-pointer hover:underline">{row.so}</td>
                    <td className="px-4 text-left font-body-sm font-medium text-on-surface border-r border-outline-variant/50 truncate">{row.cust}</td>
                    <td className="px-4 text-left font-body-sm text-on-surface-variant border-r border-outline-variant/50 truncate">{row.p}</td>
                    <td className="px-4 text-right font-bold text-on-surface border-r border-outline-variant/50">{row.qty}</td>
                    <td className="px-4 text-right text-blue-700 border-r border-outline-variant/50">{row.alloc}</td>
                    <td className="px-4 text-right text-amber-700 border-r border-outline-variant/50">{row.load}</td>
                    <td className="px-4 text-right font-bold text-emerald-700 bg-surface-container/20 group-hover:bg-surface-container/40 border-r border-outline-variant/50">{row.deliv}</td>
                    <td className="px-4 text-center text-on-surface-variant border-r border-outline-variant/50">{row.req}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50">{row.ship}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50 font-medium">{row.deld}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.statClass}`}>
                          {row.stat}
                        </span>
                    </td>
                    <td className="px-4 text-left font-body-sm text-error truncate">{row.rsn}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </section>
    </div>
  );
}
