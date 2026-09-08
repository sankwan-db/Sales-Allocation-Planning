import React from 'react';

export default function PriceMaster() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ข้อมูลหลัก (Master)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Price Master</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Price Master</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">history</span>
                <span>Version History</span>
              </button>
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>New Price List</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
           <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Search by Product or Customer..." 
              className="w-full h-8 pl-9 pr-3 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Channel: All</option>
            <option>Domestic</option>
            <option>Export</option>
            <option>Industrial</option>
          </select>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-right border-collapse min-w-[1200px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant text-left">
                <tr className="h-9">
                <th className="px-4 w-40 sticky left-0 z-10 bg-surface-container border-r border-outline-variant">Product</th>
                <th className="px-4 w-32 border-r border-outline-variant">Channel</th>
                <th className="px-4 w-48 border-r border-outline-variant">Customer (Optional)</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant text-primary">Target Price</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant font-bold">Standard Price</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant text-error">Floor Price</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">Cost</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant">Min Margin %</th>
                <th className="px-4 w-20 text-center border-r border-outline-variant">Currency</th>
                <th className="px-4 w-32 text-center border-r border-outline-variant">Effective Dates</th>
                <th className="px-4 w-24 text-center">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {[
                { p: 'BL Breast 200g', ch: 'Industrial', cust: 'Siam Fresh Food', tgt: '88.50', std: '85.00', flr: '80.00', cost: '75.00', minM: '6.2%', cur: 'THB', eff: '01 Oct 25 - 31 Dec 25', stat: 'Active', statClass: 'bg-emerald-100 text-emerald-800' },
                { p: 'Whole Wing', ch: 'Export', cust: 'Global Foods', tgt: '2.50', std: '2.40', flr: '2.20', cost: '1.90', minM: '13.6%', cur: 'USD', eff: '01 Nov 25 - 31 Jan 26', stat: 'Active', statClass: 'bg-emerald-100 text-emerald-800' },
                { p: 'Drumstick', ch: 'Domestic', cust: 'All', tgt: '65.00', std: '62.00', flr: '58.00', cost: '52.00', minM: '10.3%', cur: 'THB', eff: '01 Sep 25 - 31 Dec 25', stat: 'Active', statClass: 'bg-emerald-100 text-emerald-800' },
                ].map((row, i) => (
                <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 text-left font-bold text-on-surface sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50 truncate">{row.p}</td>
                    <td className="px-4 text-left font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.ch}</td>
                    <td className="px-4 text-left font-body-sm text-on-surface-variant border-r border-outline-variant/50 truncate">{row.cust}</td>
                    <td className="px-4 font-bold text-primary border-r border-outline-variant/50 bg-primary-container/10">{row.tgt}</td>
                    <td className="px-4 font-bold text-on-surface border-r border-outline-variant/50">{row.std}</td>
                    <td className="px-4 font-bold text-error border-r border-outline-variant/50 bg-error-container/10">{row.flr}</td>
                    <td className="px-4 text-on-surface-variant border-r border-outline-variant/50">{row.cost}</td>
                    <td className="px-4 font-bold text-emerald-600 border-r border-outline-variant/50">{row.minM}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50">{row.cur}</td>
                    <td className="px-4 text-center text-on-surface-variant border-r border-outline-variant/50">{row.eff}</td>
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
