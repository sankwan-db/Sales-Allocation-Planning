// Centralized Chicken Type & Breed Dynamic Master Data and Yield Matrix Engine
// Supports dynamic multi-type, multi-breed, multi-plant, and multi-weight-range dimensions
// Persistent via localStorage with enterprise defaults

export interface Breed {
  id: string;
  typeId: string;
  code: string;
  nameTh: string;
  nameEn: string;
  origin: string;
  standardFcr: number;
  description: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface WeightRange {
  id: string;
  label: string;
  minWeight: number; // kg
  maxWeight: number; // kg
  primaryUsage: string;
}

export interface ChickenType {
  id: string;
  code: string;
  nameTh: string;
  nameEn: string;
  category: 'Commercial Broiler' | 'Spent Layer' | 'Breeder Stock' | 'Native & Specialty' | 'Other';
  description: string;
  defaultAvgWeight: number; // kg
  defaultLiveCostTHB: number; // THB / kg
  slaughterAgeDays: number;
  status: 'ACTIVE' | 'INACTIVE';
  breeds?: Breed[];
  weightRanges: WeightRange[];
  isSystem?: boolean;
}

export interface DynamicYieldRule {
  id: string;
  chickenTypeId: string;
  chickenTypeNameTh: string;
  breedId?: string; // Optional/legacy
  breedNameTh?: string;
  weightRangeId: string; // 'ALL' or specific weight range
  weightRangeLabel: string;
  plantId: string; // 'ALL' | 'Plant A (Saraburi)' | 'Plant B (Korat)' | 'Plant C (Rayong)'
  effectiveDate: string;
  conversionLevel: 'L1: Live to Carcass' | 'L2: Carcass to Main Part' | 'L3: Cut-up to Deboned' | 'L4: By-Products';
  sourceProduct: string;
  outputProduct: string;
  skuCode?: string;
  yieldPercent: number;
  minYieldPercent: number;
  maxYieldPercent: number;
  status: 'ACTIVE' | 'PENDING' | 'REVISED';
  version: string;
  standardCostTHBPerKg: number;
}

const STORAGE_KEY_TYPES = 'poultry_dynamic_chicken_types_v1';
const STORAGE_KEY_YIELDS = 'poultry_dynamic_yield_rules_v1';

// Initial enterprise seed dataset
export const INITIAL_CHICKEN_TYPES: ChickenType[] = [
  {
    id: 'BROILER',
    code: 'TYP-BR',
    nameTh: 'ไก่เนื้อ (Broiler)',
    nameEn: 'Commercial Meat Broiler',
    category: 'Commercial Broiler',
    description: 'ไก่เนื้อเลี้ยงเพื่อการค้า อายุเชือด 38-44 วัน อัตราแลกเนื้อสูง เหมาะสำหรับตลาดส่งออกและโมเดิร์นเทรด',
    defaultAvgWeight: 2.45,
    defaultLiveCostTHB: 42.50,
    slaughterAgeDays: 42,
    status: 'ACTIVE',
    isSystem: true,
    breeds: [
      {
        id: 'ROSS_308',
        typeId: 'BROILER',
        code: 'BRD-R308',
        nameTh: 'Ross 308 (รอสส์ 308)',
        nameEn: 'Ross 308 Broiler',
        origin: 'Aviagen (UK)',
        standardFcr: 1.48,
        description: 'กล้ามเนื้ออกใหญ่ ยิลด์เนื้อขาวสูง ทนสภาพอากาศร้อนชื้นได้ดี',
        status: 'ACTIVE'
      },
      {
        id: 'COBB_500',
        typeId: 'BROILER',
        code: 'BRD-C500',
        nameTh: 'Cobb 500 (ค็อบบ์ 500)',
        nameEn: 'Cobb 500 Broiler',
        origin: 'Cobb-Vantress (USA)',
        standardFcr: 1.50,
        description: 'โครงสร้างกระดูกแข็งแรง น่องสะโพกแน่นสม่ำเสมอ ประสิทธิภาพการชำแหละสูง',
        status: 'ACTIVE'
      },
      {
        id: 'HUBBARD',
        typeId: 'BROILER',
        code: 'BRD-HUB',
        nameTh: 'Hubbard Efficiency Plus (ฮับบาร์ด)',
        nameEn: 'Hubbard Efficiency Plus',
        origin: 'Hubbard Breeders (France)',
        standardFcr: 1.52,
        description: 'เน้นความทนทานต่อโรค ต้นทุนลูกไก่ต่ำ อัตราการรอดสม่ำเสมอ',
        status: 'ACTIVE'
      },
      {
        id: 'ARBOR_ACRES',
        typeId: 'BROILER',
        code: 'BRD-AA',
        nameTh: 'Arbor Acres Plus (อาร์เบอร์ เอเคอร์ส)',
        nameEn: 'Arbor Acres Plus',
        origin: 'Aviagen (USA)',
        standardFcr: 1.51,
        description: 'อัตราการเติบโตคงที่ ผลตอบแทนน้ำหนักตัวดีเยี่ยมสำหรับตลาดสดและโรงชำแหละ',
        status: 'ACTIVE'
      }
    ],
    weightRanges: [
      { id: 'WR_BR_LIGHT', label: '1.80 - 2.15 kg (Small / Whole Bird)', minWeight: 1.80, maxWeight: 2.15, primaryUsage: 'ไก่ย่าง ไก่ต้มทั้งตัว ส่งตลาดสดและภัตตาคาร' },
      { id: 'WR_BR_STD', label: '2.20 - 2.55 kg (Standard Cut-up)', minWeight: 2.20, maxWeight: 2.55, primaryUsage: 'ตัด 8 ชิ้นส่วนมาตรฐาน ส่งออกญี่ปุ่นและยุโรป' },
      { id: 'WR_BR_HEAVY', label: '2.60 - 3.10 kg (Heavy Debone)', minWeight: 2.60, maxWeight: 3.10, primaryUsage: 'เลาะเนื้ออกและสะโพกไร้กระดูก ส่งโรงงานแปรรูปอาหารปรุงสุก' }
    ]
  },
  {
    id: 'LAYER',
    code: 'TYP-LY',
    nameTh: 'ไก่ไข่ปลดระวาง (Layer / Spent Hen)',
    nameEn: 'Spent Layer Hen',
    category: 'Spent Layer',
    description: 'ไก่ไข่ที่หมดวงรอบการให้ไข่ อายุ 72-85 สัปดาห์ เนื้อมีความแน่นเหนียว รสชาติเข้มข้น เหมาะสำหรับต้มซุป อาหารพื้นบ้าน และโรงงานสกัดโปรตีน',
    defaultAvgWeight: 1.90,
    defaultLiveCostTHB: 27.80,
    slaughterAgeDays: 560,
    status: 'ACTIVE',
    isSystem: true,
    breeds: [
      {
        id: 'LOHMANN_BROWN',
        typeId: 'LAYER',
        code: 'BRD-LOH',
        nameTh: 'Lohmann Brown (โลห์มันน์ บราวน์)',
        nameEn: 'Lohmann Brown Classic',
        origin: 'Lohmann Tierzucht (Germany)',
        standardFcr: 2.15,
        description: 'ไก่ไข่สีน้ำตาลยอดนิยม โครงกระดูกบาง เนื้อเหนียวแน่น รสหวานธรรมชาติ',
        status: 'ACTIVE'
      },
      {
        id: 'HYLINE_BROWN',
        typeId: 'LAYER',
        code: 'BRD-HYL',
        nameTh: 'Hy-Line Brown (ไฮไลน์ บราวน์)',
        nameEn: 'Hy-Line Brown Commercial',
        origin: 'Hy-Line International (USA)',
        standardFcr: 2.18,
        description: 'น้ำหนักตัวเฉลี่ยสม่ำเสมอ เนื้ออกบาง น่องสะโพกเหนียวนุ่ม เหมาะทำข้าวมันไก่และซุป',
        status: 'ACTIVE'
      },
      {
        id: 'NOVOGEN',
        typeId: 'LAYER',
        code: 'BRD-NOVO',
        nameTh: 'Novogen Brown (โนโวเจน)',
        nameEn: 'Novogen Brown Layer',
        origin: 'Groupe Grimaud (France)',
        standardFcr: 2.20,
        description: 'สายพันธุ์ปรับตัวง่าย กระดูกโครงใหญ่ เหมาะส่งโรงงานแปรรูปลูกชิ้นและไส้กรอกไก่',
        status: 'ACTIVE'
      },
      {
        id: 'ISA_BROWN',
        typeId: 'LAYER',
        code: 'BRD-ISA',
        nameTh: 'ISA Brown (ไอซา บราวน์)',
        nameEn: 'Institut de Sélection Animale (Netherlands)',
        origin: 'Hendrix Genetics (Netherlands)',
        standardFcr: 2.22,
        description: 'สายพันธุ์คลาสสิก ปริมาณไขมันต่ำ เหมาะสำหรับตลาดแปรรูปอบแห้งและก๋วยเตี๋ยวไก่ฉีก',
        status: 'ACTIVE'
      }
    ],
    weightRanges: [
      { id: 'WR_LY_LIGHT', label: '1.60 - 1.85 kg (Standard Layer)', minWeight: 1.60, maxWeight: 1.85, primaryUsage: 'ตลาดสดท้องถิ่น ต้มซุปน้ำใส' },
      { id: 'WR_LY_HEAVY', label: '1.90 - 2.30 kg (Heavy Layer)', minWeight: 1.90, maxWeight: 2.30, primaryUsage: 'โรงงานทำลูกชิ้น ไส้กรอก และไก่ฉีกเส้น' }
    ]
  },
  {
    id: 'PARENT_STOCK',
    code: 'TYP-PS',
    nameTh: 'พ่อแม่พันธุ์ปลด (PS / Parent Stock)',
    nameEn: 'Parent Stock Breeder Cull',
    category: 'Breeder Stock',
    description: 'ไก่พ่อแม่พันธุ์ปลดระวางจากการผลิตไข่ฟัก น้ำหนักตัวมาก (3.2 - 4.8 kg) โครงสร้างใหญ่มาก เนื้อแน่น ไขมันสะสมสูง นิยมส่งแปรรูปอุตสาหกรรม',
    defaultAvgWeight: 3.75,
    defaultLiveCostTHB: 33.50,
    slaughterAgeDays: 460,
    status: 'ACTIVE',
    isSystem: true,
    breeds: [
      {
        id: 'ROSS_PS',
        typeId: 'PARENT_STOCK',
        code: 'BRD-RPS',
        nameTh: 'Ross 308 Parent Stock (แม่พันธุ์รอสส์)',
        nameEn: 'Ross 308 PS Female & Male',
        origin: 'Aviagen (UK)',
        standardFcr: 2.85,
        description: 'แม่พันธุ์น้ำหนัก 3.4-3.8 kg พ่อพันธุ์ 4.5-5.2 kg เนื้ออกหนามาก',
        status: 'ACTIVE'
      },
      {
        id: 'COBB_PS',
        typeId: 'PARENT_STOCK',
        code: 'BRD-CPS',
        nameTh: 'Cobb 500 Parent Stock (แม่พันธุ์ค็อบบ์)',
        nameEn: 'Cobb 500 PS Breeder',
        origin: 'Cobb-Vantress (USA)',
        standardFcr: 2.90,
        description: 'โครงกระดูกใหญ่ แข็งแกร่ง น่องสะโพกขนาดมหึมา เหมาะทำเนื้อบดอุตสาหกรรม (MDM)',
        status: 'ACTIVE'
      },
      {
        id: 'HUBBARD_PS',
        typeId: 'PARENT_STOCK',
        code: 'BRD-HPS',
        nameTh: 'Hubbard PS Breeder (แม่พันธุ์ฮับบาร์ด)',
        nameEn: 'Hubbard PS Female',
        origin: 'Hubbard (France)',
        standardFcr: 2.80,
        description: 'เปอร์เซ็นต์ไขมันใต้ผิวหนังสูง เหมาะทำเนื้อหมักและกุนเชียงไก่',
        status: 'ACTIVE'
      }
    ],
    weightRanges: [
      { id: 'WR_PS_FEMALE', label: '3.00 - 3.80 kg (PS Female Hen)', minWeight: 3.00, maxWeight: 3.80, primaryUsage: 'ตัดแต่งชิ้นส่วนอุตสาหกรรม เลาะเนื้อบด' },
      { id: 'WR_PS_ROOSTER', label: '3.90 - 5.00 kg (PS Male Rooster)', minWeight: 3.90, maxWeight: 5.00, primaryUsage: 'ชำแหละแยกโครง ไส้กรอก หมูยอไก่ แปรรูปซุปเข้มข้น' }
    ]
  },
  {
    id: 'SPECIALTY_NATIVE',
    code: 'TYP-SPEC',
    nameTh: 'ไก่พื้นเมืองและสายพันธุ์พิเศษ (Specialty & Native)',
    nameEn: 'Specialty / Native / Organic Chicken',
    category: 'Native & Specialty',
    description: 'ไก่พันธุ์พื้นเมือง ไก่ดำ ไก่ออร์แกนิก สำหรับตลาดพรีเมียม โรงแรมหรู ร้านอาหารไฟน์ไดนิ่ง และกลุ่มผู้รักสุขภาพ ราคาขายต่อ กก. สูงกว่าไก่ทั่วไป 60-120%',
    defaultAvgWeight: 1.55,
    defaultLiveCostTHB: 78.00,
    slaughterAgeDays: 75,
    status: 'ACTIVE',
    isSystem: true,
    breeds: [
      {
        id: 'NATIVE_PRADU',
        typeId: 'SPECIALTY_NATIVE',
        code: 'BRD-PRADU',
        nameTh: 'ประดู่หางดำ (Thai Native Pradu Hang Dam)',
        nameEn: 'Thai Indigenous Pradu Hang Dam',
        origin: 'กรมปศุสัตว์ (ไทย)',
        standardFcr: 2.45,
        description: 'ไก่พื้นเมืองแท้ เนื้อแน่นหนึบ ยูริกต่ำ ไขมันน้อย กลิ่นหอมเฉพาะตัว ตลาดภัตตาคารไทย',
        status: 'ACTIVE'
      },
      {
        id: 'BLACK_SILKIE',
        typeId: 'SPECIALTY_NATIVE',
        code: 'BRD-BLACK',
        nameTh: 'ไก่ดำมองโกล / อู่หลง (Black Silkie Chicken)',
        nameEn: 'Mongolian Black Bone Chicken',
        origin: 'เอเชียตะวันออก',
        standardFcr: 2.80,
        description: 'หนัง เนื้อ และกระดูกสีดำสนิท อุดมด้วยสารคาร์โนซีน ตลาดตุ๋นยาจีนและสมุนไพรพรีเมียม',
        status: 'ACTIVE'
      },
      {
        id: 'TANAOSRI_NATIVE',
        typeId: 'SPECIALTY_NATIVE',
        code: 'BRD-TNS',
        nameTh: 'ไก่บ้านตะนาวศรี (Tanaosri Free-Range)',
        nameEn: 'Tanaosri Natural Free-Range',
        origin: 'ราชบุรี (ไทย)',
        standardFcr: 2.35,
        description: 'เลี้ยงปล่อยทุ่งธรรมชาติ ไร้สารปฏิชีวนะ ส่งซูเปอร์มาร์เก็ตพรีเมียม (Gourmet / Villa)',
        status: 'ACTIVE'
      },
      {
        id: 'BRESSE_HYBRID',
        typeId: 'SPECIALTY_NATIVE',
        code: 'BRD-BRESSE',
        nameTh: 'ไก่เบรสลูกผสม (Thai Bresse Gourmet)',
        nameEn: 'Gourmet French-Thai Hybrid',
        origin: 'โครงการหลวง (ไทย-ฝรั่งเศส)',
        standardFcr: 2.60,
        description: 'เนื้อนุ่มฉ่ำ หนังบางกรอบ เหมาะสำหรับอาหารตะวันตกและสเต๊กอกไก่ไฟน์ไดนิ่ง',
        status: 'ACTIVE'
      }
    ],
    weightRanges: [
      { id: 'WR_SPEC_SMALL', label: '1.20 - 1.45 kg (Small Native / Black)', minWeight: 1.20, maxWeight: 1.45, primaryUsage: 'ขายทั้งตัว ไก่ดำตุ๋นยาจีน ไก่ไหว้เจ้าพรีเมียม' },
      { id: 'WR_SPEC_STD', label: '1.50 - 1.85 kg (Standard Free-Range)', minWeight: 1.50, maxWeight: 1.85, primaryUsage: 'ชิ้นส่วนพรีเมียม ส่งร้านอาหารมิชลินและโรงแรมหรู' }
    ]
  }
];

// Initial dynamic Yield Matrix configured across Chicken Type + Breed + Weight Range + Plant + Effective Date
export const INITIAL_YIELD_RULES: DynamicYieldRule[] = [
  // BROILER - Ross 308 - Standard Cut-up (Saraburi)
  {
    id: 'YD-BR-R308-CARC',
    chickenTypeId: 'BROILER',
    chickenTypeNameTh: 'ไก่เนื้อ (Broiler)',
    breedId: 'ROSS_308',
    breedNameTh: 'Ross 308 (รอสส์ 308)',
    weightRangeId: 'WR_BR_STD',
    weightRangeLabel: '2.20 - 2.55 kg (Standard Cut-up)',
    plantId: 'All Plants',
    effectiveDate: '2025-01-01',
    conversionLevel: 'L1: Live to Carcass',
    sourceProduct: 'Live Chicken (ไก่มีชีวิต)',
    outputProduct: 'Carcass (ไก่ซาก)',
    skuCode: 'RAW-001',
    yieldPercent: 73.20,
    minYieldPercent: 71.50,
    maxYieldPercent: 74.80,
    status: 'ACTIVE',
    version: 'V2.2',
    standardCostTHBPerKg: 58.06
  },
  {
    id: 'YD-BR-R308-BREAST',
    chickenTypeId: 'BROILER',
    chickenTypeNameTh: 'ไก่เนื้อ (Broiler)',
    breedId: 'ROSS_308',
    breedNameTh: 'Ross 308 (รอสส์ 308)',
    weightRangeId: 'WR_BR_STD',
    weightRangeLabel: '2.20 - 2.55 kg (Standard Cut-up)',
    plantId: 'All Plants',
    effectiveDate: '2025-01-01',
    conversionLevel: 'L2: Carcass to Main Part',
    sourceProduct: 'Carcass (ไก่ซาก)',
    outputProduct: 'BL Breast (เนื้ออกลอกหนัง)',
    skuCode: 'SKU-0104',
    yieldPercent: 23.50,
    minYieldPercent: 22.00,
    maxYieldPercent: 25.00,
    status: 'ACTIVE',
    version: 'V2.2',
    standardCostTHBPerKg: 104.50
  },
  {
    id: 'YD-BR-R308-LEG',
    chickenTypeId: 'BROILER',
    chickenTypeNameTh: 'ไก่เนื้อ (Broiler)',
    breedId: 'ROSS_308',
    breedNameTh: 'Ross 308 (รอสส์ 308)',
    weightRangeId: 'WR_BR_STD',
    weightRangeLabel: '2.20 - 2.55 kg (Standard Cut-up)',
    plantId: 'All Plants',
    effectiveDate: '2025-01-01',
    conversionLevel: 'L2: Carcass to Main Part',
    sourceProduct: 'Carcass (ไก่ซาก)',
    outputProduct: 'Leg Quarter / น่องสะโพก',
    skuCode: 'SKU-0102',
    yieldPercent: 31.80,
    minYieldPercent: 30.50,
    maxYieldPercent: 33.00,
    status: 'ACTIVE',
    version: 'V2.2',
    standardCostTHBPerKg: 59.20
  },
  {
    id: 'YD-BR-R308-WING',
    chickenTypeId: 'BROILER',
    chickenTypeNameTh: 'ไก่เนื้อ (Broiler)',
    breedId: 'ROSS_308',
    breedNameTh: 'Ross 308 (รอสส์ 308)',
    weightRangeId: 'WR_BR_STD',
    weightRangeLabel: '2.20 - 2.55 kg (Standard Cut-up)',
    plantId: 'All Plants',
    effectiveDate: '2025-01-01',
    conversionLevel: 'L2: Carcass to Main Part',
    sourceProduct: 'Carcass (ไก่ซาก)',
    outputProduct: 'Whole Wing (ปีกเต็ม)',
    skuCode: 'SKU-0103',
    yieldPercent: 9.80,
    minYieldPercent: 9.00,
    maxYieldPercent: 10.50,
    status: 'ACTIVE',
    version: 'V2.2',
    standardCostTHBPerKg: 118.00
  },

  // BROILER - Cobb 500 (Korat Plant specialization)
  {
    id: 'YD-BR-C500-BREAST',
    chickenTypeId: 'BROILER',
    chickenTypeNameTh: 'ไก่เนื้อ (Broiler)',
    breedId: 'COBB_500',
    breedNameTh: 'Cobb 500 (ค็อบบ์ 500)',
    weightRangeId: 'WR_BR_STD',
    weightRangeLabel: '2.20 - 2.55 kg (Standard Cut-up)',
    plantId: 'Plant B (Korat)',
    effectiveDate: '2025-01-01',
    conversionLevel: 'L2: Carcass to Main Part',
    sourceProduct: 'Carcass (ไก่ซาก)',
    outputProduct: 'BL Breast (เนื้ออกลอกหนัง)',
    skuCode: 'SKU-0104',
    yieldPercent: 22.80,
    minYieldPercent: 21.50,
    maxYieldPercent: 24.00,
    status: 'ACTIVE',
    version: 'V1.9',
    standardCostTHBPerKg: 106.00
  },
  {
    id: 'YD-BR-C500-LEG',
    chickenTypeId: 'BROILER',
    chickenTypeNameTh: 'ไก่เนื้อ (Broiler)',
    breedId: 'COBB_500',
    breedNameTh: 'Cobb 500 (ค็อบบ์ 500)',
    weightRangeId: 'WR_BR_STD',
    weightRangeLabel: '2.20 - 2.55 kg (Standard Cut-up)',
    plantId: 'Plant B (Korat)',
    effectiveDate: '2025-01-01',
    conversionLevel: 'L2: Carcass to Main Part',
    sourceProduct: 'Carcass (ไก่ซาก)',
    outputProduct: 'Leg Quarter / น่องสะโพก',
    skuCode: 'SKU-0102',
    yieldPercent: 32.60, // Cobb has higher leg quarter yield
    minYieldPercent: 31.00,
    maxYieldPercent: 34.00,
    status: 'ACTIVE',
    version: 'V1.9',
    standardCostTHBPerKg: 58.40
  },

  // LAYER - Lohmann Brown - Spent Hen (Much lower breast, higher bone/skin yield)
  {
    id: 'YD-LY-LOH-CARC',
    chickenTypeId: 'LAYER',
    chickenTypeNameTh: 'ไก่ไข่ปลดระวาง (Layer / Spent Hen)',
    breedId: 'LOHMANN_BROWN',
    breedNameTh: 'Lohmann Brown (โลห์มันน์ บราวน์)',
    weightRangeId: 'WR_LY_LIGHT',
    weightRangeLabel: '1.60 - 1.85 kg (Standard Layer)',
    plantId: 'All Plants',
    effectiveDate: '2025-01-01',
    conversionLevel: 'L1: Live to Carcass',
    sourceProduct: 'Live Chicken (ไก่มีชีวิต)',
    outputProduct: 'Carcass (ไก่ซาก)',
    skuCode: 'RAW-001-LY',
    yieldPercent: 64.50, // Spent layer has lower carcass dressing percentage
    minYieldPercent: 62.00,
    maxYieldPercent: 66.50,
    status: 'ACTIVE',
    version: 'V1.4',
    standardCostTHBPerKg: 43.10
  },
  {
    id: 'YD-LY-LOH-BREAST',
    chickenTypeId: 'LAYER',
    chickenTypeNameTh: 'ไก่ไข่ปลดระวาง (Layer / Spent Hen)',
    breedId: 'LOHMANN_BROWN',
    breedNameTh: 'Lohmann Brown (โลห์มันน์ บราวน์)',
    weightRangeId: 'WR_LY_LIGHT',
    weightRangeLabel: '1.60 - 1.85 kg (Standard Layer)',
    plantId: 'All Plants',
    effectiveDate: '2025-01-01',
    conversionLevel: 'L2: Carcass to Main Part',
    sourceProduct: 'Carcass (ไก่ซาก)',
    outputProduct: 'BL Breast (เนื้ออกลอกหนัง)',
    skuCode: 'SKU-0104-LY',
    yieldPercent: 15.20, // Significantly lower breast meat in spent layer
    minYieldPercent: 14.00,
    maxYieldPercent: 16.50,
    status: 'ACTIVE',
    version: 'V1.4',
    standardCostTHBPerKg: 78.50
  },
  {
    id: 'YD-LY-LOH-LEG',
    chickenTypeId: 'LAYER',
    chickenTypeNameTh: 'ไก่ไข่ปลดระวาง (Layer / Spent Hen)',
    breedId: 'LOHMANN_BROWN',
    breedNameTh: 'Lohmann Brown (โลห์มันน์ บราวน์)',
    weightRangeId: 'WR_LY_LIGHT',
    weightRangeLabel: '1.60 - 1.85 kg (Standard Layer)',
    plantId: 'All Plants',
    effectiveDate: '2025-01-01',
    conversionLevel: 'L2: Carcass to Main Part',
    sourceProduct: 'Carcass (ไก่ซาก)',
    outputProduct: 'Leg Quarter / น่องสะโพก',
    skuCode: 'SKU-0102-LY',
    yieldPercent: 27.40,
    minYieldPercent: 25.50,
    maxYieldPercent: 29.00,
    status: 'ACTIVE',
    version: 'V1.4',
    standardCostTHBPerKg: 46.20
  },
  {
    id: 'YD-LY-LOH-BONE',
    chickenTypeId: 'LAYER',
    chickenTypeNameTh: 'ไก่ไข่ปลดระวาง (Layer / Spent Hen)',
    breedId: 'LOHMANN_BROWN',
    breedNameTh: 'Lohmann Brown (โลห์มันน์ บราวน์)',
    weightRangeId: 'WR_LY_LIGHT',
    weightRangeLabel: '1.60 - 1.85 kg (Standard Layer)',
    plantId: 'All Plants',
    effectiveDate: '2025-01-01',
    conversionLevel: 'L4: By-Products',
    sourceProduct: 'Carcass (ไก่ซาก)',
    outputProduct: 'Chicken Frame (โครงไก่ต้มซุป)',
    skuCode: 'SKU-0109-LY',
    yieldPercent: 24.50, // Higher bone ratio
    minYieldPercent: 22.00,
    maxYieldPercent: 27.00,
    status: 'ACTIVE',
    version: 'V1.4',
    standardCostTHBPerKg: 18.00
  },

  // PARENT STOCK - Ross PS (Very heavy, high frame, high MDM trimming)
  {
    id: 'YD-PS-RPS-CARC',
    chickenTypeId: 'PARENT_STOCK',
    chickenTypeNameTh: 'พ่อแม่พันธุ์ปลด (PS / Parent Stock)',
    breedId: 'ROSS_PS',
    breedNameTh: 'Ross 308 Parent Stock (แม่พันธุ์รอสส์)',
    weightRangeId: 'WR_PS_FEMALE',
    weightRangeLabel: '3.00 - 3.80 kg (PS Female Hen)',
    plantId: 'Plant A (Saraburi)',
    effectiveDate: '2025-01-01',
    conversionLevel: 'L1: Live to Carcass',
    sourceProduct: 'Live Chicken (ไก่มีชีวิต)',
    outputProduct: 'Carcass (ไก่ซาก)',
    skuCode: 'RAW-001-PS',
    yieldPercent: 68.80,
    minYieldPercent: 66.00,
    maxYieldPercent: 71.00,
    status: 'ACTIVE',
    version: 'V1.2',
    standardCostTHBPerKg: 48.70
  },
  {
    id: 'YD-PS-RPS-TRIM',
    chickenTypeId: 'PARENT_STOCK',
    chickenTypeNameTh: 'พ่อแม่พันธุ์ปลด (PS / Parent Stock)',
    breedId: 'ROSS_PS',
    breedNameTh: 'Ross 308 Parent Stock (แม่พันธุ์รอสส์)',
    weightRangeId: 'WR_PS_FEMALE',
    weightRangeLabel: '3.00 - 3.80 kg (PS Female Hen)',
    plantId: 'Plant A (Saraburi)',
    effectiveDate: '2025-01-01',
    conversionLevel: 'L4: By-Products',
    sourceProduct: 'Carcass (ไก่ซาก)',
    outputProduct: 'เนื้อ trim / MDM สำหรับไส้กรอก',
    skuCode: 'SKU-0106',
    yieldPercent: 14.80, // Substantial mechanical deboned meat
    minYieldPercent: 13.00,
    maxYieldPercent: 16.50,
    status: 'ACTIVE',
    version: 'V1.2',
    standardCostTHBPerKg: 38.00
  },

  // SPECIALTY - Thai Native Pradu Hang Dam (High leg ratio, premium pricing)
  {
    id: 'YD-SPEC-PRADU-CARC',
    chickenTypeId: 'SPECIALTY_NATIVE',
    chickenTypeNameTh: 'ไก่พื้นเมืองและสายพันธุ์พิเศษ (Specialty & Native)',
    breedId: 'NATIVE_PRADU',
    breedNameTh: 'ประดู่หางดำ (Thai Native Pradu Hang Dam)',
    weightRangeId: 'WR_SPEC_STD',
    weightRangeLabel: '1.50 - 1.85 kg (Standard Free-Range)',
    plantId: 'Plant C (Rayong)',
    effectiveDate: '2025-01-01',
    conversionLevel: 'L1: Live to Carcass',
    sourceProduct: 'Live Chicken (ไก่มีชีวิต)',
    outputProduct: 'Carcass (ไก่ซาก)',
    skuCode: 'RAW-001-PRADU',
    yieldPercent: 67.50,
    minYieldPercent: 65.00,
    maxYieldPercent: 70.00,
    status: 'ACTIVE',
    version: 'V1.0',
    standardCostTHBPerKg: 115.50
  },
  {
    id: 'YD-SPEC-PRADU-LEG',
    chickenTypeId: 'SPECIALTY_NATIVE',
    chickenTypeNameTh: 'ไก่พื้นเมืองและสายพันธุ์พิเศษ (Specialty & Native)',
    breedId: 'NATIVE_PRADU',
    breedNameTh: 'ประดู่หางดำ (Thai Native Pradu Hang Dam)',
    weightRangeId: 'WR_SPEC_STD',
    weightRangeLabel: '1.50 - 1.85 kg (Standard Free-Range)',
    plantId: 'Plant C (Rayong)',
    effectiveDate: '2025-01-01',
    conversionLevel: 'L2: Carcass to Main Part',
    sourceProduct: 'Carcass (ไก่ซาก)',
    outputProduct: 'Leg Quarter / น่องสะโพกไก่พื้นเมือง',
    skuCode: 'SKU-0102-NAT',
    yieldPercent: 33.50, // Native chickens have strong legs
    minYieldPercent: 32.00,
    maxYieldPercent: 35.00,
    status: 'ACTIVE',
    version: 'V1.0',
    standardCostTHBPerKg: 135.00
  }
];

// Helper to get all Chicken Types with dynamic localStorage fallback
export function getStoredChickenTypes(): ChickenType[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TYPES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load chicken types from localStorage:', err);
  }
  // Initialize storage
  try {
    localStorage.setItem(STORAGE_KEY_TYPES, JSON.stringify(INITIAL_CHICKEN_TYPES));
  } catch {}
  return INITIAL_CHICKEN_TYPES;
}

// Helper to save all Chicken Types
export function saveStoredChickenTypes(types: ChickenType[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_TYPES, JSON.stringify(types));
    window.dispatchEvent(new Event('chicken-types-updated'));
  } catch (err) {
    console.error('Failed to save chicken types to localStorage:', err);
  }
}

// Helper to get Yield Rules with dynamic localStorage fallback
export function getStoredYieldRules(): DynamicYieldRule[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_YIELDS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load yield rules from localStorage:', err);
  }
  try {
    localStorage.setItem(STORAGE_KEY_YIELDS, JSON.stringify(INITIAL_YIELD_RULES));
  } catch {}
  return INITIAL_YIELD_RULES;
}

// Helper to save Yield Rules
export function saveStoredYieldRules(rules: DynamicYieldRule[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_YIELDS, JSON.stringify(rules));
    window.dispatchEvent(new Event('yield-rules-updated'));
  } catch (err) {
    console.error('Failed to save yield rules to localStorage:', err);
  }
}

// Calculate effective yield for any product given dimensions
export function getCalculatedYield(
  chickenTypeId: string,
  breedId?: string,
  productType: 'Carcass' | 'BL Breast' | 'Leg Quarter' | 'Whole Wing' | 'Skin' | 'Bone Frame' | 'Trimming' = 'Carcass',
  weightRangeId?: string,
  plantId: string = 'All Plants'
): { yieldPercent: number; standardCostTHBPerKg: number; sourceRule: string } {
  const rules = getStoredYieldRules();

  // Try finding specific rule matching Chicken Type + plant + productType
  const matchedRule = rules.find(r => 
    r.chickenTypeId === chickenTypeId &&
    (plantId === 'All Plants' || r.plantId === 'All Plants' || r.plantId === plantId) &&
    r.outputProduct.toLowerCase().includes(productType.toLowerCase())
  );

  if (matchedRule) {
    return {
      yieldPercent: matchedRule.yieldPercent,
      standardCostTHBPerKg: matchedRule.standardCostTHBPerKg,
      sourceRule: `${matchedRule.chickenTypeNameTh} (Yield ${matchedRule.yieldPercent}%)`
    };
  }

  // Fallback defaults based on Chicken Type
  if (chickenTypeId === 'LAYER') {
    switch (productType) {
      case 'Carcass': return { yieldPercent: 64.0, standardCostTHBPerKg: 43.5, sourceRule: 'Layer Default Carcass (64.0%)' };
      case 'BL Breast': return { yieldPercent: 15.0, standardCostTHBPerKg: 78.0, sourceRule: 'Layer Default Breast (15.0%)' };
      case 'Leg Quarter': return { yieldPercent: 27.0, standardCostTHBPerKg: 46.0, sourceRule: 'Layer Default Leg (27.0%)' };
      case 'Whole Wing': return { yieldPercent: 8.5, standardCostTHBPerKg: 75.0, sourceRule: 'Layer Default Wing (8.5%)' };
      case 'Bone Frame': return { yieldPercent: 25.0, standardCostTHBPerKg: 18.0, sourceRule: 'Layer Default Frame (25.0%)' };
      default: return { yieldPercent: 5.0, standardCostTHBPerKg: 30.0, sourceRule: 'Layer Other (5.0%)' };
    }
  }

  if (chickenTypeId === 'PARENT_STOCK') {
    switch (productType) {
      case 'Carcass': return { yieldPercent: 68.5, standardCostTHBPerKg: 48.9, sourceRule: 'PS Default Carcass (68.5%)' };
      case 'BL Breast': return { yieldPercent: 19.5, standardCostTHBPerKg: 88.0, sourceRule: 'PS Default Breast (19.5%)' };
      case 'Leg Quarter': return { yieldPercent: 28.5, standardCostTHBPerKg: 52.0, sourceRule: 'PS Default Leg (28.5%)' };
      case 'Whole Wing': return { yieldPercent: 8.8, standardCostTHBPerKg: 85.0, sourceRule: 'PS Default Wing (8.8%)' };
      case 'Bone Frame': return { yieldPercent: 22.0, standardCostTHBPerKg: 20.0, sourceRule: 'PS Default Frame (22.0%)' };
      default: return { yieldPercent: 6.0, standardCostTHBPerKg: 35.0, sourceRule: 'PS Other (6.0%)' };
    }
  }

  if (chickenTypeId === 'SPECIALTY_NATIVE') {
    switch (productType) {
      case 'Carcass': return { yieldPercent: 67.0, standardCostTHBPerKg: 116.0, sourceRule: 'Native Default Carcass (67.0%)' };
      case 'BL Breast': return { yieldPercent: 17.5, standardCostTHBPerKg: 155.0, sourceRule: 'Native Default Breast (17.5%)' };
      case 'Leg Quarter': return { yieldPercent: 33.0, standardCostTHBPerKg: 135.0, sourceRule: 'Native Default Leg (33.0%)' };
      case 'Whole Wing': return { yieldPercent: 10.2, standardCostTHBPerKg: 160.0, sourceRule: 'Native Default Wing (10.2%)' };
      case 'Bone Frame': return { yieldPercent: 19.0, standardCostTHBPerKg: 45.0, sourceRule: 'Native Default Frame (19.0%)' };
      default: return { yieldPercent: 4.5, standardCostTHBPerKg: 65.0, sourceRule: 'Native Other (4.5%)' };
    }
  }

  // Broiler default
  switch (productType) {
    case 'Carcass': return { yieldPercent: 72.8, standardCostTHBPerKg: 58.4, sourceRule: 'Broiler Standard Carcass (72.8%)' };
    case 'BL Breast': return { yieldPercent: 23.0, standardCostTHBPerKg: 105.0, sourceRule: 'Broiler Standard Breast (23.0%)' };
    case 'Leg Quarter': return { yieldPercent: 31.5, standardCostTHBPerKg: 59.0, sourceRule: 'Broiler Standard Leg (31.5%)' };
    case 'Whole Wing': return { yieldPercent: 9.8, standardCostTHBPerKg: 118.0, sourceRule: 'Broiler Standard Wing (9.8%)' };
    case 'Bone Frame': return { yieldPercent: 18.0, standardCostTHBPerKg: 22.0, sourceRule: 'Broiler Standard Frame (18.0%)' };
    default: return { yieldPercent: 5.5, standardCostTHBPerKg: 45.0, sourceRule: 'Broiler Other (5.5%)' };
  }
}

export interface ChickenTypeProductMapping {
  id: string;
  chickenTypeId: string;
  productId: string; // The output product ID
  allowedForProduction: boolean;
  allowedForDirectSale: boolean;
  allowedForSubstituteSupply: boolean;
  effectiveDate: string;
  status: 'ACTIVE' | 'INACTIVE';
}

const STORAGE_KEY_MAPPING = 'poultry_dynamic_chicken_type_mapping_v1';

export const INITIAL_CHICKEN_TYPE_MAPPINGS: ChickenTypeProductMapping[] = [
  {
    id: 'MAP-01',
    chickenTypeId: 'BROILER',
    productId: 'Breast A',
    allowedForProduction: true,
    allowedForDirectSale: true,
    allowedForSubstituteSupply: false,
    effectiveDate: '2027-01-01',
    status: 'ACTIVE'
  },
  {
    id: 'MAP-02',
    chickenTypeId: 'LAYER',
    productId: 'Breast A',
    allowedForProduction: false,
    allowedForDirectSale: false,
    allowedForSubstituteSupply: false,
    effectiveDate: '2027-01-01',
    status: 'ACTIVE'
  },
  {
    id: 'MAP-03',
    chickenTypeId: 'LAYER',
    productId: 'Layer Breast',
    allowedForProduction: true,
    allowedForDirectSale: true,
    allowedForSubstituteSupply: false,
    effectiveDate: '2027-01-01',
    status: 'ACTIVE'
  },
  {
    id: 'MAP-04',
    chickenTypeId: 'PARENT_STOCK',
    productId: 'PS Whole Chicken',
    allowedForProduction: true,
    allowedForDirectSale: true,
    allowedForSubstituteSupply: true,
    effectiveDate: '2027-01-01',
    status: 'ACTIVE'
  }
];

export const getStoredChickenTypeMappings = (): ChickenTypeProductMapping[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MAPPING);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return INITIAL_CHICKEN_TYPE_MAPPINGS;
};

export const saveStoredChickenTypeMappings = (mappings: ChickenTypeProductMapping[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_MAPPING, JSON.stringify(mappings));
  } catch (e) {}
};
