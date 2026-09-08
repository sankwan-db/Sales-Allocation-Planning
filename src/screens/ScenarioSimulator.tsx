import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getStoredChickenTypes, ChickenType } from '../data/chickenTypeMaster';

export default function ScenarioSimulator() {
  const [chickenTypes, setChickenTypes] = useState<ChickenType[]>([]);
  const [selectedType, setSelectedType] = useState<string>('BROILER');

  // Interactive Simulation Variables
  const [birdQty, setBirdQty] = useState<number>(1000000); // 1,000,000 birds
  const [avgWeight, setAvgWeight] = useState<number>(2.45); // kg
  const [yieldPct, setYieldPct] = useState<number>(73.2); // %
  const [liveCostTHB, setLiveCostTHB] = useState<number>(42.50); // THB/kg
  const [sellingPriceTHB, setSellingPriceTHB] = useState<number>(82.00); // THB/kg
  const [marketDemandMT, setMarketDemandMT] = useState<number>(1800); // MT

  useEffect(() => {
    const types = getStoredChickenTypes();
    setChickenTypes(types);
    if (types.length > 0) {
      applyTypeDefaults(types[0].id, types);
    }
  }, []);

  const applyTypeDefaults = (typeId: string, typesList: ChickenType[] = chickenTypes) => {
    setSelectedType(typeId);
    const typeObj = typesList.find(t => t.id === typeId);
    if (typeObj) {
      setAvgWeight(typeObj.defaultAvgWeight);
      setLiveCostTHB(typeObj.defaultLiveCostTHB);

      if (typeId === 'BROILER') {
        setYieldPct(73.2);
        setSellingPriceTHB(82.00);
        setBirdQty(1000000);
        setMarketDemandMT(1800);
      } else if (typeId === 'LAYER') {
        setYieldPct(64.5);
        setSellingPriceTHB(58.00);
        setBirdQty(450000);
        setMarketDemandMT(550);
      } else if (typeId === 'PARENT_STOCK') {
        setYieldPct(68.8);
        setSellingPriceTHB(65.00);
        setBirdQty(150000);
        setMarketDemandMT(380);
      } else {
        setYieldPct(67.5);
        setSellingPriceTHB(140.00);
        setBirdQty(80000);
        setMarketDemandMT(90);
      }
    }
  };

  // Calculations
  const liveSupplyMT = (birdQty * avgWeight) / 1000;
  const carcassSupplyMT = (liveSupplyMT * (yieldPct / 100));
  const totalCostMTHB = (liveSupplyMT * 1000 * liveCostTHB) / 1000000;
  const totalRevenueMTHB = (carcassSupplyMT * 1000 * sellingPriceTHB) / 1000000;
  const grossProfitMTHB = totalRevenueMTHB - totalCostMTHB;
  const marginPct = totalRevenueMTHB > 0 ? (grossProfitMTHB / totalRevenueMTHB) * 100 : 0;
  const balanceMT = carcassSupplyMT - marketDemandMT;

  // Base comparison baseline
  const baseCarcassMT = 1650;
  const baseRevenueMTHB = 135.3;
  const baseCostMTHB = 104.1;

  const chartData = [
    { name: 'Supply (MT)', Base: Math.round(baseCarcassMT), Scenario: Math.round(carcassSupplyMT) },
    { name: 'Cost (M ฿)', Base: Number(baseCostMTHB.toFixed(1)), Scenario: Number(totalCostMTHB.toFixed(1)) },
    { name: 'Revenue (M ฿)', Base: Number(baseRevenueMTHB.toFixed(1)), Scenario: Number(totalRevenueMTHB.toFixed(1)) },
    { name: 'Gross Profit (M ฿)', Base: Number((baseRevenueMTHB - baseCostMTHB).toFixed(1)), Scenario: Number(grossProfitMTHB.toFixed(1)) },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>สถานการณ์จำลอง (Scenario)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Scenario Planning Simulator</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight flex items-center gap-2.5">
                <span>จำลองสถานการณ์วางแผน (Scenario Planning Simulator)</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                  Dimension: Dynamic Chicken Types
                </span>
              </h1>
              <p className="text-xs text-on-surface-variant mt-0.5">
                ทดลองปรับเปลี่ยนสัดส่วนการเลี้ยง ประเภทไก่ (Chicken Type) น้ำหนักจับเชือด และราคาตลาด เพื่อประเมินผลกำไรและสมดุลซัพพลาย
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert('บันทึกแผนจำลองสถานการณ์เรียบร้อยแล้ว')}
                className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">save</span>
                <span>Save Scenario</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dimension Selector Strip */}
        <div className="flex flex-wrap items-center gap-3 border-t border-outline-variant pt-2.5 mt-1">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">เลือกประเภทไก่ที่ต้องการจำลอง (Chicken Type):</span>
          <div className="flex flex-wrap gap-1.5">
            {chickenTypes.map(t => {
              const isSelected = selectedType === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => applyTypeDefaults(t.id)}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-primary text-white shadow-xs' 
                      : 'bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {t.nameTh}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SIMULATOR BODY */}
      <section className="flex-1 overflow-auto custom-scrollbar p-space-2xl bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* Inputs Panel */}
           <div className="col-span-1 bg-surface border border-outline-variant rounded-xl p-5 shadow-xs flex flex-col">
              <h2 className="font-headline-sm text-sm font-bold text-on-surface mb-4 pb-2 border-b border-outline-variant flex items-center justify-between">
                 <span className="flex items-center gap-2">
                   <span className="material-symbols-outlined text-primary text-[18px]">tune</span>
                   <span>พารามิเตอร์การจำลอง (Inputs)</span>
                 </span>
                 <span className="text-[11px] font-mono text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                   {selectedType}
                 </span>
              </h2>
              
              <div className="space-y-4 flex-1 text-xs">
                 {/* Bird Qty Slider */}
                 <div>
                    <div className="flex justify-between mb-1">
                       <label className="font-bold text-on-surface-variant">จำนวนไก่เข้าเชือด (Heads)</label>
                       <span className="font-mono font-bold text-primary">{birdQty.toLocaleString()} ตัว</span>
                    </div>
                    <input 
                      type="range" 
                      className="w-full accent-primary cursor-pointer" 
                      min="50000" 
                      max="3000000" 
                      step="50000"
                      value={birdQty} 
                      onChange={e => setBirdQty(parseInt(e.target.value, 10))}
                    />
                 </div>

                 {/* Avg Weight Slider */}
                 <div>
                    <div className="flex justify-between mb-1">
                       <label className="font-bold text-on-surface-variant">น้ำหนักเฉลี่ยต่อตัว (Avg Weight kg)</label>
                       <span className="font-mono font-bold text-primary">{avgWeight.toFixed(2)} kg</span>
                    </div>
                    <input 
                      type="range" 
                      className="w-full accent-primary cursor-pointer" 
                      min="1.2" 
                      max="4.2" 
                      step="0.05" 
                      value={avgWeight} 
                      onChange={e => setAvgWeight(parseFloat(e.target.value))}
                    />
                 </div>

                 {/* Overall Yield Slider */}
                 <div>
                    <div className="flex justify-between mb-1">
                       <label className="font-bold text-on-surface-variant">สูตรยิลด์ซาก (Dressing Yield %)</label>
                       <span className="font-mono font-bold text-primary">{yieldPct.toFixed(1)}%</span>
                    </div>
                    <input 
                      type="range" 
                      className="w-full accent-primary cursor-pointer" 
                      min="55" 
                      max="80" 
                      step="0.2"
                      value={yieldPct} 
                      onChange={e => setYieldPct(parseFloat(e.target.value))}
                    />
                 </div>

                 {/* Live Cost THB/kg */}
                 <div className="pt-2 border-t border-outline-variant">
                    <div className="flex justify-between mb-1">
                       <label className="font-bold text-on-surface-variant">ต้นทุนไก่มีชีวิต (Live Cost ฿/kg)</label>
                       <span className="font-mono font-bold text-amber-700">฿{liveCostTHB.toFixed(2)}/kg</span>
                    </div>
                    <input 
                      type="range" 
                      className="w-full accent-amber-600 cursor-pointer" 
                      min="20" 
                      max="90" 
                      step="0.5" 
                      value={liveCostTHB} 
                      onChange={e => setLiveCostTHB(parseFloat(e.target.value))}
                    />
                 </div>

                 {/* Selling Price */}
                 <div>
                    <div className="flex justify-between mb-1">
                       <label className="font-bold text-on-surface-variant">ราคาขายเฉลี่ย (Selling Price ฿/kg)</label>
                       <span className="font-mono font-bold text-emerald-700">฿{sellingPriceTHB.toFixed(2)}/kg</span>
                    </div>
                    <input 
                      type="range" 
                      className="w-full accent-emerald-600 cursor-pointer" 
                      min="40" 
                      max="160" 
                      step="1" 
                      value={sellingPriceTHB} 
                      onChange={e => setSellingPriceTHB(parseFloat(e.target.value))}
                    />
                 </div>

                 {/* Market Demand Slider */}
                 <div className="pt-2 border-t border-outline-variant">
                    <div className="flex justify-between mb-1">
                       <label className="font-bold text-on-surface-variant">ความต้องการตลาด (Demand MT)</label>
                       <span className="font-mono font-bold text-on-surface">{marketDemandMT.toLocaleString()} MT</span>
                    </div>
                    <input 
                      type="range" 
                      className="w-full accent-primary cursor-pointer" 
                      min="100" 
                      max="4000" 
                      step="50" 
                      value={marketDemandMT} 
                      onChange={e => setMarketDemandMT(parseInt(e.target.value, 10))}
                    />
                 </div>
              </div>
           </div>

           {/* Outputs Panel */}
           <div className="col-span-1 lg:col-span-2 space-y-5">
              
              {/* Top 4 Impact KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-surface border border-outline-variant rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
                  <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">ซัพพลายซากสุทธิ</div>
                  <div className="mt-2">
                    <div className="font-mono text-xl font-bold text-primary">
                      {carcassSupplyMT.toLocaleString('en-US', { maximumFractionDigits: 1 })} <span className="text-xs font-normal">MT</span>
                    </div>
                    <div className="text-[10px] text-on-surface-variant mt-0.5">
                      จากไก่มีชีวิต {liveSupplyMT.toFixed(0)} MT
                    </div>
                  </div>
                </div>

                <div className="bg-surface border border-outline-variant rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
                  <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">ต้นทุนวัตถุดิบรวม</div>
                  <div className="mt-2">
                    <div className="font-mono text-xl font-bold text-amber-800">
                      ฿{totalCostMTHB.toFixed(2)}M
                    </div>
                    <div className="text-[10px] text-on-surface-variant mt-0.5">
                      @ ฿{liveCostTHB.toFixed(2)}/กก.
                    </div>
                  </div>
                </div>

                <div className="bg-surface border border-outline-variant rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
                  <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">รายได้คาดการณ์</div>
                  <div className="mt-2">
                    <div className="font-mono text-xl font-bold text-emerald-700">
                      ฿{totalRevenueMTHB.toFixed(2)}M
                    </div>
                    <div className="text-[10px] text-on-surface-variant mt-0.5">
                      @ ฿{sellingPriceTHB.toFixed(2)}/กก.
                    </div>
                  </div>
                </div>

                <div className="bg-surface border border-outline-variant rounded-xl p-3.5 shadow-xs flex flex-col justify-between">
                  <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">กำไรขั้นต้น (GP)</div>
                  <div className="mt-2">
                    <div className={`font-mono text-xl font-bold ${grossProfitMTHB >= 0 ? 'text-emerald-700' : 'text-error'}`}>
                      ฿{grossProfitMTHB.toFixed(2)}M
                    </div>
                    <div className="text-[10px] font-bold text-emerald-800 mt-0.5">
                      Margin: {marginPct.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Balance Assessment Pill */}
              <div className={`p-3 rounded-lg border flex items-center justify-between text-xs ${
                balanceMT >= 0 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
                  : 'bg-error-container/20 border-error/30 text-error'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">
                    {balanceMT >= 0 ? 'check_circle' : 'warning'}
                  </span>
                  <span className="font-bold">
                    {balanceMT >= 0 ? 'ซัพพลายเพียงพอต่อความต้องการตลาด (Surplus)' : 'ซัพพลายขาดแคลนเมื่อเทียบกับความต้องการ (Deficit)'}
                  </span>
                </div>
                <div className="font-mono font-bold text-sm">
                  {balanceMT >= 0 ? `+${balanceMT.toFixed(1)} MT` : `${balanceMT.toFixed(1)} MT`}
                </div>
              </div>

              {/* Interactive Comparison Chart */}
              <div className="bg-surface border border-outline-variant rounded-xl p-4 shadow-xs">
                 <div className="flex items-center justify-between mb-3 pb-2 border-b border-outline-variant">
                   <h2 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                     <span className="material-symbols-outlined text-primary text-[16px]">analytics</span>
                     <span>เปรียบเทียบ Baseline กับ Scenario ({selectedType}):</span>
                   </h2>
                   <span className="text-[11px] text-on-surface-variant">ปรับปรุงตามขนาดและสัดส่วนผลผลิตจริง</span>
                 </div>
                 <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                        <XAxis dataKey="name" tick={{fontSize: 11, fill: '#757575'}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 11, fill: '#757575'}} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'rgba(0,0,0,0.03)'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '12px' }} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="Base" name="Base Scenario" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={36} />
                        <Bar dataKey="Scenario" name="Current Simulation" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={36} />
                      </BarChart>
                    </ResponsiveContainer>
                 </div>
              </div>

           </div>
        </div>
      </section>
    </div>
  );
}
