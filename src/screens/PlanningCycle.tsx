import React from 'react';

export default function PlanningCycle() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-y-3">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
              <span>การวางแผน (Planning)</span>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <span className="text-on-surface font-semibold">รอบการวางแผน (Planning Cycle)</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">รอบการวางแผน (Planning Cycle)</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
              <span className="material-symbols-outlined text-[15px]">add</span>
              <span>Create Cycle</span>
            </button>
            <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
              <span className="material-symbols-outlined text-[15px]">content_copy</span>
              <span>Copy Version</span>
            </button>
            <button className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors">
              <span className="material-symbols-outlined text-[15px]">compare_arrows</span>
              <span>Compare Version</span>
            </button>
          </div>
        </div>
      </section>

      {/* ACTION TOOLBAR */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-2 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
            <input className="w-full h-8 pl-8 pr-3 text-body-sm bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline" placeholder="ค้นหา Cycle Name, Version..." type="text" />
          </div>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>ปีการวางแผน: 2025</option>
            <option>ปีการวางแผน: 2026</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>ทุกสถานะ (All Statuses)</option>
            <option>Draft</option>
            <option>Submitted</option>
            <option>Under Review</option>
            <option>Approved</option>
            <option>Locked</option>
            <option>Superseded</option>
          </select>
        </div>
        <div className="flex items-center gap-2 border-l border-outline-variant pl-3">
          <button className="h-8 px-2.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">send</span>
            <span>Submit</span>
          </button>
          <button className="h-8 px-2.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">check_circle</span>
            <span>Approve</span>
          </button>
          <button className="h-8 px-2.5 text-xs font-medium text-error bg-error-container/30 border border-error-container hover:bg-error-container/50 rounded flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">cancel</span>
            <span>Reject</span>
          </button>
          <button className="h-8 px-2.5 text-xs font-medium text-on-surface-variant bg-surface-container border border-outline-variant hover:text-on-surface rounded flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">lock</span>
            <span>Lock</span>
          </button>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-left border-collapse min-w-[1400px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant w-12 text-center"><input type="checkbox" className="rounded border-outline" /></th>
              <th className="px-4 border-r border-outline-variant w-24">Plan Year</th>
              <th className="px-4 border-r border-outline-variant w-48">Cycle Name</th>
              <th className="px-4 border-r border-outline-variant w-32">Cycle Type</th>
              <th className="px-4 border-r border-outline-variant w-24">Version</th>
              <th className="px-4 border-r border-outline-variant w-32">Scenario</th>
              <th className="px-4 border-r border-outline-variant w-28">Start Date</th>
              <th className="px-4 border-r border-outline-variant w-28">End Date</th>
              <th className="px-4 border-r border-outline-variant w-28 text-center">Status</th>
              <th className="px-4 border-r border-outline-variant w-32">Created By</th>
              <th className="px-4 border-r border-outline-variant w-32">Approved By</th>
              <th className="px-4 w-32">Approval Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-body-sm text-body-sm">
            {[
              { year: '2026', name: 'Annual Plan FY2026', type: 'Annual', ver: 'V2.0', scenario: 'Base Case', start: '01 Jan 2026', end: '31 Dec 2026', status: 'Under Review', statusClass: 'bg-blue-100 text-blue-800', creator: 'Supakit P.', approver: '-', appDate: '-' },
              { year: '2026', name: 'Annual Plan FY2026', type: 'Annual', ver: 'V1.0', scenario: 'Worst Case', start: '01 Jan 2026', end: '31 Dec 2026', status: 'Superseded', statusClass: 'bg-gray-100 text-gray-600', creator: 'Supakit P.', approver: 'Jiraporn K.', appDate: '15 Sep 2025' },
              { year: '2025', name: 'Q4 Monthly Replan', type: 'Monthly', ver: 'V1.0', scenario: 'Optimistic', start: '01 Oct 2025', end: '31 Dec 2025', status: 'Locked', statusClass: 'bg-slate-200 text-slate-800', creator: 'Nalinee S.', approver: 'Jiraporn K.', appDate: '28 Sep 2025' },
              { year: '2025', name: 'W43 Weekly Alloc.', type: 'Weekly', ver: 'V3.1', scenario: 'Base Case', start: '20 Oct 2025', end: '26 Oct 2025', status: 'Draft', statusClass: 'bg-surface-container-high text-on-surface-variant', creator: 'Tanit C.', approver: '-', appDate: '-' },
              { year: '2025', name: 'W42 Weekly Alloc.', type: 'Weekly', ver: 'V1.0', scenario: 'Base Case', start: '13 Oct 2025', end: '19 Oct 2025', status: 'Approved', statusClass: 'bg-emerald-100 text-emerald-800', creator: 'Tanit C.', approver: 'Supakit P.', appDate: '10 Oct 2025' },
              { year: '2025', name: 'S&OP Nov Adjust', type: 'Ad-hoc', ver: 'V1.0', scenario: 'Promotion Push', start: '01 Nov 2025', end: '30 Nov 2025', status: 'Submitted', statusClass: 'bg-amber-100 text-amber-800', creator: 'Nalinee S.', approver: '-', appDate: '-' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-center border-r border-outline-variant/50"><input type="checkbox" className="rounded border-outline" /></td>
                <td className="px-4 border-r border-outline-variant/50 font-data-mono-num">{row.year}</td>
                <td className="px-4 border-r border-outline-variant/50 font-medium text-on-surface">{row.name}</td>
                <td className="px-4 border-r border-outline-variant/50 text-on-surface-variant">{row.type}</td>
                <td className="px-4 border-r border-outline-variant/50 font-data-mono-num font-bold text-primary">{row.ver}</td>
                <td className="px-4 border-r border-outline-variant/50 text-on-surface-variant">{row.scenario}</td>
                <td className="px-4 border-r border-outline-variant/50 font-data-mono-num">{row.start}</td>
                <td className="px-4 border-r border-outline-variant/50 font-data-mono-num">{row.end}</td>
                <td className="px-4 border-r border-outline-variant/50 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.statusClass}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 border-r border-outline-variant/50 text-on-surface-variant">{row.creator}</td>
                <td className="px-4 border-r border-outline-variant/50 text-on-surface-variant">{row.approver}</td>
                <td className="px-4 text-on-surface-variant font-data-mono-num">{row.appDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
