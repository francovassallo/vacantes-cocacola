import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Vacancies from './pages/Vacancies';
import Evaluations from './pages/Evaluations';
import Onboarding from './pages/Onboarding';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="vacancies" element={<Vacancies />} />
                    <Route path="evaluations" element={<Evaluations />} />
                    <Route path="onboarding" element={<Onboarding />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
