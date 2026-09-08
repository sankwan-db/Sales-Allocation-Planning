import React, { useState } from 'react';

interface PriorityRule {
  id: string;
  priority: number;
  customerTier: string;
  customerType: string;
  contractFlag: boolean;
  strategicFlag: boolean;
  marginScore: number;
  soCommitmentScore: number;
  weight: number;
  status: 'Active' | 'Inactive';
  description: string;
}

const initialRules: PriorityRule[] = [
  { id: 'PR-01', priority: 1, customerTier: 'Tier 1', customerType: 'Key Account', contractFlag: true, strategicFlag: true, marginScore: 9.5, soCommitmentScore: 98, weight: 35, status: 'Active', description: 'Long-term strategic contracts with confirmed volume commits' },
  { id: 'PR-02', priority: 2, customerTier: 'Tier 1', customerType: 'Industrial / QSR', contractFlag: true, strategicFlag: false, marginScore: 8.8, soCommitmentScore: 94, weight: 25, status: 'Active', description: 'Core industrial & food service chain supply agreements' },
  { id: 'PR-03', priority: 3, customerTier: 'Tier 2', customerType: 'Modern Trade', contractFlag: true, strategicFlag: true, marginScore: 8.2, soCommitmentScore: 90, weight: 15, status: 'Active', description: 'Retail promotions and standard modern trade listings' },
  { id: 'PR-04', priority: 4, customerTier: 'Tier 2', customerType: 'Export Global', contractFlag: false, strategicFlag: true, marginScore: 9.0, soCommitmentScore: 85, weight: 10, status: 'Active', description: 'Spot high-margin export tender opportunities' },
  { id: 'PR-05', priority: 5, customerTier: 'Tier 3', customerType: 'Traditional Trade', contractFlag: false, strategicFlag: false, marginScore: 7.5, soCommitmentScore: 80, weight: 8, status: 'Active', description: 'Wholesale & distributor network spot allocations' },
  { id: 'PR-06', priority: 6, customerTier: 'Tier 4', customerType: 'General Spot / Walk-in', contractFlag: false, strategicFlag: false, marginScore: 6.0, soCommitmentScore: 65, weight: 5, status: 'Active', description: 'Secondary clearance and excess supply distribution' },
  { id: 'PR-07', priority: 7, customerTier: 'Tier 4', customerType: 'Internal By-product Processing', contractFlag: false, strategicFlag: false, marginScore: 5.0, soCommitmentScore: 50, weight: 2, status: 'Inactive', description: 'Internal pet food and rendering dispatch' },
];

export default function AllocationPriorityMaster() {
  const [rules, setRules] = useState<PriorityRule[]>(initialRules);
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newRule, setNewRule] = useState<Partial<PriorityRule>>({
    priority: rules.length + 1,
    customerTier: 'Tier 1',
    customerType: 'Key Account',
    contractFlag: true,
    strategicFlag: false,
    marginScore: 8.0,
    soCommitmentScore: 90,
    weight: 10,
    status: 'Active',
    description: '',
  });

  const filteredRules = rules.filter(r => {
    const matchesSearch = r.customerType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'All' || r.customerTier === tierFilter;
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const totalWeight = filteredRules.reduce((sum, r) => sum + r.weight, 0);

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    const created: PriorityRule = {
      id: `PR-${String(rules.length + 1).padStart(2, '0')}`,
      priority: Number(newRule.priority) || rules.length + 1,
      customerTier: newRule.customerTier || 'Tier 1',
      customerType: newRule.customerType || 'Key Account',
      contractFlag: Boolean(newRule.contractFlag),
      strategicFlag: Boolean(newRule.strategicFlag),
      marginScore: Number(newRule.marginScore) || 8.0,
      soCommitmentScore: Number(newRule.soCommitmentScore) || 90,
      weight: Number(newRule.weight) || 10,
      status: (newRule.status as 'Active' | 'Inactive') || 'Active',
      description: newRule.description || '',
    };
    setRules([...rules, created]);
    setShowAddModal(false);
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
            <span>ข้อมูลหลัก (Master Data)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Allocation Priority Master</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Allocation Priority Master</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                กำหนดลำดับความสำคัญและน้ำหนักเกณฑ์การจัดสรรสินค้าตาม Tier, ประเภทสัญญา และดัชนีคะแนนผลกำไร
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowAddModal(true)}
                className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>Add Priority Rule</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by customer type or description..." 
              className="w-full h-8 pl-9 pr-3 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <select 
            value={tierFilter} 
            onChange={(e) => setTierFilter(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            <option value="All">Customer Tier: All</option>
            <option value="Tier 1">Tier 1</option>
            <option value="Tier 2">Tier 2</option>
            <option value="Tier 3">Tier 3</option>
            <option value="Tier 4">Tier 4</option>
          </select>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="ml-auto text-xs text-on-surface-variant font-mono bg-surface-container px-2.5 py-1 rounded border border-outline-variant">
            Active Rules: <span className="font-bold text-primary">{filteredRules.filter(r => r.status === 'Active').length}</span> | Cumulative Weight: <span className="font-bold text-primary">{totalWeight}%</span>
          </div>
        </div>
      </section>

      {/* Main Table */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant">
              <tr className="h-9">
                <th className="px-4 w-20 text-center sticky left-0 z-10 bg-surface-container border-r border-outline-variant">Priority</th>
                <th className="px-4 w-28 border-r border-outline-variant">Customer Tier</th>
                <th className="px-4 w-48 border-r border-outline-variant">Customer Type</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Contract Flag</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Strategic Flag</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant">Margin Score</th>
                <th className="px-4 w-36 text-right border-r border-outline-variant">SO Commit Score</th>
                <th className="px-4 w-24 text-right border-r border-outline-variant">Weight (%)</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Status</th>
                <th className="px-4 w-24 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
              {filteredRules.map((row) => (
                <tr key={row.id} className="h-11 hover:bg-surface-container-low transition-colors group">
                  <td className="px-4 text-center font-bold sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      row.priority <= 2 ? 'bg-primary text-on-primary' : row.priority <= 4 ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-high text-on-surface'
                    }`}>
                      {row.priority}
                    </span>
                  </td>
                  <td className="px-4 border-r border-outline-variant/50">
                    <span className="inline-block px-2 py-0.5 rounded font-body-sm font-semibold text-xs bg-surface-container text-on-surface">
                      {row.customerTier}
                    </span>
                  </td>
                  <td className="px-4 font-body-sm font-medium text-on-surface border-r border-outline-variant/50">
                    <div>{row.customerType}</div>
                    <div className="text-[11px] text-on-surface-variant line-clamp-1">{row.description}</div>
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    {row.contractFlag ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                        <span className="material-symbols-outlined text-[13px] mr-1">check_circle</span> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container text-on-surface-variant">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    {row.strategicFlag ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-900">
                        <span className="material-symbols-outlined text-[14px] mr-1 text-amber-600">star</span> Strategic
                      </span>
                    ) : (
                      <span className="text-on-surface-variant text-xs">Standard</span>
                    )}
                  </td>
                  <td className="px-4 text-right font-bold text-on-surface border-r border-outline-variant/50">
                    <span className="text-emerald-700">{row.marginScore.toFixed(1)}</span> / 10.0
                  </td>
                  <td className="px-4 text-right border-r border-outline-variant/50">
                    <span className="font-bold text-primary">{row.soCommitmentScore}%</span>
                  </td>
                  <td className="px-4 text-right font-bold text-on-surface border-r border-outline-variant/50">
                    {row.weight}%
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <button 
                      onClick={() => toggleStatus(row.id)}
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        row.status === 'Active' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                      }`}
                    >
                      {row.status}
                    </button>
                  </td>
                  <td className="px-4 text-center">
                    <button 
                      onClick={() => toggleStatus(row.id)}
                      title="Toggle active status"
                      className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">tune</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg border border-outline-variant shadow-lg max-w-lg w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Add Allocation Priority Rule</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleAddRule} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Priority Rank</label>
                  <input 
                    type="number" 
                    min="1"
                    value={newRule.priority}
                    onChange={(e) => setNewRule({ ...newRule, priority: Number(e.target.value) })}
                    className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm text-on-surface"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Customer Tier</label>
                  <select 
                    value={newRule.customerTier}
                    onChange={(e) => setNewRule({ ...newRule, customerTier: e.target.value })}
                    className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm text-on-surface"
                  >
                    <option value="Tier 1">Tier 1</option>
                    <option value="Tier 2">Tier 2</option>
                    <option value="Tier 3">Tier 3</option>
                    <option value="Tier 4">Tier 4</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Customer Type</label>
                <input 
                  type="text" 
                  value={newRule.customerType}
                  onChange={(e) => setNewRule({ ...newRule, customerType: e.target.value })}
                  placeholder="e.g. Key Account, QSR, Modern Trade"
                  className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm text-on-surface"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 p-2 border border-outline-variant rounded cursor-pointer hover:bg-surface-container-lowest">
                  <input 
                    type="checkbox" 
                    checked={newRule.contractFlag}
                    onChange={(e) => setNewRule({ ...newRule, contractFlag: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span className="text-xs font-semibold text-on-surface">Contract Required</span>
                </label>
                <label className="flex items-center gap-2 p-2 border border-outline-variant rounded cursor-pointer hover:bg-surface-container-lowest">
                  <input 
                    type="checkbox" 
                    checked={newRule.strategicFlag}
                    onChange={(e) => setNewRule({ ...newRule, strategicFlag: e.target.checked })}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span className="text-xs font-semibold text-on-surface">Strategic Customer</span>
                </label>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Margin Score (1-10)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    min="1" 
                    max="10"
                    value={newRule.marginScore}
                    onChange={(e) => setNewRule({ ...newRule, marginScore: Number(e.target.value) })}
                    className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">SO Commit (%)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100"
                    value={newRule.soCommitmentScore}
                    onChange={(e) => setNewRule({ ...newRule, soCommitmentScore: Number(e.target.value) })}
                    className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Weight (%)</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="100"
                    value={newRule.weight}
                    onChange={(e) => setNewRule({ ...newRule, weight: Number(e.target.value) })}
                    className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm text-on-surface"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Description / Notes</label>
                <textarea 
                  value={newRule.description}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                  placeholder="Detail the criteria and rationale..."
                  className="w-full h-16 p-2 bg-surface border border-outline-variant rounded text-sm text-on-surface"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-on-surface-variant bg-surface-container rounded hover:bg-surface-container-high"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-primary rounded hover:bg-inverse-surface shadow-sm"
                >
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
