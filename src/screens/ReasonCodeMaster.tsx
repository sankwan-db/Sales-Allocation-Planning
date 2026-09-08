import React, { useState } from 'react';

type ReasonCategory = 'All' | 'Sales' | 'Supply' | 'Production' | 'Stock' | 'Customer' | 'Delivery' | 'ERP';

interface ReasonCodeItem {
  id: string;
  category: 'Sales' | 'Supply' | 'Production' | 'Stock' | 'Customer' | 'Delivery' | 'ERP';
  reasonCode: string;
  reasonName: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  requiresComment: boolean;
  requiresActionPlan: boolean;
  status: 'Active' | 'Inactive';
  affectedModule: string;
}

const initialReasons: ReasonCodeItem[] = [
  // Sales
  { id: '1', category: 'Sales', reasonCode: 'RC-SLS-01', reasonName: 'Customer Price Resistance / Budget Cut', severity: 'High', requiresComment: true, requiresActionPlan: true, status: 'Active', affectedModule: 'Quotation / Reallocation' },
  { id: '2', category: 'Sales', reasonCode: 'RC-SLS-02', reasonName: 'Competitor Aggressive Discounting', severity: 'High', requiresComment: true, requiresActionPlan: true, status: 'Active', affectedModule: 'Opportunity / Lost Deal' },
  { id: '3', category: 'Sales', reasonCode: 'RC-SLS-03', reasonName: 'Customer Demand Forecast Reduced', severity: 'Medium', requiresComment: true, requiresActionPlan: false, status: 'Active', affectedModule: 'Sales Gap Plan' },

  // Supply
  { id: '4', category: 'Supply', reasonCode: 'RC-SUP-01', reasonName: 'Farm Bird Mortality Spike', severity: 'Critical', requiresComment: true, requiresActionPlan: true, status: 'Active', affectedModule: 'Farm Supply / Balance' },
  { id: '5', category: 'Supply', reasonCode: 'RC-SUP-02', reasonName: 'Average Live Weight Below Target (<2.2kg)', severity: 'High', requiresComment: true, requiresActionPlan: false, status: 'Active', affectedModule: 'Yield Master' },
  { id: '6', category: 'Supply', reasonCode: 'RC-SUP-03', reasonName: 'Delayed Catching / Logistics at Farm', severity: 'Medium', requiresComment: false, requiresActionPlan: false, status: 'Active', affectedModule: 'Slaughter Plan' },

  // Production
  { id: '7', category: 'Production', reasonCode: 'RC-PRD-01', reasonName: 'Slaughter Line Machine Breakdown', severity: 'Critical', requiresComment: true, requiresActionPlan: true, status: 'Active', affectedModule: 'Capacity & Scheduling' },
  { id: '8', category: 'Production', reasonCode: 'RC-PRD-02', reasonName: 'Deboning Line Yield Loss Exceeded (>3.5%)', severity: 'High', requiresComment: true, requiresActionPlan: true, status: 'Active', affectedModule: 'BOM Transformation' },
  { id: '9', category: 'Production', reasonCode: 'RC-PRD-03', reasonName: 'Chilling / Freezing Capacity Bottleneck', severity: 'Medium', requiresComment: true, requiresActionPlan: false, status: 'Active', affectedModule: 'Production Plan' },

  // Stock
  { id: '10', category: 'Stock', reasonCode: 'RC-STK-01', reasonName: 'Fresh Stock Near Expiry (<3 Days Remaining)', severity: 'Critical', requiresComment: true, requiresActionPlan: true, status: 'Active', affectedModule: 'Stock At Risk' },
  { id: '11', category: 'Stock', reasonCode: 'RC-STK-02', reasonName: 'Cold Storage Temperature Deviation Holding', severity: 'Critical', requiresComment: true, requiresActionPlan: true, status: 'Active', affectedModule: 'Warehouse Inspection' },
  { id: '12', category: 'Stock', reasonCode: 'RC-STK-03', reasonName: 'Physical vs System Inventory Discrepancy', severity: 'Medium', requiresComment: true, requiresActionPlan: false, status: 'Active', affectedModule: 'Stock Overview' },

  // Customer
  { id: '13', category: 'Customer', reasonCode: 'RC-CST-01', reasonName: 'Customer Credit Limit Blocked', severity: 'High', requiresComment: true, requiresActionPlan: true, status: 'Active', affectedModule: 'SO Validation' },
  { id: '14', category: 'Customer', reasonCode: 'RC-CST-02', reasonName: 'Receiving Dock Rejection (Spec Mismatch)', severity: 'Critical', requiresComment: true, requiresActionPlan: true, status: 'Active', affectedModule: 'Delivery Control' },
  { id: '15', category: 'Customer', reasonCode: 'RC-CST-03', reasonName: 'Customer Delivery Reschedule Request', severity: 'Low', requiresComment: false, requiresActionPlan: false, status: 'Active', affectedModule: 'SO Reschedule' },

  // Delivery
  { id: '16', category: 'Delivery', reasonCode: 'RC-DLV-01', reasonName: 'Cold-chain Truck Breakdown En Route', severity: 'Critical', requiresComment: true, requiresActionPlan: true, status: 'Active', affectedModule: 'Delivery Control / OTIF' },
  { id: '17', category: 'Delivery', reasonCode: 'RC-DLV-02', reasonName: 'Traffic Delay / Port Custom Inspection', severity: 'Medium', requiresComment: true, requiresActionPlan: false, status: 'Active', affectedModule: 'Delivery Performance' },
  { id: '18', category: 'Delivery', reasonCode: 'RC-DLV-03', reasonName: 'Warehouse Loading Dock Delay', severity: 'Low', requiresComment: false, requiresActionPlan: false, status: 'Active', affectedModule: 'Dispatch Queue' },

  // ERP
  { id: '19', category: 'ERP', reasonCode: 'RC-ERP-01', reasonName: 'Oracle Master Item Mapping Error', severity: 'High', requiresComment: true, requiresActionPlan: false, status: 'Active', affectedModule: 'ERP Interface Queue' },
  { id: '20', category: 'ERP', reasonCode: 'RC-ERP-02', reasonName: 'EDI Connection Timeout / Payload Drop', severity: 'Critical', requiresComment: true, requiresActionPlan: true, status: 'Active', affectedModule: 'ERP Interface Queue' },
  { id: '21', category: 'ERP', reasonCode: 'RC-ERP-03', reasonName: 'Financial Period Closed in General Ledger', severity: 'High', requiresComment: true, requiresActionPlan: false, status: 'Active', affectedModule: 'Invoice Integration' },
];

export default function ReasonCodeMaster() {
  const [reasons, setReasons] = useState<ReasonCodeItem[]>(initialReasons);
  const [activeCategory, setActiveCategory] = useState<ReasonCategory>('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const categories: ReasonCategory[] = ['All', 'Sales', 'Supply', 'Production', 'Stock', 'Customer', 'Delivery', 'ERP'];

  const filteredReasons = reasons.filter(r => {
    const matchCategory = activeCategory === 'All' || r.category === activeCategory;
    const matchSeverity = severityFilter === 'All' || r.severity === severityFilter;
    const matchSearch = r.reasonCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.reasonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.affectedModule.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSeverity && matchSearch;
  });

  const toggleStatus = (id: string) => {
    setReasons(reasons.map(r => r.id === id ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' } : r));
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200">Critical</span>;
      case 'High':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">High</span>;
      case 'Medium':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">Medium</span>;
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-container text-on-surface-variant border border-outline-variant">Low</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* Header */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ข้อมูลหลัก (Master Data)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Reason Code Master</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Reason Code Master</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                ระบบจัดการรหัสสาเหตุความผิดพลาด (Root Cause & Variance Reason Codes) ครอบคลุม 7 หมวดหมู่หลัก
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowModal(true)}
                className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>Add Reason Code</span>
              </button>
            </div>
          </div>
        </div>

        {/* Group Tabs */}
        <div className="flex items-center gap-1 border-b border-outline-variant pb-2 overflow-x-auto">
          {categories.map((cat) => {
            const count = cat === 'All' ? reasons.length : reasons.filter(r => r.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-surface-container text-on-surface-variant'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by code, reason name or module..." 
              className="w-full h-8 pl-9 pr-3 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <select 
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            <option value="All">Severity: All</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <div className="ml-auto text-xs text-on-surface-variant font-mono">
            Showing <span className="font-bold text-on-surface">{filteredReasons.length}</span> of {reasons.length} codes
          </div>
        </div>
      </section>

      {/* Main Table */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant">
              <tr className="h-9">
                <th className="px-4 w-28 sticky left-0 z-10 bg-surface-container border-r border-outline-variant">Category</th>
                <th className="px-4 w-32 border-r border-outline-variant font-mono">Reason Code</th>
                <th className="px-4 w-80 border-r border-outline-variant">Reason Name</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Severity</th>
                <th className="px-4 w-36 text-center border-r border-outline-variant">Requires Comment</th>
                <th className="px-4 w-36 text-center border-r border-outline-variant">Requires Action Plan</th>
                <th className="px-4 w-48 border-r border-outline-variant">Trigger Module</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Status</th>
                <th className="px-4 w-20 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
              {filteredReasons.map((row) => (
                <tr key={row.id} className="h-11 hover:bg-surface-container-low transition-colors group">
                  <td className="px-4 font-semibold sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50">
                    <span className="inline-block px-2 py-0.5 rounded text-xs bg-surface-container text-on-surface font-sans">
                      {row.category}
                    </span>
                  </td>
                  <td className="px-4 font-bold text-primary border-r border-outline-variant/50 font-mono">
                    {row.reasonCode}
                  </td>
                  <td className="px-4 font-body-sm font-medium text-on-surface border-r border-outline-variant/50">
                    {row.reasonName}
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    {getSeverityBadge(row.severity)}
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    {row.requiresComment ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <span className="material-symbols-outlined text-[14px]">check</span> Mandatory
                      </span>
                    ) : (
                      <span className="text-xs text-on-surface-variant">Optional</span>
                    )}
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    {row.requiresActionPlan ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <span className="material-symbols-outlined text-[14px]">flag</span> CAPA Required
                      </span>
                    ) : (
                      <span className="text-xs text-on-surface-variant">No Action</span>
                    )}
                  </td>
                  <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50 truncate">
                    {row.affectedModule}
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      row.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 text-center">
                    <button 
                      onClick={() => toggleStatus(row.id)}
                      className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                      title="Toggle active"
                    >
                      <span className="material-symbols-outlined text-[17px]">power_settings_new</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Reason Code Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg border border-outline-variant shadow-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Add Reason Code</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const cat = (form.elements.namedItem('cat') as HTMLSelectElement).value as ReasonCodeItem['category'];
              const code = (form.elements.namedItem('code') as HTMLInputElement).value;
              const name = (form.elements.namedItem('name') as HTMLInputElement).value;
              const sev = (form.elements.namedItem('sev') as HTMLSelectElement).value as ReasonCodeItem['severity'];
              const comm = (form.elements.namedItem('comm') as HTMLInputElement).checked;
              const capa = (form.elements.namedItem('capa') as HTMLInputElement).checked;
              const mod = (form.elements.namedItem('mod') as HTMLInputElement).value;

              setReasons([...reasons, {
                id: String(Date.now()),
                category: cat,
                reasonCode: code,
                reasonName: name,
                severity: sev,
                requiresComment: comm,
                requiresActionPlan: capa,
                status: 'Active',
                affectedModule: mod || 'General',
              }]);
              setShowModal(false);
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Category</label>
                  <select name="cat" className="w-full h-8 px-2 bg-surface border border-outline-variant rounded text-sm text-on-surface">
                    <option value="Sales">Sales</option>
                    <option value="Supply">Supply</option>
                    <option value="Production">Production</option>
                    <option value="Stock">Stock</option>
                    <option value="Customer">Customer</option>
                    <option value="Delivery">Delivery</option>
                    <option value="ERP">ERP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Severity</label>
                  <select name="sev" className="w-full h-8 px-2 bg-surface border border-outline-variant rounded text-sm text-on-surface">
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Reason Code</label>
                <input name="code" placeholder="e.g. RC-SLS-04" required className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm font-mono" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Reason Name</label>
                <input name="name" placeholder="Descriptive title of reason..." required className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Trigger Module</label>
                <input name="mod" placeholder="e.g. Delivery Control, SO Draft" className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm" />
              </div>

              <div className="space-y-2 border border-outline-variant p-3 rounded">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="comm" defaultChecked className="rounded text-primary" />
                  <span className="text-xs text-on-surface font-semibold">Requires Explanatory Comment</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="capa" className="rounded text-primary" />
                  <span className="text-xs text-on-surface font-semibold">Requires Corrective Action Plan (CAPA)</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 text-xs font-semibold text-on-surface-variant bg-surface-container rounded hover:bg-surface-container-high">Cancel</button>
                <button type="submit" className="px-4 py-1.5 text-xs font-semibold text-white bg-primary rounded hover:bg-inverse-surface shadow-sm">Save Code</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
