// Centralized Enterprise Mock Data & Business Rules Engine for Poultry Business (ธุรกิจไก่)
// Aligned with Global Business Rules & Continuous Workflow

export interface Product {
  code: string;
  nameTh: string;
  nameEn: string;
  category: 'Fresh' | 'Frozen' | 'Processed' | 'Cooked' | 'By-Product';
  yieldPercent: number; // e.g. 21.5%
  floorPrice: number; // THB / kg (Strict rule: Quote below Floor Price CANNOT auto approve)
  targetPrice: number; // THB / kg
  uom: string; // 'kg' or 'MT'
  shelfLifeDays: number;
}

export interface Channel {
  code: string;
  nameTh: string;
  nameEn: string;
  priorityTier: number; // 1 = Highest (Export), 2 = Industry, etc.
  targetSharePercent: number;
  description: string;
}

export interface Customer {
  code: string;
  nameTh: string;
  nameEn: string;
  channel: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3' | 'Tier 4';
  creditLimitTHB: number;
  paymentTerm: string;
  assignedSalesperson: string;
  status: 'ACTIVE' | 'ON_HOLD' | 'INACTIVE';
}

// 8 SPECIFIED POULTRY PRODUCTS
export const POULTRY_PRODUCTS: Product[] = [
  {
    code: 'SKU-0101',
    nameTh: 'อกไก่',
    nameEn: 'Chicken Breast (Fresh/Frozen)',
    category: 'Fresh',
    yieldPercent: 21.5,
    floorPrice: 75.0,
    targetPrice: 88.0,
    uom: 'kg',
    shelfLifeDays: 7
  },
  {
    code: 'SKU-0102',
    nameTh: 'น่องติดสะโพก',
    nameEn: 'Chicken Leg Quarter (CLQ)',
    category: 'Fresh',
    yieldPercent: 31.0,
    floorPrice: 58.0,
    targetPrice: 68.0,
    uom: 'kg',
    shelfLifeDays: 7
  },
  {
    code: 'SKU-0103',
    nameTh: 'ปีก (ปีกบน/ปีกกลาง/ปลายปีก)',
    nameEn: 'Chicken Wings (Drumette/Mid-Wing/Tip)',
    category: 'Fresh',
    yieldPercent: 9.2,
    floorPrice: 120.0,
    targetPrice: 145.0,
    uom: 'kg',
    shelfLifeDays: 7
  },
  {
    code: 'SKU-0104',
    nameTh: 'อกไก่เลาะกระดูก',
    nameEn: 'Boneless Skinless Breast Meat (BBLM)',
    category: 'Frozen',
    yieldPercent: 16.5,
    floorPrice: 110.0,
    targetPrice: 128.0,
    uom: 'kg',
    shelfLifeDays: 365
  },
  {
    code: 'SKU-0105',
    nameTh: 'หนังไก่',
    nameEn: 'Chicken Skin',
    category: 'Fresh',
    yieldPercent: 6.8,
    floorPrice: 38.0,
    targetPrice: 46.0,
    uom: 'kg',
    shelfLifeDays: 5
  },
  {
    code: 'SKU-0106',
    nameTh: 'เนื้อ trim (Trimming / MDM)',
    nameEn: 'Trimming Meat / Mechanically Deboned',
    category: 'Processed',
    yieldPercent: 5.5,
    floorPrice: 48.0,
    targetPrice: 58.0,
    uom: 'kg',
    shelfLifeDays: 180
  },
  {
    code: 'SKU-0107',
    nameTh: 'ไก่หมัก (พริกไทยดำ/การ์ลิค)',
    nameEn: 'Marinated Chicken Cutlet',
    category: 'Processed',
    yieldPercent: 18.0,
    floorPrice: 105.0,
    targetPrice: 125.0,
    uom: 'kg',
    shelfLifeDays: 180
  },
  {
    code: 'SKU-0108',
    nameTh: 'Yakitori (ยากิโทริ)',
    nameEn: 'Yakitori Skewered Chicken (Tokyo Spec)',
    category: 'Cooked',
    yieldPercent: 14.0,
    floorPrice: 155.0,
    targetPrice: 185.0,
    uom: 'kg',
    shelfLifeDays: 365
  }
];

// 7 SPECIFIED CHANNELS
export const POULTRY_CHANNELS: Channel[] = [
  {
    code: 'CH-EXP',
    nameTh: 'Export (ส่งออก)',
    nameEn: 'Export (Japan, EU, UK, Middle East)',
    priorityTier: 1,
    targetSharePercent: 32.0,
    description: 'ลูกค้าสัญญาพรีเมียม สเปกเข้มงวด มาร์จิ้นสูงสุด'
  },
  {
    code: 'CH-IND',
    nameTh: 'Industry (โรงงานแปรรูปอาหาร)',
    nameEn: 'Food Industry & Processing',
    priorityTier: 2,
    targetSharePercent: 24.0,
    description: 'โรงงานไส้กรอก ลูกชิ้น อาหารกึ่งสำเร็จรูป วอลลุ่มสูงสม่ำเสมอ'
  },
  {
    code: 'CH-HORECA',
    nameTh: 'HoReCa (โรงแรม ภัตตาคาร จัดเลี้ยง)',
    nameEn: 'Hotel, Restaurant & Catering Chain',
    priorityTier: 3,
    targetSharePercent: 18.0,
    description: 'เครือข่ายร้านอาหารชั้นนำ ไก่ทอด ชาบู และโรงแรม'
  },
  {
    code: 'CH-MT',
    nameTh: 'Modern Trade (ห้างค้าปลีกสมัยใหม่)',
    nameEn: 'Modern Trade Hypermarket & Supermarket',
    priorityTier: 4,
    targetSharePercent: 14.0,
    description: 'ไฮเปอร์มาร์เก็ต ซูเปอร์มาร์เก็ต และร้านสะดวกซื้อระดับประเทศ'
  },
  {
    code: 'CH-LM',
    nameTh: 'Local Market (ตลาดสด / ยี่ปั๊ว)',
    nameEn: 'Local Wholesale & Traditional Wet Market',
    priorityTier: 5,
    targetSharePercent: 6.0,
    description: 'ตลาดค้าส่ง ตลาดสดหัวเมืองใหญ่ ระบายสินค้าสดรายวัน'
  },
  {
    code: 'CH-GOSUN',
    nameTh: 'GOSUN (ร้านค้าปลีกแฟรนไชส์ / แบรนด์บริษัท)',
    nameEn: 'GOSUN Retail Store & Meat Hub',
    priorityTier: 6,
    targetSharePercent: 3.5,
    description: 'หน้าร้านค้าปลีกประจำอำเภอ แบรนด์ของบริษัท กระจายถึงชุมชน'
  },
  {
    code: 'CH-REND',
    nameTh: 'Rendering (เรนเดอริ่ง / อาหารสัตว์)',
    nameEn: 'Rendering, Offal & Animal Feed Protein',
    priorityTier: 7,
    targetSharePercent: 2.5,
    description: 'โรงสกัดโปรตีน ขนไก่ กระดูก เครื่องใน ผลพลอยได้แปรรูป'
  }
];

// REALISTIC CUSTOMERS (THAI & ENGLISH)
export const POULTRY_CUSTOMERS: Customer[] = [
  {
    code: 'CUST-EXP-01',
    nameTh: 'นิปปอน มีท เทรดดิ้ง (โตเกียว)',
    nameEn: 'Nippon Meat Trading Co., Ltd. (Tokyo)',
    channel: 'Export',
    tier: 'Tier 1',
    creditLimitTHB: 120000000,
    paymentTerm: 'L/C 30 Days',
    assignedSalesperson: 'คุณสมศักดิ์ สุวรรณรัตน์ (Export Team 1)',
    status: 'ACTIVE'
  },
  {
    code: 'CUST-EXP-02',
    nameTh: 'นิชิเรอิ ฟู้ดส์ อินเตอร์เนชั่นแนล',
    nameEn: 'Nichirei Foods Inc. (EU & UK Division)',
    channel: 'Export',
    tier: 'Tier 1',
    creditLimitTHB: 150000000,
    paymentTerm: 'T/T 45 Days',
    assignedSalesperson: 'คุณสมศักดิ์ สุวรรณรัตน์ (Export Team 1)',
    status: 'ACTIVE'
  },
  {
    code: 'CUST-IND-01',
    nameTh: 'บมจ. ไทยเพรซิเดนท์ฟูดส์ (มาม่า)',
    nameEn: 'Thai President Foods PCL',
    channel: 'Industry',
    tier: 'Tier 1',
    creditLimitTHB: 60000000,
    paymentTerm: 'Credit 45 Days',
    assignedSalesperson: 'คุณนรินทร์ วงศ์วานิช (Industrial Team)',
    status: 'ACTIVE'
  },
  {
    code: 'CUST-IND-02',
    nameTh: 'บจก. แพนเอเซีย อุตสาหกรรมแปรรูปเนื้อสัตว์',
    nameEn: 'Pan Asia Meat Processing Industry Co., Ltd.',
    channel: 'Industry',
    tier: 'Tier 2',
    creditLimitTHB: 35000000,
    paymentTerm: 'Credit 30 Days',
    assignedSalesperson: 'คุณนรินทร์ วงศ์วานิช (Industrial Team)',
    status: 'ACTIVE'
  },
  {
    code: 'CUST-HOR-01',
    nameTh: 'ยัม เรสเทอรองตส์ เซอร์วิสเซส (เคเอฟซี ประเทศไทย)',
    nameEn: 'Yum Restaurants Services (KFC Thailand)',
    channel: 'HoReCa',
    tier: 'Tier 1',
    creditLimitTHB: 95000000,
    paymentTerm: 'Credit 30 Days',
    assignedSalesperson: 'คุณวราภรณ์ พัฒนกุล (HoReCa Team)',
    status: 'ACTIVE'
  },
  {
    code: 'CUST-HOR-02',
    nameTh: 'บจก. สุกี้ชิ อินเตอร์กรุ๊ป',
    nameEn: 'Sukishi Intergroup Co., Ltd.',
    channel: 'HoReCa',
    tier: 'Tier 2',
    creditLimitTHB: 28000000,
    paymentTerm: 'Credit 30 Days',
    assignedSalesperson: 'คุณวราภรณ์ พัฒนกุล (HoReCa Team)',
    status: 'ACTIVE'
  },
  {
    code: 'CUST-MT-01',
    nameTh: 'บมจ. ซีพี แอ็กซ์ตร้า (แม็คโคร ศูนย์จำหน่ายส่ง)',
    nameEn: 'CP Axtra PCL (Makro Wholesale Centers)',
    channel: 'Modern Trade',
    tier: 'Tier 1',
    creditLimitTHB: 110000000,
    paymentTerm: 'Credit 60 Days',
    assignedSalesperson: 'คุณเกรียงไกร ชัยชนะ (Modern Trade Team)',
    status: 'ACTIVE'
  },
  {
    code: 'CUST-MT-02',
    nameTh: 'บจก. เอก-ชัย ดิสทริบิวชั่น ซิสเทม (โลตัส ประเทศไทย)',
    nameEn: 'Ek-Chai Distribution System Co., Ltd. (Lotus\'s)',
    channel: 'Modern Trade',
    tier: 'Tier 1',
    creditLimitTHB: 85000000,
    paymentTerm: 'Credit 60 Days',
    assignedSalesperson: 'คุณเกรียงไกร ชัยชนะ (Modern Trade Team)',
    status: 'ACTIVE'
  },
  {
    code: 'CUST-LM-01',
    nameTh: 'ห้างหุ้นส่วนจำกัด สหชัยค้าสัตว์ปีก ตลาดไท',
    nameEn: 'Sahachai Poultry Trading LP (Talaad Thai)',
    channel: 'Local Market',
    tier: 'Tier 2',
    creditLimitTHB: 15000000,
    paymentTerm: 'Credit 7 Days / Cash on Delivery',
    assignedSalesperson: 'คุณอนุสรณ์ พงษ์ศิริ (Traditional Trade Team)',
    status: 'ACTIVE'
  },
  {
    code: 'CUST-LM-02',
    nameTh: 'เจ๊พร ค้าไก่สด ตลาดสี่มุมเมือง',
    nameEn: 'Jae Porn Fresh Chicken (Simummuang Market)',
    channel: 'Local Market',
    tier: 'Tier 2',
    creditLimitTHB: 12000000,
    paymentTerm: 'Credit 7 Days',
    assignedSalesperson: 'คุณอนุสรณ์ พงษ์ศิริ (Traditional Trade Team)',
    status: 'ACTIVE'
  },
  {
    code: 'CUST-GOSUN-01',
    nameTh: 'แฟรนไชส์ โกซัน มีทฮับ สาขากรุงเทพฯ-ปริมณฑล',
    nameEn: 'GOSUN Meat Hub Franchise Network BKK',
    channel: 'GOSUN',
    tier: 'Tier 2',
    creditLimitTHB: 20000000,
    paymentTerm: 'Internal Transfer 15 Days',
    assignedSalesperson: 'คุณพัชรี เลิศปรีชา (GOSUN Operations)',
    status: 'ACTIVE'
  },
  {
    code: 'CUST-REND-01',
    nameTh: 'บจก. ไทยเพ็ทฟู้ด นิวทริชั่น ไบโอเทค',
    nameEn: 'Thai Pet Food Nutrition Biotech Co., Ltd.',
    channel: 'Rendering',
    tier: 'Tier 3',
    creditLimitTHB: 18000000,
    paymentTerm: 'Credit 30 Days',
    assignedSalesperson: 'คุณอนุสรณ์ พงษ์ศิริ (By-Product Sales)',
    status: 'ACTIVE'
  }
];

// THE 20 GLOBAL BUSINESS RULES FORMAL SPECIFICATION
export interface BusinessRuleDefinition {
  id: number;
  code: string;
  ruleTitleTh: string;
  ruleTitleEn: string;
  domain: string;
  severity: 'BLOCKING' | 'WORKFLOW_GATED' | 'AUDIT_ENFORCED' | 'CALCULATION';
  validationFormula: string;
  enforcementMechanism: string;
}

export const GLOBAL_BUSINESS_RULES: BusinessRuleDefinition[] = [
  {
    id: 1,
    code: 'BR-01',
    ruleTitleTh: 'Approved Plan ห้ามแก้โดยตรง',
    ruleTitleEn: 'Approved Plan is strictly immutable',
    domain: 'Planning',
    severity: 'BLOCKING',
    validationFormula: 'IF Plan.Status == "APPROVED" THEN AllowDirectEdit = FALSE',
    enforcementMechanism: 'แก้ไขได้เฉพาะใน Replan Mode โดยระบบจะสร้าง Version ใหม่ขึ้นอัตโนมัติ'
  },
  {
    id: 2,
    code: 'BR-02',
    ruleTitleTh: 'Replan ทุกครั้งต้องสร้าง Version ใหม่',
    ruleTitleEn: 'Every replan must spawn a new incremental version',
    domain: 'Planning',
    severity: 'WORKFLOW_GATED',
    validationFormula: 'NewVersion = BaseVersion + 0.1 (e.g. V2.1 -> V2.2)',
    enforcementMechanism: 'ระบบบันทึก Base Version และตารางเปรียบเทียบ Change Delta อัตโนมัติ'
  },
  {
    id: 3,
    code: 'BR-03',
    ruleTitleTh: 'Allocation รวมต้องไม่เกิน Available Supply',
    ruleTitleEn: 'Total Allocated Volume <= Net Available Supply',
    domain: 'Allocation',
    severity: 'BLOCKING',
    validationFormula: 'SUM(Channel_Allocation.Qty) <= Net_Available_Supply',
    enforcementMechanism: 'ระบบขึ้นเตือนสีแดงและระงับการกดบันทึก หากพบการ Over-allocate'
  },
  {
    id: 4,
    code: 'BR-04',
    ruleTitleTh: 'Allocation ทีมรวมต้องเท่ากับ Channel Allocation',
    ruleTitleEn: 'Sum of Team Allocations == Assigned Channel Allocation',
    domain: 'Allocation',
    severity: 'BLOCKING',
    validationFormula: 'SUM(Team_Allocation.Qty) == Channel_Allocation.Qty (Variance = 0)',
    enforcementMechanism: 'ระบบแสดง Delta Checkbox เพื่อตรวจยอดให้พอดี 100% ก่อนส่งอนุมัติ'
  },
  {
    id: 5,
    code: 'BR-05',
    ruleTitleTh: 'Allocation รายคนรวมต้องไม่เกิน Team Allocation',
    ruleTitleEn: 'Sum of Salesperson Allocations <= Team Allocation Quota',
    domain: 'Allocation',
    severity: 'BLOCKING',
    validationFormula: 'SUM(Salesperson_Allocation.Qty) <= Team_Allocation.Qty',
    enforcementMechanism: 'ห้ามจ่ายโควตาบุคคลเกินขอบเขตที่ผู้จัดการทีมได้รับ'
  },
  {
    id: 6,
    code: 'BR-06',
    ruleTitleTh: 'ทุก Sales Gap ต้องสามารถสร้าง Action Plan',
    ruleTitleEn: 'Every detected Sales Gap must trigger Action Plan creation',
    domain: 'Action Plan',
    severity: 'WORKFLOW_GATED',
    validationFormula: 'IF Target_Qty > Confirmed_SO_Qty THEN Gap_Action_Plan_Required = TRUE',
    enforcementMechanism: 'ปุ่ม "สร้าง Action Plan" ปรากฏทันทีพร้อมเชื่อมโยง Target Customer & SKU'
  },
  {
    id: 7,
    code: 'BR-07',
    ruleTitleTh: 'Opportunity Active ต้องมี Owner และ Next Action',
    ruleTitleEn: 'Active Opportunities must strictly possess Owner & Next Action Date',
    domain: 'CRM',
    severity: 'BLOCKING',
    validationFormula: 'Opportunity.Status == "ACTIVE" => Owner != NULL && NextActionDate != NULL',
    enforcementMechanism: 'ฟอร์มบันทึกจะไม่ยอมให้บันทึกถ้าไม่มี Next Action และเจ้าของดีล'
  },
  {
    id: 8,
    code: 'BR-08',
    ruleTitleTh: 'Weighted Pipeline = Qty × Probability',
    ruleTitleEn: 'Weighted Pipeline = Planned Qty * Win Probability %',
    domain: 'CRM',
    severity: 'CALCULATION',
    validationFormula: 'Weighted_Pipeline_MT = Round(Deal_Qty_MT * (Win_Probability / 100), 2)',
    enforcementMechanism: 'คำนวณและแสดงผลในทุกการ์ดและผลรวมบน Pipeline Board อัตโนมัติ'
  },
  {
    id: 9,
    code: 'BR-09',
    ruleTitleTh: 'Quotation ต่ำกว่า Policy ต้องเข้าสู่ Approval Workflow',
    ruleTitleEn: 'Quotation price below Target Policy requires multi-level approval',
    domain: 'Quotation',
    severity: 'WORKFLOW_GATED',
    validationFormula: 'Offered_Price < Target_Price => RouteToApprovalInbox(Level: SalesDirector)',
    enforcementMechanism: 'ปุ่ม Confirm เปลี่ยนเป็น "Submit for Approval" อัตโนมัติ'
  },
  {
    id: 10,
    code: 'BR-10',
    ruleTitleTh: 'Quote ต่ำกว่า Floor Price ห้าม Auto Approve',
    ruleTitleEn: 'Quotation below Floor Price strictly forbidden from Auto-Approval',
    domain: 'Quotation',
    severity: 'BLOCKING',
    validationFormula: 'Offered_Price < Floor_Price => AutoApprove = FALSE (Requires Board/MD Approval)',
    enforcementMechanism: 'ติดป้ายสีแดงเตือน "BELOW FLOOR PRICE" และต้องได้รับอนุมัติจากผู้บริหารสูงสุด'
  },
  {
    id: 11,
    code: 'BR-11',
    ruleTitleTh: 'Contract Approved แล้วจึงใช้สร้าง SO ได้ตาม Policy',
    ruleTitleEn: 'Sales Order generation strictly requires APPROVED Sales Contract',
    domain: 'Contract & SO',
    severity: 'BLOCKING',
    validationFormula: 'Contract.Status == "APPROVED" && Remaining_Balance >= Order_Qty',
    enforcementMechanism: 'ระบบบล็อกการดึงเลข Contract ที่ยังรออนุมัติหรือหมดวงเงินมาเปิด SO'
  },
  {
    id: 12,
    code: 'BR-12',
    ruleTitleTh: 'SO ต้องตรวจ Allocation ก่อนส่ง Oracle',
    ruleTitleEn: 'Sales Order must validate customer allocated quota before Oracle release',
    domain: 'Sales Order',
    severity: 'BLOCKING',
    validationFormula: 'Requested_SO_Qty <= Customer_Available_Allocation_Quota',
    enforcementMechanism: 'ระบบรัน Allocation Quota Check ทันที หากเกินต้องขอ Over-Allocation Approval'
  },
  {
    id: 13,
    code: 'BR-13',
    ruleTitleTh: 'Interface Error ต้อง Retry ได้',
    ruleTitleEn: 'ERP Interface Queue must provide immediate and scheduled Retry capability',
    domain: 'ERP Integration',
    severity: 'WORKFLOW_GATED',
    validationFormula: 'Interface_Status == "ERROR" => Enable RetryButton & ReprocessPayload',
    enforcementMechanism: 'ปุ่ม Retry ดำเนินการ Re-trigger Payload ส่งไป Oracle EBS / Cloud ทันที'
  },
  {
    id: 14,
    code: 'BR-14',
    ruleTitleTh: 'Oracle SO Number ต้องส่งกลับระบบใหม่',
    ruleTitleEn: 'Oracle ERP Sales Order number must be updated back to SAPS',
    domain: 'ERP Integration',
    severity: 'AUDIT_ENFORCED',
    validationFormula: 'ERP_Callback.OracleSONumber != NULL => Update SAPS_SO.Oracle_Ref_No',
    enforcementMechanism: 'แสดงเลข ORA-SO-XXXX พร้อมสถานะ Sync สำเร็จในหน้าติดตาม SO'
  },
  {
    id: 15,
    code: 'BR-15',
    ruleTitleTh: 'Stock ต้องเก็บ Snapshot',
    ruleTitleEn: 'Inventory tracking must capture periodic audit snapshots',
    domain: 'Inventory',
    severity: 'AUDIT_ENFORCED',
    validationFormula: 'StockSnapshot(Frequency: "Daily 00:00", Plant, SKU, Lot, AgingTier)',
    enforcementMechanism: 'ผู้ใช้สามารถเรียกดูเปรียบเทียบ Snapshot ย้อนหลังในหน้า Stock Overview'
  },
  {
    id: 16,
    code: 'BR-16',
    ruleTitleTh: 'ทุก Override ต้องมี Reason',
    ruleTitleEn: 'Every manual quota/price override mandates a registered Reason Code',
    domain: 'Governance',
    severity: 'BLOCKING',
    validationFormula: 'Is_Manual_Override == TRUE => Length(ReasonCode) > 0 && Length(Remark) >= 10',
    enforcementMechanism: 'ระบบบังคับเลือก Reason Code จาก Master Data และพิมพ์คำอธิบาย'
  },
  {
    id: 17,
    code: 'BR-17',
    ruleTitleTh: 'ทุก Critical Variance ต้องมี Root Cause',
    ruleTitleEn: 'Critical Variances (|Actual - Plan| > 5%) mandate Root Cause analysis',
    domain: 'Performance & KPI',
    severity: 'WORKFLOW_GATED',
    validationFormula: 'ABS(Variance_Percent) > 5.0% => Require_Root_Cause_Log = TRUE',
    enforcementMechanism: 'แสดงลิงก์และปุ่มเตือน "ต้องสร้าง 5-Whys Root Cause" ในหน้า Variance'
  },
  {
    id: 18,
    code: 'BR-18',
    ruleTitleTh: 'Root Cause ที่ต้องแก้ไขต้องมี Corrective Action',
    ruleTitleEn: 'Identified Root Causes requiring remedy must have actionable CAPA',
    domain: 'CAPA',
    severity: 'WORKFLOW_GATED',
    validationFormula: 'RootCause.RequiresAction == TRUE => CAPA_Record != NULL && Owner != NULL',
    enforcementMechanism: 'เชื่อมโยงจาก Root Cause Log ตรงไปยังหน้า Corrective Action Board'
  },
  {
    id: 19,
    code: 'BR-19',
    ruleTitleTh: 'ทุก Transaction สำคัญต้องมี Audit Trail',
    ruleTitleEn: 'All key transactions must record immutable audit trail',
    domain: 'Audit & Compliance',
    severity: 'AUDIT_ENFORCED',
    validationFormula: 'AuditTrail(Timestamp, UserID, UserRole, ActionType, OldValue, NewValue)',
    enforcementMechanism: 'จัดเก็บและสืบค้นได้ในหน้า Audit Log ย้อนหลังได้ทุกกิจกรรม'
  },
  {
    id: 20,
    code: 'BR-20',
    ruleTitleTh: 'ทุก Dashboard ต้อง Drill Down ถึง Transaction ได้',
    ruleTitleEn: 'Every dashboard metric and chart must provide drill-down to underlying records',
    domain: 'Executive Visibility',
    severity: 'CALCULATION',
    validationFormula: 'Click(MetricCard / ChartBar) => Filter Underlying Transactions',
    enforcementMechanism: 'เปิดหน้าต่าง Drill-Down Transaction Modal แสดงรายละเอียดระดับบรรทัด'
  }
];

// CONTINUOUS WORKFLOW STAGES DEFINITION
export interface WorkflowStage {
  step: number;
  id: string;
  nameTh: string;
  nameEn: string;
  screenId: string;
  keyEntity: string;
  sampleRecord: string;
  businessRuleApplied: string;
}

export const CONTINUOUS_WORKFLOW_STAGES: WorkflowStage[] = [
  {
    step: 1,
    id: 'farm-plan',
    nameTh: '1. แผนรับไก่จากฟาร์ม',
    nameEn: 'Farm & Broiler Intake Plan',
    screenId: 'chicken-intake-plan',
    keyEntity: 'Farm Harvest Batch',
    sampleRecord: 'BATCH-2025-W42 (1.85M Birds @ 2.45kg)',
    businessRuleApplied: 'BR-01 / BR-02: บันทึกแผนฐานก่อนเข้าเชือด'
  },
  {
    step: 2,
    id: 'supply',
    nameTh: '2. คำนวณซัพพลายตาม Yield',
    nameEn: 'Supply & Yield Calculation',
    screenId: 'supply-calculation',
    keyEntity: 'Cut-up Supply Projected',
    sampleRecord: 'อกไก่ 975.3 MT (Yield 21.5%), น่องสะโพก 1,405.8 MT',
    businessRuleApplied: 'BR-03: Yield Master กำหนดปริมาณ Available Supply'
  },
  {
    step: 3,
    id: 'sales-plan',
    nameTh: '3. แผนขายประจำปี/เดือน',
    nameEn: 'Annual & Monthly Sales Plan',
    screenId: 'annual-plan',
    keyEntity: 'Sales Plan Version',
    sampleRecord: 'PLAN-FY2025-V2.1 (Approved - Immutable)',
    businessRuleApplied: 'BR-01 & BR-02: แผน Approved ห้ามแก้ตรง ต้อง Replan Version ใหม่'
  },
  {
    step: 4,
    id: 'demand-supply',
    nameTh: '4. สมดุลอุปสงค์-อุปทาน',
    nameEn: 'Demand-Supply Balance',
    screenId: 'demand-supply-balance',
    keyEntity: 'Balance Projection',
    sampleRecord: 'อกไก่ Deficit -42 MT, โครงไก่ Surplus +250 MT',
    businessRuleApplied: 'BR-03: ซัพพลายสุทธิต้องสอดคล้องกับสต๊อกคงเหลือ'
  },
  {
    step: 5,
    id: 'allocation',
    nameTh: '5. จัดสรรโควตาตามช่องทางและทีม',
    nameEn: 'Channel & Team Allocation',
    screenId: 'channel-allocation',
    keyEntity: 'Channel Allocation Matrix',
    sampleRecord: 'Export 32%, Industry 24%, HoReCa 18%, MT 14%',
    businessRuleApplied: 'BR-03 & BR-04: ยอดรวมไม่เกิน Supply และยอดทีมรวมเท่ากับช่องทาง'
  },
  {
    step: 6,
    id: 'salesperson',
    nameTh: '6. จัดสรรรายบุคคล',
    nameEn: 'Salesperson Quota Allocation',
    screenId: 'salesperson-allocation',
    keyEntity: 'Salesperson Quota',
    sampleRecord: 'คุณสมศักดิ์ (Export): 312 MT, คุณเกรียงไกร (MT): 136 MT',
    businessRuleApplied: 'BR-05: ผลรวมโควตารายบุคคลต้องไม่เกินโควตาทีม'
  },
  {
    step: 7,
    id: 'action-plan',
    nameTh: '7. แผนแก้ Sales Gap',
    nameEn: 'Sales Gap & Action Plan',
    screenId: 'sales-gap-plan',
    keyEntity: 'Action Plan Record',
    sampleRecord: 'ACT-2025-089: แคมเปญอกไก่พรีเมียม HoReCa (+25 MT)',
    businessRuleApplied: 'BR-06: ทุก Gap ตรวจพบต้องสร้าง Action Plan กำกับ'
  },
  {
    step: 8,
    id: 'opportunity',
    nameTh: '8. โอกาสการขาย & Pipeline',
    nameEn: 'CRM Opportunity & Pipeline',
    screenId: 'sales-opportunity',
    keyEntity: 'Active Opportunity',
    sampleRecord: 'OPP-2025-104: Sukishi Yakitori Contract (Win 75%)',
    businessRuleApplied: 'BR-07 & BR-08: ต้องมี Owner, Next Action และ Weighted Qty'
  },
  {
    step: 9,
    id: 'quotation',
    nameTh: '9. ใบเสนอราคา & ราคาพื้นฐาน',
    nameEn: 'Quotation & Price Validation',
    screenId: 'create-quotation',
    keyEntity: 'Quotation Document',
    sampleRecord: 'QT-2025-00481: อกไก่ @ 82.0 ฿/kg (Target 88 ฿)',
    businessRuleApplied: 'BR-09 & BR-10: ต่ำกว่า Target เข้าพิจารณา, ต่ำกว่า Floor ห้าม Auto'
  },
  {
    step: 10,
    id: 'approval',
    nameTh: '10. กล่องข้อความอนุมัติ',
    nameEn: 'Multi-level Approval Inbox',
    screenId: 'quotation-approval',
    keyEntity: 'Approval Request',
    sampleRecord: 'APP-2025-891: ส่วนลดพิเศษ Nippon Meat (รอ Director อนุมัติ)',
    businessRuleApplied: 'BR-09: ตรวจสอบ Approval Matrix ตามขอบเขตอำนาจ'
  },
  {
    step: 11,
    id: 'contract',
    nameTh: '11. สัญญาซื้อขายระยะยาว',
    nameEn: 'Sales Contract & Balance',
    screenId: 'contract-approval',
    keyEntity: 'Active Sales Contract',
    sampleRecord: 'CNT-2025-0142: CP Axtra (วงเงิน 500 MT, คงเหลือ 215 MT)',
    businessRuleApplied: 'BR-11: ต้องมีสถานะ APPROVED จึงนำไปอ้างอิงเปิด SO ได้'
  },
  {
    step: 12,
    id: 'so',
    nameTh: '12. ใบสั่งขายและตรวจสอบโควตา',
    nameEn: 'Sales Order & SO Validation',
    screenId: 'sales-order-draft',
    keyEntity: 'Sales Order Draft',
    sampleRecord: 'SO-2025-09812: สั่งซื้ออกไก่สด 40 MT (ตรวจสอบโควตาผ่าน)',
    businessRuleApplied: 'BR-12: ตรวจสอบ Allocation Quota ก่อนส่ง Interface'
  },
  {
    step: 13,
    id: 'erp',
    nameTh: '13. ส่งข้อมูลเชื่อมต่อ Oracle ERP',
    nameEn: 'ERP Interface Queue & Tracking',
    screenId: 'erp-interface',
    keyEntity: 'ERP Interface Transaction',
    sampleRecord: 'ERP-TX-8921 -> ORA-SO-2025-8891 (Synced & Retryable)',
    businessRuleApplied: 'BR-13 & BR-14: Interface Error ต้อง Retry ได้ และรับเลข ORA SO'
  },
  {
    step: 14,
    id: 'delivery',
    nameTh: '14. ควบคุมการจัดส่งหน้าโรงงาน',
    nameEn: 'Delivery Control & Logistics',
    screenId: 'delivery-control',
    keyEntity: 'Delivery Order / Gate Pass',
    sampleRecord: 'DO-2025-4491: ทะเบียน 70-8812 ขนส่งห้องเย็น (-18°C)',
    businessRuleApplied: 'BR-15: อิงข้อมูลตัดจ่ายจาก Stock Snapshot'
  },
  {
    step: 15,
    id: 'kpi',
    nameTh: '15. ติดตาม KPI และวิเคราะห์ส่วนต่าง',
    nameEn: 'KPI Scorecard & Variance',
    screenId: 'variance-analysis',
    keyEntity: 'Variance Analysis Record',
    sampleRecord: 'VAR-2025-W42-04: BL Breast Variance -8.4% (Critical)',
    businessRuleApplied: 'BR-17 & BR-20: Variance > 5% ต้องวิเคราะห์ Root Cause และ Drill Down'
  },
  {
    step: 16,
    id: 'root-cause',
    nameTh: '16. หาสาเหตุรากเหง้าและมาตรการแก้ไข',
    nameEn: 'Root Cause (5-Whys) & CAPA',
    screenId: 'root-cause',
    keyEntity: 'CAPA Action Plan',
    sampleRecord: 'RC-2025-032 -> CAPA-2025-019 (ติดตั้งหัวชั่งดิจิทัลใหม่)',
    businessRuleApplied: 'BR-18 & BR-19: ต้องมี Corrective Action และบันทึก Audit Trail'
  }
];
