import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingScreen from './components/LoadingScreen';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const TokenBuilder = lazy(() => import('./pages/TokenBuilder'));
const SmartContractAuditor = lazy(() => import('./pages/SmartContractAuditor'));
const ProjectManager = lazy(() => import('./pages/ProjectManager'));
const Launch = lazy(() => import('./pages/Launch'));
const Community = lazy(() => import('./pages/Community'));
const ApplyForm = lazy(() => import('./components/ApplyForm'));

const AppRoutes = () => {
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/apply" element={<ApplyForm />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/token-builder" element={
            <ProtectedRoute>
              <TokenBuilder />
            </ProtectedRoute>
          } />
          <Route path="/smart-contract-auditor" element={
            <ProtectedRoute>
              <SmartContractAuditor />
            </ProtectedRoute>
          } />
          <Route path="/project-manager" element={
            <ProtectedRoute>
              <ProjectManager />
            </ProtectedRoute>
          } />
          <Route path="/launch" element={
            <ProtectedRoute>
              <Launch />
            </ProtectedRoute>
          } />
          <Route path="/community" element={<Community />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;