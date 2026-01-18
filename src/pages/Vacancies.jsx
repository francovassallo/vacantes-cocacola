import React, { useState } from 'react';
import { Card, Badge, Button, Modal } from '../components/ui';
import { VacanciesData } from '../lib/mockData';
import { Search, Filter, Plus, FileText, CheckCircle2, Clock } from 'lucide-react';

const Vacancies = () => {
    const [showForm, setShowForm] = useState(false);
    const [selectedVacancy, setSelectedVacancy] = useState(null);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Gestión de Vacantes</h2>
                    <p className="text-slate-500">Administra las posiciones abiertas y sus aprobaciones</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)}>
                    <Plus size={16} />
                    {showForm ? 'Cancelar' : 'Solicitar Vacante'}
                </Button>
            </div>

            {showForm && (
                <Card className="p-6 bg-slate-50 border-slate-200 mb-6 animate-in zoom-in-95 duration-300">
                    <h3 className="font-bold text-lg mb-4">Nueva Solicitud de Vacante</h3>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Título del Puesto</label>
                            <input type="text" className="w-full p-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none" placeholder="Ej: Analista Jr." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Departamento</label>
                            <select className="w-full p-2 rounded-lg border border-slate-300 outline-none">
                                <option>Seleccionar...</option>
                                <option>Marketing</option>
                                <option>Ventas</option>
                                <option>IT</option>
                                <option>RRHH</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Justificación</label>
                            <textarea className="w-full p-2 rounded-lg border border-slate-300 outline-none md:col-span-2" rows="3" placeholder="Motivo de la búsqueda (reemplazo, puesto nuevo, etc.)"></textarea>
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-3">
                            <Button variant="secondary" onClick={() => setShowForm(false)} type="button">Cancelar</Button>
                            <Button type="button" onClick={() => setShowForm(false)}>Enviar a Aprobación</Button>
                        </div>
                    </form>
                </Card>
            )}

            {/* Filters */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar vacante..."
                        className="pl-10 pr-4 py-2 w-full rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-200"
                    />
                </div>
                <Button variant="secondary">
                    <Filter size={16} />
                    Filtros
                </Button>
            </div>

            {/* Grid of Vacancies */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {VacanciesData.map((vacancy) => (
                    <Card key={vacancy.id} className="flex flex-col">
                        <div className="p-6 flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <Badge variant={vacancy.status === 'Abierta' ? 'success' : vacancy.status === 'Pendiente Aprobación' ? 'warning' : 'default'}>
                                    {vacancy.status}
                                </Badge>
                                <button className="text-slate-400 hover:text-slate-600">...</button>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{vacancy.title}</h3>
                            <p className="text-slate-500 text-sm mb-4">{vacancy.department}</p>

                            <div className="space-y-3">
                                <div className="flex items-center text-sm text-slate-600 gap-2">
                                    <Clock size={16} className="text-slate-400" />
                                    <span>Prioridad: <span className="font-medium text-slate-900">{vacancy.priority}</span></span>
                                </div>
                                <div className="flex items-center text-sm text-slate-600 gap-2">
                                    <CheckCircle2 size={16} className="text-slate-400" />
                                    <span>Hiring Manager: {vacancy.hiringManager}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center -space-x-2">
                                {[1, 2, 3].slice(0, Math.min(vacancy.applicants, 3)).map((_, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-500">
                                        U{i + 1}
                                    </div>
                                ))}
                                {vacancy.applicants > 3 && (
                                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs text-slate-500">
                                        +{vacancy.applicants - 3}
                                    </div>
                                )}
                            </div>
                            <Button variant="ghost" className="text-sm px-2" onClick={() => setSelectedVacancy(vacancy)}>Ver Detalles &rarr;</Button>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal isOpen={!!selectedVacancy} onClose={() => setSelectedVacancy(null)} title="Detalle de Vacante">
                {selectedVacancy && (
                    <div className="space-y-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="text-xl font-bold text-slate-900">{selectedVacancy.title}</h4>
                                <p className="text-slate-500">{selectedVacancy.department}</p>
                            </div>
                            <Badge variant={
                                selectedVacancy.status === 'Abierta' ? 'success' :
                                    selectedVacancy.status === 'Pendiente Aprobación' ? 'warning' : 'default'
                            }>
                                {selectedVacancy.status}
                            </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                                <span className="text-slate-500 block">Hiring Manager</span>
                                <span className="font-medium text-slate-900">{selectedVacancy.hiringManager}</span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-slate-500 block">Prioridad</span>
                                <span className="font-medium text-slate-900">{selectedVacancy.priority}</span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-slate-500 block">Aplicantes</span>
                                <span className="font-medium text-slate-900">{selectedVacancy.applicants} candidatos</span>
                            </div>
                            <div className="space-y-1">
                                <span className="text-slate-500 block">Fecha de Creación</span>
                                <span className="font-medium text-slate-900">20/11/2025</span>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-4">
                            <h5 className="font-semibold text-slate-900 mb-2">Descripción del Puesto</h5>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Buscamos un profesional proactivo con experiencia en {selectedVacancy.department} para sumarse a nuestro equipo.
                                El candidato ideal deberá contar con habilidades de comunicación, trabajo en equipo y orientación a resultados.
                            </p>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="secondary" onClick={() => setSelectedVacancy(null)}>Cerrar</Button>
                            <Button variant="primary">Ver Postulantes</Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div >
    );
};

export default Vacancies;
