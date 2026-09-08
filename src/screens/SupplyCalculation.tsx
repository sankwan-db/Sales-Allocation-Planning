import React, { useState } from 'react';

export default function SupplyCalculation() {
  const [filters, setFilters] = useState({
    chickenType: 'BROILER',
    breed: 'BR01',
    weightRange: '2.2-2.5 kg',
    plant: 'Plant 01',
    month: 'Oct 2027',
    version: 'V01'
  });

  const nodes = [
    { level: 1, name: 'Chicken Type', value: 'Broiler' },
    { level: 2, name: 'Breed', value: 'Ross 308 (BR01)' },
    { level: 3, name: 'Bird Qty (Heads)', plan: 800000, yield: '-', calc: 800000, act: 802000, actY: '-', var: '+2000' },
    { level: 4, name: 'Avg Weight (kg)', plan: 2.45, yield: '-', calc: 2.45, act: 2.46, actY: '-', var: '+0.01' },
    { level: 5, name: 'Live KG', plan: 1960000, yield: '-', calc: 1960000, act: 1972920, actY: '-', var: '+12920' },
    { level: 6, name: 'Carcass', plan: 1470000, yield: '75.0%', calc: 1470000, act: 1485000, actY: '75.2%', var: '+15000' },
    { level: 7, name: 'Main Part (Breast, Leg, Wing)', plan: 980000, yield: '50.0%', calc: 980000, act: 982000, actY: '49.8%', var: '+2000' },
    { level: 8, name: 'Special Product', plan: 196000, yield: '10.0%', calc: 196000, act: 198000, actY: '10.0%', var: '+2000' },
    { level: 9, name: 'By Product (Bone, Blood, Feathers)', plan: 294000, yield: '15.0%', calc: 294000, act: 298000, actY: '15.1%', var: '+4000' }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-surface-container-low overflow-hidden">
      <div className="bg-surface border-b border-outline-variant px-6 py-4 flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-1">
            <span className="material-symbols-outlined text-[16px]">egg</span>
            <span>Planning & Supply</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="font-semibold text-primary">Supply Calculation Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Supply Calculation Engine</h1>
        </div>
      </div>
      
      <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-6">
        <div className="card p-4 border border-outline-variant flex flex-wrap gap-4 items-center">
          {Object.keys(filters).map((k) => (
             <div key={k} className="flex flex-col gap-1">
                <label className="text-xs text-on-surface-variant capitalize">{k.replace(/([A-Z])/g, ' $1')}</label>
                <select className="input-field bg-surface text-sm py-1.5 min-w-[120px]">
                   <option>{(filters as any)[k]}</option>
                </select>
             </div>
          ))}
          <div className="ml-auto flex gap-2">
            <button className="btn-secondary py-1.5 text-sm">Reset</button>
            <button className="btn-primary py-1.5 text-sm">Calculate</button>
          </div>
        </div>

        <div className="card p-6 border border-outline-variant">
          <h2 className="text-lg font-bold text-on-surface mb-4">Calculation Tree</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-surface-container-low text-on-surface-variant font-medium">
                <tr>
                  <th className="px-4 py-3 border-b border-outline-variant">Node</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-right">Plan Qty</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-right">Yield Used</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-right text-primary">Calculated Qty</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-right">Actual Qty</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-right">Actual Yield</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-right">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {nodes.map((n, i) => (
                  <tr key={i} className="hover:bg-surface-container-low/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2" style={{ paddingLeft: `${(n.level - 1) * 16}px` }}>
                        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                          {n.level <= 2 ? 'category' : 'subdirectory_arrow_right'}
                        </span>
                        <span className="font-medium text-on-surface">{n.name} {n.value && `- ${n.value}`}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">{n.plan?.toLocaleString() || '-'}</td>
                    <td className="px-4 py-3 text-right text-on-surface-variant">{n.yield || '-'}</td>
                    <td className="px-4 py-3 text-right font-bold text-primary">{n.calc?.toLocaleString() || '-'}</td>
                    <td className="px-4 py-3 text-right text-emerald-700">{n.act?.toLocaleString() || '-'}</td>
                    <td className="px-4 py-3 text-right text-emerald-700">{n.actY || '-'}</td>
                    <td className="px-4 py-3 text-right font-medium text-amber-700">{n.var || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
