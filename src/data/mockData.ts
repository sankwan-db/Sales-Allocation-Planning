import type { AllocationRow, IntakePlan, SalesAction } from '../types';

export const intakePlans: IntakePlan[] = [
  { id: 'IN-260901', date: '2026-09-08', farm: 'ฟาร์มปากช่อง 1', chickenType: 'Broiler', birds: 42500, avgWeight: 2.45, status: 'Approved', revision: 'REV.01' },
  { id: 'IN-260902', date: '2026-09-09', farm: 'ฟาร์มสระบุรี 2', chickenType: 'Broiler', birds: 41000, avgWeight: 2.43, status: 'Submitted', revision: 'REV.00' },
  { id: 'IN-260903', date: '2026-09-10', farm: 'ฟาร์มลพบุรี 1', chickenType: 'Layer', birds: 8600, avgWeight: 1.72, status: 'Draft', revision: 'REV.00' },
  { id: 'IN-260904', date: '2026-09-11', farm: 'ฟาร์มปากช่อง 2', chickenType: 'PS', birds: 4200, avgWeight: 3.18, status: 'Approved', revision: 'REV.02' },
];

export const allocationRows: AllocationRow[] = [
  { code: 'FG-BL-001', name: 'อกไก่ไม่มีกระดูก', category: 'BL', production: 31800, stock: 6400, transfer: 0, reserved: 4200, safety: 2400, demand: 34600, exportKg: 13200, fscKg: 9200, dmsKg: 6100, coSaleKg: 3100 },
  { code: 'FG-BB-014', name: 'น่องสะโพกติดกระดูก', category: 'BB', production: 28400, stock: 3900, transfer: 1200, reserved: 2800, safety: 1800, demand: 27100, exportKg: 7500, fscKg: 8400, dmsKg: 5700, coSaleKg: 3700 },
  { code: 'FG-FL-007', name: 'ปีกกลาง', category: 'FL', production: 10600, stock: 2800, transfer: 0, reserved: 1400, safety: 900, demand: 11900, exportKg: 3600, fscKg: 3100, dmsKg: 2700, coSaleKg: 1500 },
  { code: 'FG-WC-021', name: 'ไก่เบิ้มสมุนไพร', category: 'Whole', production: 9800, stock: 1200, transfer: 400, reserved: 900, safety: 600, demand: 10400, exportKg: 0, fscKg: 2800, dmsKg: 5200, coSaleKg: 1900 },
  { code: 'FG-OF-032', name: 'ตับไก่สมุนไพร', category: 'Offal', production: 4200, stock: 1600, transfer: 0, reserved: 600, safety: 400, demand: 3900, exportKg: 500, fscKg: 900, dmsKg: 1800, coSaleKg: 800 },
];

export const salesActions: SalesAction[] = [
  { id: 'ACT-00128', customer: 'บริษัท โกลบอลฟู้ด จำกัด', owner: 'ศิริพร', product: 'อกไก่ไม่มีกระดูก', targetKg: 3200, dueDate: '2026-09-09', stage: 'Quotation' },
  { id: 'ACT-00129', customer: 'ร้านข้าวมันไก่เฮงเฮง', owner: 'กมลชนก', product: 'ตับไก่สมุนไพร', targetKg: 850, dueDate: '2026-09-10', stage: 'Follow-up' },
  { id: 'ACT-00130', customer: 'Fresh Market Group', owner: 'ธนภัทร', product: 'น่องสะโพกติดกระดูก', targetKg: 2400, dueDate: '2026-09-12', stage: 'Contract' },
  { id: 'ACT-00131', customer: 'Eastern Grill Supply', owner: 'วรัญญา', product: 'ปีกกลาง', targetKg: 1400, dueDate: '2026-09-14', stage: 'Prospect' },
];
