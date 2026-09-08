import React from 'react';

export default function ChannelAllocation() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>การจัดสรรการขาย (Allocation)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">จัดสรรตามช่องทาง (Channel Allocation)</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">จัดสรรรายช่องทาง (Channel Allocation)</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">done_all</span>
                <span>Submit Approval</span>
              </button>
            </div>
          </div>
        </div>

        {/* Top Summary & Warnings */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1 bg-surface border border-outline-variant rounded p-3 flex justify-between items-center shadow-xs">
             <div>
               <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mb-1">Available Supply (MT)</div>
               <div className="font-data-mono-num font-bold text-2xl text-primary">710.00</div>
             </div>
             <span className="material-symbols-outlined text-outline/50 text-[32px]">inventory_2</span>
          </div>
          <div className="flex-1 bg-surface border border-outline-variant rounded p-3 flex justify-between items-center shadow-xs">
             <div>
               <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mb-1">Total Demand (MT)</div>
               <div className="font-data-mono-num font-bold text-2xl text-amber-900">750.00</div>
             </div>
             <span className="material-symbols-outlined text-outline/50 text-[32px]">shopping_cart</span>
          </div>
          <div className="flex-1 bg-error-container/30 border border-error-container rounded p-3 flex justify-between items-center shadow-xs relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-error"></div>
             <div>
               <div className="text-[10px] font-badge-caps uppercase tracking-wider text-error mb-1">Allocation Balance (MT)</div>
               <div className="font-data-mono-num font-bold text-2xl text-error">-40.00</div>
               <div className="text-[10px] text-error font-medium mt-1 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">warning</span> ห้าม Allocation รวมเกิน Supply</div>
             </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Product: BL Breast (เนื้ออกลอกหนัง)</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Month: October 2025</option>
          </select>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1200px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant w-48 sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Channel</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-amber-50 text-amber-900">Demand</th>
              <th className="px-4 border-r border-outline-variant w-24 text-center">Priority</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right bg-surface-container-high">Suggested Alloc.</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right bg-blue-50 text-blue-800">Manual Alloc.</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right text-emerald-700 font-bold">Approved Alloc.</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right">Confirmed SO</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Remaining</th>
              <th className="px-4 w-24 text-right">Gap (D-A)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {[
              { ch: 'Modern Trade', dem: '150.00', pri: '1', sug: '150.00', man: '150.00', app: '150.00', cso: '120.00', rem: '30.00', gap: '0.00', gapClass: 'text-on-surface-variant' },
              { ch: 'Export', dem: '200.00', pri: '1', sug: '200.00', man: '200.00', app: '200.00', cso: '180.00', rem: '20.00', gap: '0.00', gapClass: 'text-on-surface-variant' },
              { ch: 'Food Service', dem: '250.00', pri: '2', sug: '210.00', man: '210.00', app: '0.00', cso: '0.00', rem: '210.00', gap: '-40.00', gapClass: 'text-error' },
              { ch: 'Wholesale', dem: '100.00', pri: '3', sug: '100.00', man: '100.00', app: '0.00', cso: '0.00', rem: '100.00', gap: '0.00', gapClass: 'text-on-surface-variant' },
              { ch: 'Traditional Trade', dem: '50.00', pri: '4', sug: '50.00', man: '50.00', app: '0.00', cso: '0.00', rem: '50.00', gap: '0.00', gapClass: 'text-on-surface-variant' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm font-medium text-on-surface truncate">{row.ch}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-amber-900 bg-amber-50/10 group-hover:bg-amber-50/30">{row.dem}</td>
                <td className="px-4 text-center border-r border-outline-variant/50 text-on-surface-variant">P{row.pri}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 bg-surface-container-lowest group-hover:bg-surface-container-low">{row.sug}</td>
                <td className="border-r border-outline-variant/50 p-0 bg-blue-50/30 group-hover:bg-blue-50/50">
                  <input type="text" defaultValue={row.man} className="w-full h-full px-4 text-right bg-transparent focus:bg-surface focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary font-bold text-primary font-data-mono-num" />
                </td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-emerald-700 bg-emerald-50/10">{row.app}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-on-surface">{row.cso}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-on-surface-variant">{row.rem}</td>
                <td className={`px-4 text-right font-bold ${row.gapClass}`}>{row.gap}</td>
              </tr>
            ))}
             <tr className="h-10 bg-surface-container sticky bottom-0 z-20 border-t-2 border-outline font-bold">
                <td className="px-4 text-left border-r border-outline-variant sticky left-0 z-30 bg-surface-container">Total (MT)</td>
                <td className="px-4 text-right border-r border-outline-variant text-amber-900">750.00</td>
                <td className="px-4 text-center border-r border-outline-variant"></td>
                <td className="px-4 text-right border-r border-outline-variant">710.00</td>
                <td className="px-4 text-right border-r border-outline-variant text-primary">710.00</td>
                <td className="px-4 text-right border-r border-outline-variant text-emerald-700">350.00</td>
                <td className="px-4 text-right border-r border-outline-variant text-on-surface">300.00</td>
                <td className="px-4 text-right border-r border-outline-variant text-on-surface-variant">410.00</td>
                <td className="px-4 text-right text-error">-40.00</td>
             </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
