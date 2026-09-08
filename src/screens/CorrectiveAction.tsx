import React from 'react';

export default function CorrectiveAction() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>วิเคราะห์ปัญหา (Root Cause)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Corrective Action</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Corrective & Preventive Action (CAPA)</h1>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>Assign Action</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Status: All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Priority: All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse min-w-[1600px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant">
                <tr className="h-9">
                <th className="px-4 w-28 sticky left-0 z-10 bg-surface-container border-r border-outline-variant font-bold text-primary">Action ID</th>
                <th className="px-4 w-32 border-r border-outline-variant">RC Reference</th>
                <th className="px-4 w-64 border-r border-outline-variant">Action Description</th>
                <th className="px-4 w-32 border-r border-outline-variant">Owner</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Start Date</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant bg-error-container/20 text-error">Due Date</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Priority</th>
                <th className="px-4 w-48 border-r border-outline-variant">Expected Result</th>
                <th className="px-4 w-48 border-r border-outline-variant">Actual Result</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Completion</th>
                <th className="px-4 w-28 text-center">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {[
                { actId: 'CA-2510-001', rc: 'RC-2510-045', desc: 'Adjust feed formula to improve average bird weight.', own: 'Farm Manager', start: '26 Oct 25', due: '05 Nov 25', prio: 'High', exp: 'Yield recovery to 85%', actR: '-', comp: '-', stat: 'In Progress', statClass: 'bg-amber-100 text-amber-800' },
                { actId: 'CA-2510-002', rc: 'RC-2510-042', desc: 'Source backup carrier for Export route.', own: 'Logistics Mgr', start: '25 Oct 25', due: '27 Oct 25', prio: 'High', exp: 'Secure 2 extra trucks', actR: 'Secured Carrier B', comp: '26 Oct 25', stat: 'Completed', statClass: 'bg-emerald-100 text-emerald-800' },
                { actId: 'CA-2510-005', rc: 'RC-2510-040', desc: 'Review price structure with customer.', own: 'Sales Director', start: '15 Oct 25', due: '20 Oct 25', prio: 'Medium', exp: 'Sign new price annex', actR: '-', comp: '-', stat: 'Overdue', statClass: 'bg-error-container text-error' },
                ].map((row, i) => (
                <tr key={i} className="h-12 hover:bg-surface-container-low transition-colors group">
                    <td className="px-4 font-bold text-primary sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50 cursor-pointer hover:underline">{row.actId}</td>
                    <td className="px-4 font-medium text-on-surface-variant border-r border-outline-variant/50 hover:underline cursor-pointer">{row.rc}</td>
                    <td className="px-4 font-body-sm text-on-surface border-r border-outline-variant/50 truncate max-w-sm">{row.desc}</td>
                    <td className="px-4 font-body-sm text-on-surface border-r border-outline-variant/50">{row.own}</td>
                    <td className="px-4 text-center text-on-surface-variant border-r border-outline-variant/50">{row.start}</td>
                    <td className={`px-4 text-center font-medium border-r border-outline-variant/50 ${row.stat === 'Overdue' ? 'text-error' : 'text-on-surface'}`}>{row.due}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50">
                        <span className={`font-bold ${row.prio === 'High' ? 'text-error' : 'text-amber-600'}`}>{row.prio}</span>
                    </td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50 truncate max-w-xs">{row.exp}</td>
                    <td className="px-4 font-body-sm text-on-surface border-r border-outline-variant/50 truncate max-w-xs">{row.actR}</td>
                    <td className="px-4 text-center text-on-surface-variant border-r border-outline-variant/50">{row.comp}</td>
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
