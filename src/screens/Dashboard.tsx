import React, { useState, useEffect } from 'react';
import { getStoredChickenTypes, ChickenType } from '../data/chickenTypeMaster';

export default function Dashboard() {
  const [chickenTypes, setChickenTypes] = useState<ChickenType[]>([]);
  const [selectedChickenType, setSelectedChickenType] = useState<string>('ALL');

  useEffect(() => {
    setChickenTypes(getStoredChickenTypes());
  }, []);

  return (
    <div className="sape-dashboard flex-1 flex flex-col min-w-0 bg-background overflow-y-auto">
      {/* SCREEN TITLE & STICKY MULTI-DIMENSIONAL FILTER BAR */}
      <section className="sticky top-0 z-30 bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-3 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">SCREEN 01 — EXECUTIVE DASHBOARD</h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
              Chicken Type Filter Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 px-2.5 text-xs font-medium text-secondary hover:text-on-surface bg-surface-container border border-outline-variant rounded flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">refresh</span>
              <span>Sync (อัปเดตล่าสุด: 2 นาทีที่แล้ว)</span>
            </button>
            <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[15px]">download</span>
              <span>Export Dashboard</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-label-sm">
          <div className="flex items-center bg-surface-container-low border border-outline-variant rounded px-2 py-1 gap-1">
            <span className="text-on-surface-variant font-medium">Year:</span>
            <select className="bg-transparent font-semibold text-on-surface focus:outline-none border-none py-0 pl-1 pr-4 text-label-sm cursor-pointer">
              <option>FY2025</option>
            </select>
          </div>
          <div className="flex items-center bg-surface-container-low border border-outline-variant rounded px-2 py-1 gap-1">
            <span className="text-on-surface-variant font-medium">Month:</span>
            <select className="bg-transparent font-semibold text-on-surface focus:outline-none border-none py-0 pl-1 pr-4 text-label-sm cursor-pointer">
              <option>ต.ค. (Oct)</option>
              <option>พ.ย. (Nov)</option>
            </select>
          </div>

          <div className="h-5 w-px bg-outline-variant mx-1"></div>

          {/* CHICKEN TYPE DIMENSION FILTER */}
          <div className="flex items-center bg-surface-container-low border border-primary/50 rounded px-2 py-1 gap-1 shadow-2xs">
            <span className="material-symbols-outlined text-primary text-[15px]">category</span>
            <span className="text-primary font-bold">ประเภทไก่:</span>
            <select 
              value={selectedChickenType}
              onChange={e => setSelectedChickenType(e.target.value)}
              className="bg-transparent font-bold text-primary focus:outline-none border-none py-0 pl-1 pr-4 text-label-sm cursor-pointer"
            >
              <option value="ALL">ทุกประเภทไก่ (All Types)</option>
              {chickenTypes.map(t => (
                <option key={t.id} value={t.id}>{t.nameTh}</option>
              ))}
            </select>
          </div>
          
          <div className="h-5 w-px bg-outline-variant mx-1"></div>

          <div className="flex items-center bg-surface-container-low border border-outline-variant rounded px-2 py-1 gap-1">
            <span className="material-symbols-outlined text-outline text-[14px]">factory</span>
            <span className="text-on-surface-variant font-medium">Plant:</span>
            <select className="bg-transparent font-semibold text-on-surface focus:outline-none border-none py-0 pl-1 pr-4 text-label-sm cursor-pointer">
              <option>ทั้งหมด (3 Plants)</option>
              <option>Plant A (Saraburi)</option>
              <option>Plant B (Korat)</option>
              <option>Plant C (Rayong)</option>
            </select>
          </div>
          <div className="flex items-center bg-surface-container-low border border-outline-variant rounded px-2 py-1 gap-1">
            <span className="material-symbols-outlined text-outline text-[14px]">storefront</span>
            <span className="text-on-surface-variant font-medium">Channel:</span>
            <select className="bg-transparent font-semibold text-on-surface focus:outline-none border-none py-0 pl-1 pr-4 text-label-sm cursor-pointer">
              <option>ทุกช่องทาง</option>
              <option>Modern Trade</option>
              <option>Food Service</option>
              <option>Export</option>
            </select>
          </div>
          <div className="flex items-center bg-surface-container-low border border-outline-variant rounded px-2 py-1 gap-1">
            <span className="text-on-surface-variant font-medium">Group:</span>
            <select className="bg-transparent font-semibold text-on-surface focus:outline-none border-none py-0 pl-1 pr-4 text-label-sm cursor-pointer">
              <option>ทุกกลุ่มชิ้นส่วน</option>
              <option>Main Cut-up</option>
              <option>Deboned Meat</option>
              <option>By-Products & Soup Bone</option>
            </select>
          </div>
        </div>
      </section>

      {/* 12 KPI METRICS */}
      <section className="px-space-2xl pt-4">
        <div className="sape-kpis grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
          {/* KPI 1: Chicken In */}
          <div className="group cursor-pointer bg-surface-container-lowest border border-outline-variant hover:border-primary rounded p-3 flex flex-col justify-between transition-all hover:shadow-sm relative">
            <div className="absolute top-2 right-2 text-outline group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-medium">1. ไก่เข้าเชือด (Chicken In)</span>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="font-display-kpi text-[22px] font-bold text-on-surface">3.42</span>
                <span className="text-xs font-normal text-on-surface-variant">ล้านตัว</span>
              </div>
              <div className="flex justify-between mt-1 pt-1.5 border-t border-outline-variant text-[11px]">
                <span className="text-secondary">เป้า: 3.50 ล้าน</span>
                <span className="text-[#D97706] font-semibold bg-[#FEF3C7] px-1 rounded">-2.3% Deficit</span>
              </div>
            </div>
          </div>
          {/* KPI 2: Live Weight */}
          <div className="group cursor-pointer bg-surface-container-lowest border border-outline-variant hover:border-primary rounded p-3 flex flex-col justify-between transition-all hover:shadow-sm relative">
            <div className="absolute top-2 right-2 text-outline group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-medium">2. น้ำหนักมีชีวิต (Live Weight)</span>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="font-display-kpi text-[22px] font-bold text-on-surface">2.45</span>
                <span className="text-xs font-normal text-on-surface-variant">กก./ตัว</span>
              </div>
              <div className="flex justify-between mt-1 pt-1.5 border-t border-outline-variant text-[11px]">
                <span className="text-secondary">เป้า: 2.40 กก.</span>
                <span className="text-[#059669] font-semibold bg-[#ECFDF5] px-1 rounded">+2.1% Optimal</span>
              </div>
            </div>
          </div>
          {/* KPI 3: Production Supply */}
          <div className="group cursor-pointer bg-surface-container-lowest border border-outline-variant hover:border-primary rounded p-3 flex flex-col justify-between transition-all hover:shadow-sm relative">
            <div className="absolute top-2 right-2 text-outline group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-medium">3. ผลผลิต (Production Supply)</span>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="font-display-kpi text-[22px] font-bold text-on-surface">6,215</span>
                <span className="text-xs font-normal text-on-surface-variant">ตัน (MT)</span>
              </div>
              <div className="flex justify-between mt-1 pt-1.5 border-t border-outline-variant text-[11px]">
                <span className="text-secondary">Yield: 72.8%</span>
                <span className="text-[#059669] font-semibold bg-[#ECFDF5] px-1 rounded">On Track</span>
              </div>
            </div>
          </div>
          {/* KPI 4: Sales Plan */}
          <div className="group cursor-pointer bg-surface-container-lowest border border-outline-variant hover:border-primary rounded p-3 flex flex-col justify-between transition-all hover:shadow-sm relative">
            <div className="absolute top-2 right-2 text-outline group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-medium">4. แผนการขาย (Sales Plan)</span>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="font-display-kpi text-[22px] font-bold text-[#1D4ED8]">6,400</span>
                <span className="text-xs font-normal text-on-surface-variant">ตัน</span>
              </div>
              <div className="flex justify-between mt-1 pt-1.5 border-t border-outline-variant text-[11px]">
                <span className="text-secondary">มูลค่าเป้าหมาย</span>
                <span className="text-[#1D4ED8] font-semibold">428.5 ลบ.</span>
              </div>
            </div>
          </div>
          {/* KPI 5: Approved Allocation */}
          <div className="group cursor-pointer bg-surface-container-lowest border border-outline-variant hover:border-primary rounded p-3 flex flex-col justify-between transition-all hover:shadow-sm relative">
            <div className="absolute top-2 right-2 text-outline group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-medium">5. โควตาอนุมัติ (Allocation)</span>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="font-display-kpi text-[22px] font-bold text-on-surface">6,180</span>
                <span className="text-xs font-normal text-on-surface-variant">ตัน</span>
              </div>
              <div className="flex justify-between mt-1 pt-1.5 border-t border-outline-variant text-[11px]">
                <span className="text-secondary">เทียบแผนขาย</span>
                <span className="text-[#059669] font-semibold bg-[#ECFDF5] px-1 rounded">96.6%</span>
              </div>
            </div>
          </div>
          {/* KPI 6: Confirmed SO */}
          <div className="group cursor-pointer bg-surface-container-lowest border border-outline-variant hover:border-primary rounded p-3 flex flex-col justify-between transition-all hover:shadow-sm relative">
            <div className="absolute top-2 right-2 text-outline group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-medium">6. ยืนยันคำสั่งซื้อ (Confirmed SO)</span>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="font-display-kpi text-[22px] font-bold text-on-surface">5,890</span>
                <span className="text-xs font-normal text-on-surface-variant">ตัน</span>
              </div>
              <div className="flex justify-between mt-1 pt-1.5 border-t border-outline-variant text-[11px]">
                <span className="text-secondary">เทียบโควตา</span>
                <span className="text-[#059669] font-semibold bg-[#ECFDF5] px-1 rounded">95.3%</span>
              </div>
            </div>
          </div>
          
          {/* KPI 7: Forward Coverage */}
          <div className="group cursor-pointer bg-surface-container-lowest border border-outline-variant hover:border-primary rounded p-3 flex flex-col justify-between transition-all hover:shadow-sm relative">
            <div className="absolute top-2 right-2 text-outline group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-medium">7. ระยะเวลาครอบคลุม (Coverage)</span>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="font-display-kpi text-[22px] font-bold text-blue-700">2.5</span>
                <span className="text-xs font-normal text-on-surface-variant">เดือน</span>
              </div>
              <div className="flex justify-between mt-1 pt-1.5 border-t border-outline-variant text-[11px]">
                <span className="text-secondary">เป้าหมาย</span>
                <span className="text-blue-700 font-semibold bg-blue-50 px-1 rounded">3.0 เดือน</span>
              </div>
            </div>
          </div>
          {/* KPI 8: Actual Sales */}
          <div className="group cursor-pointer bg-surface-container-lowest border border-outline-variant hover:border-primary rounded p-3 flex flex-col justify-between transition-all hover:shadow-sm relative">
            <div className="absolute top-2 right-2 text-outline group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-medium">8. ยอดขายจริง (Actual Sales)</span>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="font-display-kpi text-[22px] font-bold text-emerald-700">385.2</span>
                <span className="text-xs font-normal text-on-surface-variant">ลบ.</span>
              </div>
              <div className="flex justify-between mt-1 pt-1.5 border-t border-outline-variant text-[11px]">
                <span className="text-secondary">Volume:</span>
                <span className="text-on-surface font-semibold">4,920 ตัน</span>
              </div>
            </div>
          </div>
          {/* KPI 9: Stock */}
          <div className="group cursor-pointer bg-surface-container-lowest border border-outline-variant hover:border-primary rounded p-3 flex flex-col justify-between transition-all hover:shadow-sm relative">
            <div className="absolute top-2 right-2 text-outline group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-medium">9. สินค้าคงคลัง (Stock)</span>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="font-display-kpi text-[22px] font-bold text-on-surface">12,450</span>
                <span className="text-xs font-normal text-on-surface-variant">ตัน</span>
              </div>
              <div className="flex justify-between mt-1 pt-1.5 border-t border-outline-variant text-[11px]">
                <span className="text-secondary">Cap. Utilization</span>
                <span className="text-amber-700 font-semibold bg-amber-50 px-1 rounded">82%</span>
              </div>
            </div>
          </div>
          {/* KPI 10: Stock at Risk */}
          <div className="group cursor-pointer bg-surface-container-lowest border border-outline-variant hover:border-primary rounded p-3 flex flex-col justify-between transition-all hover:shadow-sm relative">
            <div className="absolute top-2 right-2 text-outline group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </div>
            <span className="font-label-sm text-label-sm text-error font-medium">10. สต๊อกเสี่ยง (Stock at Risk)</span>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="font-display-kpi text-[22px] font-bold text-error">420</span>
                <span className="text-xs font-normal text-error">ตัน</span>
              </div>
              <div className="flex justify-between mt-1 pt-1.5 border-t border-outline-variant text-[11px]">
                <span className="text-error font-semibold">Over 90 Days</span>
                <span className="text-error font-semibold bg-error-container px-1 rounded">Action Req.</span>
              </div>
            </div>
          </div>
          {/* KPI 11: Delivery Achievement */}
          <div className="group cursor-pointer bg-surface-container-lowest border border-outline-variant hover:border-primary rounded p-3 flex flex-col justify-between transition-all hover:shadow-sm relative">
            <div className="absolute top-2 right-2 text-outline group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-medium">11. อัตราส่งมอบ (Delivery Achieve)</span>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="font-display-kpi text-[22px] font-bold text-emerald-700">98.5</span>
                <span className="text-xs font-normal text-emerald-700">%</span>
              </div>
              <div className="flex justify-between mt-1 pt-1.5 border-t border-outline-variant text-[11px]">
                <span className="text-secondary">SLA: 98%</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-1 rounded">Passed</span>
              </div>
            </div>
          </div>
          {/* KPI 12: Forecast Accuracy */}
          <div className="group cursor-pointer bg-surface-container-lowest border border-outline-variant hover:border-primary rounded p-3 flex flex-col justify-between transition-all hover:shadow-sm relative">
            <div className="absolute top-2 right-2 text-outline group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary font-medium">12. ความแม่นยำ (Forecast Acc.)</span>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="font-display-kpi text-[22px] font-bold text-on-surface">92.4</span>
                <span className="text-xs font-normal text-on-surface-variant">%</span>
              </div>
              <div className="flex justify-between mt-1 pt-1.5 border-t border-outline-variant text-[11px]">
                <span className="text-secondary">Target: 90%</span>
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-1 rounded">Excellent</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXECUTIVE CHARTS */}
      <section className="px-space-2xl mt-4 mb-8 space-y-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          
          {/* Chart 1: Demand vs Supply */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">1. Demand vs Supply Analysis</h3>
                <p className="text-xs text-secondary mt-0.5">การวิเคราะห์สมดุลความต้องการและผลผลิตหลัก</p>
              </div>
              <button className="text-primary text-[11px] font-bold hover:underline">View All Cuts</button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-on-surface">เนื้ออกลอกหนัง (BL Breast)</span>
                  <span className="text-error font-semibold">Deficit -42 MT</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center text-[11px]">
                    <span className="w-14 text-secondary">Demand:</span>
                    <div className="flex-1 bg-surface-container rounded h-3.5 overflow-hidden ml-1">
                      <div className="bg-blue-500 h-full rounded" style={{ width: '88%' }}></div>
                    </div>
                    <span className="w-16 text-right font-data-mono-num font-medium text-on-surface">1,840 MT</span>
                  </div>
                  <div className="flex items-center text-[11px]">
                    <span className="w-14 text-secondary">Supply:</span>
                    <div className="flex-1 bg-surface-container rounded h-3.5 overflow-hidden ml-1">
                      <div className="bg-emerald-500 h-full rounded" style={{ width: '84%' }}></div>
                    </div>
                    <span className="w-16 text-right font-data-mono-num font-medium text-on-surface">1,798 MT</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-on-surface">ปีกเต็ม (Whole Wing)</span>
                  <span className="text-amber-600 font-semibold">Surplus +15 MT</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center text-[11px]">
                    <span className="w-14 text-secondary">Demand:</span>
                    <div className="flex-1 bg-surface-container rounded h-3.5 overflow-hidden ml-1">
                      <div className="bg-blue-500 h-full rounded" style={{ width: '70%' }}></div>
                    </div>
                    <span className="w-16 text-right font-data-mono-num font-medium text-on-surface">850 MT</span>
                  </div>
                  <div className="flex items-center text-[11px]">
                    <span className="w-14 text-secondary">Supply:</span>
                    <div className="flex-1 bg-surface-container rounded h-3.5 overflow-hidden ml-1">
                      <div className="bg-emerald-500 h-full rounded" style={{ width: '74%' }}></div>
                    </div>
                    <span className="w-16 text-right font-data-mono-num font-medium text-on-surface">865 MT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chart 2: Pipeline Funnel */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">2. Plan vs Allocation vs SO vs Actual</h3>
                  <p className="text-xs text-secondary mt-0.5">ภาพรวมแผนการจัดสรรและยอดขาย (Pipeline Funnel)</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-3">
                <div className="p-3 bg-surface-container rounded border border-outline-variant text-center relative">
                  <div className="text-[11px] text-secondary font-medium mb-1">1. Sales Plan</div>
                  <div className="font-data-mono-num text-[20px] font-bold text-blue-700">6,400</div>
                  <div className="w-full bg-blue-200 h-2 rounded-full mt-3"></div>
                  <span className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full border border-outline text-outline"><span className="material-symbols-outlined text-[14px] block p-0.5">chevron_right</span></span>
                </div>
                <div className="p-3 bg-surface-container rounded border border-outline-variant text-center relative">
                  <div className="text-[11px] text-secondary font-medium mb-1">2. Allocation</div>
                  <div className="font-data-mono-num text-[20px] font-bold text-on-surface">6,180</div>
                  <div className="w-full bg-emerald-500 h-2 rounded-full mt-3"></div>
                  <span className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full border border-outline text-outline"><span className="material-symbols-outlined text-[14px] block p-0.5">chevron_right</span></span>
                </div>
                <div className="p-3 bg-surface-container rounded border border-outline-variant text-center relative">
                  <div className="text-[11px] text-secondary font-medium mb-1">3. Confirmed SO</div>
                  <div className="font-data-mono-num text-[20px] font-bold text-on-surface">5,890</div>
                  <div className="w-full bg-blue-500 h-2 rounded-full mt-3"></div>
                  <span className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full border border-outline text-outline"><span className="material-symbols-outlined text-[14px] block p-0.5">chevron_right</span></span>
                </div>
                <div className="p-3 bg-surface-container rounded border border-outline-variant text-center">
                  <div className="text-[11px] text-secondary font-medium mb-1">4. Delivered</div>
                  <div className="font-data-mono-num text-[20px] font-bold text-on-surface">4,920</div>
                  <div className="w-full bg-slate-500 h-2 rounded-full mt-3"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chart 3: Forward Coverage */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">3. Forward Coverage M to M+12</h3>
                <p className="text-xs text-secondary mt-0.5">ระยะเวลาครอบคลุมสินค้าคงคลังล่วงหน้า (รายเดือน)</p>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between h-36 gap-2">
              {[
                { label: 'Oct', val: 2.5, bg: 'bg-blue-500' },
                { label: 'Nov', val: 2.8, bg: 'bg-blue-500' },
                { label: 'Dec', val: 3.1, bg: 'bg-emerald-500' },
                { label: 'Jan', val: 2.9, bg: 'bg-blue-500' },
                { label: 'Feb', val: 2.4, bg: 'bg-amber-500' },
                { label: 'Mar', val: 2.1, bg: 'bg-red-500' },
                { label: 'Apr', val: 2.5, bg: 'bg-blue-500' }
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                  <span className="text-[10px] font-semibold text-on-surface-variant mb-1">{item.val}</span>
                  <div className={`w-full max-w-[32px] rounded-t-sm ${item.bg} transition-all hover:opacity-80`} style={{ height: `${(item.val / 4) * 100}%` }}></div>
                  <span className="text-[10px] text-secondary mt-1">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-2 pt-2 border-t border-outline-variant text-[10px] text-secondary">
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Optimal (&gt;3.0)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Standard (2.5-3.0)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded-full"></span> Low (2.2-2.4)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full"></span> Critical (&lt;2.2)</span>
            </div>
          </div>
          
          {/* Chart 4: Sales Achievement Trend */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">4. Sales Achievement Trend</h3>
                <p className="text-xs text-secondary mt-0.5">แนวโน้มผลสำเร็จยอดขายเทียบเป้าหมาย (รายสัปดาห์)</p>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-between h-36 gap-2 relative">
              {/* Target Line mock */}
              <div className="absolute top-[25%] left-0 w-full border-t-2 border-dashed border-emerald-500 z-0"></div>
              
              {[
                { label: 'W38', val: 92, bg: 'bg-slate-300' },
                { label: 'W39', val: 95, bg: 'bg-slate-300' },
                { label: 'W40', val: 98, bg: 'bg-slate-300' },
                { label: 'W41', val: 102, bg: 'bg-emerald-400' },
                { label: 'W42', val: 96, bg: 'bg-blue-500' },
                { label: 'W43 (F)', val: 94, bg: 'bg-blue-200' },
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full z-10">
                  <span className="text-[10px] font-semibold text-on-surface-variant mb-1">{item.val}%</span>
                  <div className={`w-full max-w-[40px] rounded-t-sm ${item.bg} transition-all hover:opacity-80`} style={{ height: `${item.val * 0.7}%` }}></div>
                  <span className="text-[10px] text-secondary mt-1">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-2 pt-2 border-t border-outline-variant text-[10px] text-secondary">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-emerald-500"></span> Target (100%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-sm"></span> Actual/Current</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-200 rounded-sm"></span> Forecast</span>
            </div>
          </div>
          
          {/* Chart 5: Stock Aging */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">5. Stock Aging Profile</h3>
                  <p className="text-xs text-secondary mt-0.5">อายุสินค้าคงคลังแยกระดับความเสี่ยง (MT)</p>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                <div className="w-full bg-surface-container rounded-full h-8 flex overflow-hidden shadow-inner border border-outline-variant/30">
                  <div className="bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold" style={{ width: '60%' }}>60%</div>
                  <div className="bg-blue-400 flex items-center justify-center text-white text-[10px] font-bold" style={{ width: '25%' }}>25%</div>
                  <div className="bg-amber-400 flex items-center justify-center text-amber-900 text-[10px] font-bold" style={{ width: '10%' }}>10%</div>
                  <div className="bg-red-500 flex items-center justify-center text-white text-[10px] font-bold" style={{ width: '5%' }}>5%</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 bg-emerald-50 rounded border border-emerald-100">
                    <div className="text-[10px] text-emerald-800 font-medium">&lt; 30 Days</div>
                    <div className="font-bold text-emerald-700 font-data-mono-num mt-0.5">7,470</div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded border border-blue-100">
                    <div className="text-[10px] text-blue-800 font-medium">31 - 60 Days</div>
                    <div className="font-bold text-blue-700 font-data-mono-num mt-0.5">3,112</div>
                  </div>
                  <div className="p-2 bg-amber-50 rounded border border-amber-100">
                    <div className="text-[10px] text-amber-800 font-medium">61 - 90 Days</div>
                    <div className="font-bold text-amber-700 font-data-mono-num mt-0.5">1,245</div>
                  </div>
                  <div className="p-2 bg-red-50 rounded border border-red-100">
                    <div className="text-[10px] text-red-800 font-medium">&gt; 90 Days</div>
                    <div className="font-bold text-red-700 font-data-mono-num mt-0.5">623</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chart 6: Top Critical Issues */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">6. Top Critical Issues & Action Plans</h3>
                <p className="text-xs text-secondary mt-0.5">ประเด็นวิกฤตที่ต้องได้รับการอนุมัติหรือจัดการทันที</p>
              </div>
              <button className="text-primary text-[11px] font-bold hover:underline">View Action Board</button>
            </div>
            <div className="mt-3 space-y-2">
              <div className="p-2.5 bg-red-50 border border-red-200 rounded flex items-start gap-2.5">
                <span className="material-symbols-outlined text-red-600 text-[18px] mt-0.5">warning</span>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-red-900 leading-tight">อกไก่ลอกหนัง (BL Breast) ขาดส่ง -42 MT</span>
                    <span className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Critical</span>
                  </div>
                  <p className="text-[11px] text-red-800 mt-0.5">กระทบคำสั่งซื้อ Modern Trade (W42) รออนุมัติการตัดโควตา Export มาชดเชย</p>
                </div>
              </div>
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded flex items-start gap-2.5">
                <span className="material-symbols-outlined text-amber-600 text-[18px] mt-0.5">inventory</span>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-amber-900 leading-tight">โครงไก่ (Chicken Frame) Overstock +250 MT</span>
                    <span className="text-[9px] bg-amber-500 text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Warning</span>
                  </div>
                  <p className="text-[11px] text-amber-800 mt-0.5">สต๊อกอายุเกิน 60 วันที่ WH-02 โคราช แนะนำจัดโปรโมชั่น Food Service</p>
                </div>
              </div>
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded flex items-start gap-2.5">
                <span className="material-symbols-outlined text-blue-600 text-[18px] mt-0.5">pending_actions</span>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-blue-900 leading-tight">รออนุมัติแผนขายรายปี (Annual Plan FY2026)</span>
                    <span className="text-[9px] bg-blue-600 text-white px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Approval</span>
                  </div>
                  <p className="text-[11px] text-blue-800 mt-0.5">V2.4 Draft ส่งให้ S&OP Board พิจารณา (SLA: 4 hrs remaining)</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
