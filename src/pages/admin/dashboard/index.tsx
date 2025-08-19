import React from 'react';
import { AdminLayout } from '../../../layouts';
import { DefaultDashboard } from '../../../components/dashboard';

const Dashboard: React.FC = () => {
  return (
    <AdminLayout>
      <DefaultDashboard />
    </AdminLayout>
  );
};

export default Dashboard;