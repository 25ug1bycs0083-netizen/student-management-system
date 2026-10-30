import { LayoutDashboard, LogOut, Menu, Users, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = [{ to: '/', label: 'Dashboard', icon: LayoutDashboard }, { to: '/students', label: 'Students', icon: Users }];
  function signOut() { logout(); navigate('/login'); }
  return <div className="min-h-screen bg-slate-50">
    <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-950 p-5 text-white transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="mb-10 flex items-center justify-between"><Link to="/" className="text-xl font-bold tracking-tight">Edu<span className="text-blue-400">Flow</span></Link><button className="lg:hidden" onClick={() => setOpen(false)}><X size={20} /></button></div>
      <nav className="space-y-2">{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}><Icon size={18} />{label}</NavLink>)}</nav>
      <button onClick={signOut} className="absolute bottom-6 left-5 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800"><LogOut size={18} />Sign out</button>
    </aside>
    <main className="lg:pl-64"><header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8"><button className="lg:hidden" onClick={() => setOpen(true)}><Menu /></button><div className="ml-auto flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-sm font-semibold">{user?.name}</p><p className="text-xs capitalize text-slate-500">{user?.role}</p></div><div className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 font-semibold text-blue-700">{user?.name?.[0]?.toUpperCase()}</div></div></header><section className="p-5 sm:p-8"><Outlet /></section></main>
  </div>;
}
