import React from 'react';

export default function MonthlyReplan() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER & WARNING */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>การวางแผน (Planning)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">ทบทวนแผนรายเดือน (Monthly Replan)</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">ทบทวนแผนรายเดือน (Monthly Replan)</h1>
            <div className="flex items-center gap-2">
               <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
                <span className="material-symbols-outlined text-[15px]">save</span>
                <span>Save New Version</span>
              </button>
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded p-2.5 flex items-start gap-2 mb-3 shadow-xs">
          <span className="material-symbols-outlined text-amber-600 text-[18px] mt-0.5">info</span>
          <div>
            <div className="text-xs font-bold text-amber-900">ทุกการแก้ไขระบบจะสร้าง Version ใหม่</div>
            <div className="text-[10px] text-amber-700 mt-0.5">ห้ามเขียนทับ Approved Version (Currently Editing: <span className="font-data-mono-num font-bold">Draft V2.1</span> | Base: <span className="font-data-mono-num">Approved V2.0</span>)</div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-5 gap-3">
          <div className="bg-surface border border-outline-variant rounded p-2 flex flex-col justify-center">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-0.5">Target Month</span>
            <span className="text-sm font-bold text-on-surface">October 2025</span>
          </div>
          <div className="bg-surface border border-outline-variant rounded p-2 flex flex-col justify-center">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-0.5">Master Plan</span>
            <span className="text-sm font-bold text-on-surface font-data-mono-num">V1.0 (Annual)</span>
          </div>
          <div className="bg-surface border border-outline-variant rounded p-2 flex flex-col justify-center">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-0.5">Previous Replan</span>
            <span className="text-sm font-bold text-on-surface font-data-mono-num">V2.0 (Approved)</span>
          </div>
          <div className="bg-surface border border-outline-variant rounded p-2 flex flex-col justify-center">
            <span className="text-[10px] text-primary uppercase tracking-wider font-bold mb-0.5">Latest Replan (New)</span>
            <span className="text-sm font-bold text-primary font-data-mono-num">V2.1 (Draft)</span>
          </div>
          <div className="bg-surface border border-outline-variant rounded p-2 flex flex-col justify-center">
            <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold mb-0.5">Actual (MTD)</span>
            <span className="text-sm font-bold text-emerald-700 font-data-mono-num">1,245.50 MT</span>
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
          <select className="h-7 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Channel: All</option>
          </select>
          <select className="h-7 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Product Group: All</option>
          </select>
          <select className="h-7 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>Product: All</option>
          </select>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-right border-collapse min-w-[1400px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 border-r border-outline-variant sticky left-0 z-30 bg-surface-container shadow-[1px_0_0_0_#e0e0e0] w-64">Product</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-surface-container-low">Master Plan</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right bg-surface-container-low">Prev Replan</th>
              <th className="px-4 border-r border-outline-variant w-32 text-right bg-blue-50 text-blue-800">New Replan</th>
              <th className="px-4 border-r border-outline-variant w-28 text-right">Actual MTD</th>
              <th className="px-4 border-r border-outline-variant w-24 text-right">Variance Qty</th>
              <th className="px-4 border-r border-outline-variant w-20 text-right">Var %</th>
              <th className="px-4 border-r border-outline-variant w-40 text-left">Reason Code</th>
              <th className="px-4 text-left">Comment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
            {[
              { p: 'เนื้ออกลอกหนัง (BL Breast)', mp: '1,200.00', pr: '1,150.00', nr: '1,100.00', act: '450.00', vq: '-50.00', vp: '-4.3%', vc: 'text-error', rc: 'SPLY01 - Supply Shortage', cmt: 'ปรับลดตามแผนเชือดสัปดาห์ 3' },
              { p: 'น่องไก่ (Drumstick)', mp: '850.00', pr: '850.00', nr: '900.00', act: '320.00', vq: '+50.00', vp: '+5.8%', vc: 'text-emerald-600', rc: 'DMD02 - Promo Push', cmt: 'Lotus จัดโปรโมชั่นปลายเดือน' },
              { p: 'ปีกเต็ม (Whole Wing)', mp: '1,450.00', pr: '1,400.00', nr: '1,400.00', act: '610.00', vq: '0.00', vp: '0.0%', vc: 'text-on-surface-variant', rc: '-', cmt: '-' },
              { p: 'โครงไก่ (Chicken Frame)', mp: '600.00', pr: '650.00', nr: '720.00', act: '280.00', vq: '+70.00', vp: '+10.7%', vc: 'text-emerald-600', rc: 'SPLY03 - Excess Byproduct', cmt: 'เร่งขายออก ป้องกันสต๊อกล้น' },
              { p: 'เนื้อบด (Minced Meat)', mp: '400.00', pr: '400.00', nr: '350.00', act: '120.00', vq: '-50.00', vp: '-12.5%', vc: 'text-error', rc: 'DMD04 - Order Cancel', cmt: 'ลูกค้า รง.แปรรูป เลื่อนออเดอร์' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-left border-r border-outline-variant/50 sticky left-0 z-10 bg-surface-container-lowest group-hover:bg-surface-container-low font-body-sm font-medium text-on-surface truncate">{row.p}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-on-surface-variant">{row.mp}</td>
                <td className="px-4 text-right border-r border-outline-variant/50 text-on-surface-variant">{row.pr}</td>
                <td className="border-r border-outline-variant/50 p-0 bg-blue-50/30 group-hover:bg-blue-50/50">
                  <input 
                    type="text" 
                    defaultValue={row.nr}
                    className="w-full h-full px-4 text-right bg-transparent focus:bg-surface focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary text-primary font-bold"
                  />
                </td>
                <td className="px-4 text-right border-r border-outline-variant/50">{row.act}</td>
                <td className={`px-4 text-right border-r border-outline-variant/50 font-bold ${row.vc}`}>{row.vq}</td>
                <td className={`px-4 text-right border-r border-outline-variant/50 font-bold ${row.vc}`}>{row.vp}</td>
                <td className="border-r border-outline-variant/50 p-0">
                  <select className="w-full h-full px-3 font-body-sm text-left bg-transparent focus:bg-surface focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary text-on-surface">
                    <option>{row.rc}</option>
                    <option>SPLY01 - Supply Shortage</option>
                    <option>SPLY03 - Excess Byproduct</option>
                    <option>DMD02 - Promo Push</option>
                    <option>DMD04 - Order Cancel</option>
                    <option>-</option>
                  </select>
                </td>
                <td className="p-0">
                  <input 
                    type="text" 
                    defaultValue={row.cmt}
                    className="w-full h-full px-4 font-body-sm text-left bg-transparent focus:bg-surface focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary text-on-surface-variant"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
