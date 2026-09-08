import React from 'react';

export default function ByProductProjection() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>สมดุลความต้องการ (Balance)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">By-Product Projection</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">คาดการณ์ By-Product</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">file_download</span>
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
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
              <th className="px-4 border-r border-outline-variant w-56 sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Source RM</th>
              <th className="px-4 border-r border-outline-variant w-48">Primary FG</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right">Production Qty</th>
              <th className="px-4 border-r border-outline-variant w-48 font-bold text-on-surface">By Product</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">By Prod Yield</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right font-bold text-primary bg-surface-container-high">Projected Qty</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right">Sales Plan</th>
              <th className="px-4 w-32 text-right">Surplus/Shortage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {[
              { rm: 'Carcass (ไก่ซาก)', pfg: 'Main Part (ชิ้นส่วนหลัก)', pq: '3,000.00', bp: 'Chicken Frame (โครงไก่)', bpy: '18.00%', pj: '540.00', sp: '450.00', ss: '+90.00', ssClass: 'text-amber-600' },
              { rm: 'Carcass (ไก่ซาก)', pfg: 'Main Part (ชิ้นส่วนหลัก)', pq: '3,000.00', bp: 'Chicken Head (หัวไก่)', bpy: '4.50%', pj: '135.00', sp: '135.00', ss: '0.00', ssClass: 'text-on-surface-variant' },
              { rm: 'Carcass (ไก่ซาก)', pfg: 'Main Part (ชิ้นส่วนหลัก)', pq: '3,000.00', bp: 'Chicken Feet (ตีนไก่)', bpy: '3.80%', pj: '114.00', sp: '150.00', ss: '-36.00', ssClass: 'text-error' },
              { rm: 'Breast (เนื้ออก)', pfg: 'BL Breast (เนื้ออกลอกหนัง)', pq: '660.00', bp: 'Chicken Skin (หนังไก่)', bpy: '8.00%', pj: '52.80', sp: '50.00', ss: '+2.80', ssClass: 'text-amber-600' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm text-on-surface-variant truncate">{row.rm}</td>
                <td className="px-4 text-left border-r border-outline-variant/50 font-body-sm text-on-surface-variant truncate">{row.pfg}</td>
                <td className="px-4 text-right border-r border-outline-variant/50">{row.pq}</td>
                <td className="px-4 text-left border-r border-outline-variant/50 font-body-sm font-medium text-on-surface truncate">{row.bp}</td>
                <td className="px-4 text-right border-r border-outline-variant/50">{row.bpy}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-primary bg-surface-container/20 group-hover:bg-surface-container/40">{row.pj}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 font-medium text-on-surface">{row.sp}</td>
                <td className={`px-4 text-right font-bold ${row.ssClass}`}>{row.ss}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
