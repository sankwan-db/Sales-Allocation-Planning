import React from 'react';

export default function Stock() {
  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-y-3">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
              <span>คลังสินค้า (Inventory)</span>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <span className="text-on-surface font-semibold">สินค้าคงคลัง (Stock)</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">สินค้าคงคลัง (Stock)</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors">
              <span className="material-symbols-outlined text-[15px]">sync</span>
              <span>Sync WMS</span>
            </button>
          </div>
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-2 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
            <input className="w-full h-8 pl-8 pr-3 text-body-sm bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline" placeholder="ค้นหา SKU, คลัง..." type="text" />
          </div>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>คลังสินค้าทั้งหมด (All Warehouses)</option>
            <option>WH-01 (สระบุรี)</option>
            <option>WH-02 (โคราช)</option>
          </select>
          <select className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface">
            <option>กลุ่มชิ้นส่วนทั้งหมด</option>
            <option>อกไก่ (Breast)</option>
            <option>ปีกไก่ (Wings)</option>
            <option>น่องไก่ (Drumstick)</option>
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
              <th className="px-4 font-semibold border-r border-outline-variant w-32">SKU</th>
              <th className="px-4 font-semibold border-r border-outline-variant">ชื่อสินค้า (Product Name)</th>
              <th className="px-4 font-semibold border-r border-outline-variant w-40">คลังสินค้า (Warehouse)</th>
              <th className="px-4 font-semibold border-r border-outline-variant w-32 text-right">จำนวน (ตัน)</th>
              <th className="px-4 font-semibold border-r border-outline-variant w-32 text-center">สถานะสต๊อก</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-body-sm text-body-sm">
            {[
              { sku: 'CK-BR01', name: 'เนื้ออกลอกหนัง (BL Breast Chilled)', wh: 'WH-01 (สระบุรี)', qty: '120.5', status: 'Healthy', statusClass: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
              { sku: 'CK-WG02', name: 'ปีกบน (Drumette)', wh: 'WH-01 (สระบุรี)', qty: '45.0', status: 'Warning', statusClass: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Low Stock' },
              { sku: 'CK-LG03', name: 'น่องไก่ (Drumstick)', wh: 'WH-02 (โคราช)', qty: '0.0', status: 'Critical', statusClass: 'bg-red-100 text-red-800 border-red-200', label: 'Out of Stock' },
              { sku: 'CK-FL04', name: 'โครงไก่ (Chicken Frame)', wh: 'WH-02 (โคราช)', qty: '540.2', status: 'Information', statusClass: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Overstock' },
              { sku: 'CK-MD05', name: 'เนื้อบด (Minced Meat)', wh: 'WH-01 (สระบุรี)', qty: '12.0', status: 'Warning', statusClass: 'bg-amber-100 text-amber-800 border-amber-200', label: 'Expiring Soon' },
            ].map((row, i) => (
              <tr key={i} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-4 border-r border-outline-variant/50 font-data-mono-num font-semibold text-primary">{row.sku}</td>
                <td className="px-4 border-r border-outline-variant/50 font-medium text-on-surface">{row.name}</td>
                <td className="px-4 border-r border-outline-variant/50 text-on-surface-variant">{row.wh}</td>
                <td className="px-4 border-r border-outline-variant/50 font-data-mono-num text-right font-semibold">{row.qty}</td>
                <td className="px-4 border-r border-outline-variant/50 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${row.statusClass}`}>
                    {row.label || row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
