import { ArrowUpRight, BookOpen, GraduationCap, UsersRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const cards = [{ label: 'Total students', value: '—', icon: GraduationCap }, { label: 'Total teachers', value: '—', icon: UsersRound }, { label: 'Active courses', value: '—', icon: BookOpen }];
  return <><div className="mb-8"><p className="mb-2 text-sm font-medium text-blue-600">Overview</p><h1 className="text-3xl font-bold text-slate-900">Good morning, {user?.name?.split(' ')[0]}</h1><p className="mt-2 text-slate-500">Your institution's activity will appear here as data is connected.</p></div><div className="grid gap-5 md:grid-cols-3">{cards.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-6 flex items-center justify-between"><div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><Icon size={20} /></div><ArrowUpRight size={18} className="text-slate-300" /></div><p className="text-sm text-slate-500">{label}</p><p className="mt-1 text-3xl font-bold text-slate-900">{value}</p></div>)}</div><div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><h2 className="font-semibold text-slate-800">Your dashboard is ready</h2><p className="mt-2 text-sm text-slate-500">Student, teacher, attendance, fees, and reporting modules will be added next.</p></div></>;
}
