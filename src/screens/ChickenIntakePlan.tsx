import React, { useState, useEffect } from 'react';
import { getStoredChickenTypes, ChickenType } from '../data/chickenTypeMaster';

interface IntakePlanRow {
  id: string;
  planDate: string;
  week: string;
  month: string;
  farm: string;
  chickenTypeId: string;
  chickenTypeName: string;
  breed: string;
  sex: string;
  plannedQty: number; // Heads
  avgWeight: number; // kg
  liveKg: number; // kg
  plant: string;
  slaughterDate: string;
  planVersion: string;
  status: string;
  remark: string;
}

const INITIAL_INTAKE_DATA: IntakePlanRow[] = [
  {
    id: 'IP-01',
    planDate: '01 Oct 2027',
    week: 'W40',
    month: 'Oct 2027',
    farm: 'Farm A',
    chickenTypeId: 'BROILER',
    chickenTypeName: 'ไก่เนื้อ (Broiler)',
    breed: 'BR01',
    sex: 'Mixed',
    plannedQty: 800000,
    avgWeight: 2.45,
    liveKg: 1960000,
    plant: 'Plant 01',
    slaughterDate: '02 Oct 2027',
    planVersion: 'V01',
    status: 'Confirmed',
    remark: ''
  },
  {
    id: 'IP-02',
    planDate: '01 Oct 2027',
    week: 'W40',
    month: 'Oct 2027',
    farm: 'Farm B',
    chickenTypeId: 'LAYER',
    chickenTypeName: 'ไก่ไข่ปลดระวาง (Layer)',
    breed: 'LY01',
    sex: 'Female',
    plannedQty: 120000,
    avgWeight: 1.80,
    liveKg: 2160000,
    plant: 'Plant 01',
    slaughterDate: '02 Oct 2027',
    planVersion: 'V01',
    status: 'Submitted',
    remark: ''
  },
  {
    id: 'IP-03',
    planDate: '02 Oct 2027',
    week: 'W40',
    month: 'Oct 2027',
    farm: 'Farm C',
    chickenTypeId: 'PARENT_STOCK',
    chickenTypeName: 'พ่อแม่พันธุ์ปลด (PS)',
    breed: 'PS01',
    sex: 'Mixed',
    plannedQty: 50000,
    avgWeight: 3.20,
    liveKg: 160000,
    plant: 'Plant 02',
    slaughterDate: '03 Oct 2027',
    planVersion: 'V01',
    status: 'Approved',
    remark: 'Special run'
  }
];

export default function ChickenIntakePlan() {
  const [chickenTypes, setChickenTypes] = useState<ChickenType[]>([]);
  const [plans, setPlans] = useState<IntakePlanRow[]>(INITIAL_INTAKE_DATA);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedPlant, setSelectedPlant] = useState<string>('ALL');

  useEffect(() => {
    const types = getStoredChickenTypes();
    setChickenTypes(types);
  }, []);

  const filteredPlans = plans.filter(p => {
    const matchType = selectedType === 'ALL' || p.chickenTypeId === selectedType;
    const matchPlant = selectedPlant === 'ALL' || p.plant === selectedPlant;
    return matchType && matchPlant;
  });

  const totalPlannedQty = filteredPlans.reduce((sum, p) => sum + p.plannedQty, 0);
  const totalLiveKg = filteredPlans.reduce((sum, p) => sum + p.liveKg, 0);
  const avgWeight = totalPlannedQty > 0 ? (totalLiveKg / totalPlannedQty) : 0;
  
  const broilerQty = filteredPlans.filter(p => p.chickenTypeId === 'BROILER').reduce((sum, p) => sum + p.plannedQty, 0);
  const layerQty = filteredPlans.filter(p => p.chickenTypeId === 'LAYER').reduce((sum, p) => sum + p.plannedQty, 0);
  const psQty = filteredPlans.filter(p => p.chickenTypeId === 'PARENT_STOCK').reduce((sum, p) => sum + p.plannedQty, 0);
  const numFarms = new Set(filteredPlans.map(p => p.farm)).size;

  return (
    <div className="flex-1 flex flex-col h-full bg-surface-container-low overflow-hidden">
      <div className="bg-surface border-b border-outline-variant px-6 py-4 flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-1">
            <span className="material-symbols-outlined text-[16px]">egg</span>
            <span>Planning & Supply</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="font-semibold text-primary">Chicken Intake Plan (แผนรับไก่เข้าโรงงาน)</span>
          </div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Chicken Intake Plan</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export
          </button>
          <button className="btn-primary">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Intake Plan
          </button>
        </div>
      </div>

      <div className="p-6 overflow-y-auto flex-1 custom-scrollbar space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card p-4 flex flex-col">
            <div className="text-sm font-medium text-on-surface-variant mb-1">Planned Chicken Qty</div>
            <div className="text-2xl font-bold text-primary">{totalPlannedQty.toLocaleString()} <span className="text-sm font-normal text-on-surface-variant">Birds</span></div>
            <div className="mt-2 text-xs flex justify-between">
              <span className="text-on-surface-variant">Number of Farms: {numFarms}</span>
            </div>
          </div>
          <div className="card p-4 flex flex-col">
            <div className="text-sm font-medium text-on-surface-variant mb-1">Average Weight</div>
            <div className="text-2xl font-bold text-emerald-600">{avgWeight.toFixed(2)} <span className="text-sm font-normal text-on-surface-variant">kg/bird</span></div>
            <div className="mt-2 text-xs flex justify-between">
              <span className="text-on-surface-variant">Broiler: {broilerQty.toLocaleString()} / Layer: {layerQty.toLocaleString()} / PS: {psQty.toLocaleString()}</span>
            </div>
          </div>
          <div className="card p-4 flex flex-col">
            <div className="text-sm font-medium text-on-surface-variant mb-1">Planned Live KG</div>
            <div className="text-2xl font-bold text-blue-600">{totalLiveKg.toLocaleString()} <span className="text-sm font-normal text-on-surface-variant">kg</span></div>
            <div className="mt-2 text-xs flex justify-between text-emerald-600">
              <span>Plant Capacity Status: Normal</span>
            </div>
          </div>
          <div className="card p-4 flex flex-col">
            <div className="text-sm font-medium text-on-surface-variant mb-1">Supply Change vs Prev. Plan</div>
            <div className="text-2xl font-bold text-amber-600">+2.5%</div>
            <div className="mt-2 text-xs text-on-surface-variant">
              Since Version V00
            </div>
          </div>
        </div>

        <div className="card flex flex-col border border-outline-variant">
          <div className="p-4 border-b border-outline-variant bg-surface-container-low/30 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
                <input 
                  type="text"
                  placeholder="Search farms, breeds..."
                  className="pl-9 pr-4 py-2 bg-surface border border-outline rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary w-64"
                />
              </div>
              
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input-field py-2 bg-surface min-w-[160px]"
              >
                <option value="ALL">All Chicken Types</option>
                {chickenTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.nameEN}</option>
                ))}
              </select>

              <select 
                value={selectedPlant}
                onChange={(e) => setSelectedPlant(e.target.value)}
                className="input-field py-2 bg-surface min-w-[160px]"
              >
                <option value="ALL">All Plants</option>
                <option value="Plant 01">Plant 01</option>
                <option value="Plant 02">Plant 02</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
               <button className="btn-secondary py-1.5 text-sm">
                  <span className="material-symbols-outlined text-[16px]">filter_list</span>
                  More Filters
               </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-surface-container-low text-on-surface-variant font-medium">
                <tr>
                  <th className="px-4 py-3 border-b border-outline-variant">Date</th>
                  <th className="px-4 py-3 border-b border-outline-variant">Farm</th>
                  <th className="px-4 py-3 border-b border-outline-variant">Type</th>
                  <th className="px-4 py-3 border-b border-outline-variant">Breed</th>
                  <th className="px-4 py-3 border-b border-outline-variant">Sex</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-right">Bird Qty</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-right">Avg WT</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-right font-bold">Live KG</th>
                  <th className="px-4 py-3 border-b border-outline-variant">Plant</th>
                  <th className="px-4 py-3 border-b border-outline-variant">Version</th>
                  <th className="px-4 py-3 border-b border-outline-variant text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {filteredPlans.map((row) => (
                  <tr key={row.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-on-surface">{row.planDate}</div>
                      <div className="text-[11px] text-on-surface-variant">{row.week} / {row.month}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-primary">{row.farm}</td>
                    <td className="px-4 py-3">
                      <div className="text-on-surface">{row.chickenTypeId}</div>
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.breed}</td>
                    <td className="px-4 py-3 text-on-surface-variant">{row.sex}</td>
                    <td className="px-4 py-3 text-right font-medium text-on-surface">{row.plannedQty.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-on-surface-variant">{row.avgWeight.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700 bg-emerald-50/50">{row.liveKg.toLocaleString()}</td>
                    <td className="px-4 py-3 text-on-surface-variant">
                      <div>{row.plant}</div>
                      <div className="text-[10px]">Process: {row.slaughterDate}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-surface-container rounded text-xs font-mono">{row.planVersion}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                        row.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        row.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredPlans.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-4 py-12 text-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[48px] opacity-20 mb-2">inventory_2</span>
                      <p>ไม่พบข้อมูลตามเงื่อนไขที่เลือก (No data found)</p>
                      <button className="mt-2 text-primary font-medium hover:underline text-sm" onClick={() => { setSelectedType('ALL'); setSelectedPlant('ALL'); }}>
                        Reset Filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
