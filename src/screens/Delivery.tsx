import React from 'react';

export default function Delivery() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-y-3">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
              <span>โลจิสติกส์ (Logistics)</span>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <span className="text-on-surface font-semibold">การจัดส่ง (Delivery)</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">การจัดส่ง (Delivery)</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
              <span className="material-symbols-outlined text-[15px]">local_shipping</span>
              <span>จัดแผนการจัดส่งใหม่</span>
            </button>
          </div>
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-2 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
            <input className="w-full h-8 pl-8 pr-3 text-body-sm bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline" placeholder="ค้นหาเลขที่ DO, ทะเบียนรถ..." type="text" />
          </div>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>สถานะการจัดส่งทั้งหมด</option>
            <option>กำลังจัดเตรียม (Preparing)</option>
            <option>กำลังจัดส่ง (In Transit)</option>
            <option>ส่งมอบสำเร็จ (Delivered)</option>
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
              <th className="px-4 font-semibold border-r border-outline-variant w-32">เลขที่เอกสาร (DO)</th>
              <th className="px-4 font-semibold border-r border-outline-variant w-32">วันที่ส่งมอบ (ETA)</th>
              <th className="px-4 font-semibold border-r border-outline-variant">ปลายทาง (Destination)</th>
              <th className="px-4 font-semibold border-r border-outline-variant w-32 text-center">ทะเบียนรถ</th>
              <th className="px-4 font-semibold border-r border-outline-variant w-32 text-center">สถานะ</th>
              <th className="px-4 font-semibold w-24 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-body-sm text-body-sm">
            {[
              { id: 'DO-2510-501', eta: '18 ต.ค. 2025 09:00', dest: 'Lotus\'s DC วังน้อย', truck: '70-1234 กทม', status: 'In Transit', statusClass: 'bg-blue-100 text-blue-800 border-blue-200' },
              { id: 'DO-2510-502', eta: '18 ต.ค. 2025 10:30', dest: 'Big C DC บางใหญ่', truck: '71-9876 นบ', status: 'Preparing', statusClass: 'bg-gray-100 text-gray-800 border-gray-200' },
              { id: 'DO-2510-503', eta: '17 ต.ค. 2025 14:00', dest: 'Makro สาขาแจ้งวัฒนะ', truck: '72-5555 กทม', status: 'Delivered', statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
              { id: 'DO-2510-504', eta: '18 ต.ค. 2025 11:00', dest: 'ร้านอาหารเครือข่าย A', truck: '70-4321 ปท', status: 'Warning', statusClass: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Delayed ETA' },
              { id: 'DO-2510-505', eta: '17 ต.ค. 2025 08:00', dest: 'โรงงานแปรรูปอาหาร B', truck: '73-1111 สป', status: 'Critical', statusClass: 'bg-red-100 text-red-800 border-red-200', label: 'Accident/Halt' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 border-r border-outline-variant/50 font-data-mono-num font-semibold text-primary">{row.id}</td>
                <td className="px-4 border-r border-outline-variant/50 text-on-surface-variant font-data-mono-num">{row.eta}</td>
                <td className="px-4 border-r border-outline-variant/50 font-medium text-on-surface">{row.dest}</td>
                <td className="px-4 border-r border-outline-variant/50 text-center text-on-surface-variant font-data-mono-num">{row.truck}</td>
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
