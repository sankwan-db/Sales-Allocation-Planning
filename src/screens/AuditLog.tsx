import React, { useState } from 'react';

interface AuditLogEntry {
  id: string;
  dateTime: string;
  user: string;
  userRole: string;
  module: string;
  record: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'APPROVE' | 'REALLOCATE' | 'EXPORT';
  field: string;
  oldValue: string;
  newValue: string;
  reason: string;
  source: 'Web UI' | 'Oracle ERP Sync' | 'Batch Job' | 'Mobile App';
}

const initialAuditLogs: AuditLogEntry[] = [
  { id: 'LOG-10081', dateTime: '2025-10-26 14:35:12', user: 'somchai.k', userRole: 'Sales', module: 'Sales Allocation', record: 'ALC-2025-W42-01', action: 'REALLOCATE', field: 'Allocated Qty', oldValue: '45.0 MT', newValue: '60.0 MT', reason: 'Emergency stock request from Siam Fresh Food due to flash sale promo', source: 'Web UI' },
  { id: 'LOG-10080', dateTime: '2025-10-26 14:12:05', user: 'sudaporn.r', userRole: 'Sales Manager', module: 'Price Master', record: 'PR-BR-001', action: 'UPDATE', field: 'Floor Price', oldValue: '78.00 THB', newValue: '80.00 THB', reason: 'Raw feed cost index adjustment (+2.5%) approved in S&OP Meeting', source: 'Web UI' },
  { id: 'LOG-10079', dateTime: '2025-10-26 13:50:22', user: 'pongsathorn.w', userRole: 'Planning', module: 'Yield Master', record: 'YM-2025-OCT', action: 'UPDATE', field: 'Boneless Breast Yield %', oldValue: '22.8%', newValue: '23.2%', reason: 'Plant 1 automatic deboning machine calibration completed', source: 'Web UI' },
  { id: 'LOG-10078', dateTime: '2025-10-26 11:24:40', user: 'jaruwan.f', userRole: 'Finance', module: 'Quotation Approval', record: 'QT-2025-0891', action: 'APPROVE', field: 'Credit Term Status', oldValue: 'Pending Approval', newValue: 'Approved (45 Days)', reason: 'Customer paid outstanding AR invoice INV-90123', source: 'Web UI' },
  { id: 'LOG-10077', dateTime: '2025-10-26 10:15:30', user: 'SYSTEM_DAEMON', userRole: 'Admin', module: 'ERP Interface Queue', record: 'SO-2025-0044', action: 'CREATE', field: 'Oracle Sales Order Header', oldValue: 'EMPTY', newValue: 'ORC-SO-99201', reason: 'Automated 15-minute interface cron dispatch', source: 'Oracle ERP Sync' },
  { id: 'LOG-10076', dateTime: '2025-10-26 09:44:18', user: 'amnat.w', userRole: 'Warehouse', module: 'Delivery Control', record: 'DLV-2025-0552', action: 'UPDATE', field: 'Loaded Qty', oldValue: '12.0 MT', newValue: '10.5 MT', reason: 'Customer refrigerated truck temperature sensor fault; partial loading', source: 'Mobile App' },
  { id: 'LOG-10075', dateTime: '2025-10-26 08:30:11', user: 'wichai.m', userRole: 'Sales', module: 'Sales Contract', record: 'CT-2025-0082', action: 'CREATE', field: 'Contract Document', oldValue: 'EMPTY', newValue: 'CT-2025-0082 (Active)', reason: 'Annual export agreement with Global Foods Trading (Japan)', source: 'Web UI' },
  { id: 'LOG-10074', dateTime: '2025-10-25 18:20:00', user: 'BATCH_JOB', userRole: 'Admin', module: 'Stock At Risk', record: 'BATCH-NIGHTLY', action: 'UPDATE', field: 'Risk Level', oldValue: 'Normal (15 Lots)', newValue: 'Critical (4 Lots Expiry < 3D)', reason: 'Nightly batch job recalculation based on actual FIFO movement', source: 'Batch Job' },
  { id: 'LOG-10073', dateTime: '2025-10-25 16:11:55', user: 'somchai.k', userRole: 'Sales', module: 'Customer Master', record: 'CUST-00120', action: 'UPDATE', field: 'Strategic Flag', oldValue: 'Standard (False)', newValue: 'Strategic (True)', reason: 'Promoted to Tier 1 Corporate Key Account by Board decision', source: 'Web UI' },
  { id: 'LOG-10072', dateTime: '2025-10-25 14:05:10', user: 'surachai.admin', userRole: 'Admin', module: 'Approval Matrix', record: 'APV-R-04', action: 'UPDATE', field: 'Threshold', oldValue: '> 5.0%', newValue: '> 7.5%', reason: 'Temporary threshold relaxation for Q4 campaign promotions', source: 'Web UI' },
  { id: 'LOG-10071', dateTime: '2025-10-25 11:40:02', user: 'sudaporn.r', userRole: 'Sales Manager', module: 'Report Center', record: 'REP-PLAN-ACTUAL', action: 'EXPORT', field: 'File Download', oldValue: 'N/A', newValue: 'Plan_Vs_Actual_Oct2025.xlsx', reason: 'Management review committee deck preparation', source: 'Web UI' },
  { id: 'LOG-10070', dateTime: '2025-10-25 09:15:33', user: 'nitikorn.l', userRole: 'Legal', module: 'Contract Approval', record: 'CT-2025-0079', action: 'APPROVE', field: 'Legal Indemnity Clause', oldValue: 'Standard Clause', newValue: 'Mutual Arbitration Approved', reason: 'Customer counter-proposal reviewed and approved by Legal Counsel', source: 'Web UI' },
];

export default function AuditLog() {
  const [logs] = useState<AuditLogEntry[]>(initialAuditLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [actionFilter, setActionFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  const modules = ['All', 'Sales Allocation', 'Price Master', 'Yield Master', 'Quotation Approval', 'ERP Interface Queue', 'Delivery Control', 'Sales Contract', 'Stock At Risk', 'Customer Master', 'Approval Matrix', 'Report Center', 'Contract Approval'];
  const actions = ['All', 'CREATE', 'UPDATE', 'DELETE', 'APPROVE', 'REALLOCATE', 'EXPORT'];
  const sources = ['All', 'Web UI', 'Oracle ERP Sync', 'Batch Job', 'Mobile App'];

  const filteredLogs = logs.filter(log => {
    const matchSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        log.record.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        log.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        log.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        log.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchModule = moduleFilter === 'All' || log.module === moduleFilter;
    const matchAction = actionFilter === 'All' || log.action === actionFilter;
    const matchSource = sourceFilter === 'All' || log.source === sourceFilter;
    return matchSearch && matchModule && matchAction && matchSource;
  });

  const getActionBadge = (action: AuditLogEntry['action']) => {
    switch (action) {
      case 'CREATE':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'UPDATE':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'APPROVE':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'REALLOCATE':
        return 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
      case 'DELETE':
        return 'bg-rose-100 text-rose-900 border-rose-300 font-bold';
      case 'EXPORT':
        return 'bg-cyan-100 text-cyan-900 border-cyan-300';
      default:
        return 'bg-surface-container text-on-surface';
    }
  };

  const handleExport = (format: 'Excel' | 'CSV') => {
    setExportSuccess(`Exported ${filteredLogs.length} audit trail records to ${format} successfully!`);
    setTimeout(() => {
      setExportSuccess(null);
    }, 4000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* Header */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>จัดการระบบ (Administration)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Audit Log</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Audit Log & System Activity Trail</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                บันทึกประวัติการเปลี่ยนแปลงข้อมูลย้อนหลังทุกเหตุการณ์ (Field-level change tracking, User actions, Before & After values)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleExport('CSV')}
                className="h-8 px-3 text-xs font-semibold text-on-surface bg-surface-container border border-outline-variant hover:bg-surface-container-high rounded flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">description</span>
                <span>Export CSV</span>
              </button>
              <button 
                onClick={() => handleExport('Excel')}
                className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">table_view</span>
                <span>Export Excel</span>
              </button>
            </div>
          </div>
        </div>

        {exportSuccess && (
          <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2 font-semibold animate-fadeIn">
            <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
            <span>{exportSuccess}</span>
          </div>
        )}

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-xs">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user, record, field, reason..." 
              className="w-full h-8 pl-9 pr-3 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <select 
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            {modules.map(m => (
              <option key={m} value={m}>{m === 'All' ? 'Module: All Modules' : m}</option>
            ))}
          </select>

          <select 
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            {actions.map(a => (
              <option key={a} value={a}>{a === 'All' ? 'Action: All Actions' : a}</option>
            ))}
          </select>

          <select 
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            {sources.map(s => (
              <option key={s} value={s}>{s === 'All' ? 'Source: All Sources' : s}</option>
            ))}
          </select>

          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            <option value="All">Date: Last 7 Days</option>
            <option value="Today">Today Only</option>
            <option value="Month">This Month</option>
          </select>

          <div className="ml-auto text-xs text-on-surface-variant font-mono">
            Showing <span className="font-bold text-primary">{filteredLogs.length}</span> recorded logs
          </div>
        </div>
      </section>

      {/* Audit Log Table */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse min-w-[1500px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant">
              <tr className="h-9">
                <th className="px-4 w-40 sticky left-0 z-10 bg-surface-container border-r border-outline-variant font-mono">Date Time</th>
                <th className="px-4 w-44 border-r border-outline-variant">User</th>
                <th className="px-4 w-40 border-r border-outline-variant">Module</th>
                <th className="px-4 w-36 border-r border-outline-variant font-mono">Record ID</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Action</th>
                <th className="px-4 w-36 border-r border-outline-variant">Field</th>
                <th className="px-4 w-44 border-r border-outline-variant font-mono text-xs">Old Value</th>
                <th className="px-4 w-48 border-r border-outline-variant font-mono text-xs font-bold">New Value</th>
                <th className="px-4 w-80 border-r border-outline-variant">Reason / Justification</th>
                <th className="px-4 w-32 border-r border-outline-variant">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
              {filteredLogs.map((row) => (
                <tr key={row.id} className="h-12 hover:bg-surface-container-low transition-colors group">
                  <td className="px-4 text-xs font-mono text-on-surface-variant sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50">
                    <div className="font-semibold text-on-surface">{row.dateTime.split(' ')[0]}</div>
                    <div className="text-[11px] text-outline">{row.dateTime.split(' ')[1]}</div>
                  </td>
                  <td className="px-4 font-body-sm border-r border-outline-variant/50">
                    <div className="font-semibold text-primary font-mono text-xs leading-tight">{row.user}</div>
                    <div className="text-[10px] text-on-surface-variant">{row.userRole}</div>
                  </td>
                  <td className="px-4 font-body-sm text-on-surface font-medium border-r border-outline-variant/50 truncate">
                    {row.module}
                  </td>
                  <td className="px-4 font-mono font-bold text-xs text-on-surface border-r border-outline-variant/50">
                    {row.record}
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border font-semibold ${getActionBadge(row.action)}`}>
                      {row.action}
                    </span>
                  </td>
                  <td className="px-4 font-body-sm font-semibold text-on-surface border-r border-outline-variant/50">
                    {row.field}
                  </td>
                  <td className="px-4 font-mono text-xs text-on-surface-variant border-r border-outline-variant/50 line-through decoration-outline">
                    {row.oldValue}
                  </td>
                  <td className="px-4 font-mono text-xs text-emerald-800 bg-emerald-50/50 font-bold border-r border-outline-variant/50">
                    {row.newValue}
                  </td>
                  <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50 text-xs">
                    <div className="line-clamp-2" title={row.reason}>
                      {row.reason}
                    </div>
                  </td>
                  <td className="px-4 font-body-sm text-xs text-on-surface-variant border-r border-outline-variant/50">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-outline">
                        {row.source === 'Web UI' ? 'computer' : row.source === 'Oracle ERP Sync' ? 'sync' : row.source === 'Batch Job' ? 'schedule' : 'smartphone'}
                      </span>
                      <span>{row.source}</span>
                    </div>
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
