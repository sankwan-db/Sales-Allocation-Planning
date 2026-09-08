import React, { useState } from 'react';

interface PipelineStage {
  id: string;
  stageCode: string;
  stageName: string;
  sequence: number;
  probability: number;
  requiredActivity: string;
  allowQuotation: boolean;
  allowContract: boolean;
  allowSO: boolean;
  status: 'Active' | 'Inactive';
  color: string;
}

const initialStages: PipelineStage[] = [
  { id: '1', stageCode: 'STG-01', stageName: 'Prospecting / Lead Gen', sequence: 1, probability: 10, requiredActivity: 'Initial Meeting & Needs Assessment Logged', allowQuotation: false, allowContract: false, allowSO: false, status: 'Active', color: 'bg-blue-500' },
  { id: '2', stageCode: 'STG-02', stageName: 'Qualified Opportunity', sequence: 2, probability: 25, requiredActivity: 'Customer KYC & Credit Limit Check', allowQuotation: true, allowContract: false, allowSO: false, status: 'Active', color: 'bg-indigo-500' },
  { id: '3', stageCode: 'STG-03', stageName: 'Price & Volume Proposal', sequence: 3, probability: 50, requiredActivity: 'Quotation Validation against Floor Price', allowQuotation: true, allowContract: false, allowSO: false, status: 'Active', color: 'bg-amber-500' },
  { id: '4', stageCode: 'STG-04', stageName: 'Contract Negotiation', sequence: 4, probability: 75, requiredActivity: 'Draft Contract Terms & Allocation Reservation', allowQuotation: true, allowContract: true, allowSO: false, status: 'Active', color: 'bg-orange-500' },
  { id: '5', stageCode: 'STG-05', stageName: 'Contract Approved & Signed', sequence: 5, probability: 90, requiredActivity: 'Legal & Finance Directorate Sign-off', allowQuotation: true, allowContract: true, allowSO: true, status: 'Active', color: 'bg-emerald-500' },
  { id: '6', stageCode: 'STG-06', stageName: 'Closed Won (SO Issued)', sequence: 6, probability: 100, requiredActivity: 'Confirmed Sales Order Interface to Oracle ERP', allowQuotation: true, allowContract: true, allowSO: true, status: 'Active', color: 'bg-emerald-700' },
  { id: '7', stageCode: 'STG-07', stageName: 'Closed Lost', sequence: 7, probability: 0, requiredActivity: 'Mandatory Reason Code & Competitor Analysis', allowQuotation: false, allowContract: false, allowSO: false, status: 'Active', color: 'bg-rose-500' },
];

export default function PipelineStageMaster() {
  const [stages, setStages] = useState<PipelineStage[]>(initialStages);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);

  const [newStage, setNewStage] = useState<Partial<PipelineStage>>({
    stageCode: `STG-0${stages.length + 1}`,
    stageName: '',
    sequence: stages.length + 1,
    probability: 50,
    requiredActivity: '',
    allowQuotation: true,
    allowContract: false,
    allowSO: false,
    status: 'Active',
    color: 'bg-primary',
  });

  const filteredStages = stages
    .filter(s => {
      const matchSearch = s.stageCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.stageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.requiredActivity.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'All' || s.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => a.sequence - b.sequence);

  const toggleBoolean = (id: string, field: 'allowQuotation' | 'allowContract' | 'allowSO') => {
    setStages(stages.map(s => s.id === id ? { ...s, [field]: !s[field] } : s));
  };

  const toggleStatus = (id: string) => {
    setStages(stages.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s));
  };

  const handleAddStage = (e: React.FormEvent) => {
    e.preventDefault();
    const stageToAdd: PipelineStage = {
      id: String(Date.now()),
      stageCode: newStage.stageCode || `STG-${String(stages.length + 1).padStart(2, '0')}`,
      stageName: newStage.stageName || 'New Stage',
      sequence: Number(newStage.sequence) || stages.length + 1,
      probability: Number(newStage.probability) || 50,
      requiredActivity: newStage.requiredActivity || 'Standard Review',
      allowQuotation: Boolean(newStage.allowQuotation),
      allowContract: Boolean(newStage.allowContract),
      allowSO: Boolean(newStage.allowSO),
      status: (newStage.status as 'Active' | 'Inactive') || 'Active',
      color: 'bg-primary',
    };
    setStages([...stages, stageToAdd]);
    setShowModal(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* Header */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ข้อมูลหลัก (Master Data)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">Pipeline Stage Master</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Pipeline Stage Master</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                กำหนดขั้นตอนกระบวนการขาย (Sales Pipeline), ค่าน้ำหนักความน่าจะเป็น (Probability %) และสิทธิ์การสร้างเอกสาร Quotation, Contract, SO
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowModal(true)}
                className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>New Stage</span>
              </button>
            </div>
          </div>
        </div>

        {/* Visual Pipeline Bar */}
        <div className="mb-4 bg-surface-container-low p-3 rounded-lg border border-outline-variant">
          <div className="text-xs font-semibold text-on-surface-variant mb-2 flex items-center justify-between">
            <span>Pipeline Progression Flow</span>
            <span>Total Active Stages: {stages.filter(s => s.status === 'Active' && s.probability > 0).length}</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {stages.filter(s => s.status === 'Active' && s.probability > 0).sort((a,b) => a.sequence - b.sequence).map((s, idx, arr) => (
              <div key={s.id} className="flex items-center gap-1.5 shrink-0">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface border border-outline-variant shadow-xs">
                  <span className={`w-2 h-2 rounded-full ${s.color}`}></span>
                  <div className="text-left">
                    <div className="text-xs font-bold text-on-surface leading-none">{s.stageCode}: {s.stageName}</div>
                    <div className="text-[10px] text-primary font-mono mt-0.5">{s.probability}% Win Prob.</div>
                  </div>
                </div>
                {idx < arr.length - 1 && (
                  <span className="material-symbols-outlined text-outline text-[16px]">arrow_forward</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search stage code, name or required activity..." 
              className="w-full h-8 pl-9 pr-3 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </section>

      {/* Table */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant">
              <tr className="h-9">
                <th className="px-4 w-16 text-center sticky left-0 z-10 bg-surface-container border-r border-outline-variant">Seq</th>
                <th className="px-4 w-28 border-r border-outline-variant">Stage Code</th>
                <th className="px-4 w-52 border-r border-outline-variant">Stage Name</th>
                <th className="px-4 w-28 text-right border-r border-outline-variant">Probability %</th>
                <th className="px-4 w-72 border-r border-outline-variant">Required Activity</th>
                <th className="px-4 w-32 text-center border-r border-outline-variant">Allow Quotation</th>
                <th className="px-4 w-32 text-center border-r border-outline-variant">Allow Contract</th>
                <th className="px-4 w-28 text-center border-r border-outline-variant">Allow SO</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Status</th>
                <th className="px-4 w-20 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
              {filteredStages.map((row) => (
                <tr key={row.id} className="h-11 hover:bg-surface-container-low transition-colors group">
                  <td className="px-4 text-center font-bold sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-surface-container font-mono text-xs">
                      {row.sequence}
                    </span>
                  </td>
                  <td className="px-4 font-bold text-primary border-r border-outline-variant/50 font-mono">
                    {row.stageCode}
                  </td>
                  <td className="px-4 font-body-sm font-semibold text-on-surface border-r border-outline-variant/50">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${row.color}`}></span>
                      <span>{row.stageName}</span>
                    </div>
                  </td>
                  <td className="px-4 text-right border-r border-outline-variant/50 font-bold">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      row.probability >= 80 ? 'bg-emerald-100 text-emerald-800' :
                      row.probability >= 50 ? 'bg-blue-100 text-blue-800' :
                      row.probability > 0 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {row.probability}%
                    </span>
                  </td>
                  <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-primary">task_alt</span>
                      <span className="truncate">{row.requiredActivity}</span>
                    </div>
                  </td>

                  {/* Allow Quotation */}
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <button 
                      onClick={() => toggleBoolean(row.id, 'allowQuotation')}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                        row.allowQuotation ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      {row.allowQuotation ? 'Allowed' : 'Disallowed'}
                    </button>
                  </td>

                  {/* Allow Contract */}
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <button 
                      onClick={() => toggleBoolean(row.id, 'allowContract')}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                        row.allowContract ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      {row.allowContract ? 'Allowed' : 'Disallowed'}
                    </button>
                  </td>

                  {/* Allow SO */}
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <button 
                      onClick={() => toggleBoolean(row.id, 'allowSO')}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                        row.allowSO ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      {row.allowSO ? 'Allowed' : 'Disallowed'}
                    </button>
                  </td>

                  {/* Status */}
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
                      title="Toggle Active/Inactive"
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

      {/* New Stage Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg border border-outline-variant shadow-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Add Pipeline Stage</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleAddStage} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Stage Code</label>
                  <input 
                    type="text" 
                    value={newStage.stageCode}
                    onChange={(e) => setNewStage({ ...newStage, stageCode: e.target.value })}
                    className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm text-on-surface font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Sequence</label>
                  <input 
                    type="number" 
                    min="1"
                    value={newStage.sequence}
                    onChange={(e) => setNewStage({ ...newStage, sequence: Number(e.target.value) })}
                    className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm text-on-surface"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Stage Name</label>
                <input 
                  type="text" 
                  value={newStage.stageName}
                  onChange={(e) => setNewStage({ ...newStage, stageName: e.target.value })}
                  placeholder="e.g. Technical Feasibility Check"
                  className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm text-on-surface"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Probability (%)</label>
                <input 
                  type="number" 
                  min="0"
                  max="100"
                  value={newStage.probability}
                  onChange={(e) => setNewStage({ ...newStage, probability: Number(e.target.value) })}
                  className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm text-on-surface"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Required Activity</label>
                <input 
                  type="text" 
                  value={newStage.requiredActivity}
                  onChange={(e) => setNewStage({ ...newStage, requiredActivity: e.target.value })}
                  placeholder="Milestone checklist required to advance..."
                  className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm text-on-surface"
                  required
                />
              </div>

              <div className="space-y-2 border border-outline-variant p-3 rounded">
                <div className="text-xs font-bold text-on-surface">Document Permissions:</div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={newStage.allowQuotation}
                    onChange={(e) => setNewStage({ ...newStage, allowQuotation: e.target.checked })}
                    className="rounded text-primary"
                  />
                  <span className="text-xs text-on-surface">Allow Quotation Creation</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={newStage.allowContract}
                    onChange={(e) => setNewStage({ ...newStage, allowContract: e.target.checked })}
                    className="rounded text-primary"
                  />
                  <span className="text-xs text-on-surface">Allow Contract Drafting</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={newStage.allowSO}
                    onChange={(e) => setNewStage({ ...newStage, allowSO: e.target.checked })}
                    className="rounded text-primary"
                  />
                  <span className="text-xs text-on-surface">Allow Confirmed SO Entry</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 text-xs font-semibold text-on-surface-variant bg-surface-container rounded hover:bg-surface-container-high"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-primary rounded hover:bg-inverse-surface shadow-sm"
                >
                  Save Stage
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
