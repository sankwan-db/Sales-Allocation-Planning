import React, { useMemo, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
  LineChart, Line
} from 'recharts';
import {
  GlobalFilterState,
  INITIAL_GLOBAL_FILTERS,
  PLANT_OPTIONS,
  SALES_TEAM_OPTIONS,
  SALESPERSON_OPTIONS,
  getReportDataByName,
  exportReportToExcel,
  exportReportToPdf,
  getConnectedTransactionFlow,
  REPORT_MENU_CATEGORIES,
  ReportPayload
} from '../data/reportData';
import { getStoredChickenTypes } from '../data/chickenTypeMaster';

interface ReportCenterProps {
  selectedReport?: string;
  setSelectedReport?: (report: string) => void;
}

const PRODUCT_GROUP_OPTIONS = [
  { id: 'ALL', name: 'All Product Groups' },
  { id: 'Main Part', name: 'Main Part' },
  { id: 'Special Product', name: 'Special Product' },
  { id: 'Whole Bird', name: 'Whole Bird' },
  { id: 'By Product', name: 'By Product' },
  { id: 'Value Added', name: 'Value Added' }
];

const CHANNEL_OPTIONS = [
  { id: 'ALL', name: 'All Channels' },
  { id: 'Export', name: 'Export' },
  { id: 'FSC', name: 'FSC' },
  { id: 'DMS', name: 'DMS' },
  { id: 'Other', name: 'Other / Spot' }
];

function statusClass(value: string) {
  const v = value.toUpperCase();
  if (['NORMAL', 'ON TRACK', 'APPROVED', 'SUCCESS', 'PASS', 'BALANCED', 'ABOVE STANDARD'].some(k => v.includes(k))) {
    return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  }
  if (['TIGHT', 'SURPLUS', 'PIPELINE COVERED', 'PENDING', 'SUBMITTED', 'WARNING'].some(k => v.includes(k))) {
    return 'bg-amber-100 text-amber-800 border-amber-200';
  }
  if (['CRITICAL', 'BELOW STANDARD', 'NEED ACTION', 'ERROR', 'REJECTED', 'OVER ALLOCATION'].some(k => v.includes(k))) {
    return 'bg-red-100 text-red-800 border-red-200';
  }
  return 'bg-blue-100 text-blue-800 border-blue-200';
}

export default function ReportCenter({
  selectedReport: propSelectedReport,
  setSelectedReport: propSetSelectedReport
}: ReportCenterProps = {}) {
  const [internalReport, setInternalReport] = useState('Annual Plan');
  const selectedReport = propSelectedReport !== undefined ? propSelectedReport : internalReport;
  const setSelectedReport = propSetSelectedReport || setInternalReport;

  const [filters, setFilters] = useState<GlobalFilterState>(INITIAL_GLOBAL_FILTERS);
  const [tempFilters, setTempFilters] = useState<GlobalFilterState>(INITIAL_GLOBAL_FILTERS);
  const [tableSearch, setTableSearch] = useState('');
  const [drillDownItem, setDrillDownItem] = useState<any | null>(null);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  const chickenTypes = useMemo(() => getStoredChickenTypes().filter(t => t.status === 'ACTIVE'), []);
  const selectedChickenType = chickenTypes.find(t => t.id === tempFilters.chickenType);
  const breedOptions = selectedChickenType?.breeds?.filter(b => b.status === 'ACTIVE') || [];

  const reportData: ReportPayload = useMemo(() => getReportDataByName(selectedReport, filters), [selectedReport, filters]);

  const displayedRows = useMemo(() => {
    if (!reportData.rows) return [];
    if (!tableSearch.trim()) return reportData.rows;
    const q = tableSearch.toLowerCase();
    return reportData.rows.filter((r: any) => Object.values(r).some(val => String(val).toLowerCase().includes(q)));
  }, [reportData.rows, tableSearch]);

  const isYield = selectedReport === 'Yield';
  const isDemandSupply = selectedReport === 'Demand-Supply';
  const isAllocation = selectedReport === 'Allocation';
  const isSupplyContext = ['Chicken Intake Plan', 'Yield', 'Demand-Supply'].includes(selectedReport);
  const isProductContext = ['Annual Plan', 'Monthly Replan', 'Yield', 'Demand-Supply', 'Allocation', 'Stock Aging', 'Stock at Risk', 'Plan vs Actual', 'Forecast Accuracy', 'Variance', 'Root Cause'].includes(selectedReport);
  const isSalesContext = ['Allocation', 'Forward Coverage', 'Sales Pipeline', 'Quotation', 'Contract', 'SO Interface', 'Plan vs Actual', 'KPI', 'Variance', 'Root Cause'].includes(selectedReport);

  const handleReportChange = (report: string) => {
    setSelectedReport(report);
    setTableSearch('');
    setDrillDownItem(null);
  };

  const handleChickenTypeChange = (value: string) => {
    setTempFilters({ ...tempFilters, chickenType: value, breed: 'ALL' });
  };

  const handleApplyFilters = () => {
    setFilters({ ...tempFilters });
    setAppliedNotification('อัปเดตรายงานตามตัวกรองแล้ว');
    window.setTimeout(() => setAppliedNotification(null), 2500);
  };

  const handleResetFilters = () => {
    setTempFilters(INITIAL_GLOBAL_FILTERS);
    setFilters(INITIAL_GLOBAL_FILTERS);
    setTableSearch('');
    setAppliedNotification('รีเซ็ตตัวกรองแล้ว');
    window.setTimeout(() => setAppliedNotification(null), 1800);
  };

  const noData = !reportData.error && Object.keys(reportData.kpis || {}).length === 0 && (!reportData.rows || reportData.rows.length === 0);
  const flow = getConnectedTransactionFlow();

  const activeFilterPairs: [string, string][] = [
    ['Period', `${filters.periodType}: ${filters.period}`],
    ...(filters.chickenType !== 'ALL' ? [['Chicken Type', chickenTypes.find(t => t.id === filters.chickenType)?.nameEn || filters.chickenType] as [string, string]] : []),
    ...(filters.breed !== 'ALL' ? [['Breed', filters.breed] as [string, string]] : []),
    ...(filters.plant !== 'ALL' ? [['Plant', filters.plant] as [string, string]] : []),
    ...(filters.productGroup !== 'ALL' ? [['Product Group', filters.productGroup] as [string, string]] : []),
    ...(filters.channel !== 'ALL' ? [['Channel', filters.channel] as [string, string]] : []),
    ...(filters.salesTeam !== 'ALL' ? [['Sales Team', filters.salesTeam] as [string, string]] : []),
    ...(filters.salesperson !== 'ALL' ? [['Salesperson', filters.salesperson] as [string, string]] : [])
  ];

  return (
    <div className="flex-1 flex flex-col min-h-full bg-surface-container-low">
      <div className="bg-surface border-b border-outline-variant px-6 py-4 flex items-center justify-between gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-1">
            <span className="material-symbols-outlined text-[16px]">monitoring</span>
            <span>Reports</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="font-semibold text-primary">{selectedReport}</span>
          </div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">{selectedReport} Report</h1>
          {(isYield || isDemandSupply || isAllocation) && (
            <p className="text-xs text-on-surface-variant mt-1">
              {isYield ? 'รายงานผลผลิตและอัตรา Yield' : isDemandSupply ? 'รายงานสมดุลอุปสงค์และอุปทาน' : 'รายงานการจัดสรรการขาย'}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <select value={selectedReport} onChange={(e) => handleReportChange(e.target.value)} className="input-field bg-surface-container-lowest min-w-[210px]">
            {REPORT_MENU_CATEGORIES.flatMap(c => c.reports).map(r => <option key={r.id} value={r.id}>{r.id}</option>)}
          </select>
          <button className="btn-secondary" onClick={() => exportReportToExcel(selectedReport, reportData, filters)}>
            <span className="material-symbols-outlined text-[18px]">sim_card_download</span>Export Excel
          </button>
          <button className="btn-primary" onClick={() => exportReportToPdf(selectedReport, reportData, filters)}>
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>Export PDF
          </button>
        </div>
      </div>

      <div className="bg-surface border-b border-outline-variant p-6 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">filter_list</span>Report Filters</h2>
          <span className="text-[11px] text-on-surface-variant">Filters are context-aware for this report</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          <div className="flex flex-col gap-1 xl:col-span-2">
            <label className="text-xs text-on-surface-variant">Time Period</label>
            <div className="flex gap-2">
              <select className="input-field w-2/5" value={tempFilters.periodType} onChange={(e) => setTempFilters({...tempFilters, periodType: e.target.value as GlobalFilterState['periodType']})}>
                <option>Year</option><option>Quarter</option><option>Month</option><option>Week</option><option>Day</option>
              </select>
              <input type="text" className="input-field w-3/5" value={tempFilters.period} onChange={(e) => setTempFilters({...tempFilters, period: e.target.value})} />
            </div>
          </div>

          {(isSupplyContext || isAllocation || selectedReport === 'Annual Plan') && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-on-surface-variant">Chicken Type</label>
              <select className="input-field" value={tempFilters.chickenType} onChange={(e) => handleChickenTypeChange(e.target.value)}>
                <option value="ALL">All Types</option>
                {chickenTypes.map(t => <option key={t.id} value={t.id}>{t.nameEn}</option>)}
              </select>
            </div>
          )}

          {isSupplyContext && tempFilters.chickenType !== 'ALL' && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-on-surface-variant">Breed / Strain</label>
              <select className="input-field" value={tempFilters.breed} onChange={(e) => setTempFilters({...tempFilters, breed: e.target.value})}>
                <option value="ALL">All Breeds</option>
                {breedOptions.map(b => <option key={b.id} value={b.id}>{b.nameEn}</option>)}
              </select>
            </div>
          )}

          {isSupplyContext && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-on-surface-variant">Plant</label>
              <select className="input-field" value={tempFilters.plant} onChange={(e) => setTempFilters({...tempFilters, plant: e.target.value})}>
                {PLANT_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
            </div>
          )}

          {isProductContext && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-on-surface-variant">Product Group</label>
              <select className="input-field" value={tempFilters.productGroup} onChange={(e) => setTempFilters({...tempFilters, productGroup: e.target.value})}>
                {PRODUCT_GROUP_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
            </div>
          )}

          {isSalesContext && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-on-surface-variant">Channel</label>
              <select className="input-field" value={tempFilters.channel} onChange={(e) => setTempFilters({...tempFilters, channel: e.target.value})}>
                {CHANNEL_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
            </div>
          )}

          {isSalesContext && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-on-surface-variant">Sales Team</label>
              <select className="input-field" value={tempFilters.salesTeam} onChange={(e) => setTempFilters({...tempFilters, salesTeam: e.target.value})}>
                {SALES_TEAM_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
            </div>
          )}

          {isAllocation && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-on-surface-variant">Salesperson</label>
              <select className="input-field" value={tempFilters.salesperson} onChange={(e) => setTempFilters({...tempFilters, salesperson: e.target.value})}>
                {SALESPERSON_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
              </select>
            </div>
          )}

          <div className="flex items-end gap-2">
            <button className="btn-secondary flex-1" onClick={handleResetFilters}>Reset</button>
            <button className="btn-primary flex-1" onClick={handleApplyFilters}>Apply</button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-on-surface-variant mr-1">Active Filters:</span>
          {activeFilterPairs.map(([label, value]) => (
            <div key={`${label}-${value}`} className="px-2.5 py-1 bg-surface-container rounded-full text-xs font-medium text-on-surface border border-outline-variant">
              <span className="text-on-surface-variant">{label}:</span> {value}
            </div>
          ))}
          {appliedNotification && <span className="text-xs text-emerald-700 font-semibold ml-2">✓ {appliedNotification}</span>}
        </div>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {reportData.error ? (
          <div className="card p-8 border border-red-200 bg-red-50 text-center">
            <span className="material-symbols-outlined text-red-600 text-[42px]">error</span>
            <h2 className="font-bold text-red-800 mt-2">ไม่สามารถโหลดข้อมูลรายงานได้</h2>
            <p className="text-sm text-red-700 mt-1">{reportData.error}</p>
            <button className="btn-secondary mt-4" onClick={handleResetFilters}>Retry / Reset Filters</button>
          </div>
        ) : noData ? (
          <div className="card p-12 border border-outline-variant text-center">
            <span className="material-symbols-outlined text-[52px] text-outline">find_in_page</span>
            <h2 className="font-bold text-on-surface mt-2">ไม่พบข้อมูลตามเงื่อนไขที่เลือก</h2>
            <p className="text-sm text-on-surface-variant mt-1">ลองเปลี่ยนช่วงเวลา หรือรีเซ็ตตัวกรองเพื่อดูข้อมูลทั้งหมด</p>
            <button className="btn-primary mt-4" onClick={handleResetFilters}>Reset Filters</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-on-surface">{selectedReport} — Report Preview</h2>
                <p className="text-xs text-on-surface-variant mt-0.5">Generated: {new Date().toLocaleString()}</p>
              </div>
              <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold">Live Preview</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
              {Object.entries(reportData.kpis || {}).map(([key, val]) => (
                <div key={key} className="card p-4 border border-outline-variant min-h-[92px]">
                  <div className="text-[11px] leading-tight text-on-surface-variant mb-2">{key}</div>
                  <div className="text-lg font-bold text-primary break-words">{String(val)}</div>
                </div>
              ))}
            </div>

            {reportData.flowNodes && reportData.flowNodes.length > 0 && (
              <div className="card border border-outline-variant p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary">account_tree</span>
                  <h3 className="text-sm font-bold text-on-surface">{isYield ? 'Yield Calculation Flow' : isAllocation ? 'Allocation Conversion Flow' : 'Connected Flow'}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {reportData.flowNodes.map((node, idx) => (
                    <div key={node.label} className="relative p-4 bg-surface-container-lowest rounded-xl border border-outline-variant">
                      <div className="text-[11px] text-on-surface-variant">Step {idx + 1}</div>
                      <div className="font-bold text-sm text-on-surface mt-1">{node.label}</div>
                      <div className="text-xl font-bold text-primary mt-1">{node.value}</div>
                      {node.detail && <div className="text-[11px] text-on-surface-variant mt-1">{node.detail}</div>}
                      {idx < reportData.flowNodes!.length - 1 && <span className="hidden md:block material-symbols-outlined absolute -right-5 top-1/2 -translate-y-1/2 text-outline z-10">arrow_forward</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {reportData.chartData && reportData.chartData.length > 0 && (
                <div className="card p-5 border border-outline-variant">
                  <h3 className="text-sm font-bold text-on-surface mb-4">{reportData.chartTitle || 'Report Chart'}</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={reportData.chartData} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={10} interval={0} angle={reportData.chartData.length > 5 ? -15 : 0} textAnchor={reportData.chartData.length > 5 ? 'end' : 'middle'} height={50} />
                        <YAxis fontSize={10} />
                        <Tooltip /><Legend />
                        {Object.keys(reportData.chartData[0] || {}).filter(k => k !== 'name' && typeof reportData.chartData[0][k] === 'number').map((key, i) => (
                          <Bar key={key} dataKey={key} fill={['#0ea5e9', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#64748b'][i % 6]} radius={[3, 3, 0, 0]} />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {reportData.chartData2 && reportData.chartData2.length > 0 && (
                <div className="card p-5 border border-outline-variant">
                  <h3 className="text-sm font-bold text-on-surface mb-4">{reportData.chartTitle2 || 'Trend / Distribution'}</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={reportData.chartData2} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={10} /><YAxis fontSize={10} /><Tooltip /><Legend />
                        {Object.keys(reportData.chartData2[0] || {}).filter(k => k !== 'name' && typeof reportData.chartData2![0][k] === 'number').map((key, i) => (
                          <Line key={key} type="monotone" dataKey={key} stroke={['#f43f5e', '#8b5cf6', '#0ea5e9'][i % 3]} strokeWidth={2.5} dot={{ r: 3 }} />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>

            {reportData.rows && reportData.rows.length > 0 && (
              <div className="card border border-outline-variant flex flex-col overflow-hidden">
                <div className="p-4 border-b border-outline-variant bg-surface-container-lowest flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-on-surface">Detail Data</h3>
                    <p className="text-[11px] text-on-surface-variant mt-0.5">{displayedRows.length.toLocaleString()} rows • Click Drill Down for transaction detail</p>
                  </div>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[16px]">search</span>
                    <input type="text" placeholder="Search in table..." className="pl-9 pr-4 py-1.5 bg-surface border border-outline rounded-lg text-sm w-64" value={tableSearch} onChange={(e) => setTableSearch(e.target.value)} />
                  </div>
                </div>
                <div className="overflow-x-auto max-h-[520px] custom-scrollbar">
                  <table className="w-full text-left text-xs whitespace-nowrap">
                    <thead className="bg-surface-container-low text-on-surface-variant font-medium sticky top-0 z-10 shadow-sm">
                      <tr>
                        {Object.keys(reportData.rows[0] || {}).map(k => <th key={k} className="px-3 py-3 border-b border-outline-variant capitalize">{k.replace(/([A-Z])/g, ' $1')}</th>)}
                        <th className="px-3 py-3 border-b border-outline-variant sticky right-0 bg-surface-container-low">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                      {displayedRows.map((row: any, i: number) => (
                        <tr key={i} className="hover:bg-surface-container-low/50">
                          {Object.entries(row).map(([key, val]: [string, any]) => (
                            <td key={key} className="px-3 py-3 text-on-surface">
                              {key.toLowerCase().includes('status') ? (
                                <span className={`inline-flex px-2 py-0.5 rounded-full border text-[10px] font-bold ${statusClass(String(val))}`}>{String(val)}</span>
                              ) : typeof val === 'number' ? val.toLocaleString() : String(val ?? '-')}
                            </td>
                          ))}
                          <td className="px-3 py-3 sticky right-0 bg-surface">
                            <button className="text-primary font-semibold hover:underline text-[11px]" onClick={() => setDrillDownItem(row)}>Drill Down</button>
                          </td>
                        </tr>
                      ))}
                      {displayedRows.length === 0 && <tr><td colSpan={30} className="px-4 py-12 text-center text-on-surface-variant">ไม่พบข้อมูลจากคำค้นหาในตาราง</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {drillDownItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-surface w-full max-w-3xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-on-surface">{selectedReport} — Drill Down</h2>
                <p className="text-xs text-on-surface-variant">Traceable to connected planning and sales transaction flow</p>
              </div>
              <button onClick={() => setDrillDownItem(null)} className="icon-btn text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-5">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                {Object.entries(drillDownItem).map(([k, v]) => (
                  <div key={k} className="p-3 bg-surface-container-lowest border border-outline-variant rounded-lg">
                    <div className="text-[11px] text-on-surface-variant capitalize mb-1">{k.replace(/([A-Z])/g, ' $1')}</div>
                    <div className="font-semibold text-on-surface break-words">{String(v)}</div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-sm font-bold text-on-surface mb-3">Connected Transaction Trace</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-surface-container rounded-lg border border-outline-variant"><div className="text-[10px] text-on-surface-variant">Chicken Intake</div><div className="font-bold text-sm mt-1">{flow.birdQty.toLocaleString()} birds</div><div className="text-[10px] text-on-surface-variant">{flow.chickenType} / {flow.breed}</div></div>
                  <div className="p-3 bg-surface-container rounded-lg border border-outline-variant"><div className="text-[10px] text-on-surface-variant">Live / Yield</div><div className="font-bold text-sm mt-1">{(flow.liveWeightKG / 1000).toLocaleString()} MT</div><div className="text-[10px] text-on-surface-variant">Carcass {(flow.carcassKG / 1000).toLocaleString()} MT</div></div>
                  <div className="p-3 bg-surface-container rounded-lg border border-outline-variant"><div className="text-[10px] text-on-surface-variant">Allocation / SO</div><div className="font-bold text-sm mt-1">{(flow.fscAllocationKG / 1000).toLocaleString()} / {(flow.confirmedSO_KG / 1000).toLocaleString()} MT</div><div className="text-[10px] text-on-surface-variant">FSC Allocation → Confirmed SO</div></div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200"><div className="text-[10px] text-emerald-700">ERP / Delivery</div><div className="font-bold text-sm mt-1 text-emerald-800">SO {flow.erpSO}</div><div className="text-[10px] text-emerald-700">Delivered {flow.deliveredKG.toLocaleString()} KG</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
