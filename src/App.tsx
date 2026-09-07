import { useMemo, useState } from 'react';
import {
  Activity, Bell, Boxes, BriefcaseBusiness, CalendarDays, ChevronDown,
  ClipboardCheck, FileBarChart, Gauge, LayoutDashboard, Menu, PackageCheck,
  PanelLeftClose, Search, Settings, ShieldCheck, ShoppingCart, SlidersHorizontal,
  Target, Tractor, TrendingUp, UserRound, UsersRound, Warehouse,
} from 'lucide-react';
import { allocationRows as initialAllocations, intakePlans, salesActions } from './data/mockData';
import type { AllocationRow } from './types';

type Page = 'dashboard' | 'intake' | 'yield' | 'balance' | 'allocation' | 'actions' | 'quotation' | 'contract' | 'erp' | 'reports' | 'master';

const number = new Intl.NumberFormat('th-TH', { maximumFractionDigits: 0 });
const oneDecimal = new Intl.NumberFormat('th-TH', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const navGroups = [
  { label: 'ภาพรวม', items: [{ id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard }] },
  { label: 'วางแผนและจัดสรร', items: [
    { id: 'intake', label: 'แผนไก่เข้าโรงงาน', icon: Tractor },
    { id: 'yield', label: 'Supply & Yield', icon: PackageCheck },
    { id: 'balance', label: 'Demand–Supply Balance', icon: SlidersHorizontal },
    { id: 'allocation', label: 'จัดสรรการขาย', icon: Boxes },
  ]},
  { label: 'บริหารการขาย', items: [
    { id: 'actions', label: 'Sales Action', icon: Target },
    { id: 'quotation', label: 'Quotation', icon: FileBarChart },
    { id: 'contract', label: 'Sales Contract', icon: BriefcaseBusiness },
    { id: 'erp', label: 'SO Interface', icon: ShoppingCart },
  ]},
  { label: 'ข้อมูลและควบคุม', items: [
    { id: 'reports', label: 'รายงานและ KPI', icon: Gauge },
    { id: 'master', label: 'Master Data', icon: Settings },
  ]},
] as const;

const pageTitles: Record<Page, [string, string]> = {
  dashboard: ['Executive Dashboard', 'ภาพรวมแผน การจัดสรร และสถานะการขาย'],
  intake: ['แผนไก่เข้าโรงงาน', 'Chicken Intake Plan จากฟาร์ม แยกตามชนิดไก่และ Revision'],
  yield: ['Supply & Yield', 'คำนวณ Live KG, Yield และปริมาณสินค้าที่คาดว่าจะผลิตได้'],
  balance: ['Demand–Supply Balance', 'เปรียบเทียบ Available Supply กับ Demand รายสินค้า'],
  allocation: ['จัดสรรการขาย', 'จัดสรร Available Supply ให้แต่ละช่องทางภายใต้ Control Rule'],
  actions: ['Sales Action', 'กระจายเป้าหมายสู่ผู้ขาย ติดตาม Prospect ถึง Contract'],
  quotation: ['Quotation', 'ใบเสนอราคา การอนุมัติราคา และ Floor Price Control'],
  contract: ['Sales Contract', 'สัญญาขายและเงื่อนไขก่อนสร้าง Sales Order'],
  erp: ['SO Interface', 'เตรียมและติดตามข้อมูลเชื่อมต่อ Oracle E-Business Suite R12'],
  reports: ['รายงานและ KPI', 'วิเคราะห์ Plan, Allocation, Actual และ Root Cause'],
  master: ['Master Data', 'ข้อมูลสินค้า ลูกค้า ช่องทาง Yield Profile และสิทธิ์ผู้ใช้งาน'],
};

function available(row: AllocationRow) {
  return row.production + row.stock + row.transfer - row.reserved - row.safety;
}

function allocated(row: AllocationRow) {
  return row.exportKg + row.fscKg + row.dmsKg + row.coSaleKg;
}

function StatusPill({ value }: { value: string }) {
  const key = value.toLowerCase().replaceAll(' ', '-');
  return <span className={`status status-${key}`}>{value}</span>;
}

function MetricCard({ label, value, note, tone, icon: Icon }: { label: string; value: string; note: string; tone: string; icon: typeof Activity }) {
  return <article className="metric-card">
    <div className={`metric-icon ${tone}`}><Icon size={21} /></div>
    <div className="metric-copy"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
  </article>;
}

function Dashboard({ rows }: { rows: AllocationRow[] }) {
  const production = rows.reduce((s, r) => s + r.production, 0);
  const supply = rows.reduce((s, r) => s + available(r), 0);
  const demand = rows.reduce((s, r) => s + r.demand, 0);
  const alloc = rows.reduce((s, r) => s + allocated(r), 0);
  const fill = alloc / demand * 100;
  return <>
    <section className="metric-grid">
      <MetricCard label="แผนผลิตรวม" value={`${number.format(production)} KG`} note="สัปดาห์ปัจจุบัน" tone="green" icon={Warehouse} />
      <MetricCard label="Available Supply" value={`${number.format(supply)} KG`} note="หลังหัก Reserved & Safety" tone="blue" icon={Boxes} />
      <MetricCard label="Demand รวม" value={`${number.format(demand)} KG`} note="Confirmed + Forecast" tone="amber" icon={TrendingUp} />
      <MetricCard label="Allocation Coverage" value={`${oneDecimal.format(fill)}%`} note={`${number.format(alloc)} KG จัดสรรแล้ว`} tone="purple" icon={Target} />
    </section>
    <section className="dashboard-grid">
      <article className="card span-2">
        <div className="card-head"><div><h3>Demand–Supply by Product</h3><p>หน่วย: กิโลกรัม</p></div><button className="text-button">ดูรายละเอียด</button></div>
        <div className="bar-chart">
          {rows.map(r => <div className="bar-row" key={r.code}>
            <div className="bar-label"><b>{r.category}</b><span>{r.name}</span></div>
            <div className="bar-track"><i className="supply-bar" style={{ width: `${Math.min(100, available(r) / 380)}%` }} /><i className="demand-marker" style={{ left: `${Math.min(98, r.demand / 380)}%` }} /></div>
            <strong className={available(r) - r.demand < 0 ? 'negative' : 'positive'}>{available(r) - r.demand >= 0 ? '+' : ''}{number.format(available(r) - r.demand)}</strong>
          </div>)}
        </div>
        <div className="legend"><span><i className="legend-supply" />Available Supply</span><span><i className="legend-demand" />Demand</span></div>
      </article>
      <article className="card">
        <div className="card-head"><div><h3>Planning Alerts</h3><p>รายการที่ต้องดำเนินการ</p></div><span className="count">4</span></div>
        <div className="alert-list">
          <div className="alert-item danger"><b>Supply Shortage</b><span>อกไก่ไม่มีกระดูก ขาด 3,000 KG</span><small>ต้องจัดการวันนี้</small></div>
          <div className="alert-item warning"><b>Allocation เกิน Supply</b><span>น่องสะโพก +800 KG</span><small>รอตรวจสอบ</small></div>
          <div className="alert-item info"><b>Plan รออนุมัติ</b><span>Chicken Intake 09/09/2026</span><small>1 รายการ</small></div>
          <div className="alert-item neutral"><b>Sales Action ใกล้ครบกำหนด</b><span>3 กิจกรรม ภายใน 2 วัน</span><small>ติดตามผู้รับผิดชอบ</small></div>
        </div>
      </article>
      <article className="card span-2">
        <div className="card-head"><div><h3>Allocation by Channel</h3><p>สัดส่วนการจัดสรรสัปดาห์นี้</p></div><button className="filter-button">Week 37 <ChevronDown size={15}/></button></div>
        <div className="channel-chart">
          {[['Export',24800,35],['FSC',24400,34],['DMS',21500,30],['Co-Sale',11000,16]].map(([name,kg,pct]) => <div className="channel" key={name as string}>
            <div><b>{name}</b><span>{number.format(kg as number)} KG</span></div><div className="progress"><i style={{width:`${pct}%`}} /></div><strong>{pct}%</strong>
          </div>)}
        </div>
      </article>
      <article className="card">
        <div className="card-head"><div><h3>Approval Queue</h3><p>งานรอการอนุมัติ</p></div></div>
        <div className="approval-list">
          <div><ClipboardCheck size={18}/><span><b>Yield Profile REV.03</b><small>Raw Meat · 2 ชั่วโมงที่แล้ว</small></span><button>ตรวจสอบ</button></div>
          <div><ShieldCheck size={18}/><span><b>Allocation WK37</b><small>ทุกช่องทาง · วันนี้ 10:20</small></span><button>ตรวจสอบ</button></div>
          <div><FileBarChart size={18}/><span><b>Quotation QT-0182</b><small>ต่ำกว่า Floor Price</small></span><button>ตรวจสอบ</button></div>
        </div>
      </article>
    </section>
  </>;
}

function IntakePage() {
  const [plans, setPlans] = useState(intakePlans);
  const [editing, setEditing] = useState(false);
  const totalBirds = plans.reduce((s, p) => s + p.birds, 0);
  const liveKg = plans.reduce((s, p) => s + p.birds * p.avgWeight, 0);
  return <section className="card table-card">
    <div className="card-head toolbar"><div><h3>Chicken Intake Plan · Week 37</h3><p>{number.format(totalBirds)} ตัว · Live KG {number.format(liveKg)}</p></div><div className="toolbar-actions"><button className="secondary">นำเข้า Excel</button><button className="primary" onClick={() => setEditing(v => !v)}>{editing ? 'บันทึกแผน' : '+ เพิ่มแผนไก่เข้า'}</button></div></div>
    <div className="table-wrap"><table><thead><tr><th>Plan ID</th><th>วันที่เข้าโรงงาน</th><th>ฟาร์ม</th><th>ชนิดไก่</th><th className="num">จำนวน (ตัว)</th><th className="num">นน.เฉลี่ย</th><th className="num">Live KG</th><th>Revision</th><th>สถานะ</th></tr></thead>
    <tbody>{plans.map((p, index) => <tr key={p.id}><td><b>{p.id}</b></td><td>{new Date(p.date).toLocaleDateString('th-TH')}</td><td>{p.farm}</td><td>{p.chickenType}</td><td className="num">{editing ? <input value={p.birds} type="number" onChange={e => setPlans(current => current.map((x,i)=>i===index?{...x,birds:+e.target.value}:x))}/> : number.format(p.birds)}</td><td className="num">{editing ? <input value={p.avgWeight} step="0.01" type="number" onChange={e => setPlans(current => current.map((x,i)=>i===index?{...x,avgWeight:+e.target.value}:x))}/> : p.avgWeight.toFixed(2)}</td><td className="num strong">{number.format(p.birds * p.avgWeight)}</td><td>{p.revision}</td><td><StatusPill value={p.status}/></td></tr>)}</tbody></table></div>
    <div className="audit-note"><ShieldCheck size={16}/> แผนที่อนุมัติแล้วจะสร้าง Revision ใหม่เมื่อมีการแก้ไข และเก็บประวัติเดิมไว้เสมอ</div>
  </section>;
}

function YieldPage({ rows }: { rows: AllocationRow[] }) {
  const sourceKg = 236580;
  return <section className="card table-card"><div className="card-head toolbar"><div><h3>Yield Profile · Raw Meat REV.03</h3><p>Source Live KG: {number.format(sourceKg)} · Effective 01/09/2026</p></div><div className="toolbar-actions"><button className="secondary">เปรียบเทียบ Revision</button><button className="primary">ส่งอนุมัติ</button></div></div>
    <div className="table-wrap"><table><thead><tr><th>รหัสสินค้า</th><th>สินค้า</th><th>กลุ่ม</th><th className="num">Yield %</th><th className="num">Expected Supply</th><th className="num">Variance vs Std.</th><th>สถานะ</th></tr></thead><tbody>{rows.map((r,i)=>{const y=r.production/sourceKg*100; return <tr key={r.code}><td>{r.code}</td><td><b>{r.name}</b></td><td>{r.category}</td><td className="num">{y.toFixed(2)}%</td><td className="num strong">{number.format(r.production)} KG</td><td className={`num ${i===0?'negative':'positive'}`}>{i===0?'-0.42%':`+${(0.12+i*.05).toFixed(2)}%`}</td><td><StatusPill value={i===0?'Review':'Within range'}/></td></tr>})}</tbody></table></div>
  </section>;
}

function BalancePage({ rows }: { rows: AllocationRow[] }) {
  return <section className="card table-card"><div className="card-head toolbar"><div><h3>Demand–Supply Balance · Week 37</h3><p>สูตร: Production + Stock + Transfer − Reserved − Safety Stock</p></div><div className="toolbar-actions"><button className="secondary">Export</button><button className="primary">สร้าง Allocation Plan</button></div></div>
    <div className="table-wrap"><table><thead><tr><th>สินค้า</th><th className="num">Production</th><th className="num">Stock</th><th className="num">Transfer</th><th className="num">Reserved</th><th className="num">Safety</th><th className="num">Available</th><th className="num">Demand</th><th className="num">Balance</th></tr></thead><tbody>{rows.map(r=>{const a=available(r), b=a-r.demand; return <tr key={r.code}><td><b>{r.name}</b><small className="cell-sub">{r.code}</small></td><td className="num">{number.format(r.production)}</td><td className="num">{number.format(r.stock)}</td><td className="num">{number.format(r.transfer)}</td><td className="num">({number.format(r.reserved)})</td><td className="num">({number.format(r.safety)})</td><td className="num strong">{number.format(a)}</td><td className="num">{number.format(r.demand)}</td><td className={`num strong ${b<0?'negative':'positive'}`}>{b>=0?'+':''}{number.format(b)}</td></tr>})}</tbody></table></div>
  </section>;
}

function AllocationPage({ rows, setRows }: { rows: AllocationRow[]; setRows: React.Dispatch<React.SetStateAction<AllocationRow[]>> }) {
  const [edit, setEdit] = useState(false);
  const update = (idx:number, field:keyof Pick<AllocationRow,'exportKg'|'fscKg'|'dmsKg'|'coSaleKg'>, value:number) => setRows(old=>old.map((r,i)=>i===idx?{...r,[field]:value}:r));
  return <section className="card table-card"><div className="card-head toolbar"><div><h3>Allocation Plan · WK37 · REV.01</h3><p>จัดสรรตามสินค้าและ Sales Channel</p></div><div className="toolbar-actions"><button className="secondary">บันทึก Draft</button><button className="primary" onClick={()=>setEdit(v=>!v)}>{edit?'ตรวจสอบ Control':'แก้ไข Allocation'}</button></div></div>
    <div className="table-wrap"><table><thead><tr><th>สินค้า</th><th className="num">Available</th><th className="num">Export</th><th className="num">FSC</th><th className="num">DMS</th><th className="num">Co-Sale</th><th className="num">Allocated</th><th className="num">คงเหลือ</th><th>Control</th></tr></thead><tbody>{rows.map((r,idx)=>{const fields=['exportKg','fscKg','dmsKg','coSaleKg'] as const; const remaining=available(r)-allocated(r); return <tr key={r.code}><td><b>{r.name}</b><small className="cell-sub">{r.category}</small></td><td className="num strong">{number.format(available(r))}</td>{fields.map(f=><td className="num" key={f}>{edit?<input type="number" value={r[f]} onChange={e=>update(idx,f,+e.target.value)}/>:number.format(r[f])}</td>)}<td className="num strong">{number.format(allocated(r))}</td><td className={`num strong ${remaining<0?'negative':'positive'}`}>{number.format(remaining)}</td><td><StatusPill value={remaining<0?'Over':'Pass'}/></td></tr>})}</tbody></table></div>
    <div className="audit-note"><ShieldCheck size={16}/> ระบบไม่อนุญาตให้ส่งอนุมัติเมื่อ Allocation มากกว่า Available Supply</div>
  </section>;
}

function ActionsPage() {
  return <section className="card table-card"><div className="card-head toolbar"><div><h3>Sales Action Pipeline</h3><p>เปลี่ยน Allocation เป็นแผนติดตามลูกค้าและยอดขายจริง</p></div><div className="toolbar-actions"><button className="secondary">มุมมอง Kanban</button><button className="primary">+ สร้าง Sales Action</button></div></div>
    <div className="table-wrap"><table><thead><tr><th>Action ID</th><th>ลูกค้า</th><th>ผู้รับผิดชอบ</th><th>สินค้า</th><th className="num">เป้าหมาย KG</th><th>ครบกำหนด</th><th>Stage</th><th>Progress</th></tr></thead><tbody>{salesActions.map((a,i)=><tr key={a.id}><td><b>{a.id}</b></td><td>{a.customer}</td><td><span className="person"><UserRound size={15}/>{a.owner}</span></td><td>{a.product}</td><td className="num strong">{number.format(a.targetKg)}</td><td>{new Date(a.dueDate).toLocaleDateString('th-TH')}</td><td><StatusPill value={a.stage}/></td><td><div className="mini-progress"><i style={{width:`${[65,35,90,15][i]}%`}}/></div></td></tr>)}</tbody></table></div>
  </section>;
}

function Placeholder({ page }: { page: Page }) {
  const messages: Partial<Record<Page,string[]>> = {
    quotation: ['Quotation Register','Floor Price Control','Approval Matrix','Revision History'],
    contract: ['Contract Register','Commitment by Customer','Validity & Terms','Contract to SO'],
    erp: ['SO Draft Queue','Oracle R12 Mapping','Interface Status','Error & Retry Log'],
    reports: ['Plan vs Actual','Yield Variance','Allocation Performance','Root Cause Analysis'],
    master: ['Product & UOM','Customer & Channel','Chicken Type / Breed','Yield Profile'],
  };
  return <div className="module-grid">{(messages[page] ?? []).map((m,i)=><article className="module-card" key={m}><div className={`module-icon m${i}`}><Settings size={22}/></div><h3>{m}</h3><p>โครงสร้างโมดูลพร้อมสำหรับเชื่อมฐานข้อมูลและกำหนด Workflow ใน Phase ถัดไป</p><button>เปิดโมดูล →</button></article>)}</div>;
}

export default function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [rows, setRows] = useState(initialAllocations);
  const [query, setQuery] = useState('');
  const title = pageTitles[page];
  const content = useMemo(() => {
    if (page === 'dashboard') return <Dashboard rows={rows}/>;
    if (page === 'intake') return <IntakePage/>;
    if (page === 'yield') return <YieldPage rows={rows}/>;
    if (page === 'balance') return <BalancePage rows={rows}/>;
    if (page === 'allocation') return <AllocationPage rows={rows} setRows={setRows}/>;
    if (page === 'actions') return <ActionsPage/>;
    return <Placeholder page={page}/>;
  }, [page, rows]);

  return <div className={`app ${collapsed?'collapsed':''}`}>
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Activity size={22}/></div><div><b>SAPE</b><span>Planning & Execution</span></div></div>
      <nav>{navGroups.map(g=><div className="nav-group" key={g.label}><small>{g.label}</small>{g.items.map(item=>{const Icon=item.icon; return <button className={page===item.id?'active':''} key={item.id} onClick={()=>setPage(item.id as Page)} title={item.label}><Icon size={19}/><span>{item.label}</span>{item.id==='allocation'&&<em>2</em>}</button>})}</div>)}</nav>
      <div className="system-state"><span className="live-dot"/><div><b>System Online</b><small>ข้อมูลล่าสุด 14:32</small></div></div>
    </aside>
    <main>
      <header className="topbar">
        <button className="icon-button" onClick={()=>setCollapsed(v=>!v)} aria-label="ย่อเมนู">{collapsed?<Menu/>:<PanelLeftClose/>}</button>
        <div className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ค้นหาแผน สินค้า ลูกค้า หรือเลขที่เอกสาร..."/><kbd>⌘ K</kbd></div>
        <button className="period"><CalendarDays size={17}/> ก.ย. 2026 <ChevronDown size={14}/></button>
        <button className="icon-button notification"><Bell size={19}/><i/></button>
        <div className="profile"><div>KS</div><span><b>กัญญาวีร์ ส.</b><small>Sales Coordination Manager</small></span><ChevronDown size={14}/></div>
      </header>
      <div className="content">
        <div className="page-head"><div><p>SAPE / {title[0]}</p><h1>{title[0]}</h1><span>{title[1]}</span></div><div className="page-actions"><button className="secondary"><UsersRound size={16}/> Share</button><button className="primary"><Activity size={16}/> Refresh Data</button></div></div>
        {query && <div className="search-notice">กำลังค้นหา “{query}” — Global Search จะเชื่อมข้อมูลจริงใน Integration Phase</div>}
        {content}
      </div>
    </main>
  </div>;
}
