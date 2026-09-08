import React, { useState, useMemo } from 'react';
import { getStoredChickenTypes } from '../data/chickenTypeMaster';
import { POULTRY_CHANNELS } from '../data/poultryData';

interface PlanRow {
  id: string;
  p: string;
  c: string;
  chickenType: string;
  channel: string;
  months: number[];
}

export default function AnnualPlan() {
  const [selectedUnit, setSelectedUnit] = useState<'KG' | 'PCS' | 'CASE' | 'THB'>('KG');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedChannel, setSelectedChannel] = useState('ALL');
  const [selectedChickenType, setSelectedChickenType] = useState('ALL');
  const [selectedCustomer, setSelectedCustomer] = useState('ALL');
  const [planStatus, setPlanStatus] = useState('Under Review (V2.0)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const chickenTypes = useMemo(() => getStoredChickenTypes(), []);

  const [rows, setRows] = useState<PlanRow[]>([
    {
      id: '1',
      p: 'เนื้ออกลอกหนัง (BL Breast)',
      c: "Lotus's DC วังน้อย",
      chickenType: 'ไก่เนื้อ (Broiler)',
      channel: 'Modern Trade',
      months: [95, 100, 105, 110, 98, 102, 105, 95, 100, 115, 110, 120]
    },
    {
      id: '2',
      p: 'เนื้ออกลอกหนัง (BL Breast)',
      c: "Big C DC สุวินทวงศ์",
      chickenType: 'ไก่เนื้อ (Broiler)',
      channel: 'Modern Trade',
      months: [80, 82, 85, 88, 78, 80, 82, 80, 82, 90, 88, 95]
    },
    {
      id: '3',
      p: 'น่องไก่ (Drumstick)',
      c: "เคเอฟซี ประเทศไทย (ยัม)",
      chickenType: 'ไก่เนื้อ (Broiler)',
      channel: 'HoReCa',
      months: [110, 115, 120, 125, 112, 118, 120, 115, 120, 130, 125, 135]
    },
    {
      id: '4',
      p: 'ปีกเต็ม (Whole Wing)',
      c: "Makro DC วังน้อย",
      chickenType: 'ไก่เนื้อ (Broiler)',
      channel: 'Modern Trade',
      months: [120, 125, 130, 135, 122, 128, 130, 125, 130, 140, 135, 150]
    },
    {
      id: '5',
      p: 'โครงไก่ (Chicken Frame)',
      c: "บมจ. ไทยเพรซิเดนท์ฟูดส์ (มาม่า)",
      chickenType: 'ไก่ไข่ปลดระวาง (Layer)',
      channel: 'Industry',
      months: [50, 52, 55, 58, 48, 50, 52, 50, 52, 60, 58, 65]
    },
    {
      id: '6',
      p: 'เนื้อสะโพกถอดกระดูก (BL Leg)',
      c: "นิปปอน มีท เทรดดิ้ง (โตเกียว)",
      chickenType: 'ไก่เนื้อ (Broiler)',
      channel: 'Export',
      months: [90, 95, 100, 105, 92, 98, 100, 95, 100, 110, 105, 115]
    }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleMonthChange = (rowId: string, monthIdx: number, val: string) => {
    const num = parseFloat(val) || 0;
    setRows(prev => prev.map(r => {
      if (r.id === rowId) {
        const newM = [...r.months];
        newM[monthIdx] = num;
        return { ...r, months: newM };
      }
      return r;
    }));
  };

  // Unit multiplier for display
  const getMultiplier = () => {
    switch (selectedUnit) {
      case 'KG': return 1000; // MT to KG
      case 'PCS': return 4000;
      case 'CASE': return 100;
      case 'THB': return 85000; // Revenue approximation
      default: return 1000;
    }
  };

  const filteredRows = useMemo(() => {
    return rows.filter(r => {
      if (selectedChannel !== 'ALL' && r.channel !== selectedChannel) return false;
      if (selectedChickenType !== 'ALL' && !r.chickenType.includes(selectedChickenType)) return false;
      if (selectedCustomer !== 'ALL' && !r.c.toLowerCase().includes(selectedCustomer.toLowerCase())) return false;
      return true;
    });
  }, [rows, selectedChannel, selectedChickenType, selectedCustomer]);

  const monthTotals = useMemo(() => {
    const totals = Array(12).fill(0);
    filteredRows.forEach(r => {
      r.months.forEach((m, i) => {
        totals[i] += m;
      });
    });
    return totals;
  }, [filteredRows]);

  const annualGrandTotal = useMemo(() => {
    return monthTotals.reduce((a, b) => a + b, 0);
  }, [monthTotals]);

  const handleSaveDraft = () => {
    showToast('บันทึกแบบร่างแผนประจำปี V2.0 เรียบร้อยแล้ว (Local Draft Saved)');
  };

  const handleSubmitReview = () => {
    setPlanStatus('Approved V2.1 (BR-01 Locked)');
    showToast('[BR-01 Enforced] แผนประจำปีได้รับการอนุมัติแล้ว (V2.1 Approved)! ห้ามแก้ไขโดยตรง ต้องสร้าง Replan เท่านั้น');
  };

  const handleExportTemplate = () => {
    const header = "Product,Customer,ChickenType,Channel,Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec,AnnualTotal\n";
    const body = filteredRows.map(r => {
      const rowSum = r.months.reduce((a, b) => a + b, 0);
      return `"${r.p}","${r.c}","${r.chickenType}","${r.channel}",${r.months.join(',')},${rowSum}`;
    }).join('\n');

    const blob = new Blob(['\uFEFF' + header + body], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Annual_Plan_${selectedYear}_Template.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('ส่งออกเทมเพลตแผนงาน CSV สำเร็จ');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {toastMessage && (
        <div className="fixed top-14 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 text-xs font-medium border border-outline-variant animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER & FILTERS */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>การวางแผน (Planning)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">แผนประจำปี (Annual Sales Plan)</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mx-1"></span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              planStatus.includes('Approved') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              Version: {planStatus}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">แผนประจำปี (Annual Sales Plan)</h1>
            <div className="flex items-center gap-2 bg-surface-container border border-outline-variant p-0.5 rounded">
              {(['KG', 'PCS', 'CASE', 'THB'] as const).map(u => (
                <button
                  key={u}
                  onClick={() => setSelectedUnit(u)}
                  className={`px-3 py-1 text-xs transition-colors rounded ${
                    selectedUnit === u
                      ? 'font-bold bg-surface-container-lowest text-primary shadow-sm border border-outline-variant/50'
                      : 'font-medium text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {u === 'THB' ? 'Revenue (THB)' : u}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Bar with Chicken Type Dimension */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            <option value="2026">Year: 2026</option>
            <option value="2025">Year: 2025</option>
          </select>

          <select 
            value={selectedChickenType}
            onChange={(e) => setSelectedChickenType(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            <option value="ALL">Chicken Type: All (ทุกประเภทไก่)</option>
            {chickenTypes.map(c => {
              const val = c.code === 'BROILER' ? 'Broiler' : c.code === 'LAYER' ? 'Layer' : c.code === 'PS' ? 'PS' : c.nameEn;
              return (
                <option key={c.id} value={val}>{c.nameTh} ({c.nameEn})</option>
              );
            })}
          </select>

          <select 
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            <option value="ALL">Channel: All</option>
            {POULTRY_CHANNELS.map(ch => (
              <option key={ch.code} value={ch.nameTh}>{ch.nameTh}</option>
            ))}
          </select>

          <select 
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            <option value="ALL">Customer: All</option>
            <option value="Lotus">Lotus's</option>
            <option value="Big C">Big C</option>
            <option value="Makro">Makro</option>
            <option value="เคเอฟซี">KFC (ยัม)</option>
            <option value="นิปปอน">นิปปอน มีท</option>
          </select>

          <button 
            onClick={handleExportTemplate}
            className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 ml-auto cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">download</span>
            <span>Export Template (CSV)</span>
          </button>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT: EDITABLE GRID */}
        <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest border-r border-outline-variant">
          <table className="w-full text-right border-collapse min-w-[1350px]">
            <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
              <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                <th className="px-3 border-r border-outline-variant min-w-[180px] sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Product</th>
                <th className="px-3 border-r border-outline-variant min-w-[160px] sticky left-[180px] z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0]">Customer</th>
                <th className="px-3 border-r border-outline-variant min-w-[140px]">Chicken Type</th>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                  <th key={m} className="px-2 border-r border-outline-variant w-16 text-right">{m}</th>
                ))}
                <th className="px-3 w-28 text-right bg-surface-container-high text-primary">Annual Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
              {filteredRows.map((row) => {
                const rowTotal = row.months.reduce((a, b) => a + b, 0);
                const displayTotal = selectedUnit === 'KG' ? (rowTotal * 1000).toLocaleString() : rowTotal.toFixed(2);
                return (
                  <tr key={row.id} className="h-10 hover:bg-surface-container-low transition-colors group">
                    <td className="px-3 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm font-medium text-on-surface truncate max-w-[180px]" title={row.p}>
                      {row.p}
                    </td>
                    <td className="px-3 text-left border-r border-outline-variant/50 sticky left-[180px] z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm text-on-surface-variant truncate max-w-[160px]" title={row.c}>
                      {row.c}
                    </td>
                    <td className="px-3 text-left border-r border-outline-variant/50 text-xs text-on-surface-variant font-semibold">
                      {row.chickenType}
                    </td>
                    {row.months.map((mVal, j) => (
                      <td key={j} className="border-r border-outline-variant/50 p-0">
                        <input 
                          type="number"
                          step="0.5"
                          value={mVal}
                          onChange={(e) => handleMonthChange(row.id, j, e.target.value)}
                          disabled={planStatus.includes('Approved')}
                          className="w-full h-full px-2 text-right bg-transparent focus:bg-surface focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary text-on-surface text-xs disabled:opacity-75"
                        />
                      </td>
                    ))}
                    <td className="px-3 font-bold text-primary bg-surface-container/30 group-hover:bg-surface-container-low">
                      {displayTotal} {selectedUnit}
                    </td>
                  </tr>
                );
              })}
              {/* Aggregation Row */}
              <tr className="h-10 bg-surface-container sticky bottom-0 z-20 border-t-2 border-outline font-bold">
                <td className="px-3 text-left border-r border-outline-variant sticky left-0 z-30 bg-surface-container">Total</td>
                <td className="px-3 text-left border-r border-outline-variant sticky left-[180px] z-30 bg-surface-container">({filteredRows.length} Rows)</td>
                <td className="border-r border-outline-variant"></td>
                {monthTotals.map((mTot, j) => (
                  <td key={j} className="px-2 border-r border-outline-variant text-right text-xs">
                    {selectedUnit === 'KG' ? (mTot * 1000).toLocaleString() : mTot.toFixed(1)}
                  </td>
                ))}
                <td className="px-3 text-right text-primary">
                  {selectedUnit === 'KG' ? (annualGrandTotal * 1000).toLocaleString() : annualGrandTotal.toFixed(1)} {selectedUnit}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* RIGHT: SUMMARY PANEL */}
        <aside className="w-80 bg-surface-container-lowest flex flex-col shrink-0">
          <div className="p-space-md border-b border-outline-variant bg-surface-container-low font-headline-sm text-headline-sm font-bold text-on-surface flex items-center justify-between">
            <span>FY{selectedYear} Summary</span>
            <span className="text-xs font-normal text-on-surface-variant">Live Sync</span>
          </div>
          <div className="p-space-md space-y-4 overflow-y-auto custom-scrollbar flex-1">
            <div className="bg-surface border border-outline-variant rounded p-3 shadow-xs">
              <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mb-1">Total Demand vs Supply</div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-on-surface font-medium text-body-sm">Total Demand:</span>
                <span className="font-data-mono-num font-bold text-[16px] text-on-surface">
                  {annualGrandTotal.toFixed(1)} <span className="text-[10px] font-normal text-on-surface-variant">MT</span>
                </span>
              </div>
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-on-surface font-medium text-body-sm">Available Supply:</span>
                <span className="font-data-mono-num font-bold text-[16px] text-on-surface">
                  {(annualGrandTotal * 0.95).toFixed(1)} <span className="text-[10px] font-normal text-on-surface-variant">MT</span>
                </span>
              </div>
              <div className="pt-2 border-t border-outline-variant flex justify-between items-baseline">
                <span className="text-error font-medium text-body-sm">Gap:</span>
                <span className="font-data-mono-num font-bold text-[16px] text-error">
                  -{(annualGrandTotal * 0.05).toFixed(1)} <span className="text-[10px] font-normal text-error">MT</span>
                </span>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded p-3 shadow-xs">
              <div className="text-[10px] font-badge-caps uppercase tracking-wider text-on-surface-variant mb-3">Resource Requirements</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-baseline text-body-sm mb-1">
                    <span className="text-on-surface font-medium">Required RM (Live Weight)</span>
                    <span className="font-data-mono-num font-bold text-on-surface">
                      {(annualGrandTotal * 1.36).toFixed(0)} <span className="text-[10px] font-normal text-on-surface-variant">MT</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[85%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline text-body-sm mb-1">
                    <span className="text-on-surface font-medium">Required Bird</span>
                    <span className="font-data-mono-num font-bold text-on-surface">
                      {((annualGrandTotal * 1.36 * 1000) / 2.45 / 1000000).toFixed(2)}M <span className="text-[10px] font-normal text-on-surface-variant">Heads</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[92%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline text-body-sm mb-1">
                    <span className="text-on-surface font-medium">Global Rule BR-01</span>
                    <span className="font-data-mono-num font-bold text-primary">Immutability</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">
                    แผนที่ได้รับอนุมัติแล้วจะถูกล็อค ห้ามแก้ไขโดยตรง หากต้องการปรับปรุง ต้องใช้กระบวนการ Replan สร้าง Version ใหม่
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-space-md border-t border-outline-variant bg-surface-container-lowest space-y-2">
            <button 
              onClick={handleSaveDraft}
              disabled={planStatus.includes('Approved')}
              className="w-full py-2 bg-primary text-white font-label-md rounded hover:bg-inverse-surface disabled:opacity-50 shadow-sm transition cursor-pointer"
            >
              Save Draft
            </button>
            <button 
              onClick={handleSubmitReview}
              disabled={planStatus.includes('Approved')}
              className="w-full py-2 bg-surface border border-outline-variant text-on-surface font-label-md rounded hover:bg-surface-container-low disabled:opacity-50 shadow-sm transition cursor-pointer"
            >
              Submit for Review (Approve Plan)
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
