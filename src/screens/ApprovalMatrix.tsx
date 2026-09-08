import React, { useState } from 'react';

type RuleType = 
  | 'All'
  | 'Price'
  | 'Discount'
  | 'Margin'
  | 'Allocation'
  | 'Over Allocation'
  | 'Contract'
  | 'Credit Term'
  | 'Payment Term';

interface ApprovalRule {
  id: string;
  ruleType: 'Price' | 'Discount' | 'Margin' | 'Allocation' | 'Over Allocation' | 'Contract' | 'Credit Term' | 'Payment Term';
  ruleName: string;
  condition: string;
  threshold: string;
  approvalLevel: 'Level 1' | 'Level 2' | 'Level 3' | 'Level 4 (Board)';
  approverRole: string;
  autoApproval: boolean;
  autoApprovalCondition?: string;
  effectiveDate: string;
  status: 'Active' | 'Inactive';
}

const initialApprovalRules: ApprovalRule[] = [
  // Price
  { id: '1', ruleType: 'Price', ruleName: 'Price Below Standard Price', condition: 'Unit Price < Standard Price by ≤ 3%', threshold: '<= 3.0% below STD', approvalLevel: 'Level 1', approverRole: 'Sales Manager', autoApproval: false, effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },
  { id: '2', ruleType: 'Price', ruleName: 'Price Below Floor Price', condition: 'Unit Price < Floor Price', threshold: '< Floor Price (Strict)', approvalLevel: 'Level 3', approverRole: 'Sales Director & Finance Director', autoApproval: false, effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },

  // Discount
  { id: '3', ruleType: 'Discount', ruleName: 'Standard Trade Promotion Discount', condition: 'Special Discount ≤ 5%', threshold: '≤ 5.0% Discount', approvalLevel: 'Level 1', approverRole: 'Sales Manager', autoApproval: true, autoApprovalCondition: 'Within Monthly Marketing Budget', effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },
  { id: '4', ruleType: 'Discount', ruleName: 'High Volume Rebate Discount', condition: 'Special Discount > 5% and ≤ 10%', threshold: '5.1% - 10.0%', approvalLevel: 'Level 2', approverRole: 'Head of Commercial', autoApproval: false, effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },

  // Margin
  { id: '5', ruleType: 'Margin', ruleName: 'Low Margin Deal Approval', condition: 'Estimated Contribution Margin < Minimum Margin %', threshold: '< 8.0% Margin', approvalLevel: 'Level 2', approverRole: 'Finance Director', autoApproval: false, effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },
  { id: '6', ruleType: 'Margin', ruleName: 'Negative Margin Clearance Exception', condition: 'Estimated Contribution Margin ≤ 0%', threshold: '≤ 0.0% (Loss Making)', approvalLevel: 'Level 4 (Board)', approverRole: 'Managing Director & CFO', autoApproval: false, effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },

  // Allocation
  { id: '7', ruleType: 'Allocation', ruleName: 'Sales Allocation Transfer between Reps', condition: 'Transfer Qty ≤ 20 MT within same Channel', threshold: '≤ 20.0 MT', approvalLevel: 'Level 1', approverRole: 'Sales Manager', autoApproval: true, autoApprovalCondition: 'Confirmed equal uncommitted pipeline', effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },
  { id: '8', ruleType: 'Allocation', ruleName: 'Cross-Channel Allocation Transfer', condition: 'Transfer Qty from Domestic to Export channel', threshold: 'Any Quantity', approvalLevel: 'Level 3', approverRole: 'S&OP Director', autoApproval: false, effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },

  // Over Allocation
  { id: '9', ruleType: 'Over Allocation', ruleName: 'Minor Over Allocation Booking', condition: 'SO Volume exceeds monthly allocation by ≤ 5%', threshold: '≤ 5.0% Over Quota', approvalLevel: 'Level 1', approverRole: 'Sales Manager', autoApproval: false, effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },
  { id: '10', ruleType: 'Over Allocation', ruleName: 'Major Over Allocation Booking', condition: 'SO Volume exceeds monthly allocation by > 10%', threshold: '> 10.0% Over Quota', approvalLevel: 'Level 3', approverRole: 'S&OP Planning Director & Plant GM', autoApproval: false, effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },

  // Contract
  { id: '11', ruleType: 'Contract', ruleName: 'Standard Annual Supply Contract', condition: 'Contract Value ≤ 10,000,000 THB', threshold: '≤ 10M THB', approvalLevel: 'Level 2', approverRole: 'Legal & Sales Director', autoApproval: false, effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },
  { id: '12', ruleType: 'Contract', ruleName: 'Mega Multi-Year Supply Contract', condition: 'Contract Value > 50,000,000 THB or Duration > 1 Year', threshold: '> 50M THB', approvalLevel: 'Level 4 (Board)', approverRole: 'Executive Committee & Board', autoApproval: false, effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },

  // Credit Term
  { id: '13', ruleType: 'Credit Term', ruleName: 'Standard Credit Term Extension', condition: 'Credit Term requested > 30 Days and ≤ 60 Days', threshold: '31 - 60 Days', approvalLevel: 'Level 2', approverRole: 'Credit Control Manager', autoApproval: false, effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },
  { id: '14', ruleType: 'Credit Term', ruleName: 'Extended Credit Term Request', condition: 'Credit Term requested > 60 Days', threshold: '> 60 Days', approvalLevel: 'Level 3', approverRole: 'CFO & Finance Director', autoApproval: false, effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },

  // Payment Term
  { id: '15', ruleType: 'Payment Term', ruleName: 'Unsecured Open Account for New Customer', condition: 'New Customer without Bank Guarantee', threshold: 'First 3 Transactions', approvalLevel: 'Level 3', approverRole: 'Finance Director', autoApproval: false, effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },
  { id: '16', ruleType: 'Payment Term', ruleName: 'Irrevocable L/C at Sight Exception', condition: 'Payment term conversion to D/A or D/P', threshold: 'Export Deals', approvalLevel: 'Level 3', approverRole: 'Trade Finance Head & Export Director', autoApproval: false, effectiveDate: '01 Jan 2025 - 31 Dec 2025', status: 'Active' },
];

export default function ApprovalMatrix() {
  const [rules, setRules] = useState<ApprovalRule[]>(initialApprovalRules);
  const [activeRuleType, setActiveRuleType] = useState<RuleType>('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const ruleTypes: RuleType[] = [
    'All',
    'Price',
    'Discount',
    'Margin',
    'Allocation',
    'Over Allocation',
    'Contract',
    'Credit Term',
    'Payment Term',
  ];

  const filteredRules = rules.filter(r => {
    const matchType = activeRuleType === 'All' || r.ruleType === activeRuleType;
    const matchLevel = levelFilter === 'All' || r.approvalLevel === levelFilter;
    const matchSearch = r.ruleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.approverRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        r.threshold.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchLevel && matchSearch;
  });

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'Level 1':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Level 2':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Level 3':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Level 4 (Board)':
        return 'bg-rose-100 text-rose-800 border-rose-200 font-bold';
      default:
        return 'bg-surface-container text-on-surface';
    }
  };

  const toggleStatus = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' } : r));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* Header */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>จัดการระบบ (Administration)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Approval Matrix</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Approval Matrix</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                เมทริกซ์สายการอนุมัติ ครอบคลุม 8 กฎเกณฑ์สำคัญ (Price, Discount, Margin, Allocation, Over-Alloc, Contract, Credit, Payment)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowModal(true)}
                className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>Configure Rule</span>
              </button>
            </div>
          </div>
        </div>

        {/* Rule Type Tabs */}
        <div className="flex items-center gap-1.5 border-b border-outline-variant pb-2 overflow-x-auto">
          {ruleTypes.map(t => {
            const count = t === 'All' ? rules.length : rules.filter(r => r.ruleType === t).length;
            const isActive = activeRuleType === t;
            return (
              <button
                key={t}
                onClick={() => setActiveRuleType(t)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive 
                    ? 'bg-primary text-on-primary shadow-xs' 
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span>{t}</span>
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
              placeholder="Search rule name, condition, or approver role..." 
              className="w-full h-8 pl-9 pr-3 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <select 
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            <option value="All">Approval Level: All</option>
            <option value="Level 1">Level 1</option>
            <option value="Level 2">Level 2</option>
            <option value="Level 3">Level 3</option>
            <option value="Level 4 (Board)">Level 4 (Board)</option>
          </select>
          <div className="ml-auto text-xs text-on-surface-variant">
            Total Active Rules: <span className="font-bold text-primary">{filteredRules.filter(r => r.status === 'Active').length}</span>
          </div>
        </div>
      </section>

      {/* Main Table */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse min-w-[1300px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant">
              <tr className="h-9">
                <th className="px-4 w-32 sticky left-0 z-10 bg-surface-container border-r border-outline-variant">Rule Type</th>
                <th className="px-4 w-64 border-r border-outline-variant">Rule Name</th>
                <th className="px-4 w-72 border-r border-outline-variant">Condition</th>
                <th className="px-4 w-40 text-right border-r border-outline-variant">Threshold</th>
                <th className="px-4 w-32 text-center border-r border-outline-variant">Approval Level</th>
                <th className="px-4 w-52 border-r border-outline-variant">Approver Role</th>
                <th className="px-4 w-32 text-center border-r border-outline-variant">Auto Approval</th>
                <th className="px-4 w-44 text-center border-r border-outline-variant">Effective Date</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Status</th>
                <th className="px-4 w-20 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
              {filteredRules.map((row) => (
                <tr key={row.id} className="h-12 hover:bg-surface-container-low transition-colors group">
                  <td className="px-4 font-semibold sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50">
                    <span className="inline-block px-2 py-0.5 rounded text-xs bg-surface-container font-sans text-on-surface">
                      {row.ruleType}
                    </span>
                  </td>
                  <td className="px-4 font-body-sm font-semibold text-primary border-r border-outline-variant/50">
                    {row.ruleName}
                  </td>
                  <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">
                    {row.condition}
                  </td>
                  <td className="px-4 text-right font-bold text-on-surface border-r border-outline-variant/50 font-mono">
                    {row.threshold}
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${getLevelBadge(row.approvalLevel)}`}>
                      {row.approvalLevel}
                    </span>
                  </td>
                  <td className="px-4 font-body-sm font-medium text-on-surface border-r border-outline-variant/50">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-primary">verified_user</span>
                      <span>{row.approverRole}</span>
                    </div>
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    {row.autoApproval ? (
                      <div title={row.autoApprovalCondition}>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <span className="material-symbols-outlined text-[13px]">bolt</span> Yes
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-on-surface-variant">Manual</span>
                    )}
                  </td>
                  <td className="px-4 text-center text-xs text-on-surface-variant border-r border-outline-variant/50">
                    {row.effectiveDate}
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
                      <span className="material-symbols-outlined text-[17px]">sync_alt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg border border-outline-variant shadow-lg max-w-lg w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Configure Approval Rule</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const type = (form.elements.namedItem('type') as HTMLSelectElement).value as ApprovalRule['ruleType'];
              const name = (form.elements.namedItem('name') as HTMLInputElement).value;
              const cond = (form.elements.namedItem('cond') as HTMLInputElement).value;
              const thresh = (form.elements.namedItem('thresh') as HTMLInputElement).value;
              const level = (form.elements.namedItem('level') as HTMLSelectElement).value as ApprovalRule['approvalLevel'];
              const role = (form.elements.namedItem('role') as HTMLInputElement).value;
              const auto = (form.elements.namedItem('auto') as HTMLInputElement).checked;

              setRules([...rules, {
                id: String(Date.now()),
                ruleType: type,
                ruleName: name,
                condition: cond,
                threshold: thresh,
                approvalLevel: level,
                approverRole: role,
                autoApproval: auto,
                effectiveDate: '01 Jan 2025 - 31 Dec 2025',
                status: 'Active',
              }]);
              setShowModal(false);
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Rule Type</label>
                  <select name="type" className="w-full h-8 px-2 bg-surface border border-outline-variant rounded text-sm">
                    {ruleTypes.filter(t => t !== 'All').map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Approval Level</label>
                  <select name="level" className="w-full h-8 px-2 bg-surface border border-outline-variant rounded text-sm">
                    <option value="Level 1">Level 1</option>
                    <option value="Level 2">Level 2</option>
                    <option value="Level 3">Level 3</option>
                    <option value="Level 4 (Board)">Level 4 (Board)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Rule Name</label>
                <input name="name" required placeholder="e.g. Special Discount Exceeding Standard" className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Trigger Condition</label>
                <input name="cond" required placeholder="e.g. Discount > 5% on Key Account deal" className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Threshold</label>
                  <input name="thresh" required placeholder="e.g. > 5.0%" className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Approver Role(s)</label>
                  <input name="role" required placeholder="e.g. Sales Director" className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm" />
                </div>
              </div>

              <label className="flex items-center gap-2 p-2.5 border border-outline-variant rounded cursor-pointer">
                <input type="checkbox" name="auto" className="rounded text-primary" />
                <div>
                  <div className="text-xs font-semibold text-on-surface">Enable System Auto-Approval</div>
                  <div className="text-[11px] text-on-surface-variant">Auto-approve if within predefined formula bounds</div>
                </div>
              </label>

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 text-xs font-semibold text-on-surface-variant bg-surface-container rounded hover:bg-surface-container-high">Cancel</button>
                <button type="submit" className="px-4 py-1.5 text-xs font-semibold text-white bg-primary rounded hover:bg-inverse-surface shadow-sm">Save Rule</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
