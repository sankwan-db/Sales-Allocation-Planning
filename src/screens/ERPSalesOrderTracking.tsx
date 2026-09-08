import React from 'react';

export default function ERPSalesOrderTracking() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ใบสั่งขาย (Sales Order)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">ERP Sales Order Tracking</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">ERP SO Fulfillment Status</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">refresh</span>
                <span>Refresh Status</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-right border-collapse min-w-[1300px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant text-left">
                <tr className="h-9">
                <th className="px-4 w-32 sticky left-0 z-10 bg-surface-container border-r border-outline-variant text-primary font-bold">ERP SO</th>
                <th className="px-4 w-40 border-r border-outline-variant">Customer</th>
                <th className="px-4 w-32 border-r border-outline-variant">Product</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">Order Qty</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Request Date</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Pick Status</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Ship Status</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Delivery</th>
                <th className="px-4 w-32 text-center border-r border-outline-variant">Last Sync</th>
                <th className="px-4 w-28 text-center">Order Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {[
                { erp: 'SO-ERP-99120', cust: 'Siam Fresh Food', p: 'BL Breast', qty: '5,000.00', req: '28 Oct 25', pk: 'Picked', shp: 'Pending', del: '-', sync: '25 Oct 25, 12:00', stat: 'Awaiting Shipping', statClass: 'bg-amber-100 text-amber-800' },
                { erp: 'SO-ERP-99118', cust: 'Thai Union', p: 'Whole Wing', qty: '10,000.00', req: '24 Oct 25', pk: 'Picked', shp: 'Shipped', del: 'Delivered', sync: '25 Oct 25, 12:00', stat: 'Closed', statClass: 'bg-surface-container-high text-on-surface-variant' },
                { erp: 'SO-ERP-99125', cust: 'Export Co Ltd', p: 'Drumstick', qty: '20,000.00', req: '01 Nov 25', pk: 'Pending', shp: 'Pending', del: '-', sync: '25 Oct 25, 12:00', stat: 'Booked', statClass: 'bg-blue-100 text-blue-800' },
                ].map((row, i) => (
                <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 text-left font-bold text-primary sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50 cursor-pointer hover:underline">{row.erp}</td>
                    <td className="px-4 text-left font-body-sm font-medium text-on-surface border-r border-outline-variant/50 truncate">{row.cust}</td>
                    <td className="px-4 text-left font-body-sm text-on-surface-variant border-r border-outline-variant/50 truncate">{row.p}</td>
                    <td className="px-4 text-right font-bold text-on-surface border-r border-outline-variant/50">{row.qty}</td>
                    <td className="px-4 text-center text-on-surface-variant border-r border-outline-variant/50">{row.req}</td>
                    <td className={`px-4 text-center font-body-sm font-medium border-r border-outline-variant/50 ${row.pk === 'Picked' ? 'text-emerald-600' : 'text-amber-600'}`}>{row.pk}</td>
                    <td className={`px-4 text-center font-body-sm font-medium border-r border-outline-variant/50 ${row.shp === 'Shipped' ? 'text-emerald-600' : 'text-amber-600'}`}>{row.shp}</td>
                    <td className={`px-4 text-center font-body-sm font-medium border-r border-outline-variant/50 ${row.del === 'Delivered' ? 'text-emerald-600' : 'text-on-surface-variant'}`}>{row.del}</td>
                    <td className="px-4 text-center text-on-surface-variant text-[11px] border-r border-outline-variant/50">{row.sync}</td>
                    <td className="px-4 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.statClass}`}>
                          {row.stat}
                        </span>
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
