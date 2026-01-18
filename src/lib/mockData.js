// Simulating a backend or SharePoint list data

export const KPIData = [
    { label: 'Tiempo Promedio Contratación', value: '18 días', change: '-2 días', trend: 'positive' },
    { label: 'Vacantes Activas', value: '12', change: '+3', trend: 'neutral' },
    { label: 'Candidatos en Proceso', value: '45', change: '+12', trend: 'positive' },
    { label: 'Tasa de Aceptación', value: '94%', change: '+1%', trend: 'positive' },
];

export const RecruitmentFunnelData = [
    { name: 'Aplicaciones', value: 120 },
    { name: 'Evaluación Técnica', value: 80 },
    { name: 'Entrevista', value: 45 },
    { name: 'Oferta', value: 15 },
    { name: 'Contratado', value: 12 },
];

export const TimeToFillData = [
    { name: 'Ene', days: 25 },
    { name: 'Feb', days: 22 },
    { name: 'Mar', days: 20 },
    { name: 'Abr', days: 18 },
    { name: 'May', days: 19 },
    { name: 'Jun', days: 17 },
];

export const VacanciesData = [
    { id: 1, title: 'Analista Sr. de Marketing', department: 'Marketing', status: 'Abierta', applicants: 14, priority: 'Alta', hiringManager: 'Carlos Ruiz' },
    { id: 2, title: 'Desarrollador Full Stack', department: 'IT', status: 'Pendiente Aprobación', applicants: 0, priority: 'Media', hiringManager: 'Ana Gomez' },
    { id: 3, title: 'Operario de Logística', department: 'Operaciones', status: 'Cerrada', applicants: 56, priority: 'Baja', hiringManager: 'Luis Perez' },
    { id: 4, title: 'Gerente de Ventas', department: 'Ventas', status: 'Abierta', applicants: 8, priority: 'Alta', hiringManager: 'Maria Lopez' },
];

export const CandidatesData = [
    { id: 101, name: 'Juan Perez', vacancy: 'Analista Sr. de Marketing', excelScore: 85, status: 'Entrevista', interviewDate: '2025-11-22' },
    { id: 102, name: 'Laura Martinez', vacancy: 'Analista Sr. de Marketing', excelScore: 92, status: 'Oferta', interviewDate: '2025-11-20' },
    { id: 103, name: 'Pedro Sanchez', vacancy: 'Desarrollador Full Stack', excelScore: 45, status: 'Rechazado', interviewDate: '2025-11-15' },
    { id: 104, name: 'Sofia Diaz', vacancy: 'Gerente de Ventas', excelScore: 78, status: 'Evaluación Técnica', interviewDate: '2025-11-24' },
];

export const OnboardingTasksData = [
    { id: 1, category: 'Administrativo', task: 'Alta en AFIP (ARCA)', status: 'Pending', assignee: 'RRHH' },
    { id: 2, category: 'Seguridad', task: 'Informar a Garita de Seguridad', status: 'Pending', assignee: 'Seguridad' },
    { id: 3, category: 'IT', task: 'Creación de Usuario de Red', status: 'Completed', assignee: 'IT Support' },
    { id: 4, category: 'Plataformas', task: 'Carga en SuccessFactors', status: 'Pending', assignee: 'RRHH' },
    { id: 5, category: 'Inducción', task: 'Bienvenida y Entrega de Kit', status: 'Pending', assignee: 'RRHH' },
];
