import React from 'react';
import { Card, Badge, Button } from '../components/ui';
import { CandidatesData } from '../lib/mockData';
import { FileSpreadsheet, Download, ExternalLink, PlayCircle } from 'lucide-react';

const Evaluations = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Evaluaciones Técnicas</h2>
                    <p className="text-slate-500">Resultados de las pruebas de Excel de candidatos</p>
                </div>
                <Button variant="outline">
                    <FileSpreadsheet size={16} />
                    Nuevo Test de Excel
                </Button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-100">
                    <h3 className="text-slate-500 font-medium mb-1">Promedio General Excel</h3>
                    <p className="text-3xl font-bold text-slate-900">78/100</p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100">
                    <h3 className="text-slate-500 font-medium mb-1">Candidatos Evaluados (Mes)</h3>
                    <p className="text-3xl font-bold text-slate-900">34</p>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-amber-100">
                    <h3 className="text-slate-500 font-medium mb-1">Tasa de Aprobación</h3>
                    <p className="text-3xl font-bold text-slate-900">65%</p>
                </Card>
            </div>

            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-700 font-medium">
                            <tr>
                                <th className="px-6 py-4">Candidato</th>
                                <th className="px-6 py-4">Vacante</th>
                                <th className="px-6 py-4">Fecha Entrevista</th>
                                <th className="px-6 py-4">Score Excel</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {CandidatesData.map((candidate) => (
                                <tr key={candidate.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-900">{candidate.name}</div>
                                        <div className="text-xs text-slate-400">ID: #{candidate.id}</div>
                                    </td>
                                    <td className="px-6 py-4">{candidate.vacancy}</td>
                                    <td className="px-6 py-4">{candidate.interviewDate}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-full max-w-[80px] h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${candidate.excelScore > 70 ? 'bg-green-500' : candidate.excelScore > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                    style={{ width: `${candidate.excelScore}%` }}
                                                ></div>
                                            </div>
                                            <span className="font-bold">{candidate.excelScore}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Badge variant={
                                            candidate.status === 'Oferta' ? 'success' :
                                                candidate.status === 'Rechazado' ? 'danger' : 'default'
                                        }>
                                            {candidate.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-red-600 hover:text-red-700 font-medium text-xs flex items-center justify-end gap-1 ml-auto">
                                            <PlayCircle size={14} />
                                            Ver Grabación
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Evaluations;
