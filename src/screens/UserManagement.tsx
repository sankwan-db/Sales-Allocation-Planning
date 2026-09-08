import React, { useState } from 'react';

type UserRole = 
  | 'Sales'
  | 'Sales Manager'
  | 'Sales Coordination'
  | 'Planning'
  | 'Production'
  | 'Warehouse'
  | 'Finance'
  | 'Legal'
  | 'Management'
  | 'Admin';

interface SystemUser {
  id: string;
  employeeName: string;
  employeeId: string;
  userId: string;
  email: string;
  role: UserRole;
  channel: string;
  team: string;
  plant: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  lastLogin: string;
  avatarColor: string;
}

const initialUsers: SystemUser[] = [
  { id: '1', employeeName: 'สมชาย ขายดี', employeeId: 'EMP-10021', userId: 'somchai.k', email: 'somchai.k@company.com', role: 'Sales', channel: 'Industrial', team: 'B2B Key Accounts', plant: 'P01 Rayong', status: 'Active', lastLogin: 'Today, 09:15 AM', avatarColor: 'bg-blue-600' },
  { id: '2', employeeName: 'สุดาพร รับยอด', employeeId: 'EMP-10045', userId: 'sudaporn.r', email: 'sudaporn.r@company.com', role: 'Sales Manager', channel: 'Domestic', team: 'Domestic MT', plant: 'All Plants', status: 'Active', lastLogin: 'Today, 08:30 AM', avatarColor: 'bg-indigo-600' },
  { id: '3', employeeName: 'วิชัย มั่นคง', employeeId: 'EMP-10088', userId: 'wichai.m', email: 'wichai.m@company.com', role: 'Sales', channel: 'Export', team: 'Export ASIA', plant: 'P02 Saraburi', status: 'Active', lastLogin: 'Yesterday', avatarColor: 'bg-teal-600' },
  { id: '4', employeeName: 'กิตติพงษ์ ประสานงาน', employeeId: 'EMP-10112', userId: 'kittipong.p', email: 'kittipong.p@company.com', role: 'Sales Coordination', channel: 'All', team: 'Central Sales Ops', plant: 'All Plants', status: 'Active', lastLogin: 'Today, 10:02 AM', avatarColor: 'bg-cyan-600' },
  { id: '5', employeeName: 'พงศ์ศธร วางแผน', employeeId: 'EMP-10201', userId: 'pongsathorn.w', email: 'pongsathorn.w@company.com', role: 'Planning', channel: 'All', team: 'S&OP Central Planning', plant: 'All Plants', status: 'Active', lastLogin: 'Today, 07:45 AM', avatarColor: 'bg-amber-600' },
  { id: '6', employeeName: 'ณรงค์ การผลิต', employeeId: 'EMP-10334', userId: 'narong.p', email: 'narong.p@company.com', role: 'Production', channel: 'All', team: 'Slaughter & Deboning Plant 1', plant: 'P01 Rayong', status: 'Active', lastLogin: '2 days ago', avatarColor: 'bg-orange-600' },
  { id: '7', employeeName: 'อำนาจ คลังสินค้า', employeeId: 'EMP-10405', userId: 'amnat.w', email: 'amnat.w@company.com', role: 'Warehouse', channel: 'All', team: 'Finished Goods Logistics', plant: 'P01 Rayong', status: 'Active', lastLogin: 'Today, 06:30 AM', avatarColor: 'bg-emerald-600' },
  { id: '8', employeeName: 'จารุวรรณ การเงิน', employeeId: 'EMP-10512', userId: 'jaruwan.f', email: 'jaruwan.f@company.com', role: 'Finance', channel: 'All', team: 'Credit Control & Risk', plant: 'HQ Bangkok', status: 'Active', lastLogin: 'Today, 09:40 AM', avatarColor: 'bg-purple-600' },
  { id: '9', employeeName: 'นิติกร กฎหมาย', employeeId: 'EMP-10603', userId: 'nitikorn.l', email: 'nitikorn.l@company.com', role: 'Legal', channel: 'All', team: 'Corporate Contracts', plant: 'HQ Bangkok', status: 'Active', lastLogin: '3 days ago', avatarColor: 'bg-slate-700' },
  { id: '10', employeeName: 'ดร.ธนินท์ กรรณบริหาร', employeeId: 'EMP-10001', userId: 'thanin.k', email: 'thanin.k@company.com', role: 'Management', channel: 'All', team: 'Executive Board', plant: 'All Plants', status: 'Active', lastLogin: 'Today, 10:15 AM', avatarColor: 'bg-rose-700' },
  { id: '11', employeeName: 'สุรชัย แอดมิน', employeeId: 'EMP-10999', userId: 'surachai.admin', email: 'admin@company.com', role: 'Admin', channel: 'All', team: 'Enterprise IT & Security', plant: 'All Plants', status: 'Active', lastLogin: 'Just now', avatarColor: 'bg-red-600' },
];

export default function UserManagement() {
  const [users, setUsers] = useState<SystemUser[]>(initialUsers);
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [plantFilter, setPlantFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const roles: UserRole[] = [
    'Sales',
    'Sales Manager',
    'Sales Coordination',
    'Planning',
    'Production',
    'Warehouse',
    'Finance',
    'Legal',
    'Management',
    'Admin',
  ];

  const filteredUsers = users.filter(u => {
    const matchRole = selectedRole === 'All' || u.role === selectedRole;
    const matchPlant = plantFilter === 'All' || u.plant.includes(plantFilter);
    const matchSearch = u.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.team.toLowerCase().includes(searchTerm.toLowerCase());
    return matchRole && matchPlant && matchSearch;
  });

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-900 border-red-300';
      case 'Management':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      case 'Legal':
        return 'bg-slate-200 text-slate-900 border-slate-300';
      case 'Finance':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Planning':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Sales Manager':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'Sales':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Sales Coordination':
        return 'bg-cyan-100 text-cyan-900 border-cyan-300';
      case 'Production':
        return 'bg-orange-100 text-orange-900 border-orange-300';
      case 'Warehouse':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-surface-container text-on-surface';
    }
  };

  const toggleStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Inactive' : 'Active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-surface overflow-hidden">
      {/* Header */}
      <section className="bg-surface-container-lowest border-b border-outline-variant px-space-2xl py-space-md shrink-0">
        <div className="flex flex-col mb-3">
          <div className="flex items-center space-x-2 font-label-sm text-label-sm text-on-surface-variant mb-0.5">
            <span>จัดการระบบ (Administration)</span>
            <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            <span className="text-on-surface font-semibold">User & Role Management</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">User & Role Management</h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                จัดการบัญชีผู้ใช้งาน, กำหนดสิทธิ์บทบาท (10 System Roles), ช่องทางการขาย และขอบเขตโรงงานที่รับผิดชอบ
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowModal(true)}
                className="h-8 px-3 text-xs font-semibold text-white bg-primary hover:bg-inverse-surface rounded flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">person_add</span>
                <span>Add New User</span>
              </button>
            </div>
          </div>
        </div>

        {/* Roles Filter Pills */}
        <div className="flex items-center gap-1.5 border-b border-outline-variant pb-2 overflow-x-auto">
          <button
            onClick={() => setSelectedRole('All')}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedRole === 'All' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            All Roles ({users.length})
          </button>
          {roles.map(r => (
            <button
              key={r}
              onClick={() => setSelectedRole(r)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedRole === r ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {r} ({users.filter(u => u.role === r).length})
            </button>
          ))}
        </div>

        {/* Search & Secondary Filter */}
        <div className="flex flex-wrap items-center gap-3 mt-3">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Employee, User ID or Team..." 
              className="w-full h-8 pl-9 pr-3 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <select 
            value={plantFilter}
            onChange={(e) => setPlantFilter(e.target.value)}
            className="h-8 py-0 pl-2 pr-7 bg-surface border border-outline-variant rounded font-body-sm text-body-sm text-on-surface"
          >
            <option value="All">Plant: All Plants</option>
            <option value="P01">P01 Rayong</option>
            <option value="P02">P02 Saraburi</option>
            <option value="HQ">HQ Bangkok</option>
          </select>
          <div className="ml-auto text-xs text-on-surface-variant">
            Active Accounts: <span className="font-bold text-emerald-700">{users.filter(u => u.status === 'Active').length}</span>
          </div>
        </div>
      </section>

      {/* Main Table */}
      <section className="flex-1 overflow-auto custom-scrollbar relative bg-surface-container-lowest p-space-2xl">
        <div className="bg-surface border border-outline-variant rounded-lg shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="bg-surface-container text-on-surface-variant font-badge-caps text-[10px] font-bold uppercase tracking-wider border-b border-outline-variant">
              <tr className="h-9">
                <th className="px-4 w-52 sticky left-0 z-10 bg-surface-container border-r border-outline-variant">Employee</th>
                <th className="px-4 w-32 border-r border-outline-variant font-mono">User ID</th>
                <th className="px-4 w-40 border-r border-outline-variant">Role</th>
                <th className="px-4 w-28 border-r border-outline-variant">Channel</th>
                <th className="px-4 w-48 border-r border-outline-variant">Team</th>
                <th className="px-4 w-32 border-r border-outline-variant">Plant</th>
                <th className="px-4 w-32 border-r border-outline-variant">Last Login</th>
                <th className="px-4 w-24 text-center border-r border-outline-variant">Status</th>
                <th className="px-4 w-24 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-data-mono-num text-body-sm">
              {filteredUsers.map((row) => (
                <tr key={row.id} className="h-12 hover:bg-surface-container-low transition-colors group">
                  <td className="px-4 sticky left-0 z-10 bg-surface group-hover:bg-surface-container-low border-r border-outline-variant/50">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full ${row.avatarColor} text-white flex items-center justify-center font-bold text-xs shrink-0`}>
                        {row.employeeName.charAt(0)}
                      </div>
                      <div className="truncate">
                        <div className="font-body-sm font-semibold text-on-surface leading-tight">{row.employeeName}</div>
                        <div className="text-[11px] text-on-surface-variant font-mono">{row.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 font-mono font-medium text-primary border-r border-outline-variant/50">
                    {row.userId}
                  </td>
                  <td className="px-4 border-r border-outline-variant/50 font-sans">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${getRoleBadge(row.role)}`}>
                      {row.role}
                    </span>
                  </td>
                  <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">
                    {row.channel}
                  </td>
                  <td className="px-4 font-body-sm text-on-surface border-r border-outline-variant/50 font-medium">
                    {row.team}
                  </td>
                  <td className="px-4 font-body-sm text-on-surface-variant border-r border-outline-variant/50">
                    {row.plant}
                  </td>
                  <td className="px-4 text-xs text-on-surface-variant border-r border-outline-variant/50">
                    {row.lastLogin}
                  </td>
                  <td className="px-4 text-center border-r border-outline-variant/50">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      row.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        onClick={() => toggleStatus(row.id)}
                        className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                        title="Toggle status"
                      >
                        <span className="material-symbols-outlined text-[17px]">lock_reset</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg border border-outline-variant shadow-lg max-w-lg w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant mb-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Add System User</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const name = (form.elements.namedItem('name') as HTMLInputElement).value;
              const empId = (form.elements.namedItem('empId') as HTMLInputElement).value;
              const uid = (form.elements.namedItem('uid') as HTMLInputElement).value;
              const role = (form.elements.namedItem('role') as HTMLSelectElement).value as UserRole;
              const ch = (form.elements.namedItem('ch') as HTMLSelectElement).value;
              const tm = (form.elements.namedItem('tm') as HTMLInputElement).value;
              const pl = (form.elements.namedItem('pl') as HTMLSelectElement).value;

              setUsers([...users, {
                id: String(Date.now()),
                employeeName: name,
                employeeId: empId,
                userId: uid,
                email: `${uid}@company.com`,
                role: role,
                channel: ch,
                team: tm,
                plant: pl,
                status: 'Active',
                lastLogin: 'Never',
                avatarColor: 'bg-primary',
              }]);
              setShowModal(false);
            }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Employee Full Name</label>
                  <input name="name" required placeholder="ชื่อ-นามสกุล พนักงาน" className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Employee ID</label>
                  <input name="empId" required placeholder="EMP-XXXXX" className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">User ID (Username)</label>
                  <input name="uid" required placeholder="firstname.l" className="w-full h-8 px-2.5 bg-surface border border-outline-variant rounded text-sm font-mono" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Role</label>
                  <select name="role" className="w-full h-8 px-2 bg-surface border border-outline-variant rounded text-sm">
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Channel</label>
                  <select name="ch" className="w-full h-8 px-2 bg-surface border border-outline-variant rounded text-sm">
                    <option value="All">All Channels</option>
                    <option value="Domestic">Domestic</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Export">Export</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Team</label>
                  <input name="tm" required placeholder="e.g. Domestic MT" className="w-full h-8 px-2 bg-surface border border-outline-variant rounded text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Plant</label>
                  <select name="pl" className="w-full h-8 px-2 bg-surface border border-outline-variant rounded text-sm">
                    <option value="All Plants">All Plants</option>
                    <option value="P01 Rayong">P01 Rayong</option>
                    <option value="P02 Saraburi">P02 Saraburi</option>
                    <option value="HQ Bangkok">HQ Bangkok</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-outline-variant">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 text-xs font-semibold text-on-surface-variant bg-surface-container rounded hover:bg-surface-container-high">Cancel</button>
                <button type="submit" className="px-4 py-1.5 text-xs font-semibold text-white bg-primary rounded hover:bg-inverse-surface shadow-sm">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
