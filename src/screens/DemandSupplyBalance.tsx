import React, { useState, useEffect } from 'react';
import { getStoredChickenTypes, ChickenType } from '../data/chickenTypeMaster';

interface BalanceItem {
  id: string;
  p: string;
  chickenTypeId: string;
  chickenTypeName: string;
  bs: number; // Beg. Stock (MT)
  ps: number; // Prod. Supply (MT)
  ds: number; // Direct Sales Demand (MT)
  sr: number; // Special RM Demand (MT)
  va: number; // Value Added Demand (MT)
  channels?: { name: string; ds: number }[];
}

const INITIAL_BALANCE_DATA: BalanceItem[] = [
  {
    id: 'BAL-01',
    p: 'เนื้ออกลอกหนัง (BL Breast)',
    chickenTypeId: 'BROILER',
    chickenTypeName: 'ไก่เนื้อ (Broiler)',
    bs: 50.00,
    ps: 660.00,
    ds: 300.00,
    sr: 200.00,
    va: 250.00,
    channels: [
      { name: 'Modern Trade Channel', ds: 150.00 },
      { name: 'Export EU & Japan', ds: 150.00 }
    ]
  },
  {
    id: 'BAL-02',
    p: 'น่องติดสะโพก (Leg Quarter)',
    chickenTypeId: 'BROILER',
    chickenTypeName: 'ไก่เนื้อ (Broiler)',
    bs: 20.00,
    ps: 435.00,
    ds: 380.00,
    sr: 0.00,
    va: 50.00,
    channels: [
      { name: 'Food Service / QSR', ds: 230.00 },
      { name: 'Traditional Wet Market', ds: 150.00 }
    ]
  },
  {
    id: 'BAL-03',
    p: 'ปีกเต็ม (Whole Wing)',
    chickenTypeId: 'BROILER',
    chickenTypeName: 'ไก่เนื้อ (Broiler)',
    bs: 142.00,
    ps: 315.00,
    ds: 300.00,
    sr: 0.00,
    va: 0.00,
    channels: [
      { name: 'Wholesale / Makro', ds: 180.00 },
      { name: 'HORECA', ds: 120.00 }
    ]
  },
  {
    id: 'BAL-04',
    p: 'โครงไก่ต้มซุป (Soup Bone Frame)',
    chickenTypeId: 'LAYER',
    chickenTypeName: 'ไก่ไข่ปลด (Layer)',
    bs: 18.00,
    ps: 180.00,
    ds: 195.00,
    sr: 0.00,
    va: 0.00,
    channels: [
      { name: 'โรงงานผงปรุงรสและซุปกระดูก', ds: 140.00 },
      { name: 'ร้านก๋วยเตี๋ยวและฟู้ดทรัค', ds: 55.00 }
    ]
  },
  {
    id: 'BAL-05',
    p: 'เนื้อเลาะกระดูก MDM (Sausage RM)',
    chickenTypeId: 'PARENT_STOCK',
    chickenTypeName: 'พ่อแม่พันธุ์ปลด (PS)',
    bs: 35.00,
    ps: 125.00,
    ds: 80.00,
    sr: 45.00,
    va: 25.00,
    channels: [
      { name: 'โรงงานแปรรูปไส้กรอกไก่', ds: 80.00 }
    ]
  },
  {
    id: 'BAL-06',
    p: 'น่องไก่พื้นเมืองพรีเมียม (Native Drumstick)',
    chickenTypeId: 'SPECIALTY_NATIVE',
    chickenTypeName: 'ไก่พื้นเมือง (Native/Specialty)',
    bs: 5.00,
    ps: 22.00,
    ds: 28.00,
    sr: 0.00,
    va: 0.00,
    channels: [
      { name: 'ภัตตาคารจีน & สวนอาหารมิชลิน', ds: 28.00 }
    ]
  }
];

export default function DemandSupplyBalance() {
  const [chickenTypes, setChickenTypes] = useState<ChickenType[]>([]);
  const [items, setItems] = useState<BalanceItem[]>(INITIAL_BALANCE_DATA);
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({ 'BAL-01': true });

  useEffect(() => {
    setChickenTypes(getStoredChickenTypes());
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredItems = items.filter(item => {
    const matchType = selectedType === 'ALL' || item.chickenTypeId === selectedType;
    
    const as = item.bs + item.ps;
    const tr = item.ds + item.sr + item.va;
    const bq = as - tr;
    const bp = tr > 0 ? (bq / tr) * 100 : 0;

    let status = 'Balanced';
    if (bp < -5) status = 'Critical Shortage';
    else if (bp < 0) status = 'Tight';
    else if (bp > 20) status = 'Excess';
    else if (bp > 0) status = 'Surplus';

    const matchStatus = statusFilter === 'ALL' || status === statusFilter;
    return matchType && matchStatus;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>สมดุลความต้องการ (Balance)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Demand-Supply Balance</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight flex items-center gap-2.5">
                <span>สมดุลความต้องการและผลผลิต (Demand-Supply Balance)</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                  Poultry Dimension Drill-Down
                </span>
              </h1>
              <p className="text-xs text-on-surface-variant mt-0.5">
                วิเคราะห์ความสมดุลระหว่างซัพพลายตามยิลด์ประเภทไก่ (Chicken Type) กับความต้องการของลูกค้าทุกช่องทางจำหน่าย
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[15px]">sync</span>
                <span>Run Balance Engine</span>
              </button>
            </div>
          </div>
        </div>

        {/* Multi-Dimensional Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center bg-surface border border-outline-variant rounded px-2.5 py-1 gap-1.5">
              <span className="text-xs font-bold text-on-surface-variant">งวดเดือน:</span>
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

            {/* STATUS FILTER */}
            <select 
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-xs text-on-surface cursor-pointer"
            >
              <option value="ALL">ทุกสถานะสมดุล (All Status)</option>
              <option value="Critical Shortage">Critical Shortage (ขาดแคลนวิกฤต)</option>
              <option value="Tight">Tight (ตึงตัว)</option>
              <option value="Balanced">Balanced (สมดุล)</option>
              <option value="Surplus">Surplus (มีส่วนเกิน)</option>
              <option value="Excess">Excess (ล้นตลาด)</option>
            </select>
          </div>

          <div className="text-xs text-on-surface-variant font-medium">
            พบ {filteredItems.length} รายการชิ้นส่วน
          </div>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1650px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant w-64 sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Product SKU</th>
              <th className="px-3 border-r border-outline-variant w-44 text-center">ประเภทไก่ (Chicken Type)</th>
              <th className="px-3 border-r border-outline-variant w-24 text-right bg-blue-50 text-blue-800">Beg. Stock</th>
              <th className="px-3 border-r border-outline-variant w-24 text-right bg-blue-50 text-blue-800">Prod. Supply</th>
              <th className="px-3 border-r border-outline-variant w-28 text-right bg-blue-100 text-blue-900 font-bold">Avail. Supply</th>
              <th className="px-3 border-r border-outline-variant w-24 text-right">Direct Sales (D)</th>
              <th className="px-3 border-r border-outline-variant w-24 text-right">Special RM (D)</th>
              <th className="px-3 border-r border-outline-variant w-24 text-right">Value Added (D)</th>
              <th className="px-3 border-r border-outline-variant w-28 text-right bg-amber-50 text-amber-900 font-bold">Total Req.</th>
              <th className="px-3 border-r border-outline-variant w-28 text-right">Balance Qty (MT)</th>
              <th className="px-3 border-r border-outline-variant w-20 text-right">Bal %</th>
              <th className="px-4 w-32 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {filteredItems.map((item) => {
              const as = item.bs + item.ps;
              const tr = item.ds + item.sr + item.va;
              const bq = as - tr;
              const bp = tr > 0 ? (bq / tr) * 100 : 0;

              let stat = 'Balanced';
              let statClass = 'bg-emerald-100 text-emerald-800 border border-emerald-300';
              if (bp < -5) {
                stat = 'Critical Shortage';
                statClass = 'bg-error-container text-error border border-error/30 font-bold';
              } else if (bp < 0) {
                stat = 'Tight';
                statClass = 'bg-amber-100 text-amber-900 border border-amber-300';
              } else if (bp > 20) {
                stat = 'Excess';
                statClass = 'bg-amber-50 text-amber-800 border border-amber-200';
              } else if (bp > 0) {
                stat = 'Surplus';
                statClass = 'bg-emerald-50 text-emerald-700';
              }

              const isExpanded = expandedRows[item.id];

              return (
                <React.Fragment key={item.id}>
                  <tr className="h-10 hover:bg-surface-container-low transition-colors group">
                    <td 
                      onClick={() => toggleExpand(item.id)}
                      className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-medium text-on-surface truncate cursor-pointer select-none"
                    >
                      <span className="material-symbols-outlined text-[15px] align-middle mr-1.5 text-outline transition-transform">
                        {isExpanded ? 'expand_more' : 'chevron_right'}
                      </span>
                      <span>{item.p}</span>
                    </td>
                    <td className="px-3 text-center border-r border-outline-variant/50">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-surface-container border border-outline-variant">
                        {item.chickenTypeName}
                      </span>
                    </td>
                    <td className="px-3 text-right border-r border-outline-variant/50 bg-blue-50/10 group-hover:bg-blue-50/30">
                      {item.bs.toFixed(2)}
                    </td>
                    <td className="px-3 text-right border-r border-outline-variant/50 bg-blue-50/10 group-hover:bg-blue-50/30">
                      {item.ps.toFixed(2)}
                    </td>
                    <td className="px-3 text-right border-r border-outline-variant/50 font-bold text-primary bg-blue-50/30 group-hover:bg-blue-50/50">
                      {as.toFixed(2)}
                    </td>
                    <td className="px-3 text-right border-r border-outline-variant/50">{item.ds.toFixed(2)}</td>
                    <td className="px-3 text-right border-r border-outline-variant/50">{item.sr.toFixed(2)}</td>
                    <td className="px-3 text-right border-r border-outline-variant/50">{item.va.toFixed(2)}</td>
                    <td className="px-3 text-right border-r border-outline-variant/50 font-bold text-amber-900 bg-amber-50/30 group-hover:bg-amber-50/50">
                      {tr.toFixed(2)}
                    </td>
                    <td className={`px-3 text-right border-r border-outline-variant/50 font-bold ${bq < 0 ? 'text-error' : 'text-primary'}`}>
                      {bq > 0 ? `+${bq.toFixed(2)}` : bq.toFixed(2)}
                    </td>
                    <td className={`px-3 text-right border-r border-outline-variant/50 font-bold ${bp < 0 ? 'text-error' : 'text-emerald-700'}`}>
                      {bp > 0 ? `+${bp.toFixed(1)}%` : `${bp.toFixed(1)}%`}
                    </td>
                    <td className="px-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statClass}`}>
                        {stat}
                      </span>
                    </td>
                  </tr>

                  {/* Channel Drill-down Sub-rows */}
                  {isExpanded && item.channels?.map((ch, idx) => (
                    <tr key={idx} className="h-8 bg-surface-container-lowest/60 text-xs text-on-surface-variant">
                      <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest/80 pl-9 font-normal">
                        ↳ {ch.name}
                      </td>
                      <td className="border-r border-outline-variant/50 text-center">-</td>
                      <td className="border-r border-outline-variant/50 text-center">-</td>
                      <td className="border-r border-outline-variant/50 text-right pr-3">-</td>
                      <td className="border-r border-outline-variant/50 text-right pr-3">-</td>
                      <td className="border-r border-outline-variant/50 text-right pr-3">-</td>
                      <td className="border-r border-outline-variant/50 text-right pr-3 font-mono font-semibold text-on-surface">
                        {ch.ds.toFixed(2)}
                      </td>
                      <td className="border-r border-outline-variant/50 text-right pr-3">-</td>
                      <td className="border-r border-outline-variant/50 text-right pr-3">-</td>
                      <td className="border-r border-outline-variant/50 text-right pr-3 font-mono font-semibold text-amber-900">
                        {ch.ds.toFixed(2)}
                      </td>
                      <td className="border-r border-outline-variant/50 text-right pr-3">-</td>
                      <td className="border-r border-outline-variant/50 text-right pr-3">-</td>
                      <td className="text-center">
                        <span className="text-[10px] text-outline">Channel Allocated</span>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}
