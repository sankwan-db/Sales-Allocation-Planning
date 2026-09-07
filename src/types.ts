export type PlanStatus = 'Draft' | 'Submitted' | 'Approved';

export interface IntakePlan {
  id: string;
  date: string;
  farm: string;
  chickenType: string;
  birds: number;
  avgWeight: number;
  status: PlanStatus;
  revision: string;
}

export interface ProductBalance {
  code: string;
  name: string;
  category: string;
  production: number;
  stock: number;
  transfer: number;
  reserved: number;
  safety: number;
  demand: number;
}

export interface AllocationRow extends ProductBalance {
  exportKg: number;
  fscKg: number;
  dmsKg: number;
  coSaleKg: number;
}

export interface SalesAction {
  id: string;
  customer: string;
  owner: string;
  product: string;
  targetKg: number;
  dueDate: string;
  stage: 'Prospect' | 'Follow-up' | 'Quotation' | 'Contract';
}
