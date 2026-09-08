import React from 'react';

export default function ProductTransformation() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ข้อมูลหลัก (Master)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Product Transformation (BOM)</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Product Transformation</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>New BOM</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
           <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Search Source or Output Product..." 
              className="w-full h-8 pl-9 pr-3 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Plant: All</option>
            <option>P01</option>
            <option>P02</option>
          </select>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant">
                <tr className="h-9">
                <th className="px-4 w-48 sticky left-0 z-10 bg-surface-container border-r border-outline-variant">Source Product</th>
                <th className="px-4 w-48 border-r border-outline-variant">Output Product</th>
                <th className="px-4 w-40 border-r border-outline-variant">Relationship Type</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">Yield %</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">Loss %</th>
                <th className="px-4 w-48 border-r border-outline-variant">By Product (if any)</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Plant</th>
                <th className="px-4 w-32 text-center border-r border-outline-variant">Effective Date</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Version</th>
                <th className="px-4 w-24 text-center">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {[
                { src: 'Live Bird (Farm)', out: 'Whole Bird (WBA)', type: 'Slaughtering', yield: '78.5%', loss: '2.0%', byp: 'Blood, Feathers', plant: 'P01', eff: '01 Jan 25 - 31 Dec 25', ver: 'v2.1', stat: 'Active', statClass: 'bg-emerald-100 text-emerald-800' },
                { src: 'Whole Bird (WBA)', out: 'Bone-in Breast', type: 'Cutting', yield: '25.0%', loss: '1.5%', byp: 'Skin, Bone', plant: 'P01', eff: '01 Jan 25 - 31 Dec 25', ver: 'v1.5', stat: 'Active', statClass: 'bg-emerald-100 text-emerald-800' },
                { src: 'Bone-in Breast', out: 'BL Breast 200g', type: 'Deboning', yield: '80.0%', loss: '3.0%', byp: 'Frame', plant: 'P02', eff: '01 Jan 25 - 31 Dec 25', ver: 'v1.0', stat: 'Active', statClass: 'bg-emerald-100 text-emerald-800' },
                ].map((row, i) => (
                <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 font-bold text-on-surface sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50">{row.src}</td>
                    <td className="px-4 font-bold text-primary border-r border-outline-variant/50 hover:underline cursor-pointer">{row.out}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.type}</td>
                    <td className="px-4 font-bold text-emerald-600 text-right border-r border-outline-variant/50">{row.yield}</td>
                    <td className="px-4 text-error text-right border-r border-outline-variant/50">{row.loss}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50 truncate">{row.byp}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50">{row.plant}</td>
                    <td className="px-4 text-center text-on-surface-variant border-r border-outline-variant/50">{row.eff}</td>
                    <td className="px-4 text-center text-on-surface-variant border-r border-outline-variant/50">{row.ver}</td>
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
