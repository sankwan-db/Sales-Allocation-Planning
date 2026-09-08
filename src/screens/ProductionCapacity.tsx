import React, { useState, useEffect } from 'react';
import { getStoredChickenTypes, ChickenType } from '../data/chickenTypeMaster';

interface CapacityRow {
  id: string;
  plant: string;
  line: string;
  chickenTypeId: string;
  chickenTypeName: string;
  lineType: string;
  speedUnit: string;
  kgh: number; // KG/Hour or Birds/Hour
  hd: number; // Hours/Day
  od: number; // Operating Days
  eff: number; // Efficiency %
  reqProdMT: number; // Required Production MT
}

const INITIAL_CAPACITY_DATA: CapacityRow[] = [
  {
    id: 'CAP-01',
    plant: 'Plant A (Saraburi)',
    line: 'Slaughter Line 1 (Broiler Main)',
    chickenTypeId: 'BROILER',
    chickenTypeName: 'ไก่เนื้อ (Broiler)',
    lineType: 'Slaughter & Evisceration',
    speedUnit: '12,000 birds/hr',
    kgh: 28800, // 12,000 birds * 2.4kg = 28,800 kg/hr
    hd: 16,
    od: 26,
    eff: 92,
    reqProdMT: 10500.00
  },
  {
    id: 'CAP-02',
    plant: 'Plant A (Saraburi)',
    line: 'Line 2 (Cut-up & Deboning)',
    chickenTypeId: 'BROILER',
    chickenTypeName: 'ไก่เนื้อ (Broiler)',
    lineType: 'Cut-up & Deboning',
    speedUnit: '5,500 kg/hr',
    kgh: 5500,
    hd: 16,
    od: 26,
    eff: 88,
    reqProdMT: 2050.00
  },
  {
    id: 'CAP-03',
    plant: 'Plant A (Saraburi)',
    line: 'Slaughter Line 2 (Spent Layer Dedicated)',
    chickenTypeId: 'LAYER',
    chickenTypeName: 'ไก่ไข่ปลด (Layer)',
    lineType: 'Slaughter & Evisceration',
    speedUnit: '10,000 birds/hr',
    kgh: 17500, // 10,000 * 1.75kg
    hd: 12,
    od: 22,
    eff: 86,
    reqProdMT: 4100.00
  },
  {
    id: 'CAP-04',
    plant: 'Plant B (Korat)',
    line: 'Heavy Slaughter Line (Parent Stock & Broiler)',
    chickenTypeId: 'PARENT_STOCK',
    chickenTypeName: 'พ่อแม่พันธุ์ปลด (PS)',
    lineType: 'Slaughter & Heavy Debone',
    speedUnit: '7,500 birds/hr (Heavy Shackle)',
    kgh: 27000, // 7,500 * 3.6kg
    hd: 14,
    od: 24,
    eff: 85,
    reqProdMT: 7800.00
  },
  {
    id: 'CAP-05',
    plant: 'Plant C (Rayong)',
    line: 'Specialty & Native Line (Slow Chilling)',
    chickenTypeId: 'SPECIALTY_NATIVE',
    chickenTypeName: 'ไก่พื้นเมือง (Native/Specialty)',
    lineType: 'Air-Chilled Slaughter',
    speedUnit: '4,000 birds/hr',
    kgh: 6400, // 4,000 * 1.6kg
    hd: 8,
    od: 20,
    eff: 90,
    reqProdMT: 920.00
  }
];

export default function ProductionCapacity() {
  const [chickenTypes, setChickenTypes] = useState<ChickenType[]>([]);
  const [rows, setRows] = useState<CapacityRow[]>(INITIAL_CAPACITY_DATA);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedPlant, setSelectedPlant] = useState<string>('ALL');
  const [selectedLineType, setSelectedLineType] = useState<string>('ALL');

  useEffect(() => {
    setChickenTypes(getStoredChickenTypes());
  }, []);

  const handleUpdate = (id: string, field: keyof CapacityRow, value: number) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const filteredRows = rows.filter(r => {
    const matchType = selectedType === 'ALL' || r.chickenTypeId === selectedType;
    const matchPlant = selectedPlant === 'ALL' || r.plant === selectedPlant;
    const matchLine = selectedLineType === 'ALL' || r.lineType.includes(selectedLineType);
    return matchType && matchPlant && matchLine;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ผลผลิตและยีลด์ (Supply & Yield)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">กำลังการผลิต (Production Capacity)</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight flex items-center gap-2.5">
                <span>กำลังการผลิตโรงงาน (Production Capacity Matrix)</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                  Dimension: Chicken Type Specific Speeds
                </span>
              </h1>
              <p className="text-xs text-on-surface-variant mt-0.5">
                ประเมินความเร็วสายการผลิต (Shackle/Line Speed) ที่สอดคล้องกับขนาดและสรีระของไก่แต่ละประเภท (Chicken Type)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert('บันทึกการตั้งค่ากำลังการผลิตเรียบร้อย')}
                className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">save</span>
                <span>Save Capacity Plan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Multi-Dimensional Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center bg-surface border border-outline-variant rounded px-2.5 py-1 gap-1.5">
              <span className="text-xs font-bold text-on-surface-variant">เดือน:</span>
              <select className="bg-transparent text-xs font-semibold text-on-surface focus:outline-none cursor-pointer">
                <option>ต.ค. 2025 (October 2025)</option>
                <option>พ.ย. 2025 (November 2025)</option>
              </select>
            </div>

            {/* CHICKEN TYPE FILTER */}
            <div className="flex items-center bg-surface border border-primary/40 rounded px-2.5 py-1 gap-1.5 shadow-2xs">
              <span className="material-symbols-outlined text-primary text-[16px]">category</span>
              <span className="text-xs font-bold text-primary">ประเภทไก่:</span>
              <select 
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="bg-transparent text-xs font-bold text-primary focus:outline-none cursor-pointer"
              >
                <option value="ALL">ทุกประเภทไก่ (All Types)</option>
                {chickenTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.nameTh}</option>
                ))}
              </select>
            </div>

            {/* PLANT FILTER */}
            <div className="flex items-center bg-surface border border-outline-variant rounded px-2.5 py-1 gap-1.5">
              <span className="material-symbols-outlined text-outline text-[16px]">factory</span>
              <span className="text-xs font-bold text-on-surface-variant">โรงงาน:</span>
              <select 
                value={selectedPlant}
                onChange={e => setSelectedPlant(e.target.value)}
                className="bg-transparent text-xs font-semibold text-on-surface focus:outline-none cursor-pointer"
              >
                <option value="ALL">ทุกโรงงาน (All Plants)</option>
                <option value="Plant A (Saraburi)">Plant A (Saraburi)</option>
                <option value="Plant B (Korat)">Plant B (Korat)</option>
                <option value="Plant C (Rayong)">Plant C (Rayong)</option>
              </select>
            </div>

            {/* LINE TYPE FILTER */}
            <select 
              value={selectedLineType}
              onChange={e => setSelectedLineType(e.target.value)}
              className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-xs text-on-surface cursor-pointer"
            >
              <option value="ALL">ทุกประเภทสายการผลิต (All Lines)</option>
              <option value="Slaughter">Slaughter & Evisceration</option>
              <option value="Cut-up">Cut-up & Deboning</option>
              <option value="Heavy">Heavy Shackle (PS)</option>
            </select>
          </div>

          <div className="text-xs text-on-surface-variant font-medium">
            {filteredRows.length} สายการผลิตที่ตรงตามเงื่อนไข
          </div>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1500px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant w-36 sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Plant</th>
              <th className="px-4 border-r border-outline-variant w-44 sticky left-[144px] z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Production Line</th>
              <th className="px-3 border-r border-outline-variant w-44">ประเภทไก่ (Chicken Type)</th>
              <th className="px-3 border-r border-outline-variant w-36">ความเร็วตั้งต้น</th>
              <th className="px-3 border-r border-outline-variant w-24 text-right bg-blue-50 text-blue-800">KG/Hour</th>
              <th className="px-3 border-r border-outline-variant w-20 text-right bg-blue-50 text-blue-800">Hours/Day</th>
              <th className="px-3 border-r border-outline-variant w-20 text-right bg-blue-50 text-blue-800">Oper. Days</th>
              <th className="px-3 border-r border-outline-variant w-20 text-right bg-blue-50 text-blue-800">Eff %</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right bg-surface-container-high font-bold text-primary">Avail. Cap (MT)</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right font-bold text-on-surface">Req. Prod (MT)</th>
              <th className="px-3 border-r border-outline-variant w-24 text-right">Utilization %</th>
              <th className="px-4 w-28 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {filteredRows.map((row) => {
              const availCapMT = (row.kgh * row.hd * row.od * (row.eff / 100)) / 1000;
              const ut = availCapMT > 0 ? (row.reqProdMT / availCapMT) * 100 : 0;
              let stat = 'Healthy';
              let statClass = 'bg-emerald-100 text-emerald-800 border border-emerald-300';
              if (ut > 100) {
                stat = 'Overload';
                statClass = 'bg-error-container text-error border border-error/40';
              } else if (ut > 95) {
                stat = 'High';
                statClass = 'bg-amber-100 text-amber-800 border border-amber-300';
              } else if (ut > 90) {
                stat = 'Watch';
                statClass = 'bg-amber-50 text-amber-700 border border-amber-200';
              }

              return (
                <tr key={row.id} className="h-10 hover:bg-surface-container-low transition-colors group">
                  <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm font-medium text-on-surface truncate">
                    {row.plant}
                  </td>
                  <td className="px-4 text-left border-r border-outline-variant/50 sticky left-[144px] z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm text-on-surface truncate">
                    {row.line}
                  </td>
                  <td className="px-3 text-left border-r border-outline-variant/50 font-body-sm font-semibold">
                    <span className="px-2 py-0.5 rounded text-[11px] bg-surface-container border border-outline-variant">
                      {row.chickenTypeName}
                    </span>
                  </td>
                  <td className="px-3 text-left border-r border-outline-variant/50 font-body-sm text-on-surface-variant text-[11px] truncate">
                    {row.speedUnit}
                  </td>
                  <td className="border-r border-outline-variant/50 p-0 bg-blue-50/30 group-hover:bg-blue-50/50">
                    <input 
                      type="number" 
                      value={row.kgh} 
                      onChange={e => handleUpdate(row.id, 'kgh', parseFloat(e.target.value) || 0)}
                      className="w-full h-full px-3 text-right bg-transparent focus:bg-surface focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary font-bold text-on-surface" 
                    />
                  </td>
                  <td className="border-r border-outline-variant/50 p-0 bg-blue-50/30 group-hover:bg-blue-50/50">
                    <input 
                      type="number" 
                      value={row.hd} 
                      onChange={e => handleUpdate(row.id, 'hd', parseFloat(e.target.value) || 0)}
                      className="w-full h-full px-3 text-right bg-transparent focus:bg-surface focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary text-on-surface" 
                    />
                  </td>
                  <td className="border-r border-outline-variant/50 p-0 bg-blue-50/30 group-hover:bg-blue-50/50">
                    <input 
                      type="number" 
                      value={row.od} 
                      onChange={e => handleUpdate(row.id, 'od', parseFloat(e.target.value) || 0)}
                      className="w-full h-full px-3 text-right bg-transparent focus:bg-surface focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary text-on-surface" 
                    />
                  </td>
                  <td className="border-r border-outline-variant/50 p-0 bg-blue-50/30 group-hover:bg-blue-50/50">
                    <input 
                      type="number" 
                      value={row.eff} 
                      onChange={e => handleUpdate(row.id, 'eff', parseFloat(e.target.value) || 0)}
                      className="w-full h-full px-3 text-right bg-transparent focus:bg-surface focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary text-on-surface" 
                    />
                  </td>
                  <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-primary bg-surface-container/20 group-hover:bg-surface-container/40">
                    {availCapMT.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 text-right border-r border-outline-variant/50 font-bold text-on-surface">
                    {row.reqProdMT.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className={`px-3 text-right border-r border-outline-variant/50 font-bold text-sm ${ut > 100 ? 'text-error' : (ut > 95 ? 'text-amber-600' : 'text-emerald-700')}`}>
                    {ut.toFixed(1)}%
                  </td>
                  <td className="px-4 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statClass}`}>
                      {stat}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
