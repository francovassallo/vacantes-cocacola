import React, { useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    LineChart, Line, AreaChart, Area
} from 'recharts';
import { Card, Badge, Button, Modal, Input, Label, Select } from '../components/ui';
import { KPIData, RecruitmentFunnelData, TimeToFillData, VacanciesData as initialVacanciesData } from '../lib/mockData';
import { ArrowUpRight, ArrowDownRight, Users, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';

const Dashboard = () => {
    const [vacancies, setVacancies] = useState(initialVacanciesData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newVacancy, setNewVacancy] = useState({
        title: '',
        department: '',
        hiringManager: '',
        priority: 'Media'
    });

    const handleCreateVacancy = (e) => {
        e.preventDefault();
        const vacancy = {
            id: vacancies.length + 1,
            ...newVacancy,
            status: 'Abierta',
            applicants: 0
        };
        setVacancies([vacancy, ...vacancies]);
        setIsModalOpen(false);
        setNewVacancy({ title: '', department: '', hiringManager: '', priority: 'Media' });
    };
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Resumen Ejecutivo</h2>
                    <p className="text-slate-500">Métricas clave del proceso de selección</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus size={16} />
                    Nueva Vacante
                </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {KPIData.map((kpi, index) => (
                    <Card key={index} className="p-6 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
                                <h3 className="text-3xl font-bold text-slate-900 mt-2">{kpi.value}</h3>
                            </div>
                            <div className={`p-2 rounded-full ${kpi.trend === 'positive' ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-500'}`}>
                                {kpi.trend === 'positive' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className={`font-medium ${kpi.trend === 'positive' ? 'text-green-600' : 'text-slate-600'}`}>
                                {kpi.change}
                            </span>
                            <span className="text-slate-400 ml-2">vs mes anterior</span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recruitment Funnel */}
                <Card className="col-span-1 lg:col-span-2 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Funnel de Reclutamiento</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={RecruitmentFunnelData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F40009" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#F40009" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                <RechartsTooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#F40009"
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Time to Fill Trend */}
                <Card className="col-span-1 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Tiempo de Contratación (Días)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={TimeToFillData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                <RechartsTooltip
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="days" fill="#1e293b" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Recent Vacancies List */}
            <Card className="overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">Vacantes Recientes</h3>
                    <Button variant="ghost" className="text-sm">Ver todas</Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-700 font-medium">
                            <tr>
                                <th className="px-6 py-4">Título</th>
                                <th className="px-6 py-4">Departamento</th>
                                <th className="px-6 py-4">Responsable</th>
                                <th className="px-6 py-4">Aplicantes</th>
                                <th className="px-6 py-4">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {vacancies.map((vacancy) => (
                                <tr key={vacancy.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-slate-900">{vacancy.title}</td>
                                    <td className="px-6 py-4">{vacancy.department}</td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                            {vacancy.hiringManager.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        {vacancy.hiringManager}
                                    </td>
                                    <td className="px-6 py-4 font-medium">{vacancy.applicants}</td>
                                    <td className="px-6 py-4">
                                        <Badge variant={
                                            vacancy.status === 'Abierta' ? 'success' :
                                                vacancy.status === 'Pendiente Aprobación' ? 'warning' : 'default'
                                        }>
                                            {vacancy.status}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Nueva Vacante">
                <form onSubmit={handleCreateVacancy} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Título del Puesto</Label>
                        <Input
                            id="title"
                            placeholder="Ej: Analista de Marketing"
                            value={newVacancy.title}
                            onChange={(e) => setNewVacancy({ ...newVacancy, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="department">Departamento</Label>
                        <Input
                            id="department"
                            placeholder="Ej: Marketing"
                            value={newVacancy.department}
                            onChange={(e) => setNewVacancy({ ...newVacancy, department: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="manager">Hiring Manager</Label>
                        <Input
                            id="manager"
                            placeholder="Ej: Juan Perez"
                            value={newVacancy.hiringManager}
                            onChange={(e) => setNewVacancy({ ...newVacancy, hiringManager: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="priority">Prioridad</Label>
                        <Select
                            id="priority"
                            value={newVacancy.priority}
                            onChange={(e) => setNewVacancy({ ...newVacancy, priority: e.target.value })}
                        >
                            <option value="Alta">Alta</option>
                            <option value="Media">Media</option>
                            <option value="Baja">Baja</option>
                        </Select>
                    </div>
                    <div className="pt-4 flex justify-end gap-2">
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button type="submit">Crear Vacante</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Dashboard;
