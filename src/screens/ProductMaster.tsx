import React from 'react';

export default function ProductMaster() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ข้อมูลหลัก (Master)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Product Master</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Product Master</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">upload</span>
                <span>Import Excel</span>
              </button>
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>New Product</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
           <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Search by Item Code or Name..." 
              className="w-full h-8 pl-9 pr-3 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Category: All</option>
            <option>Breast</option>
            <option>Wing</option>
            <option>Leg</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Status: Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse min-w-[2000px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant">
                <tr className="h-9">
                <th className="px-4 w-28 sticky left-0 z-10 bg-surface-container border-r border-outline-variant">Item Code</th>
                <th className="px-4 w-48 border-r border-outline-variant">Item Name</th>
                <th className="px-4 w-32 border-r border-outline-variant">Product Group</th>
                <th className="px-4 w-28 border-r border-outline-variant">Category</th>
                <th className="px-4 w-28 border-r border-outline-variant">Product Type</th>
                <th className="px-4 w-32 border-r border-outline-variant">Parent Product</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Base UOM</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Sales UOM</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">KG/Piece</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">KG/Case</th>
                <th className="px-4 w-28 border-r border-outline-variant">Storage Type</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant">Shelf Life</th>
                <th className="px-4 w-28 border-r border-outline-variant">Yield Group</th>
                <th className="px-4 w-28 border-r border-outline-variant">Capacity Group</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Plant</th>
                <th className="px-4 w-28 border-r border-outline-variant">Oracle ID</th>
                <th className="px-4 w-24 text-center">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {[
                { code: 'FG-BR-001', name: 'BL Breast 200g', grp: 'Raw Meat', cat: 'Breast', type: 'Finished Good', par: 'WBA', baseU: 'KG', salesU: 'CTN', kgp: '0.2', kgc: '12', strg: 'Frozen', shelf: '12 Months', yg: 'YG-BR', cg: 'CG-CUT', plant: 'P01', oracle: 'ORC-901', stat: 'Active', statClass: 'bg-emerald-100 text-emerald-800' },
                { code: 'FG-WG-005', name: 'Whole Wing 3-Joint', grp: 'Raw Meat', cat: 'Wing', type: 'Finished Good', par: 'WBA', baseU: 'KG', salesU: 'KG', kgp: '0.08', kgc: '10', strg: 'Chilled', shelf: '7 Days', yg: 'YG-WG', cg: 'CG-CUT', plant: 'P01', oracle: 'ORC-905', stat: 'Active', statClass: 'bg-emerald-100 text-emerald-800' },
                { code: 'WIP-BR-001', name: 'Bone-in Breast (WIP)', grp: 'Raw Meat', cat: 'Breast', type: 'WIP', par: 'WBA', baseU: 'KG', salesU: '-', kgp: '0.5', kgc: '-', strg: 'Chilled', shelf: '3 Days', yg: 'YG-BR-W', cg: 'CG-EVIS', plant: 'P01', oracle: 'ORC-401', stat: 'Inactive', statClass: 'bg-surface-container-high text-on-surface-variant' },
                ].map((row, i) => (
                <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 font-bold text-primary sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50 cursor-pointer hover:underline">{row.code}</td>
                    <td className="px-4 font-body-sm font-medium text-on-surface border-r border-outline-variant/50 truncate">{row.name}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50 truncate">{row.grp}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.cat}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.type}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.par}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50">{row.baseU}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50">{row.salesU}</td>
                    <td className="px-4 text-right border-r border-outline-variant/50">{row.kgp}</td>
                    <td className="px-4 text-right border-r border-outline-variant/50">{row.kgc}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.strg}</td>
                    <td className="px-4 text-right border-r border-outline-variant/50">{row.shelf}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.yg}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.cg}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50">{row.plant}</td>
                    <td className="px-4 text-on-surface-variant border-r border-outline-variant/50">{row.oracle}</td>
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
