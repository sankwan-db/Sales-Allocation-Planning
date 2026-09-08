import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SalesPerformance() {
  const salesVsPlanData = [
    { name: 'Export', plan: 12000, actual: 12500 },
    { name: 'Domestic', plan: 8000, actual: 7800 },
    { name: 'Industrial', plan: 5000, actual: 5200 },
    { name: 'Retail', plan: 3000, actual: 2900 },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ประสิทธิภาพ (KPI)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Sales Performance Dashboard</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Sales Performance</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>View By: Channel</option>
            <option>View By: Team</option>
            <option>View By: Salesperson</option>
            <option>View By: Product</option>
          </select>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar p-space-2xl bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto space-y-6">
           
           <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Sales vs Plan (Overall)', val: '101.4%', trend: '+1.4%', up: true },
                { label: 'Allocation Utilization', val: '95.2%', trend: '-2.0%', up: false },
                { label: 'SO Coverage (Month)', val: '88.0%', trend: '+5.0%', up: true },
                { label: 'Win Rate (Deals)', val: '42.5%', trend: '+1.2%', up: true },
              ].map((kpi, i) => (
                <div key={i} className="bg-surface border border-outline-variant rounded-lg p-4 shadow-sm flex flex-col">
                  <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-2">{kpi.label}</div>
                  <div className="flex items-end justify-between mt-auto">
                    <div className="font-headline-lg font-bold text-on-surface leading-none">{kpi.val}</div>
                    <div className={`flex items-center text-[11px] font-bold ${kpi.up ? 'text-emerald-600' : 'text-error'}`}>
                      <span className="material-symbols-outlined text-[14px]">{kpi.up ? 'trending_up' : 'trending_down'}</span>
                      {kpi.trend}
                    </div>
                  </div>
                </div>
              ))}
           </div>

           <div className="grid grid-cols-3 gap-4">
               {[
                 { label: 'Forward Coverage (M+1)', val: '45.0%', note: 'Target: 50%' },
                 { label: 'Pipeline Coverage (Ratio)', val: '3.2x', note: 'Target: 3.0x' },
                 { label: 'Avg Closing Speed', val: '14 Days', note: 'Target: < 15 Days' },
               ].map((metric, i) => (
                  <div key={i} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex items-center justify-between">
                     <div>
                        <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">{metric.label}</div>
                        <div className="text-xs text-on-surface-variant">{metric.note}</div>
                     </div>
                     <div className="font-headline-sm font-bold text-primary">{metric.val}</div>
                  </div>
               ))}
           </div>

           <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-sm">
              <h2 className="font-headline-sm font-semibold text-on-surface mb-4">Sales vs Plan (By Channel) - Volumes (MT)</h2>
              <div className="h-72">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={salesVsPlanData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                     <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                     <XAxis dataKey="name" tick={{fontSize: 12, fill: '#757575'}} axisLine={false} tickLine={false} />
                     <YAxis tick={{fontSize: 12, fill: '#757575'}} axisLine={false} tickLine={false} />
                     <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '12px' }} />
                     <Legend wrapperStyle={{ fontSize: '12px' }} />
                     <Bar dataKey="plan" name="Master Plan" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={40} />
                     <Bar dataKey="actual" name="Actual Sales" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={40} />
                   </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

        </div>
      </section>
    </div>
  );
}
