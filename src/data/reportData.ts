export interface GlobalFilterState {
  periodType: 'Year' | 'Quarter' | 'Month' | 'Week' | 'Day';
  period: string;
  chickenType: string;
  breed: string;
  plant: string;
  productGroup: string;
  product: string;
  channel: string;
  salesTeam: string;
  salesperson: string;
  customer: string;
  unit: 'KG' | 'MT' | 'THB';
}

export interface ReportPayload {
  kpis: Record<string, string | number>;
  chartData: Record<string, string | number>[];
  chartData2?: Record<string, string | number>[];
  chartTitle?: string;
  chartTitle2?: string;
  rows: Record<string, any>[];
  flowNodes?: { label: string; value: string; detail?: string }[];
  error?: string;
}

export const INITIAL_GLOBAL_FILTERS: GlobalFilterState = {
  periodType: 'Month',
  period: 'Oct 2027',
  chickenType: 'ALL',
  breed: 'ALL',
  plant: 'ALL',
  productGroup: 'ALL',
  product: 'ALL',
  channel: 'ALL',
  salesTeam: 'ALL',
  salesperson: 'ALL',
  customer: 'ALL',
  unit: 'MT'
};

export const PLANT_OPTIONS = [
  { id: 'ALL', name: 'All Plants' },
  { id: 'Plant 01', name: 'Plant 01' },
  { id: 'Plant 02', name: 'Plant 02' }
];

export const SALES_TEAM_OPTIONS = [
  { id: 'ALL', name: 'All Sales Teams' },
  { id: 'EXP-A', name: 'Export Team A' },
  { id: 'FSC-A', name: 'FSC Team A' },
  { id: 'FSC-B', name: 'FSC Team B' },
  { id: 'DMS-A', name: 'DMS Team A' },
  { id: 'MT-A', name: 'Modern Trade Team A' }
];

export const SALESPERSON_OPTIONS = [
  { id: 'ALL', name: 'All Salespersons' },
  { id: 'SP01', name: 'Salesperson A' },
  { id: 'SP02', name: 'Salesperson B' },
  { id: 'SP03', name: 'Salesperson C' },
  { id: 'SP10', name: 'Export Sales A' }
];

export const REPORT_MENU_CATEGORIES = [
  {
    name: 'Planning & Supply',
    shortName: 'PLANNING & SUPPLY',
    reports: [
      { id: 'Annual Plan', icon: 'calendar_month', desc: 'แผนรายปี (Annual Plan)' },
      { id: 'Monthly Replan', icon: 'event_repeat', desc: 'แผนรายเดือน (Monthly Replan)' },
      { id: 'Chicken Intake Plan', icon: 'egg', desc: 'แผนรับไก่เข้าโรงงาน (Intake Plan)' },
      { id: 'Yield', icon: 'percent', desc: 'ประสิทธิภาพยีลด์ (Yield)' },
      { id: 'Demand-Supply', icon: 'balance', desc: 'สมดุลอุปสงค์-อุปทาน' },
      { id: 'Allocation', icon: 'pie_chart', desc: 'การจัดสรรการขาย (Allocation)' }
    ]
  },
  {
    name: 'Sales & CRM',
    shortName: 'SALES & CRM',
    reports: [
      { id: 'Forward Coverage', icon: 'inventory', desc: 'ยอดขายล่วงหน้าเทียบ Allocation' },
      { id: 'Sales Pipeline', icon: 'filter_alt', desc: 'โอกาสการขาย (Pipeline)' },
      { id: 'Quotation', icon: 'request_quote', desc: 'ใบเสนอราคา (Quotation)' },
      { id: 'Contract', icon: 'description', desc: 'สัญญาการขาย (Contract)' },
      { id: 'SO Interface', icon: 'sync_alt', desc: 'สถานะเชื่อมต่อ ERP' }
    ]
  },
  {
    name: 'Inventory & Logistics',
    shortName: 'INVENTORY & LOGISTICS',
    reports: [
      { id: 'Stock Aging', icon: 'schedule', desc: 'อายุสต๊อก (Stock Aging)' },
      { id: 'Stock at Risk', icon: 'warning', desc: 'สินค้าเสี่ยงหมดอายุ (At Risk)' },
      { id: 'Delivery', icon: 'local_shipping', desc: 'การจัดส่ง (Delivery & OTIF)' }
    ]
  },
  {
    name: 'Performance',
    shortName: 'PERFORMANCE',
    reports: [
      { id: 'Plan vs Actual', icon: 'analytics', desc: 'แผนเทียบผลจริง (Plan vs Actual)' },
      { id: 'Forecast Accuracy', icon: 'my_location', desc: 'ความแม่นยำพยากรณ์' },
      { id: 'KPI', icon: 'speed', desc: 'ดัชนีชี้วัด (KPI)' },
      { id: 'Variance', icon: 'difference', desc: 'การวิเคราะห์ส่วนต่าง (Variance)' },
      { id: 'Root Cause', icon: 'psychology', desc: 'การวิเคราะห์สาเหตุ (Root Cause)' }
    ]
  }
];

export function getConnectedTransactionFlow() {
  return {
    chickenType: 'Broiler',
    breed: 'Ross 308',
    birdQty: 800000,
    avgWeightKG: 2.45,
    liveWeightKG: 1960000,
    carcassKG: 1470000,
    breastSupplyKG: 470000,
    fscAllocationKG: 100000,
    fscAKG: 60000,
    salespersonQuotaKG: 35000,
    confirmedSO_KG: 22000,
    weightedPipelineKG: 8000,
    opportunityKG: 10000,
    quotationTHB: 80,
    erpSO: '67281345',
    deliveredKG: 9800
  };
}

function fmtMT(kg: number) {
  return `${(kg / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })} MT`;
}

function fmtPct(value: number, digits = 1) {
  return `${value.toFixed(digits)}%`;
}

function matchesCommon(row: Record<string, any>, f: GlobalFilterState) {
  if (f.chickenType !== 'ALL' && row.chickenTypeId && row.chickenTypeId !== f.chickenType) return false;
  if (f.breed !== 'ALL' && row.breedId && row.breedId !== f.breed) return false;
  if (f.plant !== 'ALL' && row.plant && row.plant !== f.plant) return false;
  if (f.productGroup !== 'ALL' && row.productGroup && row.productGroup !== f.productGroup) return false;
  if (f.product !== 'ALL' && row.product && row.product !== f.product) return false;
  if (f.channel !== 'ALL' && row.channel && row.channel !== f.channel) return false;
  if (f.salesTeam !== 'ALL' && row.salesTeam && row.salesTeam !== f.salesTeam) return false;
  if (f.salesperson !== 'ALL' && row.salespersonId && row.salespersonId !== f.salesperson) return false;
  if (f.customer !== 'ALL' && row.customer && row.customer !== f.customer) return false;
  return true;
}

function getAnnualPlanData(): ReportPayload {
  return {
    kpis: {
      'Annual Sales Plan': '12,500 MT', 'Available Supply': '12,000 MT', 'Demand-Supply Gap': '-500 MT',
      'Required Chicken': '5,000,000 Birds', 'Revenue': '1,250 M THB', 'Confirmed SO': '3,500 MT',
      'SO Coverage': '28%', 'Sales Achievement': '95%'
    },
    chartTitle: 'Monthly Plan vs Supply / Allocation / SO / Actual',
    chartData: [
      { name: 'Jan', MasterPlan: 1000, LatestReplan: 1050, Supply: 1020, Allocation: 1000, SO: 800, Actual: 950 },
      { name: 'Feb', MasterPlan: 1000, LatestReplan: 980, Supply: 950, Allocation: 950, SO: 750, Actual: 900 },
      { name: 'Mar', MasterPlan: 1050, LatestReplan: 1030, Supply: 1010, Allocation: 1010, SO: 830, Actual: 980 }
    ],
    chartTitle2: 'Demand-Supply Gap by Month',
    chartData2: [{ name: 'Jan', Gap: 20 }, { name: 'Feb', Gap: -30 }, { name: 'Mar', Gap: -20 }],
    rows: [
      { productGroup: 'Main Part', product: 'Breast A', chickenType: 'Broiler', jan: 100, feb: 120, mar: 115, annualTotal: 1380, supply: 1420, gap: 40, so: 1150, actual: 1100, achievement: '95.7%' }
    ]
  };
}

function getMonthlyReplanData(): ReportPayload {
  return {
    kpis: { 'Master Plan': '1,000 MT', 'Latest Replan': '1,050 MT', 'Actual': '950 MT', 'Planning Adjustment': '+50 MT', 'Execution Variance': '-100 MT', 'Achievement': '90.5%' },
    chartTitle: 'Master Plan vs Replan vs Actual',
    chartData: [
      { name: 'Breast', Master: 100, Replan: 105, Actual: 102 },
      { name: 'Leg', Master: 120, Replan: 125, Actual: 118 },
      { name: 'Wing', Master: 55, Replan: 52, Actual: 49 }
    ],
    rows: [{ product: 'Breast A', master: 100, previousReplan: 110, latestReplan: 105, actual: 102, planningAdjustment: -5, executionVariance: -3, totalVariance: -8, variancePct: '-7.6%', reasonCode: 'Market Demand', status: 'Approved' }]
  };
}

const intakeRows = [
  { chickenTypeId: 'BROILER', breedId: 'ROSS_308', date: '01 Oct 2027', farm: 'Farm A', chickenType: 'Broiler', breed: 'Ross 308', qty: 800000, weight: 2.45, liveKg: 1960000, plant: 'Plant 01', version: 'V01', status: 'Confirmed' },
  { chickenTypeId: 'LAYER', breedId: 'LOHMANN_BROWN', date: '01 Oct 2027', farm: 'Farm B', chickenType: 'Layer', breed: 'Lohmann Brown', qty: 120000, weight: 1.80, liveKg: 216000, plant: 'Plant 01', version: 'V01', status: 'Confirmed' },
  { chickenTypeId: 'PARENT_STOCK', breedId: 'ROSS_PS', date: '02 Oct 2027', farm: 'Farm C', chickenType: 'PS', breed: 'Ross PS', qty: 50000, weight: 3.20, liveKg: 160000, plant: 'Plant 02', version: 'V01', status: 'Submitted' }
];

function getChickenIntakePlanData(filters: GlobalFilterState): ReportPayload {
  const rows = intakeRows.filter(r => matchesCommon(r, filters));
  const birds = rows.reduce((s, r) => s + r.qty, 0);
  const liveKg = rows.reduce((s, r) => s + r.liveKg, 0);
  const avgWeight = birds ? liveKg / birds : 0;
  return {
    kpis: {
      'Planned Bird Qty': birds.toLocaleString(), 'Planned Live KG': liveKg.toLocaleString(),
      'Average Weight': `${avgWeight.toFixed(2)} KG`, 'Number of Farms': new Set(rows.map(r => r.farm)).size,
      'Supply Change %': '+2.5%', 'Plants Receiving': new Set(rows.map(r => r.plant)).size
    },
    chartTitle: 'Chicken Intake by Type',
    chartData: [
      { name: 'Oct W1', Broiler: rows.filter(r => r.chickenTypeId === 'BROILER').reduce((s, r) => s + r.qty, 0), Layer: rows.filter(r => r.chickenTypeId === 'LAYER').reduce((s, r) => s + r.qty, 0), PS: rows.filter(r => r.chickenTypeId === 'PARENT_STOCK').reduce((s, r) => s + r.qty, 0) }
    ],
    chartTitle2: 'Bird Qty vs Live KG',
    chartData2: [{ name: 'Oct 2027', Birds: birds, LiveKG: liveKg }],
    rows: rows.map(({ chickenTypeId, breedId, ...r }) => r)
  };
}

const yieldRows = [
  { chickenTypeId: 'BROILER', breedId: 'ROSS_308', chickenType: 'Broiler', breed: 'Ross 308', weightRange: '2.20-2.55 kg', plant: 'Plant 01', level: 'L1', sourceProduct: 'Live Chicken', outputProduct: 'Carcass', outputType: 'Carcass', inputQtyKg: 1960000, standardYieldPct: 75.0, minYieldPct: 74.0, maxYieldPct: 76.0, plannedOutputKg: 1470000, actualOutputKg: 1466080 },
  { chickenTypeId: 'BROILER', breedId: 'ROSS_308', chickenType: 'Broiler', breed: 'Ross 308', weightRange: '2.20-2.55 kg', plant: 'Plant 01', level: 'L2', sourceProduct: 'Carcass', outputProduct: 'Breast', outputType: 'Main Part', inputQtyKg: 1466080, standardYieldPct: 24.0, minYieldPct: 23.0, maxYieldPct: 25.0, plannedOutputKg: 352800, actualOutputKg: 350793 },
  { chickenTypeId: 'BROILER', breedId: 'ROSS_308', chickenType: 'Broiler', breed: 'Ross 308', weightRange: '2.20-2.55 kg', plant: 'Plant 01', level: 'L2', sourceProduct: 'Carcass', outputProduct: 'Leg', outputType: 'Main Part', inputQtyKg: 1466080, standardYieldPct: 30.0, minYieldPct: 29.0, maxYieldPct: 31.0, plannedOutputKg: 441000, actualOutputKg: 443489 },
  { chickenTypeId: 'LAYER', breedId: 'LOHMANN_BROWN', chickenType: 'Layer', breed: 'Lohmann Brown', weightRange: '1.60-1.85 kg', plant: 'Plant 01', level: 'L1', sourceProduct: 'Live Chicken', outputProduct: 'Carcass', outputType: 'Carcass', inputQtyKg: 216000, standardYieldPct: 74.0, minYieldPct: 72.5, maxYieldPct: 75.0, plannedOutputKg: 159840, actualOutputKg: 158760 },
  { chickenTypeId: 'PARENT_STOCK', breedId: 'ROSS_PS', chickenType: 'PS', breed: 'Ross PS', weightRange: '3.00-3.80 kg', plant: 'Plant 02', level: 'L1', sourceProduct: 'Live Chicken', outputProduct: 'Carcass', outputType: 'Carcass', inputQtyKg: 160000, standardYieldPct: 76.0, minYieldPct: 74.5, maxYieldPct: 77.5, plannedOutputKg: 121600, actualOutputKg: 121920 },
  { chickenTypeId: 'BROILER', breedId: 'ROSS_308', chickenType: 'Broiler', breed: 'Ross 308', weightRange: '2.20-2.55 kg', plant: 'Plant 01', level: 'L3', sourceProduct: 'Breast', outputProduct: 'Boneless Breast', outputType: 'Special Product', inputQtyKg: 200000, standardYieldPct: 70.0, minYieldPct: 68.5, maxYieldPct: 71.5, plannedOutputKg: 140000, actualOutputKg: 137000 }
];

function getYieldData(filters: GlobalFilterState): ReportPayload {
  const filtered = yieldRows.filter(r => matchesCommon(r, filters));
  const enriched = filtered.map(r => {
    const actualYieldPct = r.inputQtyKg ? (r.actualOutputKg / r.inputQtyKg) * 100 : 0;
    const variancePct = actualYieldPct - r.standardYieldPct;
    const varianceQtyKg = r.actualOutputKg - r.plannedOutputKg;
    const status = actualYieldPct < r.minYieldPct ? 'BELOW STANDARD' : actualYieldPct > r.maxYieldPct ? 'ABOVE STANDARD' : 'NORMAL';
    return { ...r, actualYieldPct, variancePct, varianceQtyKg, status };
  });
  const l1 = enriched.filter(r => r.level === 'L1');
  const liveInput = l1.reduce((s, r) => s + r.inputQtyKg, 0);
  const output = l1.reduce((s, r) => s + r.actualOutputKg, 0);
  const weightedStd = liveInput ? l1.reduce((s, r) => s + r.inputQtyKg * r.standardYieldPct, 0) / liveInput : 0;
  const actualYield = liveInput ? (output / liveInput) * 100 : 0;
  const mainOutput = enriched.filter(r => r.outputType === 'Main Part').reduce((s, r) => s + r.actualOutputKg, 0);
  const specialOutput = enriched.filter(r => r.outputType === 'Special Product').reduce((s, r) => s + r.actualOutputKg, 0);
  return {
    kpis: {
      'Planned Live KG': fmtMT(liveInput), 'Total Output KG': fmtMT(output), 'Standard Yield %': fmtPct(weightedStd),
      'Actual Yield %': fmtPct(actualYield), 'Yield Variance %': fmtPct(actualYield - weightedStd, 2),
      'Main Part Output': fmtMT(mainOutput), 'Special Product Output': fmtMT(specialOutput),
      'Outside Standard': enriched.filter(r => r.status !== 'NORMAL').length
    },
    chartTitle: 'Standard Yield vs Actual Yield',
    chartData: enriched.map(r => ({ name: `${r.chickenType}-${r.outputProduct}`, StandardYield: Number(r.standardYieldPct.toFixed(2)), ActualYield: Number(r.actualYieldPct.toFixed(2)) })),
    chartTitle2: 'Yield Trend',
    chartData2: [
      { name: 'W1', StandardYield: 75.0, ActualYield: 74.4 }, { name: 'W2', StandardYield: 75.0, ActualYield: 74.8 },
      { name: 'W3', StandardYield: 75.0, ActualYield: 75.2 }, { name: 'W4', StandardYield: 75.0, ActualYield: 74.9 }
    ],
    flowNodes: [
      { label: 'Chicken Intake', value: `${(liveInput / 1000).toFixed(1)} MT`, detail: 'Planned/actual live weight entering plant' },
      { label: 'Carcass', value: `${(output / 1000).toFixed(1)} MT`, detail: `Actual weighted yield ${actualYield.toFixed(1)}%` },
      { label: 'Main Parts', value: `${(mainOutput / 1000).toFixed(1)} MT`, detail: 'Breast / Leg / Wing output' },
      { label: 'Special Product', value: `${(specialOutput / 1000).toFixed(1)} MT`, detail: 'Secondary conversion output' }
    ],
    rows: enriched.map(r => ({
      chickenType: r.chickenType, breed: r.breed, weightRange: r.weightRange, plant: r.plant,
      sourceProduct: r.sourceProduct, outputProduct: r.outputProduct, outputType: r.outputType,
      inputQtyKg: r.inputQtyKg, standardYieldPct: fmtPct(r.standardYieldPct), minimumYieldPct: fmtPct(r.minYieldPct), maximumYieldPct: fmtPct(r.maxYieldPct),
      plannedOutputKg: r.plannedOutputKg, actualOutputKg: r.actualOutputKg, actualYieldPct: fmtPct(r.actualYieldPct, 2),
      yieldVariancePct: fmtPct(r.variancePct, 2), varianceQtyKg: Math.round(r.varianceQtyKg), status: r.status
    }))
  };
}

const dsRows = [
  { chickenTypeId: 'BROILER', chickenType: 'Broiler', plant: 'Plant 01', productGroup: 'Main Part', product: 'Breast A', beginningStock: 50000, productionSupply: 450000, transferIn: 0, reservedStock: 20000, safetyStock: 10000, directDemand: 250000, specialRmDemand: 200000, valueAddedRmDemand: 20000 },
  { chickenTypeId: 'BROILER', chickenType: 'Broiler', plant: 'Plant 01', productGroup: 'Main Part', product: 'Leg A', beginningStock: 30000, productionSupply: 510000, transferIn: 5000, reservedStock: 15000, safetyStock: 10000, directDemand: 360000, specialRmDemand: 110000, valueAddedRmDemand: 20000 },
  { chickenTypeId: 'BROILER', chickenType: 'Broiler', plant: 'Plant 01', productGroup: 'Main Part', product: 'Wing A', beginningStock: 12000, productionSupply: 155000, transferIn: 0, reservedStock: 7000, safetyStock: 5000, directDemand: 151000, specialRmDemand: 0, valueAddedRmDemand: 9000 },
  { chickenTypeId: 'LAYER', chickenType: 'Layer', plant: 'Plant 01', productGroup: 'Whole Bird', product: 'Layer Whole', beginningStock: 10000, productionSupply: 180000, transferIn: 0, reservedStock: 5000, safetyStock: 5000, directDemand: 205000, specialRmDemand: 0, valueAddedRmDemand: 0 },
  { chickenTypeId: 'PARENT_STOCK', chickenType: 'PS', plant: 'Plant 02', productGroup: 'Whole Bird', product: 'PS Whole', beginningStock: 5000, productionSupply: 150000, transferIn: 0, reservedStock: 5000, safetyStock: 5000, directDemand: 140000, specialRmDemand: 0, valueAddedRmDemand: 5000 }
];

function demandSupplyStatus(balancePct: number) {
  if (balancePct > 10) return 'EXCESS';
  if (balancePct > 3) return 'SURPLUS';
  if (balancePct >= -3) return 'BALANCED';
  if (balancePct >= -10) return 'TIGHT';
  return 'CRITICAL SHORTAGE';
}

function getDemandSupplyData(filters: GlobalFilterState): ReportPayload {
  const rows = dsRows.filter(r => matchesCommon(r, filters)).map(r => {
    const availableSupply = r.productionSupply + r.beginningStock + r.transferIn - r.reservedStock - r.safetyStock;
    const totalRequirement = r.directDemand + r.specialRmDemand + r.valueAddedRmDemand;
    const balanceQty = availableSupply - totalRequirement;
    const balancePct = totalRequirement === 0 ? (availableSupply === 0 ? 0 : 100) : (balanceQty / totalRequirement) * 100;
    return { ...r, availableSupply, totalRequirement, balanceQty, balancePct, status: demandSupplyStatus(balancePct) };
  });
  const supply = rows.reduce((s, r) => s + r.availableSupply, 0);
  const requirement = rows.reduce((s, r) => s + r.totalRequirement, 0);
  const net = supply - requirement;
  const surplus = rows.filter(r => r.balanceQty > 0).reduce((s, r) => s + r.balanceQty, 0);
  const shortage = Math.abs(rows.filter(r => r.balanceQty < 0).reduce((s, r) => s + r.balanceQty, 0));
  const statuses = ['EXCESS', 'SURPLUS', 'BALANCED', 'TIGHT', 'CRITICAL SHORTAGE'];
  return {
    kpis: {
      'Available Supply': fmtMT(supply), 'Total Requirement': fmtMT(requirement), 'Net Balance': fmtMT(net),
      'Surplus Qty': fmtMT(surplus), 'Shortage Qty': fmtMT(shortage),
      'Balanced Products': rows.filter(r => r.status === 'BALANCED').length,
      'Tight Products': rows.filter(r => r.status === 'TIGHT').length,
      'Critical Shortage': rows.filter(r => r.status === 'CRITICAL SHORTAGE').length
    },
    chartTitle: 'Demand vs Available Supply',
    chartData: rows.map(r => ({ name: r.product, AvailableSupply: Math.round(r.availableSupply / 1000), TotalRequirement: Math.round(r.totalRequirement / 1000) })),
    chartTitle2: 'Product Status Distribution',
    chartData2: statuses.map(s => ({ name: s, Count: rows.filter(r => r.status === s).length })),
    rows: rows.map(r => ({
      productGroup: r.productGroup, product: r.product, chickenType: r.chickenType, plant: r.plant,
      beginningStock: r.beginningStock, productionSupply: r.productionSupply, transferIn: r.transferIn,
      reservedStock: r.reservedStock, safetyStock: r.safetyStock, availableSupply: r.availableSupply,
      directDemand: r.directDemand, specialRmDemand: r.specialRmDemand, valueAddedRmDemand: r.valueAddedRmDemand,
      totalRequirement: r.totalRequirement, balanceQty: r.balanceQty, balancePct: fmtPct(r.balancePct, 2), status: r.status
    }))
  };
}

const allocationRows = [
  { chickenTypeId: 'BROILER', chickenType: 'Broiler', productGroup: 'Main Part', product: 'Breast A', channel: 'Export', salesTeam: 'EXP-A', salespersonId: 'SP10', salesperson: 'Export Sales A', customer: 'Export Customer X', demand: 80000, allocation: 80000, so: 75000, weightedPipeline: 3000, actual: 72000 },
  { chickenTypeId: 'BROILER', chickenType: 'Broiler', productGroup: 'Main Part', product: 'Breast A', channel: 'FSC', salesTeam: 'FSC-A', salespersonId: 'SP01', salesperson: 'Salesperson A', customer: 'Restaurant A', demand: 50000, allocation: 35000, so: 22000, weightedPipeline: 8000, actual: 20000 },
  { chickenTypeId: 'BROILER', chickenType: 'Broiler', productGroup: 'Main Part', product: 'Breast A', channel: 'FSC', salesTeam: 'FSC-A', salespersonId: 'SP02', salesperson: 'Salesperson B', customer: 'Dealer B', demand: 35000, allocation: 25000, so: 18000, weightedPipeline: 5000, actual: 16500 },
  { chickenTypeId: 'BROILER', chickenType: 'Broiler', productGroup: 'Main Part', product: 'Breast A', channel: 'DMS', salesTeam: 'DMS-A', salespersonId: 'SP03', salesperson: 'Salesperson C', customer: 'DMS Customer C', demand: 55000, allocation: 50000, so: 38000, weightedPipeline: 9000, actual: 35000 },
  { chickenTypeId: 'BROILER', chickenType: 'Broiler', productGroup: 'Main Part', product: 'Breast A', channel: 'Other', salesTeam: 'MT-A', salespersonId: 'SP03', salesperson: 'Salesperson C', customer: 'Spot / Other', demand: 30000, allocation: 20000, so: 12000, weightedPipeline: 4000, actual: 10000 }
];

function getAllocationData(filters: GlobalFilterState): ReportPayload {
  const rows = allocationRows.filter(r => matchesCommon(r, filters)).map(r => {
    const remaining = r.allocation - r.so;
    const gap = r.allocation - r.so - r.weightedPipeline;
    const coverage = r.allocation ? (r.so / r.allocation) * 100 : 0;
    const utilization = r.allocation ? (r.actual / r.allocation) * 100 : 0;
    const status = r.so > r.allocation ? 'OVER ALLOCATION' : coverage >= 90 ? 'ON TRACK' : (r.so + r.weightedPipeline >= r.allocation ? 'PIPELINE COVERED' : 'NEED ACTION');
    return { ...r, remaining, gap, coverage, utilization, status };
  });
  const availableSalesSupply = 250000;
  const allocation = rows.reduce((s, r) => s + r.allocation, 0);
  const so = rows.reduce((s, r) => s + r.so, 0);
  const pipeline = rows.reduce((s, r) => s + r.weightedPipeline, 0);
  const actual = rows.reduce((s, r) => s + r.actual, 0);
  const gap = rows.reduce((s, r) => s + Math.max(0, r.gap), 0);
  const unallocated = Math.max(0, availableSalesSupply - allocation);
  return {
    kpis: {
      'Available Sales Supply': fmtMT(availableSalesSupply), 'Approved Allocation': fmtMT(allocation), 'Confirmed SO': fmtMT(so),
      'Remaining Allocation': fmtMT(allocation - so), 'Unallocated Supply': fmtMT(unallocated), 'Weighted Pipeline': fmtMT(pipeline),
      'Sales Gap': fmtMT(gap), 'Allocation Utilization %': fmtPct(allocation ? (actual / allocation) * 100 : 0)
    },
    chartTitle: 'Allocation vs SO vs Actual by Channel',
    chartData: ['Export', 'FSC', 'DMS', 'Other'].map(channel => {
      const rs = rows.filter(r => r.channel === channel);
      return { name: channel, Allocation: Math.round(rs.reduce((s, r) => s + r.allocation, 0) / 1000), SO: Math.round(rs.reduce((s, r) => s + r.so, 0) / 1000), Actual: Math.round(rs.reduce((s, r) => s + r.actual, 0) / 1000) };
    }).filter(r => r.Allocation > 0),
    chartTitle2: 'Sales Gap by Salesperson',
    chartData2: Array.from(new Set(rows.map(r => r.salesperson))).map(person => ({ name: person, Gap: Math.round(rows.filter(r => r.salesperson === person).reduce((s, r) => s + Math.max(0, r.gap), 0) / 1000) })),
    flowNodes: [
      { label: 'Available Sales Supply', value: fmtMT(availableSalesSupply), detail: 'Direct-sale pool after RM reservation' },
      { label: 'Approved Allocation', value: fmtMT(allocation), detail: 'Channel → Team → Salesperson' },
      { label: 'Confirmed SO', value: fmtMT(so), detail: 'Approved/confirmed orders' },
      { label: 'Weighted Pipeline', value: fmtMT(pipeline), detail: 'Opportunity qty × probability' }
    ],
    rows: rows.map(r => ({
      product: r.product, chickenType: r.chickenType, channel: r.channel, team: r.salesTeam, salesperson: r.salesperson,
      customer: r.customer, demand: r.demand, approvedAllocation: r.allocation, confirmedSO: r.so,
      weightedPipeline: r.weightedPipeline, remainingAllocation: r.remaining, salesGap: r.gap,
      soCoveragePct: fmtPct(r.coverage), actualSales: r.actual, allocationUtilizationPct: fmtPct(r.utilization), status: r.status
    }))
  };
}

function getForwardCoverageData(): ReportPayload {
  return {
    kpis: { 'Total Allocation (M)': '1,000 MT', 'Confirmed SO (M)': '800 MT', 'Overall Coverage': '80%', 'Target Coverage M': '100%', 'Target M+1': '75%', 'Target M+2': '50%' },
    chartTitle: 'Actual Coverage vs Target',
    chartData: [{ name: 'M (Oct)', Target: 100, Actual: 80 }, { name: 'M+1 (Nov)', Target: 75, Actual: 60 }, { name: 'M+2 (Dec)', Target: 50, Actual: 45 }],
    rows: [{ month: 'Oct 2027', allocation: 1000, so: 800, coverage: '80%', target: '100%', deviation: '-20%', status: 'Below Target' }, { month: 'Nov 2027', allocation: 1100, so: 660, coverage: '60%', target: '75%', deviation: '-15%', status: 'Below Target' }]
  };
}

function getSalesPipelineData(): ReportPayload {
  return {
    kpis: { 'Allocation': '10,000 MT', 'Pipeline Qty': '15,000 MT', 'Weighted Pipeline': '8,500 MT', 'Pipeline Coverage': '85%', 'Win Rate': '45%', 'Sales Gap': '1,500 MT', 'Overdue Follow-Up': '12 Deals' },
    chartTitle: 'Sales Funnel',
    chartData: [{ name: 'Allocation', Qty: 10000 }, { name: 'Prospect', Qty: 15000 }, { name: 'Opportunity', Qty: 12000 }, { name: 'Quotation', Qty: 8000 }, { name: 'Contract', Qty: 5000 }, { name: 'SO', Qty: 3000 }],
    rows: [{ opportunity: 'OPP-001', stage: 'Opportunity', customer: 'Restaurant A', salesperson: 'Salesperson A', product: 'Breast A', qty: 10000, probability: '80%', weighted: 8000, expectedClose: '15 Oct 2027', nextAction: 'Price negotiation', status: 'Active' }]
  };
}

function getQuotationData(): ReportPayload {
  return {
    kpis: { 'Total Quotations': '145', 'Quote Value': '24.5 M THB', 'Avg Margin': '12.5%', 'Pending Approval': '12', 'Approved': '110', 'Rejected': '23', 'Conversion Rate': '75%' },
    chartData: [],
    rows: [{ quotation: 'QT-001', customer: 'Restaurant A', salesperson: 'Salesperson A', product: 'Breast A', qty: 10000, target: 82, floor: 78, quoted: 80, margin: '10%', status: 'Approved' }]
  };
}

function getContractData(): ReportPayload {
  return {
    kpis: { 'Active Contracts': '45', 'Contract Qty': '5,000 MT', 'SO Qty': '2,500 MT', 'Delivered': '2,000 MT', 'Remaining': '2,500 MT', 'Expiring Contracts': '5' },
    chartData: [], rows: [{ contract: 'CT-001', customer: 'Restaurant A', product: 'Breast A', contractQty: 500, soQty: 250, delivered: 200, remaining: 250, utilization: '50%', endDate: '31 Dec 2027', status: 'Active' }]
  };
}

function getSOInterfaceData(): ReportPayload {
  return {
    kpis: { 'Sent': '1,250', 'Success': '1,240', 'Error': '8', 'Pending': '2', 'Retry': '5', 'Success %': '99.2%' },
    chartData: [], rows: [{ interfaceId: 'INT-001', draft: 'SO-D-01', customer: 'Restaurant A', qty: 10000, time: '09:00', status: 'Success', erpSO: '67281345', retry: 0, error: '-' }, { interfaceId: 'INT-002', draft: 'SO-D-02', customer: 'Dealer B', qty: 15000, time: '09:05', status: 'Error', erpSO: '-', retry: 1, error: 'Customer Credit Hold' }]
  };
}

function getStockAgingData(): ReportPayload {
  return {
    kpis: { 'Total Stock': '4,500 MT', 'Available': '3,200 MT', 'Reserved': '1,000 MT', 'QA Hold': '150 MT', 'At Risk': '100 MT', 'No Order': '50 MT' },
    chartTitle: 'Chill Stock Aging', chartData: [{ name: 'D0', Qty: 500 }, { name: 'D1', Qty: 400 }, { name: 'D2', Qty: 300 }, { name: 'D3', Qty: 200 }, { name: 'D4+', Qty: 100 }],
    chartTitle2: 'Frozen Stock Aging', chartData2: [{ name: '0-30', Qty: 1500 }, { name: '31-60', Qty: 800 }, { name: '61-90', Qty: 500 }, { name: '90+', Qty: 200 }],
    rows: [{ product: 'Breast A', chickenType: 'Broiler', warehouse: 'WH01', lot: 'LOT1010', storage: 'Chill', available: 400000, age: 'D1', shelfLifeRemaining: 6, status: 'Good' }]
  };
}

function getStockAtRiskData(): ReportPayload {
  return {
    kpis: { 'Stock at Risk': '100 MT', 'Critical Lots': 4, 'No Order Qty': '55 MT', 'Expiring ≤ 1 Day': '22 MT', 'High Risk': '45 MT', 'Potential Value': '8.2 M THB' },
    chartTitle: 'Stock at Risk by Product', chartData: [{ name: 'Breast', Qty: 35 }, { name: 'Wing', Qty: 25 }, { name: 'Leg', Qty: 20 }, { name: 'Special', Qty: 20 }],
    rows: [{ product: 'Breast A', lot: 'LOT1008', availableQty: 15000, stockAge: 4, shelfLifeRemaining: 1, noSOQty: 12000, forecastDemand: 6000, riskScore: 88, status: 'CRITICAL', owner: 'FSC Team' }]
  };
}

function getDeliveryData(): ReportPayload {
  return {
    kpis: { 'Ordered': '1,000 MT', 'Loaded': '980 MT', 'Delivered': '950 MT', 'Fill Rate': '98%', 'On-Time': '95%', 'In-Full': '96%', 'OTIF': '92%' },
    chartTitle: 'Delivery Performance', chartData: [{ name: 'W1', FillRate: 98, OTIF: 92 }, { name: 'W2', FillRate: 97, OTIF: 94 }, { name: 'W3', FillRate: 99, OTIF: 95 }],
    rows: [{ so: '67281345', customer: 'Restaurant A', product: 'Breast A', orderQty: 10000, loaded: 9800, delivered: 9800, requestDate: '20 Oct 2027', deliveryDate: '20 Oct 2027', fillRate: '98%', onTime: 'Yes', inFull: 'Yes', otif: 'Yes', delayReason: '-' }]
  };
}

function getPlanVsActualData(): ReportPayload {
  return {
    kpis: { 'Master Plan': '1,000 MT', 'Latest Replan': '1,050 MT', 'Allocation': '1,030 MT', 'SO': '900 MT', 'Actual': '850 MT', 'Achievement': '81.0%' },
    chartTitle: 'Plan → Replan → Allocation → SO → Actual', chartData: [{ name: 'Oct', Master: 1000, Replan: 1050, Allocation: 1030, SO: 900, Actual: 850 }],
    rows: [{ metric: 'Volume (MT)', master: 1000, replan: 1050, allocation: 1030, so: 900, delivery: 850, actual: 850, planningAdjustment: 50, executionVariance: -200, totalVariance: -150, achievement: '81.0%' }]
  };
}

function getForecastAccuracyData(): ReportPayload {
  return {
    kpis: { 'Forecast Accuracy': '91.4%', 'Bias': '+2.1%', 'MAPE': '8.6%', 'Products On Target': '34', 'Products Below 80%': '6', 'Best Channel': 'Export 95%' },
    chartTitle: 'Forecast vs Actual', chartData: [{ name: 'Aug', Forecast: 950, Actual: 930 }, { name: 'Sep', Forecast: 980, Actual: 1000 }, { name: 'Oct', Forecast: 1050, Actual: 1020 }],
    rows: [{ period: 'Oct 2027', product: 'Breast A', forecast: 100000, actual: 95000, error: -5000, absoluteError: 5000, accuracy: '94.7%', bias: '+5.3%', trend: 'Stable' }]
  };
}

function getKPIData(): ReportPayload {
  return {
    kpis: { 'KPIs On Target': '18 / 24', 'Average Achievement': '94.2%', 'Critical KPIs': 2, 'Improved vs Prior': 15 },
    chartTitle: 'KPI Achievement by Group', chartData: [{ name: 'Planning', Achievement: 92 }, { name: 'Allocation', Achievement: 96 }, { name: 'Sales', Achievement: 93 }, { name: 'Delivery', Achievement: 95 }],
    rows: [{ kpi: 'Sales Volume', owner: 'Sales Director', target: 1000, actual: 950, achievement: '95%', score: 'B', trend: 'Up', status: 'Pass' }, { kpi: 'Margin', owner: 'Sales Director', target: '12%', actual: '11.5%', achievement: '95.8%', score: 'B', trend: 'Down', status: 'Pass' }]
  };
}

function getVarianceData(): ReportPayload {
  return {
    kpis: { 'Planning Variance': '+50 MT', 'Execution Variance': '-100 MT', 'Total Variance': '-50 MT', 'Critical Items': 3, 'Variance Value': '-4.8 M THB', 'Root Cause Completed': '72%' },
    chartTitle: 'Variance by Product', chartData: [{ name: 'Breast', Planning: 15, Execution: -25 }, { name: 'Leg', Planning: 20, Execution: -10 }, { name: 'Wing', Planning: -5, Execution: -12 }],
    rows: [{ product: 'Breast A', channel: 'FSC', customer: 'Restaurant A', masterPlan: 100000, latestReplan: 105000, actual: 95000, planningVariance: 5000, executionVariance: -10000, totalVariance: -5000, variancePct: '-5.0%', severity: 'HIGH', rootCauseStatus: 'In Progress' }]
  };
}

function getRootCauseData(): ReportPayload {
  return {
    kpis: { 'Open Issues': 18, 'Critical Issues': 4, 'Overdue Actions': 3, 'Completed Actions': 26, 'Financial Impact': '7.5 M THB' },
    chartTitle: 'Issues by Reason Category', chartData: [{ name: 'Yield', Count: 6 }, { name: 'Demand', Count: 5 }, { name: 'Delivery', Count: 4 }, { name: 'Price', Count: 3 }],
    rows: [{ issue: 'Short Delivery', product: 'Breast A', chickenType: 'Broiler', channel: 'FSC', customer: 'Restaurant A', variance: '-5 MT', impact: 'High', reason: 'Yield Drop', owner: 'Production', action: 'Adjust machine', due: '15 Oct', status: 'Open' }]
  };
}

export function getReportDataByName(reportName: string, filters: GlobalFilterState): ReportPayload {
  switch (reportName) {
    case 'Annual Plan': return getAnnualPlanData();
    case 'Monthly Replan': return getMonthlyReplanData();
    case 'Chicken Intake Plan': return getChickenIntakePlanData(filters);
    case 'Yield': return getYieldData(filters);
    case 'Demand-Supply': return getDemandSupplyData(filters);
    case 'Allocation': return getAllocationData(filters);
    case 'Forward Coverage': return getForwardCoverageData();
    case 'Sales Pipeline': return getSalesPipelineData();
    case 'Quotation': return getQuotationData();
    case 'Contract': return getContractData();
    case 'SO Interface': return getSOInterfaceData();
    case 'Stock Aging': return getStockAgingData();
    case 'Stock at Risk': return getStockAtRiskData();
    case 'Delivery': return getDeliveryData();
    case 'Plan vs Actual': return getPlanVsActualData();
    case 'Forecast Accuracy': return getForecastAccuracyData();
    case 'KPI': return getKPIData();
    case 'Variance': return getVarianceData();
    case 'Root Cause': return getRootCauseData();
    default: return { kpis: {}, chartData: [], rows: [], error: `Report component is not registered: ${reportName}` };
  }
}

function escapeXml(value: any) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function exportReportToExcel(reportName: string, data: ReportPayload, filters: GlobalFilterState) {
  const kpiRows = Object.entries(data.kpis || {}).map(([k, v]) => `<tr><td>${escapeXml(k)}</td><td>${escapeXml(v)}</td></tr>`).join('');
  const columns = data.rows?.length ? Object.keys(data.rows[0]) : [];
  const detailHeader = columns.map(c => `<th>${escapeXml(c)}</th>`).join('');
  const detailRows = (data.rows || []).map(r => `<tr>${columns.map(c => `<td>${escapeXml(r[c])}</td>`).join('')}</tr>`).join('');
  const filterRows = Object.entries(filters).map(([k, v]) => `<tr><td>${escapeXml(k)}</td><td>${escapeXml(v)}</td></tr>`).join('');
  const html = `<!doctype html><html><head><meta charset="utf-8"></head><body>
    <h2>${escapeXml(reportName)} Report</h2><h3>Summary</h3><table border="1">${kpiRows}</table>
    <h3>Detail Data</h3><table border="1"><tr>${detailHeader}</tr>${detailRows}</table>
    <h3>Filter Conditions</h3><table border="1">${filterRows}</table>
    <h3>Metadata</h3><table border="1"><tr><td>Generated At</td><td>${new Date().toLocaleString()}</td></tr><tr><td>Report</td><td>${escapeXml(reportName)}</td></tr></table>
  </body></html>`;
  const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${reportName.replace(/\s+/g, '_')}_${Date.now()}.xls`;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

export function exportReportToPdf(reportName: string, data: ReportPayload, filters: GlobalFilterState) {
  const w = window.open('', '_blank', 'width=1100,height=800');
  if (!w) return;
  const columns = data.rows?.length ? Object.keys(data.rows[0]) : [];
  w.document.write(`<!doctype html><html><head><title>${escapeXml(reportName)}</title><style>
    body{font-family:Arial,sans-serif;padding:24px;color:#1f2937} h1{font-size:22px} .filters{font-size:12px;color:#475569;margin-bottom:16px}
    .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:16px 0}.kpi{border:1px solid #cbd5e1;padding:10px;border-radius:8px}.kpi b{display:block;font-size:16px;margin-top:4px}
    table{width:100%;border-collapse:collapse;font-size:10px}th,td{border:1px solid #cbd5e1;padding:5px;text-align:left}th{background:#e2e8f0}@media print{button{display:none}}
  </style></head><body><h1>${escapeXml(reportName)} Report</h1><div class="filters">${Object.entries(filters).map(([k,v]) => `${escapeXml(k)}: ${escapeXml(v)}`).join(' | ')}</div>
  <div class="kpis">${Object.entries(data.kpis).map(([k,v]) => `<div class="kpi">${escapeXml(k)}<b>${escapeXml(v)}</b></div>`).join('')}</div>
  <table><thead><tr>${columns.map(c => `<th>${escapeXml(c)}</th>`).join('')}</tr></thead><tbody>${data.rows.map(r => `<tr>${columns.map(c => `<td>${escapeXml(r[c])}</td>`).join('')}</tr>`).join('')}</tbody></table>
  <script>window.onload=()=>window.print()</script></body></html>`);
  w.document.close();
}
