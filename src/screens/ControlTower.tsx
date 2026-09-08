export default function ControlTower() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-y-auto custom-scrollbar">
      {/* TOP CONTROL TOWER BAR */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md flex flex-wrap items-center justify-between gap-y-3 shrink-0">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>การวางแผน (Planning)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">ศูนย์ควบคุม (Control Tower)</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mx-1"></span>
            <span className="text-on-surface-variant">ติดตามงานประสานงานขายรายวัน</span>
          </div>
          <div className="flex items-center space-x-3">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              SALES COORDINATION CONTROL TOWER
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-error-container text-on-error-container font-badge-caps text-badge-caps uppercase tracking-wider font-bold">
              14 Active Exceptions
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-space-md flex-wrap">
          <div className="flex items-center bg-surface-container-low p-0.5 rounded border border-outline-variant">
            <button className="px-3 py-1 font-label-sm text-label-sm rounded bg-surface-container-lowest text-primary font-bold shadow-sm border border-outline-variant/50" type="button">
              Today
            </button>
            <button className="px-3 py-1 font-label-sm text-label-sm rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
              WTD
            </button>
            <button className="px-3 py-1 font-label-sm text-label-sm rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button">
              MTD
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="inline-flex items-center space-x-1 px-3 py-1.5 bg-primary text-white font-label-md text-label-md rounded hover:bg-inverse-surface active:scale-[0.98] transition shadow-sm" type="button">
              <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
              <span>จัดการ Exception</span>
            </button>
            <button className="inline-flex items-center space-x-1 px-3 py-1.5 bg-surface border border-outline-variant text-on-surface font-label-md text-label-md rounded hover:bg-surface-container-low active:scale-[0.98] transition shadow-sm" type="button">
              <span className="material-symbols-outlined text-[16px]">sync_alt</span>
              <span>Re-allocate</span>
            </button>
          </div>
        </div>
      </section>

      {/* FILTER TOOLBAR */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-2 flex flex-wrap items-center justify-between gap-3 text-label-sm shrink-0">
        <div className="flex items-center space-x-3 flex-wrap">
          <div className="flex items-center space-x-1.5 text-on-surface-variant font-medium">
            <span className="material-symbols-outlined text-[16px]">filter_alt</span>
            <span>ตัวกรอง:</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-on-surface-variant font-label-sm text-label-sm">โรงงาน:</span>
            <select className="h-7 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none">
              <option>ทุกโรงงาน (All Plants - 3)</option>
            </select>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-on-surface-variant font-label-sm text-label-sm">กลุ่มชิ้นส่วน:</span>
            <select className="h-7 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none">
              <option>ทุกชิ้นส่วน (All Cuts)</option>
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-on-surface-variant font-label-sm text-label-sm">Batch Cutoff: <strong className="text-error font-data-mono-num font-bold">11:30 น. (เหลือ 48 นาที)</strong></span>
        </div>
      </section>

      {/* OPERATIONAL KPI CARDS ROW (8 KPIs) */}
      <section className="px-space-2xl py-4 shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
          {/* KPI 1: Supply */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-3 flex flex-col justify-between shadow-xs">
            <div className="font-label-sm text-label-sm text-secondary font-medium mb-1 line-clamp-1">1. ซัพพลาย (Supply)</div>
            <div className="flex items-baseline space-x-1">
              <span className="font-display-kpi text-[22px] font-bold text-on-surface">940</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant">MT</span>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-outline-variant">
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1 rounded font-semibold">+15 MT vs Plan</span>
            </div>
          </div>
          
          {/* KPI 2: Allocation */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-3 flex flex-col justify-between shadow-xs">
            <div className="font-label-sm text-label-sm text-secondary font-medium mb-1 line-clamp-1">2. จัดสรร (Allocation)</div>
            <div className="flex items-baseline space-x-1">
              <span className="font-display-kpi text-[22px] font-bold text-on-surface">915</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant">MT</span>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-outline-variant">
              <span className="text-[10px] text-blue-700 font-semibold">97.3% of Supply</span>
            </div>
          </div>

          {/* KPI 3: Confirmed SO */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-3 flex flex-col justify-between shadow-xs">
            <div className="font-label-sm text-label-sm text-secondary font-medium mb-1 line-clamp-1">3. ยืนยัน SO</div>
            <div className="flex items-baseline space-x-1">
              <span className="font-display-kpi text-[22px] font-bold text-on-surface">850</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant">MT</span>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-outline-variant">
              <span className="text-[10px] text-amber-700 bg-amber-50 px-1 rounded font-semibold">65 MT Pending</span>
            </div>
          </div>

          {/* KPI 4: Loaded */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-3 flex flex-col justify-between shadow-xs">
            <div className="font-label-sm text-label-sm text-secondary font-medium mb-1 line-clamp-1">4. โหลดสินค้า (Loaded)</div>
            <div className="flex items-baseline space-x-1">
              <span className="font-display-kpi text-[22px] font-bold text-on-surface">620</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant">MT</span>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-outline-variant">
              <span className="text-[10px] text-secondary font-semibold">72.9% of SO</span>
            </div>
          </div>

          {/* KPI 5: Delivered */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded p-3 flex flex-col justify-between shadow-xs">
            <div className="font-label-sm text-label-sm text-secondary font-medium mb-1 line-clamp-1">5. ส่งมอบ (Delivered)</div>
            <div className="flex items-baseline space-x-1">
              <span className="font-display-kpi text-[22px] font-bold text-emerald-700">415</span>
              <span className="font-label-sm text-[10px] text-emerald-700">MT</span>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-outline-variant">
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1 rounded font-semibold">On Time 98%</span>
            </div>
          </div>

          {/* KPI 6: Unallocated Supply */}
          <div className="bg-surface-container-lowest border-2 border-amber-300 rounded p-3 flex flex-col justify-between shadow-xs relative overflow-hidden">
            <div className="font-label-sm text-[11px] text-amber-900 font-bold mb-1 line-clamp-1">6. ซัพพลายคงเหลือ</div>
            <div className="flex items-baseline space-x-1">
              <span className="font-display-kpi text-[22px] font-bold text-amber-900">25</span>
              <span className="font-label-sm text-[10px] text-amber-800">MT</span>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-amber-200">
              <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1 py-0.5 rounded uppercase tracking-wider">เร่งเสนอขาย</span>
            </div>
          </div>

          {/* KPI 7: Sales Gap */}
          <div className="bg-surface-container-lowest border-2 border-error-container rounded p-3 flex flex-col justify-between shadow-xs relative overflow-hidden">
            <div className="font-label-sm text-[11px] text-error font-bold mb-1 line-clamp-1">7. ส่วนต่างยอดขาย (Gap)</div>
            <div className="flex items-baseline space-x-1">
              <span className="font-display-kpi text-[22px] font-bold text-error">-18</span>
              <span className="font-label-sm text-[10px] text-error">MT</span>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-error-container">
              <span className="text-[9px] bg-error-container text-error font-bold px-1 py-0.5 rounded uppercase tracking-wider">Shortage</span>
            </div>
          </div>

          {/* KPI 8: Stock Risk */}
          <div className="bg-surface-container-lowest border-2 border-amber-300 rounded p-3 flex flex-col justify-between shadow-xs relative overflow-hidden">
            <div className="font-label-sm text-[11px] text-amber-900 font-bold mb-1 line-clamp-1">8. สต๊อกเสี่ยง (Risk)</div>
            <div className="flex items-baseline space-x-1">
              <span className="font-display-kpi text-[22px] font-bold text-amber-900">142</span>
              <span className="font-label-sm text-[10px] text-amber-800">MT</span>
            </div>
            <div className="mt-1.5 pt-1.5 border-t border-amber-200">
              <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-1 py-0.5 rounded uppercase tracking-wider">Aging &gt; 60 Days</span>
            </div>
          </div>
        </div>
      </section>

      {/* EXCEPTION MANAGEMENT CENTER */}
      <section className="px-space-2xl pb-4 flex-1 flex flex-col min-h-0">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg flex-1 flex flex-col overflow-hidden shadow-xs">
          <div className="px-space-md py-3 border-b border-outline-variant bg-surface flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="material-symbols-outlined text-error text-[20px]">warning</span>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Exception Action Board</h2>
              <span className="inline-flex items-center justify-center bg-error text-white text-[10px] font-bold rounded-full h-5 px-2 ml-1">14</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
                <input className="h-7 w-48 pl-7 pr-2 text-xs border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="ค้นหา Issue..." type="text" />
              </div>
              <button className="h-7 px-2 border border-outline-variant rounded text-xs font-medium text-on-surface-variant hover:bg-surface-container flex items-center gap-1 transition-colors">
                <span className="material-symbols-outlined text-[14px]">filter_list</span>
                Filter
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-auto custom-scrollbar relative">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm">
                <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container-low">
                  <th className="px-4 border-r border-outline-variant w-24 text-center">Priority</th>
                  <th className="px-4 border-r border-outline-variant w-40">Issue Type</th>
                  <th className="px-4 border-r border-outline-variant w-48">Product / SKU</th>
                  <th className="px-4 border-r border-outline-variant w-32">Channel</th>
                  <th className="px-4 border-r border-outline-variant w-48">Customer / Dest</th>
                  <th className="px-4 border-r border-outline-variant w-24 text-right">Qty (MT)</th>
                  <th className="px-4 border-r border-outline-variant">Impact & Details</th>
                  <th className="px-4 border-r border-outline-variant w-32">Owner</th>
                  <th className="px-4 border-r border-outline-variant w-32 text-center">Due Date</th>
                  <th className="px-4 w-28 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant font-body-sm text-body-sm">
                {/* Row 1: Critical */}
                <tr className="h-12 hover:bg-surface-container-low transition-colors bg-red-50/30 group">
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-error text-white font-badge-caps text-[10px] font-bold tracking-wider">P1 - HIGH</span>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="font-semibold text-error">Supply Shortage</div>
                    <div className="text-[10px] text-error/80 font-data-mono-num mt-0.5">INC-8924</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="font-medium text-on-surface truncate">เนื้ออกลอกหนัง (BL Breast)</div>
                    <div className="text-[10px] text-on-surface-variant font-data-mono-num mt-0.5">SKU-CK-BR01</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50 text-on-surface-variant">Modern Trade</td>
                  <td className="px-4 border-r border-outline-variant/50 font-medium text-on-surface truncate">Lotus's DC วังน้อย</td>
                  <td className="px-4 text-right font-data-mono-num font-bold text-error border-r border-outline-variant/50">
                    -18.5
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="text-xs text-on-surface truncate">กระทบแผนโปรโมชั่นสัปดาห์หน้า</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[9px] font-bold">SP</div>
                      <span className="text-[11px] font-medium text-on-surface">Supakit P.</span>
                    </div>
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <div className="text-[11px] font-data-mono-num text-error font-bold">Today 12:00</div>
                  </td>
                  <td className="px-4 text-center">
                    <select className="text-[10px] font-bold bg-transparent border border-outline-variant rounded py-0.5 px-1 text-on-surface focus:outline-none focus:border-primary">
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </td>
                </tr>
                
                {/* Row 2: Warning */}
                <tr className="h-12 hover:bg-surface-container-low transition-colors bg-amber-50/30 group">
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-500 text-white font-badge-caps text-[10px] font-bold tracking-wider">P2 - MED</span>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="font-semibold text-amber-700">Unallocated Supply</div>
                    <div className="text-[10px] text-amber-700/80 font-data-mono-num mt-0.5">INC-8925</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="font-medium text-on-surface truncate">โครงไก่ (Chicken Frame)</div>
                    <div className="text-[10px] text-on-surface-variant font-data-mono-num mt-0.5">SKU-CK-FL04</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50 text-on-surface-variant">Food Service</td>
                  <td className="px-4 border-r border-outline-variant/50 font-medium text-on-surface truncate">Unassigned</td>
                  <td className="px-4 text-right font-data-mono-num font-bold text-amber-700 border-r border-outline-variant/50">
                    +25.0
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="text-xs text-on-surface truncate">ซัพพลายส่วนเกินจากแผนเชือด แจ้งทีมเซลส์เสนอขายด่วน</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[9px] font-bold">NS</div>
                      <span className="text-[11px] font-medium text-on-surface">Nalinee S.</span>
                    </div>
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <div className="text-[11px] font-data-mono-num text-amber-700 font-bold">Tomorrow 10:00</div>
                  </td>
                  <td className="px-4 text-center">
                    <select className="text-[10px] font-bold bg-transparent border border-outline-variant rounded py-0.5 px-1 text-on-surface focus:outline-none focus:border-primary" defaultValue="In Progress">
                      <option>Open</option>
                      <option value="In Progress">In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </td>
                </tr>

                {/* Row 3: Standard / Another Alert */}
                <tr className="h-12 hover:bg-surface-container-low transition-colors group">
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-500 text-white font-badge-caps text-[10px] font-bold tracking-wider">P2 - MED</span>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="font-semibold text-amber-700">Stock Risk</div>
                    <div className="text-[10px] text-on-surface-variant font-data-mono-num mt-0.5">INC-8926</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="font-medium text-on-surface truncate">ปีกเต็ม (Whole Wing)</div>
                    <div className="text-[10px] text-on-surface-variant font-data-mono-num mt-0.5">SKU-CK-WW01</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50 text-on-surface-variant">Export</td>
                  <td className="px-4 border-r border-outline-variant/50 font-medium text-on-surface truncate">WH-02 (โคราช)</td>
                  <td className="px-4 text-right font-data-mono-num font-bold text-on-surface border-r border-outline-variant/50">
                    142.0
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="text-xs text-on-surface truncate">สต๊อกอายุเกิน 60 วัน เสี่ยงคุณภาพลดลง</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[9px] font-bold">TC</div>
                      <span className="text-[11px] font-medium text-on-surface">Tanit C.</span>
                    </div>
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <div className="text-[11px] font-data-mono-num text-on-surface-variant">19 Oct 2025</div>
                  </td>
                  <td className="px-4 text-center">
                    <select className="text-[10px] font-bold bg-transparent border border-outline-variant rounded py-0.5 px-1 text-on-surface focus:outline-none focus:border-primary">
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </td>
                </tr>

                {/* Row 4: ERP Sync Error */}
                <tr className="h-12 hover:bg-surface-container-low transition-colors group">
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-500 text-white font-badge-caps text-[10px] font-bold tracking-wider">P3 - LOW</span>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="font-semibold text-blue-700">ERP Interface Error</div>
                    <div className="text-[10px] text-on-surface-variant font-data-mono-num mt-0.5">SYS-4042</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="font-medium text-on-surface truncate">Multiple SKUs (4)</div>
                    <div className="text-[10px] text-on-surface-variant font-data-mono-num mt-0.5">Batch #9822</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50 text-on-surface-variant">Wholesale</td>
                  <td className="px-4 border-r border-outline-variant/50 font-medium text-on-surface truncate">Makro Cash & Carry</td>
                  <td className="px-4 text-right font-data-mono-num font-bold text-on-surface border-r border-outline-variant/50">
                    42.0
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="text-xs text-on-surface truncate">SO Sync Fail จากระบบ SAP ไป WMS</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[9px] font-bold">IT</div>
                      <span className="text-[11px] font-medium text-on-surface">IT Support</span>
                    </div>
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <div className="text-[11px] font-data-mono-num text-on-surface-variant">Today 14:00</div>
                  </td>
                  <td className="px-4 text-center">
                    <select className="text-[10px] font-bold bg-transparent border border-outline-variant rounded py-0.5 px-1 text-on-surface focus:outline-none focus:border-primary" defaultValue="In Progress">
                      <option>Open</option>
                      <option value="In Progress">In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </td>
                </tr>

                {/* Row 5: Delivery Delay */}
                <tr className="h-12 hover:bg-surface-container-low transition-colors bg-red-50/30 group">
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-error text-white font-badge-caps text-[10px] font-bold tracking-wider">P1 - HIGH</span>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="font-semibold text-error">Delivery Delay</div>
                    <div className="text-[10px] text-error/80 font-data-mono-num mt-0.5">INC-8927</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="font-medium text-on-surface truncate">เนื้อบด (Minced Meat)</div>
                    <div className="text-[10px] text-on-surface-variant font-data-mono-num mt-0.5">SKU-CK-MD05</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50 text-on-surface-variant">Food Service</td>
                  <td className="px-4 border-r border-outline-variant/50 font-medium text-on-surface truncate">โรงงานแปรรูปอาหาร B</td>
                  <td className="px-4 text-right font-data-mono-num font-bold text-on-surface border-r border-outline-variant/50">
                    12.5
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="text-xs text-on-surface truncate">รถขนส่งเกิดอุบัติเหตุ เลื่อนการจัดส่ง</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[9px] font-bold">SP</div>
                      <span className="text-[11px] font-medium text-on-surface">Supakit P.</span>
                    </div>
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <div className="text-[11px] font-data-mono-num text-error font-bold">Today 15:00</div>
                  </td>
                  <td className="px-4 text-center">
                    <select className="text-[10px] font-bold bg-transparent border border-outline-variant rounded py-0.5 px-1 text-on-surface focus:outline-none focus:border-primary">
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </td>
                </tr>

                {/* Row 6: Low SO Coverage */}
                <tr className="h-12 hover:bg-surface-container-low transition-colors group">
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-500 text-white font-badge-caps text-[10px] font-bold tracking-wider">P3 - LOW</span>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="font-semibold text-blue-700">Low SO Coverage</div>
                    <div className="text-[10px] text-on-surface-variant font-data-mono-num mt-0.5">INC-8928</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="font-medium text-on-surface truncate">น่องไก่ (Drumstick)</div>
                    <div className="text-[10px] text-on-surface-variant font-data-mono-num mt-0.5">SKU-CK-LG03</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50 text-on-surface-variant">Traditional Trade</td>
                  <td className="px-4 border-r border-outline-variant/50 font-medium text-on-surface truncate">ภาคอีสาน</td>
                  <td className="px-4 text-right font-data-mono-num font-bold text-on-surface border-r border-outline-variant/50">
                    65.0
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="text-xs text-on-surface truncate">ยอดรับคำสั่งซื้อช้ากว่าแผน 15% แจ้งทีมขายเร่งรัด</div>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[9px] font-bold">NS</div>
                      <span className="text-[11px] font-medium text-on-surface">Nalinee S.</span>
                    </div>
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <div className="text-[11px] font-data-mono-num text-on-surface-variant">20 Oct 2025</div>
                  </td>
                  <td className="px-4 text-center">
                    <select className="text-[10px] font-bold bg-transparent border border-outline-variant rounded py-0.5 px-1 text-on-surface focus:outline-none focus:border-primary">
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
