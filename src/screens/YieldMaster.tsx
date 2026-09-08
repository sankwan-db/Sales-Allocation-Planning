import React, { useState, useEffect } from 'react';
import { 
  getStoredYieldRules, 
  saveStoredYieldRules, 
  getStoredChickenTypes, 
  DynamicYieldRule, 
  ChickenType 
} from '../data/chickenTypeMaster';

export default function YieldMaster() {
  const [yieldRules, setYieldRules] = useState<DynamicYieldRule[]>([]);
  const [chickenTypes, setChickenTypes] = useState<ChickenType[]>([]);
  
  // Filters
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedPlant, setSelectedPlant] = useState<string>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRule, setEditingRule] = useState<DynamicYieldRule | null>(null);
  const [formData, setFormData] = useState<Partial<DynamicYieldRule>>({
    chickenTypeId: 'BROILER',
    weightRangeId: 'ALL',
    weightRangeLabel: 'All Weights',
    plantId: 'All Plants',
    effectiveDate: new Date().toISOString().split('T')[0],
    conversionLevel: 'L2: Carcass to Main Part',
    sourceProduct: 'Carcass (ไก่ซาก)',
    outputProduct: 'BL Breast (เนื้ออกลอกหนัง)',
    yieldPercent: 23.0,
    minYieldPercent: 21.5,
    maxYieldPercent: 24.5,
    status: 'ACTIVE',
    version: 'V2.0',
    standardCostTHBPerKg: 105.0
  });

  const loadData = () => {
    setYieldRules(getStoredYieldRules());
    setChickenTypes(getStoredChickenTypes());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('yield-rules-updated', handleUpdate);
    window.addEventListener('chicken-types-updated', handleUpdate);
    return () => {
      window.removeEventListener('yield-rules-updated', handleUpdate);
      window.removeEventListener('chicken-types-updated', handleUpdate);
    };
  }, []);

  // Filtered rules
  const filteredRules = yieldRules.filter(r => {
    const matchType = selectedType === 'ALL' || r.chickenTypeId === selectedType;
    const matchPlant = selectedPlant === 'ALL' || r.plantId === 'All Plants' || r.plantId === selectedPlant;
    const matchLevel = selectedLevel === 'ALL' || r.conversionLevel.includes(selectedLevel);
    const matchSearch = searchQuery === '' || 
      r.outputProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.sourceProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.chickenTypeNameTh && r.chickenTypeNameTh.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchType && matchPlant && matchLevel && matchSearch;
  });

  // Handle Inline Yield edit
  const handleInlineYieldChange = (id: string, newYield: number) => {
    const updated = yieldRules.map(r => r.id === id ? { ...r, yieldPercent: newYield } : r);
    setYieldRules(updated);
    saveStoredYieldRules(updated);
  };

  // Handle Save from modal
  const handleSaveRule = (e: React.FormEvent) => {
    e.preventDefault();
    const typeObj = chickenTypes.find(t => t.id === formData.chickenTypeId);

    let updatedList: DynamicYieldRule[] = [];
    if (editingRule) {
      updatedList = yieldRules.map(r => 
        r.id === editingRule.id 
          ? {
              ...r,
              ...formData,
              chickenTypeNameTh: typeObj ? typeObj.nameTh : r.chickenTypeNameTh,
              yieldPercent: Number(formData.yieldPercent) || 0,
              minYieldPercent: Number(formData.minYieldPercent) || 0,
              maxYieldPercent: Number(formData.maxYieldPercent) || 0,
              standardCostTHBPerKg: Number(formData.standardCostTHBPerKg) || 0
            } as DynamicYieldRule
          : r
      );
    } else {
      const newRule: DynamicYieldRule = {
        id: `YD_${Date.now()}`,
        chickenTypeId: formData.chickenTypeId || 'BROILER',
        chickenTypeNameTh: typeObj ? typeObj.nameTh : 'ไก่เนื้อ (Broiler)',
        weightRangeId: formData.weightRangeId || 'ALL',
        weightRangeLabel: formData.weightRangeLabel || 'All Weights',
        plantId: formData.plantId || 'All Plants',
        effectiveDate: formData.effectiveDate || new Date().toISOString().split('T')[0],
        conversionLevel: (formData.conversionLevel as any) || 'L2: Carcass to Main Part',
        sourceProduct: formData.sourceProduct || 'Carcass (ไก่ซาก)',
        outputProduct: formData.outputProduct || 'BL Breast (เนื้ออกลอกหนัง)',
        yieldPercent: Number(formData.yieldPercent) || 0,
        minYieldPercent: Number(formData.minYieldPercent) || 0,
        maxYieldPercent: Number(formData.maxYieldPercent) || 0,
        status: (formData.status as any) || 'ACTIVE',
        version: formData.version || 'V1.0',
        standardCostTHBPerKg: Number(formData.standardCostTHBPerKg) || 0
      };
      updatedList = [newRule, ...yieldRules];
    }

    setYieldRules(updatedList);
    saveStoredYieldRules(updatedList);
    setShowAddModal(false);
    setEditingRule(null);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* HEADER */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>ผลผลิตและยีลด์ (Supply & Yield)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">ข้อมูลหลัก Yield (Yield Master)</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight flex items-center gap-2.5">
                <span>ข้อมูลหลัก Yield (Yield Master Matrix)</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                  Yield Configured by Chicken Type + Weight + Plant + Effective Date
                </span>
              </h1>
              <p className="text-xs text-on-surface-variant mt-0.5">
                กำหนดสูตรผลผลิต (Yield %) สำหรับแต่ละชิ้นส่วนตามมิติประเภทไก่ (Chicken Type) ช่วงน้ำหนัก และโรงงานแปรรูป
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  setEditingRule(null);
                  setFormData({
                    chickenTypeId: chickenTypes[0]?.id || 'BROILER',
                    weightRangeId: 'ALL',
                    weightRangeLabel: 'All Weights',
                    plantId: 'All Plants',
                    effectiveDate: new Date().toISOString().split('T')[0],
                    conversionLevel: 'L2: Carcass to Main Part',
                    sourceProduct: 'Carcass (ไก่ซาก)',
                    outputProduct: 'BL Breast (เนื้ออกลอกหนัง)',
                    yieldPercent: 23.0,
                    minYieldPercent: 21.0,
                    maxYieldPercent: 25.0,
                    status: 'ACTIVE',
                    version: 'V2.0',
                    standardCostTHBPerKg: 105.0
                  });
                  setShowAddModal(true);
                }}
                className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">add</span>
                <span>Add Yield Rule</span>
              </button>
            </div>
          </div>
        </div>

        {/* Multi-Dimensional Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative w-56">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ค้นหาชิ้นส่วน, ประเภทไก่..." 
                className="w-full h-8 pl-8 pr-3 text-xs bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* CHICKEN TYPE FILTER */}
            <div className="flex items-center bg-surface border border-primary/40 rounded px-2.5 py-1 gap-1.5 shadow-2xs">
              <span className="material-symbols-outlined text-primary text-[16px]">category</span>
              <span className="text-xs font-bold text-primary">ประเภทไก่:</span>
              <select 
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="bg-transparent text-xs font-bold text-primary focus:outline-none cursor-pointer"
              >
                <option value="ALL">ทุกประเภทไก่ (All Types)</option>
                {chickenTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.nameTh}</option>
                ))}
              </select>
            </div>

            {/* PLANT FILTER */}
            <div className="flex items-center bg-surface border border-outline-variant rounded px-2.5 py-1 gap-1.5">
              <span className="material-symbols-outlined text-outline text-[16px]">factory</span>
              <span className="text-xs font-bold text-on-surface-variant">โรงงาน:</span>
              <select 
                value={selectedPlant}
                onChange={e => setSelectedPlant(e.target.value)}
                className="bg-transparent text-xs font-semibold text-on-surface focus:outline-none cursor-pointer"
              >
                <option value="ALL">ทุกโรงงาน (All Plants)</option>
                <option value="Plant A (Saraburi)">Plant A (Saraburi)</option>
                <option value="Plant B (Korat)">Plant B (Korat)</option>
                <option value="Plant C (Rayong)">Plant C (Rayong)</option>
              </select>
            </div>

            {/* LEVEL FILTER */}
            <select 
              value={selectedLevel}
              onChange={e => setSelectedLevel(e.target.value)}
              className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-xs text-on-surface cursor-pointer"
            >
              <option value="ALL">Conversion Level: All</option>
              <option value="L1">L1: Live to Carcass</option>
              <option value="L2">L2: Carcass to Main Part</option>
              <option value="L3">L3: Cut-up to Deboned</option>
              <option value="L4">L4: By-Products & Waste</option>
            </select>
          </div>

          <div className="text-xs text-on-surface-variant font-medium">
            แสดง {filteredRules.length} จาก {yieldRules.length} กฎผลผลิต
          </div>
        </div>
      </section>

      {/* DATA GRID */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest">
        <table className="w-full text-left border-collapse min-w-[1500px]">
          <thead className="sticky top-0 z-20 bg-surface-container border-b border-outline shadow-sm text-left">
            <tr className="h-9 font-badge-caps text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-3 border-r border-outline-variant w-16 text-center">Level</th>
              <th className="px-3 border-r border-outline-variant w-44">ประเภทไก่ (Chicken Type)</th>
              <th className="px-3 border-r border-outline-variant w-44">ช่วงน้ำหนัก (Weight)</th>
              <th className="px-3 border-r border-outline-variant w-44">Source Product</th>
              <th className="px-2 border-r border-outline-variant w-8 text-center"></th>
              <th className="px-3 border-r border-outline-variant w-48">Output Product</th>
              <th className="px-3 border-r border-outline-variant w-28 text-right bg-blue-50 text-blue-900 font-bold">Yield %</th>
              <th className="px-3 border-r border-outline-variant w-24 text-right bg-blue-50/50">Min Yield</th>
              <th className="px-3 border-r border-outline-variant w-24 text-right bg-blue-50/50">Max Yield</th>
              <th className="px-3 border-r border-outline-variant w-32 text-right bg-emerald-50 text-emerald-900">Std Cost (฿/kg)</th>
              <th className="px-3 border-r border-outline-variant w-32">Plant</th>
              <th className="px-3 border-r border-outline-variant w-24 text-center">Effective Date</th>
              <th className="px-3 border-r border-outline-variant w-20 text-center">Version</th>
              <th className="px-3 text-center w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant font-body-sm text-xs">
            {filteredRules.map((row) => (
              <tr key={row.id} className="h-10 hover:bg-surface-container-low transition-colors group">
                <td className="px-3 text-center border-r border-outline-variant/50 font-mono font-bold text-on-surface-variant">
                  {row.conversionLevel.slice(0, 2)}
                </td>
                <td className="px-3 border-r border-outline-variant/50 font-semibold text-on-surface">
                  <span className="px-2 py-0.5 rounded text-[11px] bg-surface-container border border-outline-variant">
                    {row.chickenTypeNameTh}
                  </span>
                </td>
                <td className="px-3 border-r border-outline-variant/50 text-on-surface-variant font-mono text-[11px] truncate">
                  {row.weightRangeLabel}
                </td>
                <td className="px-3 border-r border-outline-variant/50 text-on-surface font-medium truncate">{row.sourceProduct}</td>
                <td className="px-2 text-center border-r border-outline-variant/50 text-outline">
                  <span className="material-symbols-outlined text-[14px]">arrow_right_alt</span>
                </td>
                <td className="px-3 border-r border-outline-variant/50 font-bold text-on-surface truncate">{row.outputProduct}</td>
                
                {/* Editable Yield % */}
                <td className="border-r border-outline-variant/50 p-0 bg-blue-50/30 group-hover:bg-blue-50/50">
                  <input 
                    type="number" 
                    step="0.05"
                    value={row.yieldPercent} 
                    onChange={e => handleInlineYieldChange(row.id, parseFloat(e.target.value) || 0)}
                    className="w-full h-full px-3 text-right bg-transparent focus:bg-surface focus:outline-none focus:ring-1 focus:ring-inset focus:ring-primary font-bold text-blue-900 font-mono text-sm" 
                  />
                </td>
                <td className="border-r border-outline-variant/50 px-3 text-right font-mono text-on-surface-variant">
                  {row.minYieldPercent.toFixed(1)}%
                </td>
                <td className="border-r border-outline-variant/50 px-3 text-right font-mono text-on-surface-variant">
                  {row.maxYieldPercent.toFixed(1)}%
                </td>
                <td className="border-r border-outline-variant/50 px-3 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30">
                  ฿{row.standardCostTHBPerKg.toFixed(2)}
                </td>
                <td className="border-r border-outline-variant/50 px-3 text-on-surface-variant truncate">
                  {row.plantId}
                </td>
                <td className="px-3 text-center border-r border-outline-variant/50 font-mono text-on-surface-variant">{row.effectiveDate}</td>
                <td className="px-3 text-center border-r border-outline-variant/50 font-mono font-bold text-on-surface-variant">{row.version}</td>
                <td className="px-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => {
                        setEditingRule(row);
                        setFormData(row);
                        setShowAddModal(true);
                      }}
                      className="p-1 rounded text-outline hover:text-primary hover:bg-surface-container"
                      title="แก้ไขกฎ Yield นี้"
                    >
                      <span className="material-symbols-outlined text-[15px]">edit</span>
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('ยืนยันการลบกฎ Yield นี้?')) {
                          const updated = yieldRules.filter(r => r.id !== row.id);
                          setYieldRules(updated);
                          saveStoredYieldRules(updated);
                        }
                      }}
                      className="p-1 rounded text-outline hover:text-error hover:bg-error-container/20"
                      title="ลบกฎ Yield นี้"
                    >
                      <span className="material-symbols-outlined text-[15px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* MODAL: ADD/EDIT YIELD RULE */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-outline-variant rounded-xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
              <h3 className="font-headline-sm text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                <span>{editingRule ? 'แก้ไขกฎ Yield Matrix' : 'เพิ่มกฎผลผลิต (Add Yield Rule)'}</span>
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveRule} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-on-surface mb-1">ประเภทไก่ (Chicken Type) *</label>
                <select
                  value={formData.chickenTypeId}
                  onChange={e => {
                    const newT = e.target.value;
                    setFormData({ ...formData, chickenTypeId: newT });
                  }}
                  className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded font-bold text-primary"
                >
                  {chickenTypes.map(t => (
                    <option key={t.id} value={t.id}>{t.nameTh}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">ช่วงน้ำหนัก (Weight Range)</label>
                  <select
                    value={formData.weightRangeId}
                    onChange={e => {
                      const val = e.target.value;
                      const wrObj = chickenTypes
                        .find(t => t.id === formData.chickenTypeId)
                        ?.weightRanges.find(w => w.id === val);
                      setFormData({
                        ...formData,
                        weightRangeId: val,
                        weightRangeLabel: wrObj ? wrObj.label : 'All Weights'
                      });
                    }}
                    className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded"
                  >
                    <option value="ALL">ทุกช่วงน้ำหนัก (All Weights)</option>
                    {chickenTypes
                      .find(t => t.id === formData.chickenTypeId)
                      ?.weightRanges.map(w => (
                        <option key={w.id} value={w.id}>{w.label}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">โรงงาน (Plant) *</label>
                  <select
                    value={formData.plantId}
                    onChange={e => setFormData({ ...formData, plantId: e.target.value })}
                    className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded font-semibold"
                  >
                    <option value="All Plants">ทุกโรงงาน (All Plants)</option>
                    <option value="Plant A (Saraburi)">Plant A (Saraburi)</option>
                    <option value="Plant B (Korat)">Plant B (Korat)</option>
                    <option value="Plant C (Rayong)">Plant C (Rayong)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Conversion Level</label>
                  <select
                    value={formData.conversionLevel}
                    onChange={e => setFormData({ ...formData, conversionLevel: e.target.value as any })}
                    className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded"
                  >
                    <option value="L1: Live to Carcass">L1: Live to Carcass</option>
                    <option value="L2: Carcass to Main Part">L2: Carcass to Main Part</option>
                    <option value="L3: Cut-up to Deboned">L3: Cut-up to Deboned</option>
                    <option value="L4: By-Products">L4: By-Products & Waste</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">วันที่มีผล (Effective Date)</label>
                  <input
                    type="date"
                    value={formData.effectiveDate}
                    onChange={e => setFormData({ ...formData, effectiveDate: e.target.value })}
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">วัตถุดิบต้นทาง (Source Product)</label>
                  <input
                    type="text"
                    value={formData.sourceProduct}
                    onChange={e => setFormData({ ...formData, sourceProduct: e.target.value })}
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">ผลผลิตเป้าหมาย (Output SKU) *</label>
                  <input
                    type="text"
                    required
                    value={formData.outputProduct}
                    onChange={e => setFormData({ ...formData, outputProduct: e.target.value })}
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Yield % *</label>
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={formData.yieldPercent}
                    onChange={e => setFormData({ ...formData, yieldPercent: parseFloat(e.target.value) || 0 })}
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded font-mono font-bold text-blue-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Min %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.minYieldPercent}
                    onChange={e => setFormData({ ...formData, minYieldPercent: parseFloat(e.target.value) || 0 })}
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Max %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.maxYieldPercent}
                    onChange={e => setFormData({ ...formData, maxYieldPercent: parseFloat(e.target.value) || 0 })}
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">ต้นทุนมาตรฐาน (THB/kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.standardCostTHBPerKg}
                    onChange={e => setFormData({ ...formData, standardCostTHBPerKg: parseFloat(e.target.value) || 0 })}
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded font-mono font-bold text-emerald-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">เวอร์ชัน (Version)</label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={e => setFormData({ ...formData, version: e.target.value })}
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-outline-variant rounded font-semibold text-on-surface hover:bg-surface-container"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-white rounded font-semibold hover:bg-primary-container shadow-xs"
                >
                  บันทึกกฎ Yield
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
