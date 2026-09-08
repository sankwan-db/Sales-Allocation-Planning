import React from 'react';

export default function SalesOrder() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-y-3">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
              <span>การขาย (Sales)</span>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <span className="text-on-surface font-semibold">ใบสั่งขาย (Sales Order)</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">ใบสั่งขาย (Sales Order)</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
              <span className="material-symbols-outlined text-[15px]">add</span>
              <span>สร้างใบสั่งขายใหม่</span>
            </button>
          </div>
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-2 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
            <input className="w-full h-8 pl-8 pr-3 text-body-sm bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline" placeholder="ค้นหาเลขที่ SO, ชื่อลูกค้า..." type="text" />
          </div>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>สถานะทั้งหมด</option>
            <option>รอจัดส่ง (Pending)</option>
            <option>จัดส่งแล้ว (Delivered)</option>
            <option>ยกเลิก (Cancelled)</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-2.5 text-xs font-medium text-on-surface-variant hover:text-on-surface bg-surface border border-outline-variant rounded flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">filter_list</span>
            <span>ตัวกรองเพิ่มเติม</span>
          </button>
          <button className="h-8 px-2.5 text-xs font-medium text-on-surface-variant hover:text-on-surface bg-surface border border-outline-variant rounded flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">download</span>
            <span>Export</span>
          </button>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm">
            <tr className="h-9 font-badge-caps text-badge-caps uppercase tracking-wider text-on-surface-variant">
              <th className="px-4 font-semibold border-r border-outline-variant w-12 text-center"><input type="checkbox" className="rounded border-outline" /></th>
              <th className="px-4 font-semibold border-r border-outline-variant w-32">เลขที่เอกสาร (SO)</th>
              <th className="px-4 font-semibold border-r border-outline-variant w-32">วันที่ส่งมอบ (Delivery)</th>
              <th className="px-4 font-semibold border-r border-outline-variant">ชื่อลูกค้า (Customer)</th>
              <th className="px-4 font-semibold border-r border-outline-variant w-32 text-right">ปริมาณ (ตัน)</th>
              <th className="px-4 font-semibold border-r border-outline-variant w-32 text-center">สถานะ</th>
              <th className="px-4 font-semibold w-24 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-body-sm text-body-sm">
            {[
              { id: 'SO-2510-104', date: '18 ต.ค. 2025', customer: 'บริษัท ไทยฟู้ดส์ โลจิสติกส์ จำกัด', amount: '12.5', status: 'On Track', statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
              { id: 'SO-2510-105', date: '19 ต.ค. 2025', customer: 'Lotus\'s (Head Office)', amount: '45.0', status: 'Pending', statusClass: 'bg-blue-100 text-blue-800 border-blue-200' },
              { id: 'SO-2510-106', date: '17 ต.ค. 2025', customer: 'Big C Supercenter', amount: '8.2', status: 'Shortage', statusClass: 'bg-red-100 text-red-800 border-red-200' },
              { id: 'SO-2510-107', date: '15 ต.ค. 2025', customer: 'Makro Cash & Carry', amount: '52.0', status: 'Delivered', statusClass: 'bg-gray-100 text-gray-800 border-gray-200' },
              { id: 'SO-2510-108', date: '20 ต.ค. 2025', customer: 'ร้านอาหารเครือข่ายภาคอีสาน', amount: '4.5', status: 'Warning', statusClass: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Delayed' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 text-center border-r border-outline-variant/50"><input type="checkbox" className="rounded border-outline" /></td>
                <td className="px-4 border-r border-outline-variant/50 font-data-mono-num font-semibold text-primary">{row.id}</td>
                <td className="px-4 border-r border-outline-variant/50 text-on-surface-variant font-data-mono-num">{row.date}</td>
                <td className="px-4 border-r border-outline-variant/50 font-medium text-on-surface">{row.customer}</td>
                <td className="px-4 border-r border-outline-variant/50 font-data-mono-num text-right font-semibold">{row.amount}</td>
                <td className="px-4 border-r border-outline-variant/50 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${row.statusClass}`}>
                    {row.label || row.status}
                  </span>
                </td>
                <td className="px-4 text-center">
                  <button className="text-outline hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
