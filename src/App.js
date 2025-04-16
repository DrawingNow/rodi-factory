import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import StatusPage from './pages/StatusPage';
import MapPage from './pages/MapPage';
import ManualPage from './pages/ManualPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route
        path="/map"
        element={
          <MainLayout>
            <MapPage />
          </MainLayout>
        }
      />
      <Route
        path="/status"
        element={
          <MainLayout>
            <StatusPage />
          </MainLayout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        }
      />
      <Route
        path="/manual"
        element={
          <MainLayout>
            <ManualPage />
          </MainLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <MainLayout>
            <SettingsPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}

export default App;
