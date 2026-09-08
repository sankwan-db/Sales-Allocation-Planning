import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function DeliveryPerformance() {
  const otifData = [
    { name: 'W1', onTime: 95, inFull: 98, otif: 93 },
    { name: 'W2', onTime: 96, inFull: 99, otif: 95 },
    { name: 'W3', onTime: 88, inFull: 92, otif: 82 },
    { name: 'W4', onTime: 97, inFull: 98, otif: 95 },
  ];

  const delayData = [
    { reason: 'Production Delay', count: 15 },
    { reason: 'Truck Shortage', count: 28 },
    { reason: 'QA Hold', count: 8 },
    { reason: 'Traffic/Weather', count: 5 },
  ];

  const serviceLevelData = [
    { name: 'Exceeded', value: 400, color: '#10b981' },
    { name: 'Met', value: 300, color: '#3b82f6' },
    { name: 'Failed', value: 50, color: '#ef4444' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>การจัดส่ง (Delivery)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Delivery Performance Dashboard</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Delivery Performance</h1>
            <div className="flex items-center gap-2">
              <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
                <option>This Month (Oct 2025)</option>
                <option>Last Month</option>
                <option>Q3 2025</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar p-space-2xl bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto space-y-6">
           
           {/* KPIs */}
           <div className="grid grid-cols-5 gap-4">
              {[
                { label: 'Delivery Achievement', val: '94.2%', trend: '+1.2%', up: true },
                { label: 'Fill Rate', val: '98.5%', trend: '+0.5%', up: true },
                { label: 'On-Time %', val: '93.0%', trend: '-2.1%', up: false },
                { label: 'In-Full %', val: '97.8%', trend: '+0.1%', up: true },
                { label: 'OTIF %', val: '91.5%', trend: '-1.8%', up: false },
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

           {/* Charts */}
           <div className="grid grid-cols-2 gap-6">
              <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-sm">
                 <h2 className="font-headline-sm font-semibold text-on-surface mb-4">OTIF Trend (%)</h2>
                 <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={otifData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                        <XAxis dataKey="name" tick={{fontSize: 12, fill: '#757575'}} axisLine={false} tickLine={false} />
                        <YAxis domain={[80, 100]} tick={{fontSize: 12, fill: '#757575'}} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Line type="monotone" dataKey="otif" name="OTIF" stroke="#0ea5e9" strokeWidth={3} dot={{r: 4}} />
                        <Line type="monotone" dataKey="onTime" name="On-Time" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" />
                        <Line type="monotone" dataKey="inFull" name="In-Full" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="4 4" />
                      </LineChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-sm">
                 <h2 className="font-headline-sm font-semibold text-on-surface mb-4">Delivery Delay by Reason</h2>
                 <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={delayData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" horizontal={true} vertical={false} />
                        <XAxis type="number" tick={{fontSize: 12, fill: '#757575'}} axisLine={false} tickLine={false} />
                        <YAxis dataKey="reason" type="category" tick={{fontSize: 11, fill: '#424242', fontWeight: 500}} axisLine={false} tickLine={false} width={100} />
                        <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '12px' }} />
                        <Bar dataKey="count" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={24} />
                      </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>

              <div className="bg-surface border border-outline-variant rounded-lg p-5 shadow-sm col-span-2">
                 <h2 className="font-headline-sm font-semibold text-on-surface mb-4">Customer Service Level Breakdown</h2>
                 <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={serviceLevelData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                          {serviceLevelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '12px' }} />
                        <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 500 }} />
                      </PieChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>

        </div>
      </section>
    </div>
  );
}
