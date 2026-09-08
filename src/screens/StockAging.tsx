import React from 'react';

export default function StockAging() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>สินค้าคงคลัง (Stock)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Stock Aging</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Inventory Aging Analysis</h1>
            <div className="flex items-center gap-2">
               <div className="flex bg-surface-container rounded p-0.5 mr-2">
                 <button className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded bg-surface shadow-xs text-on-surface">Qty (MT)</button>
                 <button className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded text-on-surface-variant hover:text-on-surface">Value (THB)</button>
                 <button className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded text-on-surface-variant hover:text-on-surface">% Total</button>
               </div>
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">file_download</span>
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1400px]">
          <thead className="sticky top-0 z-20 shadow-sm">
            <tr className="bg-surface-container border-b border-outline font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant text-center">
              <th rowSpan={2} className="px-4 border-r border-outline-variant w-40 text-left sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Product Group</th>
              <th rowSpan={2} className="px-4 border-r border-outline-variant w-28 bg-surface-container-high">Total Qty (MT)</th>
              <th colSpan={5} className="px-4 border-r border-outline-variant bg-blue-50/50 text-blue-800 py-1">Chill Products (Days)</th>
              <th colSpan={7} className="px-4 border-r border-outline-variant bg-indigo-50/50 text-indigo-800 py-1">Frozen Products (Months)</th>
            </tr>
            <tr className="bg-surface-container-low border-b border-outline-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant text-right">
              {/* Chill */}
              <th className="px-3 border-r border-outline-variant w-20">D0</th>
              <th className="px-3 border-r border-outline-variant w-20">D1</th>
              <th className="px-3 border-r border-outline-variant w-20 text-amber-700">D2</th>
              <th className="px-3 border-r border-outline-variant w-20 text-error">D3</th>
              <th className="px-3 border-r border-outline-variant w-20 bg-error-container/30 text-error">D4+</th>
              {/* Frozen */}
              <th className="px-3 border-r border-outline-variant w-20">1-3 M</th>
              <th className="px-3 border-r border-outline-variant w-20">4-6 M</th>
              <th className="px-3 border-r border-outline-variant w-20">7-12 M</th>
              <th className="px-3 border-r border-outline-variant w-20 text-amber-700">13-15 M</th>
              <th className="px-3 border-r border-outline-variant w-20 text-amber-800">16-18 M</th>
              <th className="px-3 border-r border-outline-variant w-20 text-error">19-24 M</th>
              <th className="px-3 border-r border-outline-variant w-20 bg-error-container/30 text-error">24+ M</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {[
              { grp: 'Breast (เนื้ออก)', tot: '450.00', d0: '20.00', d1: '15.00', d2: '5.00', d3: '2.00', d4: '0.00', f1: '100.00', f4: '150.00', f7: '120.00', f13: '30.00', f16: '8.00', f19: '0.00', f24: '0.00' },
              { grp: 'Wing (ปีก)', tot: '320.00', d0: '10.00', d1: '10.00', d2: '0.00', d3: '0.00', d4: '0.00', f1: '50.00', f4: '80.00', f7: '100.00', f13: '50.00', f16: '20.00', f19: '0.00', f24: '0.00' },
              { grp: 'Drumstick (น่อง)', tot: '210.00', d0: '5.00', d1: '5.00', d2: '5.00', d3: '0.00', d4: '0.00', f1: '20.00', f4: '30.00', f7: '60.00', f13: '40.00', f16: '30.00', f19: '10.00', f24: '5.00' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm font-bold text-on-surface truncate">{row.grp}</td>
                <td className="px-4 border-r border-outline-variant/50 font-bold bg-surface-container/20">{row.tot}</td>
                {/* Chill */}
                <td className="px-3 border-r border-outline-variant/50 text-on-surface">{row.d0 !== '0.00' ? row.d0 : '-'}</td>
                <td className="px-3 border-r border-outline-variant/50 text-on-surface">{row.d1 !== '0.00' ? row.d1 : '-'}</td>
                <td className="px-3 border-r border-outline-variant/50 text-amber-700 font-medium">{row.d2 !== '0.00' ? row.d2 : '-'}</td>
                <td className="px-3 border-r border-outline-variant/50 text-error font-bold">{row.d3 !== '0.00' ? row.d3 : '-'}</td>
                <td className="px-3 border-r border-outline-variant/50 bg-error-container/10 text-error font-bold">{row.d4 !== '0.00' ? row.d4 : '-'}</td>
                {/* Frozen */}
                <td className="px-3 border-r border-outline-variant/50 text-on-surface">{row.f1 !== '0.00' ? row.f1 : '-'}</td>
                <td className="px-3 border-r border-outline-variant/50 text-on-surface">{row.f4 !== '0.00' ? row.f4 : '-'}</td>
                <td className="px-3 border-r border-outline-variant/50 text-on-surface">{row.f7 !== '0.00' ? row.f7 : '-'}</td>
                <td className="px-3 border-r border-outline-variant/50 text-amber-700 font-medium">{row.f13 !== '0.00' ? row.f13 : '-'}</td>
                <td className="px-3 border-r border-outline-variant/50 text-amber-800 font-bold">{row.f16 !== '0.00' ? row.f16 : '-'}</td>
                <td className="px-3 border-r border-outline-variant/50 text-error font-bold">{row.f19 !== '0.00' ? row.f19 : '-'}</td>
                <td className="px-3 border-r border-outline-variant/50 bg-error-container/10 text-error font-bold">{row.f24 !== '0.00' ? row.f24 : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
