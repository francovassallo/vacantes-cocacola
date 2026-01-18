import React, { useState } from 'react';
import { Card, Badge, Button, cn, Modal, Input, Label } from '../components/ui';
import { OnboardingTasksData } from '../lib/mockData';
import { CheckSquare, Square, Mail, ArrowRight, UserCheck } from 'lucide-react';

const Onboarding = () => {
    const [tasks, setTasks] = useState(OnboardingTasksData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hires, setHires] = useState([
        {
            id: 1,
            name: 'Laura Martinez',
            role: 'Analista Sr. de Marketing',
            date: '01/12/2025',
            status: 'Confirmada',
            initials: 'LM',
            progress: 65,
            office: 'Sede Central'
        }
    ]);
    const [newHire, setNewHire] = useState({ name: '', role: '', date: '', office: '' });

    const handleCreateHire = (e) => {
        e.preventDefault();
        const hire = {
            id: hires.length + 1,
            ...newHire,
            status: 'Pendiente',
            initials: newHire.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2),
            progress: 0
        };
        setHires([hire, ...hires]);
        setIsModalOpen(false);
        setNewHire({ name: '', role: '', date: '', office: '' });
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t
        ));
    };

    const progress = Math.round((tasks.filter(t => t.status === 'Completed').length / tasks.length) * 100);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Onboarding & Ingresos</h2>
                    <p className="text-slate-500">Gestiona los pasos posteriores a la contratación</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <UserCheck size={16} />
                    Nuevo Ingreso
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Cards */}
                <div className="col-span-1 space-y-6">
                    {hires.map((hire) => (
                        <Card key={hire.id} className="p-6 border-l-4 border-l-red-600">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center text-xl font-bold text-slate-500">
                                    {hire.initials}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900">{hire.name}</h3>
                                    <p className="text-slate-500 text-sm">{hire.role}</p>
                                    <Badge variant={hire.status === 'Confirmada' ? 'success' : 'warning'} className="mt-2">{hire.status}</Badge>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Fecha de Ingreso</span>
                                    <span className="font-medium text-slate-900">{hire.date}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Oficina</span>
                                    <span className="font-medium text-slate-900">{hire.office}</span>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium">Progreso Onboarding</span>
                                    <span className="font-bold text-red-600">{hire.progress}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full w-full overflow-hidden">
                                    <div className="h-full bg-red-600 transition-all duration-500" style={{ width: `${hire.progress}%` }}></div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Checklist */}
                <Card className="col-span-1 lg:col-span-2 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="font-bold text-lg">Checklist de Ingreso</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className={cn(
                                    "p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer",
                                    task.status === 'Completed' ? "bg-slate-50/50" : ""
                                )}
                                onClick={() => toggleTask(task.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "transition-colors",
                                        task.status === 'Completed' ? "text-green-500" : "text-slate-300"
                                    )}>
                                        {task.status === 'Completed' ? <CheckSquare size={24} /> : <Square size={24} />}
                                    </div>
                                    <div>
                                        <p className={cn(
                                            "font-medium text-slate-900",
                                            task.status === 'Completed' ? "line-through text-slate-400" : ""
                                        )}>{task.task}</p>
                                        <p className="text-xs text-slate-500">{task.category} • Asignado a: {task.assignee}</p>
                                    </div>
                                </div>
                                {task.status !== 'Completed' && (
                                    <Button variant="ghost" className="text-xs h-8">
                                        <Mail size={14} className="mr-1" />
                                        Recordar
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-slate-50 text-center">
                        <Button variant="ghost" className="w-full text-slate-500">Ver todos los ingresos activos</Button>
                    </div>
                </Card>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Registrar Nuevo Ingreso">
                <form onSubmit={handleCreateHire} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input
                            id="name"
                            placeholder="Ej: Pedro Ruiz"
                            value={newHire.name}
                            onChange={(e) => setNewHire({ ...newHire, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="role">Puesto</Label>
                        <Input
                            id="role"
                            placeholder="Ej: Desarrollador Jr"
                            value={newHire.role}
                            onChange={(e) => setNewHire({ ...newHire, role: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="date">Fecha de Ingreso</Label>
                        <Input
                            id="date"
                            type="date"
                            value={newHire.date}
                            onChange={(e) => setNewHire({ ...newHire, date: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="office">Oficina / Sede</Label>
                        <Input
                            id="office"
                            placeholder="Ej: Córdoba"
                            value={newHire.office}
                            onChange={(e) => setNewHire({ ...newHire, office: e.target.value })}
                            required
                        />
                    </div>
                    <div className="pt-4 flex justify-end gap-2">
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button type="submit">Registrar Ingreso</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Onboarding;
