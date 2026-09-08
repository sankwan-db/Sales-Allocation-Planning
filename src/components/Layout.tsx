import React, { useState } from 'react';
import { 
  GLOBAL_BUSINESS_RULES, 
  CONTINUOUS_WORKFLOW_STAGES, 
  POULTRY_PRODUCTS, 
  POULTRY_CHANNELS, 
  POULTRY_CUSTOMERS 
} from '../data/poultryData';
import { REPORT_MENU_CATEGORIES } from '../data/reportData';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  selectedReport?: string;
  setSelectedReport?: (report: string) => void;
}

export default function Layout({ 
  children, 
  currentScreen, 
  setCurrentScreen,
  selectedReport,
  setSelectedReport
}: LayoutProps) {
  const [planningExpanded, setPlanningExpanded] = useState(true);
  const [supplyExpanded, setSupplyExpanded] = useState(true);
  const [balanceExpanded, setBalanceExpanded] = useState(true);
  const [allocationExpanded, setAllocationExpanded] = useState(true);
  const [actionPlanExpanded, setActionPlanExpanded] = useState(true);
  const [crmExpanded, setCrmExpanded] = useState(true);
  const [quotationExpanded, setQuotationExpanded] = useState(true);
  const [contractExpanded, setContractExpanded] = useState(true);
  const [soExpanded, setSoExpanded] = useState(true);
  const [stockExpanded, setStockExpanded] = useState(true);
  const [deliveryExpanded, setDeliveryExpanded] = useState(true);
  const [performanceExpanded, setPerformanceExpanded] = useState(true);
  const [rootCauseExpanded, setRootCauseExpanded] = useState(true);
  const [scenarioExpanded, setScenarioExpanded] = useState(true);
  const [reportsExpanded, setReportsExpanded] = useState(true);
  const [masterExpanded, setMasterExpanded] = useState(true);
  const [adminExpanded, setAdminExpanded] = useState(true);

  // Business Rules & Workflow Drawer state
  const [rulesDrawerOpen, setRulesDrawerOpen] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState<'rules' | 'workflow' | 'master'>('rules');
  const [rulesSearch, setRulesSearch] = useState('');
  const [rulesDomainFilter, setRulesDomainFilter] = useState('ALL');

  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'แดชบอร์ด (Dashboard)' },
    { id: 'planning', icon: 'calendar_today', label: 'การวางแผน (Planning)', hasSub: 'planning' },
    { id: 'supply-yield', icon: 'precision_manufacturing', label: 'ผลผลิตและยีลด์ (Supply & Yield)', hasSub: 'supply' },
    { id: 'balance', icon: 'balance', label: 'สมดุลความต้องการ (Balance)', hasSub: 'balance' },
    { id: 'sales-allocation', icon: 'pie_chart', label: 'การจัดสรรการขาย (Allocation)', hasSub: 'allocation' },
    { id: 'sales-action-plan', icon: 'assignment_turned_in', label: 'แผนปฏิบัติการขาย (Action Plan)', hasSub: 'action-plan' },
    { id: 'crm', icon: 'group', label: 'ลูกค้าสัมพันธ์ (CRM)', hasSub: 'crm' },
    { id: 'quotation', icon: 'request_quote', label: 'ใบเสนอราคา (Quotation)', hasSub: 'quotation' },
    { id: 'sales-contract', icon: 'contract', label: 'สัญญาซื้อขาย (Contract)', hasSub: 'contract' },
    { id: 'sales-order', icon: 'shopping_cart', label: 'ใบสั่งขาย (Sales Order)', hasSub: 'sales-order' },
    { id: 'stock', icon: 'inventory_2', label: 'สินค้าคงคลัง (Stock)', hasSub: 'stock' },
    { id: 'delivery', icon: 'local_shipping', label: 'การจัดส่ง (Delivery)', hasSub: 'delivery' },
    { id: 'performance-kpi', icon: 'monitoring', label: 'ประสิทธิภาพ (KPI)', hasSub: 'performance' },
    { id: 'root-cause', icon: 'troubleshoot', label: 'วิเคราะห์ปัญหา (Root Cause)', hasSub: 'root-cause' },
    { id: 'scenario-planning', icon: 'account_tree', label: 'สถานการณ์จำลอง (Scenario)', hasSub: 'scenario' },
    { id: 'reports', icon: 'assessment', label: 'รายงาน (Reports)', hasSub: 'reports' },
    { id: 'master-data', icon: 'database', label: 'ข้อมูลหลัก (Master Data)', hasSub: 'master' },
    { id: 'administration', icon: 'admin_panel_settings', label: 'จัดการระบบ (Administration)', hasSub: 'admin' }
  ];

  const planningSubItems = [
    { id: 'planning-cycle', label: 'รอบการวางแผน (Planning Cycle)' },
    { id: 'annual-plan', label: 'แผนประจำปี (Annual Plan)' },
    { id: 'monthly-replan', label: 'ทบทวนแผนรายเดือน (Monthly Replan)' },
    { id: 'weekly-plan', label: 'จัดสรรรายสัปดาห์ (Weekly Plan)' },
    { id: 'daily-plan', label: 'แผนรายวัน (Daily Plan)' },
  ];

  const supplySubItems = [
    { id: 'chicken-intake-plan', label: 'แผนรับไก่เข้าโรงงาน (Chicken Intake Plan)' },
    { id: 'yield-master', label: 'ข้อมูลหลัก Yield (Yield Master)' },
    { id: 'supply-calculation', label: 'คำนวณซัพพลาย (Supply Calc)' },
    { id: 'production-capacity', label: 'กำลังการผลิต (Capacity)' },
  ];

  const balanceSubItems = [
    { id: 'demand-supply-balance', label: 'Demand-Supply Balance' },
    { id: 'rm-requirement', label: 'ความต้องการวัตถุดิบ (RM Req)' },
    { id: 'by-product-projection', label: 'คาดการณ์ By-Product' },
  ];

  const allocationSubItems = [
    { id: 'channel-allocation', label: 'จัดสรรตามช่องทาง (Channel)' },
    { id: 'team-allocation', label: 'จัดสรรระดับทีม (Team)' },
    { id: 'salesperson-allocation', label: 'จัดสรรระดับบุคคล (Salesperson)' },
    { id: 'sales-reallocation', label: 'โอนย้ายโควต้า (Reallocation)' },
  ];

  const actionPlanSubItems = [
    { id: 'my-sales-action-plan', label: 'My Sales Action Plan' },
    { id: 'team-sales-action-plan', label: 'Team Action Plan' },
    { id: 'sales-gap-plan', label: 'Sales Gap & Prospect Plan' },
  ];

  const crmSubItems = [
    { id: 'prospect-management', label: 'Prospect Management' },
    { id: 'sales-opportunity', label: 'Sales Opportunity' },
    { id: 'sales-pipeline', label: 'Sales Pipeline Board' },
    { id: 'customer-follow-up', label: 'Customer Follow-up' },
  ];

  const quotationSubItems = [
    { id: 'create-quotation', label: 'Create Quotation' },
    { id: 'price-validation', label: 'Price Validation' },
    { id: 'quotation-approval', label: 'Approval Inbox' },
    { id: 'quotation-history', label: 'Version History' },
  ];

  const contractSubItems = [
    { id: 'contract-approval', label: 'Contract Approval' },
    { id: 'contract-balance', label: 'Contract Balance' },
    { id: 'contract-expiry', label: 'Expiry Monitoring' },
  ];

  const salesOrderSubItems = [
    { id: 'sales-order-draft', label: 'SO Draft' },
    { id: 'so-validation', label: 'SO Validation' },
    { id: 'erp-interface', label: 'ERP Interface Queue' },
    { id: 'erp-so-tracking', label: 'ERP SO Tracking' },
  ];

  const stockSubItems = [
    { id: 'stock-overview', label: 'Stock Overview' },
    { id: 'stock-aging', label: 'Stock Aging' },
    { id: 'stock-at-risk', label: 'Stock at Risk' },
  ];

  const deliverySubItems = [
    { id: 'delivery-control', label: 'Delivery Control' },
    { id: 'delivery-performance', label: 'Delivery Performance' },
  ];

  const performanceSubItems = [
    { id: 'kpi-scorecard', label: 'KPI Scorecard' },
    { id: 'plan-vs-actual', label: 'Plan vs Actual' },
    { id: 'variance-analysis', label: 'Variance Analysis' },
    { id: 'forecast-accuracy', label: 'Forecast Accuracy' },
    { id: 'sales-performance', label: 'Sales Performance' },
  ];

  const rootCauseSubItems = [
    { id: 'root-cause', label: 'Root Cause Log' },
    { id: 'corrective-action', label: 'Corrective Action' },
  ];

  const scenarioSubItems = [
    { id: 'scenario-simulator', label: 'Scenario Simulator' },
  ];

  const masterSubItems = [
    { id: 'product-master', label: 'Product Master' },
    { id: 'chicken-type-breed-master', label: 'Chicken Type Master' },
    { id: 'customer-master', label: 'Customer Master' },
    { id: 'product-transformation', label: 'Product Transformation' },
    { id: 'price-master', label: 'Price Master' },
    { id: 'allocation-priority-master', label: 'Allocation Priority' },
    { id: 'pipeline-stage-master', label: 'Pipeline Stage' },
    { id: 'reason-code-master', label: 'Reason Code Master' },
  ];

  const adminSubItems = [
    { id: 'user-management', label: 'User & Role Management' },
    { id: 'approval-matrix', label: 'Approval Matrix' },
    { id: 'audit-log', label: 'Audit Log' },
  ];

  return (
    <div className="sape-shell h-screen flex flex-col bg-background text-on-surface overflow-hidden font-body-md antialiased selection:bg-surface-container-high selection:text-on-surface">
      {/* TOP APP BAR */}
      <header className="h-12 w-full px-space-lg flex justify-between items-center z-50 sticky top-0 border-b border-outline-variant bg-surface-container-lowest shadow-sm shrink-0">
        <div className="flex items-center gap-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-on-secondary-fixed text-[22px]">precision_manufacturing</span>
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight hidden md:block">SALES ALLOCATION & PLANNING</span>
          </div>
          <div className="relative w-64 hidden xl:block">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
            <input className="w-full h-8 pl-8 pr-3 text-body-sm font-body-sm bg-surface-container-low border border-outline-variant rounded focus:border-tertiary-container focus:ring-1 focus:ring-tertiary-container placeholder:text-outline" placeholder="Search SKU, Plant, Order..." type="text" />
          </div>
          <nav className="hidden md:flex items-center gap-space-md border-l border-outline-variant pl-space-md">
            <span className="font-label-md text-label-md font-semibold text-primary pb-0.5 border-b-2 border-primary">FY2025 - W42 (Oct 2025)</span>
            <span className="font-label-md text-label-md px-2 py-0.5 bg-surface-container-low text-secondary border border-outline-variant rounded font-medium">V2.4 Approved</span>
          </nav>
        </div>
        <div className="flex items-center gap-space-md">
          {/* 20 Global Business Rules & Continuous Workflow Explorer Button */}
          <button 
            onClick={() => setRulesDrawerOpen(true)}
            className="flex items-center gap-1.5 h-7 px-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded font-label-sm text-label-sm font-bold border border-primary/30 transition-colors shadow-xs"
            title="เปิดตรวจสอบกฎเหล็ก 20 ข้อ (Global Business Rules) และเส้นทาง Workflow ต่อเนื่อง 16 ขั้นตอน"
          >
            <span className="material-symbols-outlined text-[15px] text-primary">verified</span>
            <span className="hidden sm:inline font-semibold">กฎเหล็ก 20 ข้อ & Workflow</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>

          <button className="flex items-center gap-1.5 h-7 px-2.5 bg-error-container text-on-error-container rounded font-label-sm text-label-sm font-bold border border-error/20 hover:bg-error/10 transition-colors">
            <span className="material-symbols-outlined text-[14px]">notifications_active</span>
            <span className="hidden sm:inline">Pending Approvals (5)</span>
          </button>
          <div className="flex items-center gap-1 border-l border-outline-variant pl-space-sm text-on-surface-variant">
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-low transition-colors"><span className="material-symbols-outlined">notifications</span></button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-low transition-colors"><span className="material-symbols-outlined">tune</span></button>
            <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-surface-container-low transition-colors"><span className="material-symbols-outlined">help</span></button>
          </div>
          <div className="flex items-center gap-2 pl-space-sm border-l border-outline-variant">
            <div className="w-7 h-7 rounded-full bg-primary-container text-surface-bright flex items-center justify-center font-bold text-[11px] border border-outline-variant">SP</div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="font-label-sm text-label-sm font-bold text-on-surface leading-tight">Somchai P. (CCO)</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant">Commercial Operations</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside className="w-sidebar-width-expanded flex-shrink-0 bg-surface-container-lowest border-r border-outline-variant flex flex-col justify-between py-space-sm z-40 overflow-y-auto custom-scrollbar">
          <div>
            <div className="px-space-md pb-space-sm mb-space-xs border-b border-outline-variant/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-on-secondary-fixed text-surface-bright flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">egg</span>
                </div>
                <div>
                  <div className="font-headline-sm text-[13px] font-bold text-on-surface tracking-wider">SALES ALLOCATION</div>
                  <div className="font-label-sm text-[10px] text-on-surface-variant -mt-0.5">Planning & Execution</div>
                </div>
              </div>
              <button className="text-outline hover:text-on-surface"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
            </div>

            <nav className="space-y-0.5 px-space-xs">
              {navItems.map(item => {
                const isPlanningSub = item.hasSub === 'planning';
                const isSupplySub = item.hasSub === 'supply';
                const isBalanceSub = item.hasSub === 'balance';
                const isAllocationSub = item.hasSub === 'allocation';
                const isActionPlanSub = item.hasSub === 'action-plan';
                const isCrmSub = item.hasSub === 'crm';
                const isQuotationSub = item.hasSub === 'quotation';
                const isContractSub = item.hasSub === 'contract';
                const isSoSub = item.hasSub === 'sales-order';
                const isStockSub = item.hasSub === 'stock';
                const isDeliverySub = item.hasSub === 'delivery';
                const isPerformanceSub = item.hasSub === 'performance';
                const isRootCauseSub = item.hasSub === 'root-cause';
                const isScenarioSub = item.hasSub === 'scenario';
                const isReportsSub = item.hasSub === 'reports';
                const isMasterSub = item.hasSub === 'master';
                const isAdminSub = item.hasSub === 'admin';

                let isExpanded = false;
                if (isPlanningSub) isExpanded = planningExpanded;
                else if (isSupplySub) isExpanded = supplyExpanded;
                else if (isBalanceSub) isExpanded = balanceExpanded;
                else if (isAllocationSub) isExpanded = allocationExpanded;
                else if (isActionPlanSub) isExpanded = actionPlanExpanded;
                else if (isCrmSub) isExpanded = crmExpanded;
                else if (isQuotationSub) isExpanded = quotationExpanded;
                else if (isContractSub) isExpanded = contractExpanded;
                else if (isSoSub) isExpanded = soExpanded;
                else if (isStockSub) isExpanded = stockExpanded;
                else if (isDeliverySub) isExpanded = deliveryExpanded;
                else if (isPerformanceSub) isExpanded = performanceExpanded;
                else if (isRootCauseSub) isExpanded = rootCauseExpanded;
                else if (isScenarioSub) isExpanded = scenarioExpanded;
                else if (isReportsSub) isExpanded = reportsExpanded;
                else if (isMasterSub) isExpanded = masterExpanded;
                else if (isAdminSub) isExpanded = adminExpanded;

                let isActiveSub = false;
                if (isPlanningSub) isActiveSub = currentScreen.includes('plan') && !currentScreen.includes('farm') && !currentScreen.includes('action') && !currentScreen.includes('gap');
                else if (isSupplySub) isActiveSub = ['chicken-intake-plan', 'yield-master', 'supply-calculation', 'production-capacity'].includes(currentScreen);
                else if (isBalanceSub) isActiveSub = ['demand-supply-balance', 'rm-requirement', 'by-product-projection'].includes(currentScreen);
                else if (isAllocationSub) isActiveSub = currentScreen.includes('allocation');
                else if (isActionPlanSub) isActiveSub = currentScreen.includes('action-plan') || currentScreen === 'sales-gap-plan';
                else if (isCrmSub) isActiveSub = ['prospect-management', 'sales-opportunity', 'sales-pipeline', 'customer-follow-up'].includes(currentScreen);
                else if (isQuotationSub) isActiveSub = currentScreen.includes('quotation') || currentScreen === 'price-validation';
                else if (isContractSub) isActiveSub = currentScreen.includes('contract');
                else if (isSoSub) isActiveSub = currentScreen.includes('so') || currentScreen === 'sales-order-draft' || currentScreen === 'erp-interface';
                else if (isStockSub) isActiveSub = currentScreen.includes('stock');
                else if (isDeliverySub) isActiveSub = currentScreen.includes('delivery');
                else if (isPerformanceSub) isActiveSub = ['plan-vs-actual', 'forecast-accuracy', 'sales-performance', 'kpi-scorecard', 'variance-analysis'].includes(currentScreen);
                else if (isRootCauseSub) isActiveSub = ['root-cause', 'corrective-action'].includes(currentScreen);
                else if (isScenarioSub) isActiveSub = currentScreen === 'scenario-simulator';
                else if (isReportsSub) isActiveSub = currentScreen === 'report-center' || currentScreen === 'reports' || currentScreen.startsWith('report-');
                else if (isMasterSub) isActiveSub = ['product-master', 'customer-master', 'product-transformation', 'price-master', 'allocation-priority-master', 'pipeline-stage-master', 'reason-code-master'].includes(currentScreen);
                else if (isAdminSub) isActiveSub = ['user-management', 'approval-matrix', 'audit-log'].includes(currentScreen);

                return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (isPlanningSub) {
                        if (!isActiveSub) { setCurrentScreen('planning-cycle'); setPlanningExpanded(true); }
                        else setPlanningExpanded(!planningExpanded);
                      } else if (isSupplySub) {
                        if (!isActiveSub) { setCurrentScreen('chicken-intake-plan'); setSupplyExpanded(true); }
                        else setSupplyExpanded(!supplyExpanded);
                      } else if (isBalanceSub) {
                        if (!isActiveSub) { setCurrentScreen('demand-supply-balance'); setBalanceExpanded(true); }
                        else setBalanceExpanded(!balanceExpanded);
                      } else if (isAllocationSub) {
                        if (!isActiveSub) { setCurrentScreen('channel-allocation'); setAllocationExpanded(true); }
                        else setAllocationExpanded(!allocationExpanded);
                      } else if (isActionPlanSub) {
                        if (!isActiveSub) { setCurrentScreen('my-sales-action-plan'); setActionPlanExpanded(true); }
                        else setActionPlanExpanded(!actionPlanExpanded);
                      } else if (isCrmSub) {
                        if (!isActiveSub) { setCurrentScreen('prospect-management'); setCrmExpanded(true); }
                        else setCrmExpanded(!crmExpanded);
                      } else if (isQuotationSub) {
                        if (!isActiveSub) { setCurrentScreen('create-quotation'); setQuotationExpanded(true); }
                        else setQuotationExpanded(!quotationExpanded);
                      } else if (isContractSub) {
                        if (!isActiveSub) { setCurrentScreen('contract-approval'); setContractExpanded(true); }
                        else setContractExpanded(!contractExpanded);
                      } else if (isSoSub) {
                        if (!isActiveSub) { setCurrentScreen('sales-order-draft'); setSoExpanded(true); }
                        else setSoExpanded(!soExpanded);
                      } else if (isStockSub) {
                        if (!isActiveSub) { setCurrentScreen('stock-overview'); setStockExpanded(true); }
                        else setStockExpanded(!stockExpanded);
                      } else if (isDeliverySub) {
                        if (!isActiveSub) { setCurrentScreen('delivery-control'); setDeliveryExpanded(true); }
                        else setDeliveryExpanded(!deliveryExpanded);
                      } else if (isPerformanceSub) {
                        if (!isActiveSub) { setCurrentScreen('kpi-scorecard'); setPerformanceExpanded(true); }
                        else setPerformanceExpanded(!performanceExpanded);
                      } else if (isRootCauseSub) {
                        if (!isActiveSub) { setCurrentScreen('root-cause'); setRootCauseExpanded(true); }
                        else setRootCauseExpanded(!rootCauseExpanded);
                      } else if (isScenarioSub) {
                        if (!isActiveSub) { setCurrentScreen('scenario-simulator'); setScenarioExpanded(true); }
                        else setScenarioExpanded(!scenarioExpanded);
                      } else if (isReportsSub) {
                        if (!isActiveSub) { setCurrentScreen('report-center'); setReportsExpanded(true); }
                        else setReportsExpanded(!reportsExpanded);
                      } else if (isMasterSub) {
                        if (!isActiveSub) { setCurrentScreen('product-master'); setMasterExpanded(true); }
                        else setMasterExpanded(!masterExpanded);
                      } else if (isAdminSub) {
                        if (!isActiveSub) { setCurrentScreen('user-management'); setAdminExpanded(true); }
                        else setAdminExpanded(!adminExpanded);
                      } else {
                        setCurrentScreen(item.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded transition-colors font-label-sm text-label-sm ${
                      (currentScreen === item.id || isActiveSub) 
                        ? 'bg-secondary-container text-on-secondary-fixed font-semibold border-l-4 border-primary' 
                        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[17px]">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {item.hasSub && <span className="material-symbols-outlined text-[16px]">{isExpanded ? 'expand_less' : 'expand_more'}</span>}
                  </button>

                  {item.id === 'dashboard' && (
                     <div className="pl-8 pr-space-sm py-1 mt-0.5 mb-1 bg-surface-container-high rounded border-l-2 border-primary flex items-center justify-between cursor-pointer" onClick={() => setCurrentScreen('control-tower')}>
                       <span className="font-label-sm text-label-sm font-bold text-on-surface">ศูนย์ควบคุม (Control Tower)</span>
                       <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                     </div>
                  )}

                  {isPlanningSub && planningExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {planningSubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {isSupplySub && supplyExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {supplySubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {isBalanceSub && balanceExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {balanceSubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {isAllocationSub && allocationExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {allocationSubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {isActionPlanSub && actionPlanExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {actionPlanSubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {isCrmSub && crmExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {crmSubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {isQuotationSub && quotationExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {quotationSubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {isContractSub && contractExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {contractSubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {isSoSub && soExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {salesOrderSubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {isStockSub && stockExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {stockSubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {isDeliverySub && deliveryExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {deliverySubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {isPerformanceSub && performanceExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {performanceSubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {isRootCauseSub && rootCauseExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {rootCauseSubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {isScenarioSub && scenarioExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {scenarioSubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {isReportsSub && reportsExpanded && (
                    <div className="bg-surface-container-low/70 py-1.5 pl-4 pr-1.5 space-y-2 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {REPORT_MENU_CATEGORIES.map((cat, catIdx) => (
                        <div key={catIdx} className="space-y-0.5">
                          <div className="text-[9.5px] font-bold text-on-surface-variant uppercase tracking-wider px-2 py-0.5 text-primary/80">
                            {cat.shortName || cat.name}
                          </div>
                          <div className="space-y-0.5">
                            {cat.reports.map(rep => {
                              const isSelected = (currentScreen === 'report-center' || currentScreen === 'reports' || currentScreen.startsWith('report-')) && selectedReport === rep.id;
                              return (
                                <button
                                  key={rep.id}
                                  onClick={() => {
                                    if (setSelectedReport) setSelectedReport(rep.id);
                                    setCurrentScreen('report-center');
                                  }}
                                  className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors text-left group cursor-pointer ${
                                    isSelected 
                                      ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/60 shadow-xs' 
                                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                                  }`}
                                  title={rep.desc}
                                >
                                  <div className="flex items-center gap-1.5 truncate">
                                    <span className={`material-symbols-outlined text-[14px] shrink-0 ${isSelected ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}>
                                      {rep.icon}
                                    </span>
                                    <span className="truncate">{rep.id}</span>
                                  </div>
                                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {isMasterSub && masterExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {masterSubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}

                  {isAdminSub && adminExpanded && (
                    <div className="bg-surface-container-low/70 py-1 pl-7 pr-2 space-y-0.5 border-l-2 border-primary/20 ml-3 mt-0.5">
                      {adminSubItems.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setCurrentScreen(sub.id)}
                          className={`w-full flex items-center justify-between px-2 py-1 rounded font-label-sm text-[11px] transition-colors ${
                            currentScreen === sub.id 
                              ? 'bg-surface-container-lowest font-semibold text-primary border border-outline-variant/40 shadow-xs' 
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                          }`}
                        >
                          <span>{sub.label}</span>
                          {currentScreen === sub.id && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )})}
            </nav>
          </div>

          <div className="px-space-xs pt-space-xs border-t border-outline-variant/60 space-y-0.5 mt-4">
            <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-colors font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[17px]">settings</span>
              <span>ตั้งค่าระบบ (System Settings)</span>
            </button>
            <div className="px-3 py-1 text-[10px] text-outline flex items-center justify-between mt-2">
              <span>v2.4.11-enterprise</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT CANVAS */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-surface custom-scrollbar relative">
          {children}
        </main>
      </div>

      {/* 20 GLOBAL BUSINESS RULES & CONTINUOUS WORKFLOW SLIDE-OVER DRAWER */}
      {rulesDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end transition-opacity">
          <div className="w-full max-w-4xl bg-surface-container-lowest h-full shadow-2xl flex flex-col border-l border-outline-variant animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">policy</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface flex items-center gap-2">
                    <span>GLOBAL BUSINESS RULES & WORKFLOW NAVIGATOR</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">20 Rules Enforced</span>
                  </h2>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    กฎเหล็กควบคุมกระบวนการขาย โควตา และการดำเนินงานตามมาตรฐานธุรกิจไก่ครบวงจร
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setRulesDrawerOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Tab Selector */}
            <div className="flex border-b border-outline-variant px-6 bg-surface-container-lowest shrink-0">
              <button
                onClick={() => setActiveDrawerTab('rules')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
                  activeDrawerTab === 'rules'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">gavel</span>
                <span>กฎเหล็ก 20 ข้อ (20 Business Rules)</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-primary/10 text-primary font-bold">20</span>
              </button>

              <button
                onClick={() => setActiveDrawerTab('workflow')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
                  activeDrawerTab === 'workflow'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">account_tree</span>
                <span>เส้นทาง Workflow ต่อเนื่อง 16 ขั้นตอน (Continuous Flow)</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800 font-bold">16</span>
              </button>

              <button
                onClick={() => setActiveDrawerTab('master')}
                className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
                  activeDrawerTab === 'master'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                <span>ข้อมูลหลักธุรกิจไก่ (8 Products / 7 Channels)</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-surface-container-low/30">
              {/* TAB 1: 20 BUSINESS RULES */}
              {activeDrawerTab === 'rules' && (
                <div className="space-y-4">
                  {/* Filters */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest p-3 rounded-lg border border-outline-variant">
                    <div className="relative flex-1 min-w-[200px]">
                      <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-outline text-[16px]">search</span>
                      <input 
                        type="text"
                        value={rulesSearch}
                        onChange={(e) => setRulesSearch(e.target.value)}
                        placeholder="ค้นหากฎเหล็ก (ชื่อ, เงื่อนไข, สูตร, โดเมน)..."
                        className="w-full h-8 pl-8 pr-3 text-xs bg-surface-container-low border border-outline-variant rounded focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-on-surface-variant font-medium">Domain:</span>
                      <select 
                        value={rulesDomainFilter}
                        onChange={(e) => setRulesDomainFilter(e.target.value)}
                        className="h-8 px-2.5 text-xs bg-surface-container-low border border-outline-variant rounded focus:outline-none focus:border-primary font-medium cursor-pointer"
                      >
                        <option value="ALL">ทุกกลุ่ม (All Domains)</option>
                        <option value="Planning">Planning (BR-01, BR-02)</option>
                        <option value="Allocation">Allocation (BR-03, BR-04, BR-05)</option>
                        <option value="Action Plan">Action Plan (BR-06)</option>
                        <option value="CRM">CRM & Opportunity (BR-07, BR-08)</option>
                        <option value="Quotation">Quotation (BR-09, BR-10)</option>
                        <option value="Contract & SO">Contract & SO (BR-11, BR-12)</option>
                        <option value="ERP Integration">ERP Integration (BR-13, BR-14)</option>
                        <option value="Inventory">Inventory (BR-15)</option>
                        <option value="Governance">Governance (BR-16)</option>
                        <option value="Performance & KPI">Performance & KPI (BR-17, BR-20)</option>
                        <option value="CAPA">CAPA (BR-18)</option>
                        <option value="Audit & Compliance">Audit & Compliance (BR-19)</option>
                      </select>
                    </div>
                  </div>

                  {/* Rules List */}
                  <div className="space-y-3">
                    {GLOBAL_BUSINESS_RULES
                      .filter(r => {
                        const matchSearch = rulesSearch === '' || 
                          r.ruleTitleTh.toLowerCase().includes(rulesSearch.toLowerCase()) ||
                          r.ruleTitleEn.toLowerCase().includes(rulesSearch.toLowerCase()) ||
                          r.code.toLowerCase().includes(rulesSearch.toLowerCase()) ||
                          r.validationFormula.toLowerCase().includes(rulesSearch.toLowerCase());
                        const matchDomain = rulesDomainFilter === 'ALL' || r.domain.toLowerCase().includes(rulesDomainFilter.toLowerCase());
                        return matchSearch && matchDomain;
                      })
                      .map(rule => (
                        <div key={rule.id} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 shadow-xs hover:border-primary/50 transition-all">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-primary/10 text-primary border border-primary/20">
                                {rule.code}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                rule.severity === 'BLOCKING' 
                                  ? 'bg-red-100 text-red-800 border border-red-300' 
                                  : rule.severity === 'WORKFLOW_GATED'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : rule.severity === 'AUDIT_ENFORCED'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                  : 'bg-purple-100 text-purple-800 border border-purple-300'
                              }`}>
                                {rule.severity}
                              </span>
                              <span className="text-[11px] text-on-surface-variant font-medium bg-surface-container px-2 py-0.5 rounded">
                                {rule.domain}
                              </span>
                            </div>
                            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              <span className="material-symbols-outlined text-[14px]">check_circle</span>
                              Enforced
                            </span>
                          </div>

                          <div className="mt-2.5">
                            <h3 className="text-sm font-bold text-on-surface">{rule.ruleTitleTh}</h3>
                            <p className="text-xs text-on-surface-variant font-sans mt-0.5 italic">{rule.ruleTitleEn}</p>
                          </div>

                          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 bg-surface-container-low p-2.5 rounded border border-outline-variant/50 text-xs">
                            <div>
                              <div className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Validation Logic / Formula:</div>
                              <code className="font-mono text-[11px] text-primary font-bold block mt-0.5 bg-surface-container-lowest p-1 rounded border border-outline-variant/40">
                                {rule.validationFormula}
                              </code>
                            </div>
                            <div>
                              <div className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Enforcement Mechanism:</div>
                              <div className="text-[11px] text-on-surface mt-0.5 font-medium leading-tight">
                                {rule.enforcementMechanism}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 flex justify-end">
                            <button
                              onClick={() => {
                                setRulesDrawerOpen(false);
                                // Map rule to primary screen
                                if (rule.id === 1 || rule.id === 2) setCurrentScreen('monthly-replan');
                                else if (rule.id === 3) setCurrentScreen('channel-allocation');
                                else if (rule.id === 4) setCurrentScreen('team-allocation');
                                else if (rule.id === 5) setCurrentScreen('salesperson-allocation');
                                else if (rule.id === 6) setCurrentScreen('sales-gap-plan');
                                else if (rule.id === 7) setCurrentScreen('sales-opportunity');
                                else if (rule.id === 8) setCurrentScreen('sales-pipeline');
                                else if (rule.id === 9) setCurrentScreen('price-validation');
                                else if (rule.id === 10) setCurrentScreen('create-quotation');
                                else if (rule.id === 11) setCurrentScreen('contract-approval');
                                else if (rule.id === 12) setCurrentScreen('so-validation');
                                else if (rule.id === 13) setCurrentScreen('erp-interface');
                                else if (rule.id === 14) setCurrentScreen('erp-so-tracking');
                                else if (rule.id === 15) setCurrentScreen('stock-overview');
                                else if (rule.id === 16) setCurrentScreen('reason-code-master');
                                else if (rule.id === 17) setCurrentScreen('variance-analysis');
                                else if (rule.id === 18) setCurrentScreen('corrective-action');
                                else if (rule.id === 19) setCurrentScreen('audit-log');
                                else if (rule.id === 20) setCurrentScreen('dashboard');
                              }}
                              className="px-3 py-1 bg-primary text-white hover:bg-primary-container text-xs font-semibold rounded flex items-center gap-1.5 transition-colors shadow-xs"
                            >
                              <span>เปิดหน้าจอบังคับใช้กฎนี้</span>
                              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB 2: 16 CONTINUOUS WORKFLOW STAGES */}
              {activeDrawerTab === 'workflow' && (
                <div className="space-y-3">
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3.5 flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[22px] mt-0.5">timeline</span>
                    <div>
                      <h3 className="text-xs font-bold text-primary">กระบวนการเชื่อมโยงต่อเนื่องระดับองค์กร (End-to-End Continuous Workflow)</h3>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">
                        ทุกขั้นตอนส่งต่อข้อมูลเชื่อมโยงกันอย่างสมบูรณ์ ตั้งแต่วางแผนรับไก่หน้าฟาร์ม คำนวณซัพพลายตามยิลด์ สู่การจัดสรรโควตา เสนอราคา ทำสัญญา ส่ง Oracle ERP จนถึงตรวจจับ Variance และแก้ไขด้วย CAPA
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-primary/30">
                    {CONTINUOUS_WORKFLOW_STAGES.map(stage => (
                      <div key={stage.step} className="relative bg-surface-container-lowest border border-outline-variant rounded-lg p-3.5 shadow-xs hover:border-primary transition-all">
                        {/* Circle step badge */}
                        <div className="absolute -left-[27px] top-4 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold text-[10px] ring-4 ring-surface-container-low">
                          {stage.step}
                        </div>

                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-on-surface">{stage.nameTh}</h4>
                              <span className="text-[10px] text-on-surface-variant font-normal">({stage.nameEn})</span>
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
                              <span className="text-on-surface-variant font-medium">Entity:</span>
                              <span className="font-semibold text-on-surface bg-surface-container px-1.5 py-0.5 rounded">{stage.keyEntity}</span>
                              <span className="text-outline">|</span>
                              <span className="text-on-surface-variant font-medium">Sample:</span>
                              <span className="font-mono text-primary font-bold">{stage.sampleRecord}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setRulesDrawerOpen(false);
                              setCurrentScreen(stage.screenId);
                            }}
                            className="px-2.5 py-1 bg-surface-container hover:bg-primary hover:text-white text-on-surface text-[11px] font-semibold rounded border border-outline-variant hover:border-primary flex items-center gap-1 transition-all shrink-0"
                          >
                            <span>เปิดขั้นตอน {stage.step}</span>
                            <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                          </button>
                        </div>

                        <div className="mt-2 pt-2 border-t border-outline-variant/40 flex items-center gap-1.5 text-[10px] text-on-surface-variant">
                          <span className="material-symbols-outlined text-[13px] text-emerald-600">verified</span>
                          <span className="font-bold text-on-surface">กฎที่ใช้กำกับ:</span>
                          <span>{stage.businessRuleApplied}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: POULTRY MASTER DATA (8 PRODUCTS & 7 CHANNELS) */}
              {activeDrawerTab === 'master' && (
                <div className="space-y-5">
                  {/* Products */}
                  <div>
                    <h3 className="text-xs font-bold text-on-surface mb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[16px]">inventory_2</span>
                      <span>8 รายการสินค้าสัตว์ปีกหลัก (8 Specified Poultry SKUs)</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {POULTRY_PRODUCTS.map(p => (
                        <div key={p.code} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 shadow-xs">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-on-surface">{p.nameTh}</span>
                                <span className="text-[10px] px-1.5 py-0.2 bg-surface-container rounded font-mono text-on-surface-variant">{p.code}</span>
                              </div>
                              <div className="text-[11px] text-on-surface-variant italic">{p.nameEn}</div>
                            </div>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                              Yield {p.yieldPercent}%
                            </span>
                          </div>
                          <div className="mt-2.5 pt-2 border-t border-outline-variant/40 flex items-center justify-between text-xs">
                            <div>
                              <span className="text-[10px] text-on-surface-variant">Floor Price: </span>
                              <span className="font-bold text-red-700 font-mono">฿{p.floorPrice.toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-on-surface-variant">Target Price: </span>
                              <span className="font-bold text-emerald-700 font-mono">฿{p.targetPrice.toFixed(2)}</span>
                            </div>
                            <div className="text-[10px] text-on-surface-variant">
                              อายุ {p.shelfLifeDays} วัน
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Channels */}
                  <div>
                    <h3 className="text-xs font-bold text-on-surface mb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[16px]">storefront</span>
                      <span>7 ช่องทางการจัดจำหน่าย (7 Specified Poultry Channels)</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {POULTRY_CHANNELS.map(ch => (
                        <div key={ch.code} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-3 shadow-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-on-surface">{ch.nameTh}</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                              เป้าส่วนแบ่ง {ch.targetSharePercent}%
                            </span>
                          </div>
                          <div className="text-[11px] text-on-surface-variant italic mt-0.5">{ch.nameEn}</div>
                          <div className="text-[11px] text-on-surface-variant mt-1.5 bg-surface-container-low p-1.5 rounded">
                            {ch.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sample Customers */}
                  <div>
                    <h3 className="text-xs font-bold text-on-surface mb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[16px]">group</span>
                      <span>ลูกค้ารายสำคัญจำลอง (Enterprise Customer Portfolio)</span>
                    </h3>
                    <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-xs">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-surface-container-low border-b border-outline-variant text-[11px] text-on-surface-variant font-semibold">
                            <th className="p-2">Code</th>
                            <th className="p-2">ชื่อลูกค้า (ไทย/อังกฤษ)</th>
                            <th className="p-2">ช่องทาง</th>
                            <th className="p-2">ระดับ Tier</th>
                            <th className="p-2 text-right">วงเงินเครดิต (THB)</th>
                            <th className="p-2">เทอมการชำระ</th>
                            <th className="p-2">ผู้ดูแล</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/50">
                          {POULTRY_CUSTOMERS.slice(0, 8).map(c => (
                            <tr key={c.code} className="hover:bg-surface-container-low/50">
                              <td className="p-2 font-mono font-bold text-primary">{c.code}</td>
                              <td className="p-2">
                                <div className="font-bold text-on-surface">{c.nameTh}</div>
                                <div className="text-[10px] text-on-surface-variant">{c.nameEn}</div>
                              </td>
                              <td className="p-2">
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-surface-container font-medium">
                                  {c.channel}
                                </span>
                              </td>
                              <td className="p-2 font-bold text-[11px]">{c.tier}</td>
                              <td className="p-2 text-right font-mono font-semibold">
                                ฿{(c.creditLimitTHB / 1000000).toFixed(1)}M
                              </td>
                              <td className="p-2 text-[11px]">{c.paymentTerm}</td>
                              <td className="p-2 text-[11px] text-on-surface-variant">{c.assignedSalesperson}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="px-6 py-3 border-t border-outline-variant bg-surface-container-low flex items-center justify-between shrink-0 text-xs">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-[15px] text-emerald-600">verified_user</span>
                <span>ระบบบังคับใช้กฎแบบ Real-time พร้อม Audit Log ทุกธุรกรรม</span>
              </div>
              <button
                onClick={() => setRulesDrawerOpen(false)}
                className="px-4 py-1.5 bg-secondary text-white font-semibold rounded hover:bg-on-surface transition-colors"
              >
                ปิดหน้าต่าง (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
