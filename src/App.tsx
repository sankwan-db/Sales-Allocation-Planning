import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import ControlTower from './screens/ControlTower';
import PlanningCycle from './screens/PlanningCycle';
import AnnualPlan from './screens/AnnualPlan';
import MonthlyReplan from './screens/MonthlyReplan';
import WeeklyPlan from './screens/WeeklyPlan';
import DailyPlan from './screens/DailyPlan';
import ChickenIntakePlan from './screens/ChickenIntakePlan';
import YieldMaster from './screens/YieldMaster';
import SupplyCalculation from './screens/SupplyCalculation';
import Quotation from './screens/Quotation';
import SalesOrder from './screens/SalesOrder';
import Stock from './screens/Stock';
import Delivery from './screens/Delivery';
import SalesContract from './screens/SalesContract';
import ProductionCapacity from './screens/ProductionCapacity';
import DemandSupplyBalance from './screens/DemandSupplyBalance';
import RawMaterialRequirement from './screens/RawMaterialRequirement';
import ByProductProjection from './screens/ByProductProjection';
import ChannelAllocation from './screens/ChannelAllocation';
import TeamAllocation from './screens/TeamAllocation';
import SalespersonAllocation from './screens/SalespersonAllocation';
import SalesReallocation from './screens/SalesReallocation';
import MySalesActionPlan from './screens/MySalesActionPlan';
import TeamSalesActionPlan from './screens/TeamSalesActionPlan';
import SalesGapPlan from './screens/SalesGapPlan';
import ProspectManagement from './screens/ProspectManagement';
import SalesOpportunity from './screens/SalesOpportunity';
import SalesPipelineBoard from './screens/SalesPipelineBoard';
import CustomerFollowUp from './screens/CustomerFollowUp';
import CreateQuotation from './screens/CreateQuotation';
import PriceValidation from './screens/PriceValidation';
import QuotationApproval from './screens/QuotationApproval';
import QuotationHistory from './screens/QuotationHistory';

import ContractApproval from './screens/ContractApproval';
import ContractBalance from './screens/ContractBalance';
import ContractExpiry from './screens/ContractExpiry';
import SalesOrderDraft from './screens/SalesOrderDraft';
import SOValidation from './screens/SOValidation';
import ERPInterfaceQueue from './screens/ERPInterfaceQueue';
import ERPSalesOrderTracking from './screens/ERPSalesOrderTracking';
import StockOverview from './screens/StockOverview';
import StockAging from './screens/StockAging';
import StockAtRisk from './screens/StockAtRisk';
import DeliveryControl from './screens/DeliveryControl';
import DeliveryPerformance from './screens/DeliveryPerformance';
import PlanVsActual from './screens/PlanVsActual';
import ForecastAccuracy from './screens/ForecastAccuracy';
import SalesPerformance from './screens/SalesPerformance';
import KPIScorecard from './screens/KPIScorecard';
import VarianceAnalysis from './screens/VarianceAnalysis';
import RootCause from './screens/RootCause';
import CorrectiveAction from './screens/CorrectiveAction';
import ScenarioSimulator from './screens/ScenarioSimulator';
import ReportCenter from './screens/ReportCenter';
import ProductMaster from './screens/ProductMaster';
import CustomerMaster from './screens/CustomerMaster';
import ProductTransformation from './screens/ProductTransformation';
import PriceMaster from './screens/PriceMaster';
import AllocationPriorityMaster from './screens/AllocationPriorityMaster';
import PipelineStageMaster from './screens/PipelineStageMaster';
import ReasonCodeMaster from './screens/ReasonCodeMaster';
import UserManagement from './screens/UserManagement';
import ApprovalMatrix from './screens/ApprovalMatrix';
import AuditLog from './screens/AuditLog';
import ChickenTypeBreedMaster from './screens/ChickenTypeBreedMaster';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedReport, setSelectedReport] = useState('Annual Plan');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard': return <Dashboard />;
      case 'control-tower': return <ControlTower />;
      case 'planning-cycle': return <PlanningCycle />;
      case 'annual-plan': return <AnnualPlan />;
      case 'monthly-replan': return <MonthlyReplan />;
      case 'weekly-plan': return <WeeklyPlan />;
      case 'daily-plan': return <DailyPlan />;
      case 'chicken-intake-plan': return <ChickenIntakePlan />;
      case 'yield-master': return <YieldMaster />;
      case 'supply-calculation': return <SupplyCalculation />;
      case 'production-capacity': return <ProductionCapacity />;
      case 'demand-supply-balance': return <DemandSupplyBalance />;
      case 'rm-requirement': return <RawMaterialRequirement />;
      case 'by-product-projection': return <ByProductProjection />;
      case 'channel-allocation': return <ChannelAllocation />;
      case 'team-allocation': return <TeamAllocation />;
      case 'salesperson-allocation': return <SalespersonAllocation />;
      case 'sales-reallocation': return <SalesReallocation />;
      case 'my-sales-action-plan': return <MySalesActionPlan />;
      case 'team-sales-action-plan': return <TeamSalesActionPlan />;
      case 'sales-gap-plan': return <SalesGapPlan />;
      case 'prospect-management': return <ProspectManagement />;
      case 'sales-opportunity': return <SalesOpportunity />;
      case 'sales-pipeline': return <SalesPipelineBoard />;
      case 'customer-follow-up': return <CustomerFollowUp />;
      case 'create-quotation': return <CreateQuotation />;
      case 'price-validation': return <PriceValidation />;
      case 'quotation-approval': return <QuotationApproval />;
      case 'quotation-history': return <QuotationHistory />;
      case 'contract-approval': return <ContractApproval />;
      case 'contract-balance': return <ContractBalance />;
      case 'contract-expiry': return <ContractExpiry />;
      case 'sales-order-draft': return <SalesOrderDraft />;
      case 'so-validation': return <SOValidation />;
      case 'erp-interface': return <ERPInterfaceQueue />;
      case 'erp-so-tracking': return <ERPSalesOrderTracking />;
      case 'stock-overview': return <StockOverview />;
      case 'stock-aging': return <StockAging />;
      case 'stock-at-risk': return <StockAtRisk />;
      case 'delivery-control': return <DeliveryControl />;
      case 'delivery-performance': return <DeliveryPerformance />;
      case 'plan-vs-actual': return <PlanVsActual />;
      case 'forecast-accuracy': return <ForecastAccuracy />;
      case 'sales-performance': return <SalesPerformance />;
      case 'kpi-scorecard': return <KPIScorecard />;
      case 'variance-analysis': return <VarianceAnalysis />;
      case 'root-cause': return <RootCause />;
      case 'corrective-action': return <CorrectiveAction />;
      case 'scenario-simulator': return <ScenarioSimulator />;
      case 'report-center': return <ReportCenter selectedReport={selectedReport} setSelectedReport={setSelectedReport} />;
      case 'product-master': return <ProductMaster />;
      case 'chicken-type-breed-master': return <ChickenTypeBreedMaster />;
      case 'customer-master': return <CustomerMaster />;
      case 'product-transformation': return <ProductTransformation />;
      case 'price-master': return <PriceMaster />;
      case 'allocation-priority-master': return <AllocationPriorityMaster />;
      case 'pipeline-stage-master': return <PipelineStageMaster />;
      case 'reason-code-master': return <ReasonCodeMaster />;
      case 'user-management': return <UserManagement />;
      case 'approval-matrix': return <ApprovalMatrix />;
      case 'audit-log': return <AuditLog />;
      case 'quotation': return <CreateQuotation />;
      case 'sales-contract': return <SalesContract />;
      case 'sales-order': return <SalesOrderDraft />;
      case 'stock': return <StockOverview />;
      case 'delivery': return <DeliveryControl />;
      case 'planning': return <PlanningCycle />;
      case 'supply-yield':
      case 'supply': return <ChickenIntakePlan />;
      case 'balance': return <DemandSupplyBalance />;
      case 'sales-allocation':
      case 'allocation': return <ChannelAllocation />;
      case 'sales-action-plan':
      case 'action-plan': return <MySalesActionPlan />;
      case 'crm': return <ProspectManagement />;
      case 'performance-kpi':
      case 'performance': return <KPIScorecard />;
      case 'scenario-planning':
      case 'scenario': return <ScenarioSimulator />;
      case 'reports': return <ReportCenter selectedReport={selectedReport} setSelectedReport={setSelectedReport} />;
      case 'master-data':
      case 'master': return <ProductMaster />;
      case 'administration':
      case 'admin': return <UserManagement />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout 
      currentScreen={currentScreen} 
      setCurrentScreen={setCurrentScreen}
      selectedReport={selectedReport}
      setSelectedReport={setSelectedReport}
    >
      {renderScreen()}
    </Layout>
  );
}