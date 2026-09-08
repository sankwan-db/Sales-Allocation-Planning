import React, { useState, useEffect } from 'react';
import { 
  ChickenType, 
  DynamicYieldRule, 
  getStoredChickenTypes, 
  saveStoredChickenTypes, 
  getStoredYieldRules, 
  saveStoredYieldRules, 
  INITIAL_CHICKEN_TYPES, 
  INITIAL_YIELD_RULES 
} from '../data/chickenTypeMaster';

export default function ChickenTypeBreedMaster() {
  const [chickenTypes, setChickenTypes] = useState<ChickenType[]>([]);
  const [yieldRules, setYieldRules] = useState<DynamicYieldRule[]>([]);
  const [activeTab, setActiveTab] = useState<'types' | 'yields'>('types');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [editingType, setEditingType] = useState<ChickenType | null>(null);
  const [typeForm, setTypeForm] = useState<Partial<ChickenType>>({
    code: '',
    nameTh: '',
    nameEn: '',
    category: 'Commercial Broiler',
    defaultAvgWeight: 2.45,
    defaultLiveCostTHB: 42.50,
    slaughterAgeDays: 42,
    description: '',
    status: 'ACTIVE'
  });

  const [showYieldModal, setShowYieldModal] = useState(false);
  const [editingYield, setEditingYield] = useState<DynamicYieldRule | null>(null);
  const [yieldForm, setYieldForm] = useState<Partial<DynamicYieldRule>>({
    chickenTypeId: 'BROILER',
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
    version: 'V1.0',
    standardCostTHBPerKg: 105.0
  });

  // Load from storage
  const loadData = () => {
    setChickenTypes(getStoredChickenTypes());
    setYieldRules(getStoredYieldRules());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('chicken-types-updated', handleUpdate);
    window.addEventListener('yield-rules-updated', handleUpdate);
    return () => {
      window.removeEventListener('chicken-types-updated', handleUpdate);
      window.removeEventListener('yield-rules-updated', handleUpdate);
    };
  }, []);

  // Save Type
  const handleSaveType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typeForm.nameTh || !typeForm.code) return;

    let updatedList: ChickenType[] = [];
    if (editingType) {
      updatedList = chickenTypes.map(t => 
        t.id === editingType.id 
          ? { 
              ...t, 
              ...typeForm,
              defaultAvgWeight: Number(typeForm.defaultAvgWeight) || 2.4,
              defaultLiveCostTHB: Number(typeForm.defaultLiveCostTHB) || 40,
              slaughterAgeDays: Number(typeForm.slaughterAgeDays) || 42
            } as ChickenType 
          : t
      );
    } else {
      const newType: ChickenType = {
        id: typeForm.code.toUpperCase().replace(/[^A-Z0-9]/g, '_'),
        code: typeForm.code.toUpperCase(),
        nameTh: typeForm.nameTh,
        nameEn: typeForm.nameEn || typeForm.nameTh,
        category: (typeForm.category as any) || 'Other',
        description: typeForm.description || '',
        defaultAvgWeight: Number(typeForm.defaultAvgWeight) || 2.4,
        defaultLiveCostTHB: Number(typeForm.defaultLiveCostTHB) || 40,
        slaughterAgeDays: Number(typeForm.slaughterAgeDays) || 42,
        status: (typeForm.status as any) || 'ACTIVE',
        isSystem: false,
        weightRanges: [
          {
            id: `WR_${Date.now()}`,
            label: 'ขนาดมาตรฐาน (Standard Range)',
            minWeight: 1.8,
            maxWeight: 2.6,
            primaryUsage: 'ชำแหละทั่วไป'
          }
        ]
      };
      updatedList = [...chickenTypes, newType];
    }

    saveStoredChickenTypes(updatedList);
    setChickenTypes(updatedList);
    setShowTypeModal(false);
    setEditingType(null);
  };

  // Delete Type
  const handleDeleteType = (id: string) => {
    if (!window.confirm('ยืนยันการลบประเภทไก่นี้?')) return;
    const updated = chickenTypes.filter(t => t.id !== id);
    saveStoredChickenTypes(updated);
    setChickenTypes(updated);
  };

  // Save Yield Rule
  const handleSaveYield = (e: React.FormEvent) => {
    e.preventDefault();
    const typeObj = chickenTypes.find(t => t.id === yieldForm.chickenTypeId);

    let updatedRules: DynamicYieldRule[] = [];
    if (editingYield) {
      updatedRules = yieldRules.map(r => 
        r.id === editingYield.id 
          ? { 
              ...r, 
              ...yieldForm,
              chickenTypeNameTh: typeObj ? typeObj.nameTh : r.chickenTypeNameTh,
              yieldPercent: Number(yieldForm.yieldPercent) || 0,
              minYieldPercent: Number(yieldForm.minYieldPercent) || 0,
              maxYieldPercent: Number(yieldForm.maxYieldPercent) || 0,
              standardCostTHBPerKg: Number(yieldForm.standardCostTHBPerKg) || 0
            } as DynamicYieldRule
          : r
      );
    } else {
      const newRule: DynamicYieldRule = {
        id: `YD_${Date.now()}`,
        chickenTypeId: yieldForm.chickenTypeId || 'BROILER',
        chickenTypeNameTh: typeObj ? typeObj.nameTh : 'ไก่เนื้อ (Broiler)',
        weightRangeId: yieldForm.weightRangeId || 'ALL',
        weightRangeLabel: yieldForm.weightRangeLabel || 'All Weights',
        plantId: yieldForm.plantId || 'All Plants',
        effectiveDate: yieldForm.effectiveDate || new Date().toISOString().split('T')[0],
        conversionLevel: (yieldForm.conversionLevel as any) || 'L2: Carcass to Main Part',
        sourceProduct: yieldForm.sourceProduct || 'Carcass (ไก่ซาก)',
        outputProduct: yieldForm.outputProduct || 'BL Breast (เนื้ออกลอกหนัง)',
        yieldPercent: Number(yieldForm.yieldPercent) || 0,
        minYieldPercent: Number(yieldForm.minYieldPercent) || 0,
        maxYieldPercent: Number(yieldForm.maxYieldPercent) || 0,
        status: (yieldForm.status as any) || 'ACTIVE',
        version: yieldForm.version || 'V1.0',
        standardCostTHBPerKg: Number(yieldForm.standardCostTHBPerKg) || 0
      };
      updatedRules = [...yieldRules, newRule];
    }

    saveStoredYieldRules(updatedRules);
    setYieldRules(updatedRules);
    setShowYieldModal(false);
    setEditingYield(null);
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    if (window.confirm('คุณต้องการรีเซ็ตข้อมูลประเภทไก่และ Yield Matrix กลับเป็นค่ามาตรฐานหรือไม่?')) {
      saveStoredChickenTypes(INITIAL_CHICKEN_TYPES);
      saveStoredYieldRules(INITIAL_YIELD_RULES);
      loadData();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* Header Bar */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-6 py-4 shrink-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center space-x-2 text-xs text-on-surface-variant mb-1">
              <span>ข้อมูลหลัก (Master Data)</span>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <span className="text-on-surface font-semibold">ประเภทไก่ (Chicken Type Master)</span>
            </div>
            <h1 className="text-xl font-bold text-on-surface flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary text-[26px]">category</span>
              <span>ประเภทไก่ (Chicken Type Master)</span>
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              จัดการประเภทไก่ (Chicken Types) และ Yield Matrix ตามประเภทไก่สำหรับ Supply Calculation & Balance
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleResetDefaults}
              className="h-8 px-3 text-xs font-semibold text-on-surface-variant hover:text-on-surface bg-surface border border-outline-variant hover:bg-surface-container rounded flex items-center gap-1.5 transition-colors"
              title="รีเซ็ตประเภทไก่และสูตร Yield กลับเป็นค่ามาตรฐาน"
            >
              <span className="material-symbols-outlined text-[15px]">restart_alt</span>
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
            
            <button 
              onClick={() => {
                setEditingType(null);
                setTypeForm({
                  code: `TYP-${Date.now().toString().slice(-3)}`,
                  nameTh: '',
                  nameEn: '',
                  category: 'Other',
                  defaultAvgWeight: 2.2,
                  defaultLiveCostTHB: 45.0,
                  slaughterAgeDays: 45,
                  description: '',
                  status: 'ACTIVE'
                });
                setShowTypeModal(true);
              }}
              className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">add_circle</span>
              <span>เพิ่มประเภทไก่ใหม่ (Add Type)</span>
            </button>

            <button 
              onClick={() => {
                setEditingYield(null);
                setYieldForm({
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
                  version: 'V1.0',
                  standardCostTHBPerKg: 105.0
                });
                setShowYieldModal(true);
              }}
              className="h-8 px-3 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">tune</span>
              <span>กำหนด Yield ตามประเภทไก่</span>
            </button>
          </div>
        </div>

        {/* Tab Bar & Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1 bg-surface-container rounded-lg p-0.5 border border-outline-variant">
            <button
              onClick={() => setActiveTab('types')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'types' 
                  ? 'bg-surface text-primary shadow-xs' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">category</span>
              <span>ประเภทไก่ ({chickenTypes.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('yields')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'yields' 
                  ? 'bg-surface text-primary shadow-xs' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">pie_chart</span>
              <span>Yield Matrix ตามประเภทไก่ ({yieldRules.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
              <input 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ค้นหาชื่อ, รหัส, ผลผลิต..."
                className="w-full h-8 pl-8 pr-3 text-xs bg-surface border border-outline-variant rounded focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="h-8 px-2.5 text-xs bg-surface border border-outline-variant rounded text-on-surface focus:border-primary font-medium"
            >
              <option value="ALL">ประเภทไก่: ทั้งหมด ({chickenTypes.length})</option>
              {chickenTypes.map(t => (
                <option key={t.id} value={t.id}>{t.nameTh}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="flex-1 overflow-y-auto p-6 bg-surface-container-lowest custom-scrollbar">
        {/* TAB 1: CHICKEN TYPES GRID */}
        {activeTab === 'types' && (
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chickenTypes
                .filter(t => selectedType === 'ALL' || t.id === selectedType)
                .filter(t => 
                  searchQuery === '' || 
                  t.nameTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  t.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  t.code.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(type => (
                  <div 
                    key={type.id}
                    className="bg-surface border border-outline-variant rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                              {type.code}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              type.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container text-outline'
                            }`}>
                              {type.status}
                            </span>
                          </div>
                          <h2 className="text-base font-bold text-on-surface mt-1.5">{type.nameTh}</h2>
                          <div className="text-xs text-on-surface-variant font-medium">{type.nameEn}</div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingType(type);
                              setTypeForm(type);
                              setShowTypeModal(true);
                            }}
                            className="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                            title="แก้ไขประเภทไก่"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          {!type.isSystem && (
                            <button
                              onClick={() => handleDeleteType(type.id)}
                              className="p-1.5 rounded hover:bg-error-container/20 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                              title="ลบประเภทไก่"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-on-surface-variant line-clamp-2 my-2.5">
                        {type.description}
                      </p>

                      {/* Operational Metrics */}
                      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-outline-variant/60">
                        <div className="bg-surface-container-lowest p-2 rounded border border-outline-variant/50 text-center">
                          <div className="text-[10px] text-on-surface-variant font-semibold">น้ำหนักเฉลี่ย</div>
                          <div className="font-mono text-sm font-bold text-on-surface mt-0.5">{type.defaultAvgWeight.toFixed(2)} kg</div>
                        </div>
                        <div className="bg-surface-container-lowest p-2 rounded border border-outline-variant/50 text-center">
                          <div className="text-[10px] text-on-surface-variant font-semibold">ต้นทุนไก่มีชีวิต</div>
                          <div className="font-mono text-sm font-bold text-primary mt-0.5">฿{type.defaultLiveCostTHB.toFixed(2)}/kg</div>
                        </div>
                        <div className="bg-surface-container-lowest p-2 rounded border border-outline-variant/50 text-center">
                          <div className="text-[10px] text-on-surface-variant font-semibold">อายุเข้าเชือด</div>
                          <div className="font-mono text-sm font-bold text-secondary mt-0.5">{type.slaughterAgeDays} วัน</div>
                        </div>
                      </div>

                      {/* Weight Ranges section */}
                      <div className="mt-3 pt-3 border-t border-outline-variant/40">
                        <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                          ช่วงน้ำหนักเป้าหมาย (Weight Ranges):
                        </div>
                        <div className="space-y-1 text-xs">
                          {type.weightRanges.map(wr => (
                            <div key={wr.id} className="flex items-center justify-between bg-surface-container-low px-2.5 py-1 rounded text-[11px]">
                              <span className="font-mono font-bold text-on-surface">{wr.label}</span>
                              <span className="text-on-surface-variant">{wr.primaryUsage}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-outline-variant flex items-center justify-between text-xs">
                      <span className="text-on-surface-variant text-[11px]">
                        หมวดหมู่: <strong className="text-on-surface">{type.category}</strong>
                      </span>
                      <button
                        onClick={() => {
                          setSelectedType(type.id);
                          setActiveTab('yields');
                        }}
                        className="px-2.5 py-1 text-xs font-bold text-primary hover:bg-primary/10 rounded flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>ดู Yield Matrix</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 2: YIELD MATRIX TABLE */}
        {activeTab === 'yields' && (
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">account_tree</span>
              <div>
                <h3 className="text-xs font-bold text-primary">เมทริกซ์การคำนวณ Yield แยกตามประเภทไก่ (Multi-Dimensional Yield Matrix)</h3>
                <p className="text-[11px] text-on-surface-variant mt-0.5">
                  ระบบคำนวณซัพพลายตามสูตร: <strong>Chicken Type + Weight Range + Plant + Effective Date</strong> เพื่อสะท้อนผลผลิตตามประเภทไก่จริง (เช่น ไก่เนื้อ Broiler เนื้ออก 23.0% ขณะที่ ไก่ไข่ปลด Spent Layer เนื้ออก 15.0% แต่น่องและโครงกระดูกสูงกว่า)
                </p>
              </div>
            </div>

            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse text-xs min-w-[1000px]">
                <thead className="bg-surface-container border-b border-outline-variant text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                  <tr>
                    <th className="p-3">ประเภทไก่</th>
                    <th className="p-3">ช่วงน้ำหนัก (Weight Range)</th>
                    <th className="p-3">โรงงาน (Plant)</th>
                    <th className="p-3">ระดับการแปลง (Level)</th>
                    <th className="p-3">ผลผลิตเป้าหมาย (Output SKU)</th>
                    <th className="p-3 text-right bg-blue-50 text-blue-900">Yield %</th>
                    <th className="p-3 text-right">Min - Max %</th>
                    <th className="p-3 text-right">ต้นทุนมาตรฐาน (฿/kg)</th>
                    <th className="p-3 text-center">วันที่มีผล</th>
                    <th className="p-3 text-center">เวอร์ชัน</th>
                    <th className="p-3 text-right">การจัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {yieldRules
                    .filter(r => selectedType === 'ALL' || r.chickenTypeId === selectedType)
                    .filter(r => 
                      searchQuery === '' ||
                      r.chickenTypeNameTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      r.outputProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      r.plantId.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(rule => (
                      <tr key={rule.id} className="hover:bg-surface-container-low/60 transition-colors">
                        <td className="p-3">
                          <span className="font-bold text-on-surface">{rule.chickenTypeNameTh}</span>
                        </td>
                        <td className="p-3 text-on-surface-variant font-mono text-[11px]">{rule.weightRangeLabel}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[11px] bg-surface-container font-medium text-on-surface">
                            {rule.plantId}
                          </span>
                        </td>
                        <td className="p-3 text-on-surface-variant text-[11px]">
                          {rule.conversionLevel.split(':')[0]}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-on-surface">{rule.outputProduct}</div>
                          <div className="text-[10px] text-on-surface-variant">จาก: {rule.sourceProduct}</div>
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-blue-800 bg-blue-50/50">
                          {rule.yieldPercent.toFixed(2)}%
                        </td>
                        <td className="p-3 text-right font-mono text-on-surface-variant text-[11px]">
                          {rule.minYieldPercent.toFixed(1)}% - {rule.maxYieldPercent.toFixed(1)}%
                        </td>
                        <td className="p-3 text-right font-mono font-semibold text-primary">
                          ฿{rule.standardCostTHBPerKg.toFixed(2)}
                        </td>
                        <td className="p-3 text-center font-mono text-[11px] text-on-surface-variant">
                          {rule.effectiveDate}
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono font-bold">
                            {rule.version}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setEditingYield(rule);
                                setYieldForm(rule);
                                setShowYieldModal(true);
                              }}
                              className="p-1 rounded text-outline hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                              title="แก้ไขกฎ Yield"
                            >
                              <span className="material-symbols-outlined text-[16px]">edit</span>
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`ยืนยันการลบกฎ Yield สำหรับ ${rule.outputProduct}?`)) {
                                  const updated = yieldRules.filter(r => r.id !== rule.id);
                                  saveStoredYieldRules(updated);
                                  setYieldRules(updated);
                                }
                              }}
                              className="p-1 rounded text-outline hover:text-error hover:bg-error-container/20 transition-colors cursor-pointer"
                              title="ลบกฎ Yield"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* MODAL 1: ADD/EDIT CHICKEN TYPE */}
      {showTypeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-outline-variant rounded-xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
              <h3 className="font-headline-sm text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">add_circle</span>
                <span>{editingType ? 'แก้ไขประเภทไก่' : 'เพิ่มประเภทไก่ใหม่ (Add Chicken Type)'}</span>
              </h3>
              <button 
                onClick={() => setShowTypeModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveType} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">รหัสประเภท (Code) *</label>
                  <input
                    type="text"
                    required
                    value={typeForm.code}
                    onChange={e => setTypeForm({ ...typeForm, code: e.target.value })}
                    placeholder="เช่น TYP-NATIVE"
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded focus:border-primary uppercase font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">หมวดหมู่ (Category)</label>
                  <select
                    value={typeForm.category}
                    onChange={e => setTypeForm({ ...typeForm, category: e.target.value as any })}
                    className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded font-medium"
                  >
                    <option value="Commercial Broiler">Commercial Broiler</option>
                    <option value="Spent Layer">Spent Layer</option>
                    <option value="Breeder Stock">Breeder Stock</option>
                    <option value="Native & Specialty">Native & Specialty</option>
                    <option value="Other">Other / Future Type</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">ชื่อภาษาไทย *</label>
                  <input
                    type="text"
                    required
                    value={typeForm.nameTh}
                    onChange={e => setTypeForm({ ...typeForm, nameTh: e.target.value })}
                    placeholder="เช่น ไก่บ้าน / ไก่พื้นเมือง (Native)"
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded focus:border-primary font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">ชื่อภาษาอังกฤษ</label>
                  <input
                    type="text"
                    value={typeForm.nameEn}
                    onChange={e => setTypeForm({ ...typeForm, nameEn: e.target.value })}
                    placeholder="e.g. Native Specialty Chicken"
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">นน. เฉลี่ย (kg) *</label>
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={typeForm.defaultAvgWeight}
                    onChange={e => setTypeForm({ ...typeForm, defaultAvgWeight: parseFloat(e.target.value) })}
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">ต้นทุนไก่เป็น (฿/kg)</label>
                  <input
                    type="number"
                    step="0.25"
                    required
                    value={typeForm.defaultLiveCostTHB}
                    onChange={e => setTypeForm({ ...typeForm, defaultLiveCostTHB: parseFloat(e.target.value) })}
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded font-mono text-primary font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">อายุเชือด (วัน)</label>
                  <input
                    type="number"
                    required
                    value={typeForm.slaughterAgeDays}
                    onChange={e => setTypeForm({ ...typeForm, slaughterAgeDays: parseInt(e.target.value) })}
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">คำอธิบายและการใช้งานหลัก</label>
                <textarea
                  rows={3}
                  value={typeForm.description}
                  onChange={e => setTypeForm({ ...typeForm, description: e.target.value })}
                  placeholder="วัตถุประสงค์การเลี้ยง ลักษณะซาก และช่องทางจัดจำหน่ายเป้าหมาย..."
                  className="w-full p-2.5 bg-surface border border-outline-variant rounded focus:border-primary"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-outline-variant">
                <div className="flex items-center gap-2">
                  <label className="font-semibold text-on-surface">สถานะ:</label>
                  <select
                    value={typeForm.status}
                    onChange={e => setTypeForm({ ...typeForm, status: e.target.value as any })}
                    className="h-7 px-2 bg-surface border border-outline-variant rounded text-xs font-bold"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowTypeModal(false)}
                    className="h-8 px-4 font-semibold text-on-surface bg-surface-container hover:bg-surface-container-high rounded cursor-pointer"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="h-8 px-4 font-semibold text-white bg-primary hover:bg-inverse-surface rounded shadow-sm cursor-pointer"
                  >
                    บันทึกข้อมูลประเภทไก่
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD/EDIT YIELD RULE */}
      {showYieldModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-outline-variant rounded-xl max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
              <h3 className="font-headline-sm text-base font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                <span>{editingYield ? 'แก้ไขกฎ Yield' : 'กำหนด Yield ใหม่ (Dynamic Yield Master)'}</span>
              </h3>
              <button 
                onClick={() => setShowYieldModal(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-outline hover:text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveYield} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">ประเภทไก่ *</label>
                  <select
                    value={yieldForm.chickenTypeId}
                    onChange={e => setYieldForm({ ...yieldForm, chickenTypeId: e.target.value })}
                    className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded font-bold text-primary"
                  >
                    {chickenTypes.map(t => (
                      <option key={t.id} value={t.id}>{t.nameTh}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">โรงงาน (Plant) *</label>
                  <select
                    value={yieldForm.plantId}
                    onChange={e => setYieldForm({ ...yieldForm, plantId: e.target.value })}
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
                  <label className="block font-semibold text-on-surface mb-1">ช่วงน้ำหนัก (Weight Range)</label>
                  <select
                    value={yieldForm.weightRangeId}
                    onChange={e => {
                      const sel = e.target.value;
                      const lbl = e.target.options[e.target.selectedIndex].text;
                      setYieldForm({ ...yieldForm, weightRangeId: sel, weightRangeLabel: lbl });
                    }}
                    className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded"
                  >
                    <option value="ALL">ทุกช่วงน้ำหนัก (All Weights)</option>
                    {chickenTypes
                      .find(t => t.id === yieldForm.chickenTypeId)
                      ?.weightRanges.map(wr => (
                        <option key={wr.id} value={wr.id}>{wr.label}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">ระดับการชำแหละ (Level)</label>
                  <select
                    value={yieldForm.conversionLevel}
                    onChange={e => setYieldForm({ ...yieldForm, conversionLevel: e.target.value as any })}
                    className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded"
                  >
                    <option value="L1: Live to Carcass">L1: Live to Carcass (ไก่เป็นสู่ซาก)</option>
                    <option value="L2: Carcass to Main Part">L2: Carcass to Main Part (ซากสู่ชิ้นส่วนใหญ่)</option>
                    <option value="L3: Cut-up to Deboned">L3: Cut-up to Deboned (ตัดแต่ง/เลาะกระดูก)</option>
                    <option value="L4: By-Products">L4: By-Products (ผลพลอยได้)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">วัตถุดิบต้นทาง (Source Product)</label>
                  <input
                    type="text"
                    required
                    value={yieldForm.sourceProduct}
                    onChange={e => setYieldForm({ ...yieldForm, sourceProduct: e.target.value })}
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">ผลผลิตปลายทาง (Output SKU)</label>
                  <input
                    type="text"
                    required
                    value={yieldForm.outputProduct}
                    onChange={e => setYieldForm({ ...yieldForm, outputProduct: e.target.value })}
                    className="w-full h-8 px-3 bg-surface border border-outline-variant rounded font-bold text-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 bg-surface-container-low p-3 rounded-lg border border-outline-variant">
                <div>
                  <label className="block font-bold text-blue-900 mb-1">Yield % เป้าหมาย *</label>
                  <input
                    type="number"
                    step="0.05"
                    required
                    value={yieldForm.yieldPercent}
                    onChange={e => setYieldForm({ ...yieldForm, yieldPercent: parseFloat(e.target.value) })}
                    className="w-full h-8 px-2 bg-surface border border-outline-variant rounded font-mono font-bold text-blue-800 text-center"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Min Yield %</label>
                  <input
                    type="number"
                    step="0.05"
                    value={yieldForm.minYieldPercent}
                    onChange={e => setYieldForm({ ...yieldForm, minYieldPercent: parseFloat(e.target.value) })}
                    className="w-full h-8 px-2 bg-surface border border-outline-variant rounded font-mono text-center"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">Max Yield %</label>
                  <input
                    type="number"
                    step="0.05"
                    value={yieldForm.maxYieldPercent}
                    onChange={e => setYieldForm({ ...yieldForm, maxYieldPercent: parseFloat(e.target.value) })}
                    className="w-full h-8 px-2 bg-surface border border-outline-variant rounded font-mono text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-on-surface mb-1">ต้นทุนมาตรฐาน (฿/kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={yieldForm.standardCostTHBPerKg}
                    onChange={e => setYieldForm({ ...yieldForm, standardCostTHBPerKg: parseFloat(e.target.value) })}
                    className="w-full h-8 px-2 bg-surface border border-outline-variant rounded font-mono text-primary font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">วันที่มีผล (Effective Date)</label>
                  <input
                    type="date"
                    value={yieldForm.effectiveDate}
                    onChange={e => setYieldForm({ ...yieldForm, effectiveDate: e.target.value })}
                    className="w-full h-8 px-2 bg-surface border border-outline-variant rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-on-surface mb-1">เวอร์ชัน (Version)</label>
                  <input
                    type="text"
                    value={yieldForm.version}
                    onChange={e => setYieldForm({ ...yieldForm, version: e.target.value })}
                    className="w-full h-8 px-2 bg-surface border border-outline-variant rounded font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant">
                <button
                  type="button"
                  onClick={() => setShowYieldModal(false)}
                  className="h-8 px-4 font-semibold text-on-surface bg-surface-container hover:bg-surface-container-high rounded cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="h-8 px-4 font-semibold text-white bg-primary hover:bg-inverse-surface rounded shadow-sm cursor-pointer"
                >
                  บันทึกสูตร Yield
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
