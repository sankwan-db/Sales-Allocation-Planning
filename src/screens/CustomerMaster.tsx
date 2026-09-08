import React from 'react';

export default function CustomerMaster() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ข้อมูลหลัก (Master)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Customer Master</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Customer Master</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>New Customer</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
           <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              placeholder="Search by Code or Name..." 
              className="w-full h-8 pl-9 pr-3 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Channel: All</option>
            <option>Domestic</option>
            <option>Export</option>
            <option>Industrial</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Tier: All</option>
            <option>Tier 1</option>
            <option>Tier 2</option>
            <option>Tier 3</option>
          </select>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse min-w-[1800px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant">
                <tr className="h-9">
                <th className="px-4 w-28 sticky left-0 z-10 bg-surface-container border-r border-outline-variant">Customer Code</th>
                <th className="px-4 w-48 border-r border-outline-variant">Customer Name</th>
                <th className="px-4 w-28 border-r border-outline-variant">Channel</th>
                <th className="px-4 w-32 border-r border-outline-variant">Team</th>
                <th className="px-4 w-32 border-r border-outline-variant">Salesperson</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Tier</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Priority</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Strategic</th>
                <th className="px-4 w-32 border-r border-outline-variant">Payment Term</th>
                <th className="px-4 w-28 border-r border-outline-variant">Credit Term</th>
                <th className="px-4 w-32 border-r border-outline-variant">Region</th>
                <th className="px-4 w-28 border-r border-outline-variant">Oracle ID</th>
                <th className="px-4 w-24 text-center">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {[
                { code: 'C-00120', name: 'Siam Fresh Food Co., Ltd.', ch: 'Industrial', team: 'B2B Sales', sp: 'สมชาย ขายดี', tier: 'Tier 1', prio: 'High', strat: 'Yes', pt: 'Bank Transfer', ct: '30 Days', reg: 'Central', oracle: 'CUST-1020', stat: 'Active', statClass: 'bg-emerald-100 text-emerald-800' },
                { code: 'C-00215', name: 'Thai Union Group', ch: 'Domestic', team: 'Domestic MT', sp: 'สุดาพร รับยอด', tier: 'Tier 1', prio: 'High', strat: 'Yes', pt: 'Credit', ct: '45 Days', reg: 'Central', oracle: 'CUST-3040', stat: 'Active', statClass: 'bg-emerald-100 text-emerald-800' },
                { code: 'C-00405', name: 'Global Foods Trading', ch: 'Export', team: 'Export ASIA', sp: 'วิชัย มั่นคง', tier: 'Tier 2', prio: 'Medium', strat: 'No', pt: 'L/C', ct: '60 Days', reg: 'APAC', oracle: 'CUST-8090', stat: 'Active', statClass: 'bg-emerald-100 text-emerald-800' },
                ].map((row, i) => (
                <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 font-bold text-primary sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50 cursor-pointer hover:underline">{row.code}</td>
                    <td className="px-4 font-body-sm font-medium text-on-surface border-r border-outline-variant/50 truncate">{row.name}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.ch}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50 truncate">{row.team}</td>
                    <td className="px-4 font-body-sm text-on-surface border-r border-outline-variant/50 truncate">{row.sp}</td>
                    <td className="px-4 text-center font-bold text-on-surface border-r border-outline-variant/50">{row.tier}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50">
                        <span className={`font-bold ${row.prio === 'High' ? 'text-error' : 'text-amber-600'}`}>{row.prio}</span>
                    </td>
                    <td className="px-4 text-center border-r border-outline-variant/50">
                        {row.strat === 'Yes' && <span className="material-symbols-outlined text-[16px] text-amber-500">star</span>}
                    </td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.pt}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.ct}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">{row.reg}</td>
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
