import React, { useState } from 'react';

interface QueueItem {
  id: string;
  draft: string;
  cust: string;
  dt: string;
  retry: number;
  erp: string;
  err: string;
  stat: 'Success' | 'Error' | 'Processing';
  statClass: string;
}

export default function ERPInterfaceQueue() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [syncing, setSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [items, setItems] = useState<QueueItem[]>([
    { 
      id: 'INT-SO-8921', 
      draft: 'SO-2025-09812', 
      cust: 'ยัม เรสเทอรองตส์ (KFC)', 
      dt: '25 Oct 25, 09:15', 
      retry: 0, 
      erp: '67281345', 
      err: '-', 
      stat: 'Success', 
      statClass: 'bg-emerald-100 text-emerald-800' 
    },
    { 
      id: 'INT-SO-8922', 
      draft: 'SO-2025-09813', 
      cust: 'บมจ. ซีพี แอ็กซ์ตร้า (แม็คโคร)', 
      dt: '25 Oct 25, 10:30', 
      retry: 0, 
      erp: '67281346', 
      err: '-', 
      stat: 'Success', 
      statClass: 'bg-emerald-100 text-emerald-800' 
    },
    { 
      id: 'INT-SO-8923', 
      draft: 'SO-2025-09814', 
      cust: 'บมจ. ไทยเพรซิเดนท์ฟูดส์ (มาม่า)', 
      dt: '25 Oct 25, 11:45', 
      retry: 2, 
      erp: '-', 
      err: 'ORA-00054: Resource busy and acquire with NOWAIT specified (Lock Timeout)', 
      stat: 'Error', 
      statClass: 'bg-error-container text-error' 
    },
    { 
      id: 'INT-SO-8924', 
      draft: 'SO-2025-09815', 
      cust: 'นิปปอน มีท เทรดดิ้ง (โตเกียว)', 
      dt: '25 Oct 25, 13:00', 
      retry: 0, 
      erp: '-', 
      err: '-', 
      stat: 'Processing', 
      statClass: 'bg-blue-100 text-blue-800 border border-blue-200' 
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleRetryItem = (id: string) => {
    setSyncing(true);
    setTimeout(() => {
      setItems(prev => prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            retry: item.retry + 1,
            stat: 'Success',
            statClass: 'bg-emerald-100 text-emerald-800',
            erp: '67281347',
            err: '-'
          };
        }
        return item;
      }));
      setSyncing(false);
      showToast(`[BR-13 & BR-14] ส่งคำสั่ง ${id} ไปยัง Oracle สำเร็จ! ได้รับเลข Oracle SO: 67281347`);
    }, 900);
  };

  const handleForceSyncAll = () => {
    setSyncing(true);
    setTimeout(() => {
      setItems(prev => prev.map(item => {
        if (item.stat === 'Error' || item.stat === 'Processing') {
          return {
            ...item,
            retry: item.retry + 1,
            stat: 'Success',
            statClass: 'bg-emerald-100 text-emerald-800',
            erp: item.erp === '-' ? `6728134${Math.floor(Math.random() * 90 + 10)}` : item.erp,
            err: '-'
          };
        }
        return item;
      }));
      setSyncing(false);
      showToast('[BR-13] ดำเนินการ Force Sync ทุกรายการในคิวส่งมอบ Oracle สำเร็จ 100%');
    }, 1200);
  };

  const filteredItems = items.filter(item => {
    if (statusFilter === 'All') return true;
    return item.stat === statusFilter;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {toastMessage && (
        <div className="fixed top-14 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 text-sm font-medium border border-outline-variant animate-in fade-in slide-in-from-top-2">
          <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ใบสั่งขาย (Sales Order)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">ERP Interface Queue (Oracle EBS / Cloud)</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">ERP Interface Queue</h1>
              <p className="text-xs text-on-surface-variant mt-0.5">
                เชื่อมต่อระบบ Oracle ERP ตามกฎ BR-13 (Interface Error ต้อง Retry ได้) และ BR-14 (Oracle SO Number ส่งกลับอัตโนมัติ)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleForceSyncAll}
                disabled={syncing}
                className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface disabled:opacity-50 rounded flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span className={`material-symbols-outlined text-[15px] ${syncing ? 'animate-spin' : ''}`}>sync</span>
                <span>{syncing ? 'Syncing...' : 'Force Sync Retry All'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="text-xs font-semibold text-on-surface-variant">Filter by Status:</label>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            <option value="All">Status: All</option>
            <option value="Success">Success (สำเร็จ)</option>
            <option value="Error">Error (ข้อผิดพลาด)</option>
            <option value="Processing">Processing (กำลังประมวลผล)</option>
          </select>
          <span className="text-xs text-on-surface-variant ml-auto">
            Showing {filteredItems.length} of {items.length} records
          </span>
        </div>
      </section>

      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse min-w-[1300px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant">
                <tr className="h-9">
                <th className="px-4 w-32 border-r border-outline-variant">Interface ID</th>
                <th className="px-4 w-36 border-r border-outline-variant">SAPE SO No</th>
                <th className="px-4 w-52 border-r border-outline-variant">Customer</th>
                <th className="px-4 w-32 border-r border-outline-variant text-center">Created Date</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Retry Count</th>
                <th className="px-4 w-36 border-r border-outline-variant font-bold text-primary">Oracle SO No (BR-14)</th>
                <th className="px-4 border-r border-outline-variant">Error / Status Message</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Status</th>
                <th className="px-4 w-28 text-center">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
                {filteredItems.map((row) => (
                <tr key={row.id} className="h-12 hover:bg-surface-container-low transition-colors">
                    <td className="px-4 font-bold text-on-surface border-r border-outline-variant/50">{row.id}</td>
                    <td className="px-4 font-medium text-on-surface border-r border-outline-variant/50">{row.draft}</td>
                    <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50 truncate">{row.cust}</td>
                    <td className="px-4 text-center text-on-surface-variant border-r border-outline-variant/50">{row.dt}</td>
                    <td className={`px-4 text-center font-bold border-r border-outline-variant/50 ${row.retry > 0 ? 'text-amber-600' : 'text-on-surface-variant'}`}>{row.retry}</td>
                    <td className="px-4 font-bold text-primary border-r border-outline-variant/50">
                      {row.erp !== '-' ? (
                        <span className="inline-flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
                          {row.erp}
                        </span>
                      ) : (
                        <span className="text-on-surface-variant/50">-</span>
                      )}
                    </td>
                    <td className={`px-4 font-body-sm truncate border-r border-outline-variant/50 ${row.err !== '-' ? 'text-error' : 'text-on-surface-variant'}`} title={row.err}>{row.err}</td>
                    <td className="px-4 text-center border-r border-outline-variant/50">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${row.statClass}`}>
                          {row.stat}
                        </span>
                    </td>
                    <td className="px-4 text-center">
                        {row.stat === 'Error' && (
                           <button 
                             onClick={() => handleRetryItem(row.id)}
                             disabled={syncing}
                             className="h-7 px-3 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 hover:bg-primary/20 rounded border border-primary/20 transition-colors flex items-center justify-center gap-1 mx-auto"
                           >
                             <span className="material-symbols-outlined text-[13px]">refresh</span>
                             Retry
                           </button>
                        )}
                        {row.stat === 'Success' && (
                          <span className="text-[11px] text-emerald-700 font-semibold flex items-center justify-center gap-0.5">
                            <span className="material-symbols-outlined text-[14px]">done_all</span> Synced
                          </span>
                        )}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </section>
    </div>
  );
}
