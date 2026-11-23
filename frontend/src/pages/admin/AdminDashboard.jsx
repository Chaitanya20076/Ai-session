import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Building, 
  Mail,
  Award
} from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export const AdminDashboard = () => {
  const [pendingFaculty, setPendingFaculty] = useState([
    {
      id: 'fac_pending_01',
      name: 'Dr. Marcus Vance',
      email: 'm.vance@university.edu',
      department: 'Mechanical & Aerospace Engineering',
      appliedAt: '2026-11-20',
      status: 'pending'
    },
    {
      id: 'fac_pending_02',
      name: 'Prof. Alisha Patel',
      email: 'a.patel@engineering.ac.in',
      department: 'Electrical Sciences',
      appliedAt: '2026-11-22',
      status: 'pending'
    }
  ]);

  const handleApprove = (id) => {
    setPendingFaculty(prev => prev.filter(f => f.id !== id));
  };

  const handleReject = (id) => {
    setPendingFaculty(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <Badge variant="danger" className="mb-2">Admin Governance</Badge>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          System Administration &amp; Faculty Approvals
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review pending faculty applications, enforce role-based safety, and oversee platform integrity.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <Card className="p-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Pending Approvals</p>
              <h3 className="text-xl font-bold mt-0.5">{pendingFaculty.length} Faculty</h3>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Active Faculty</p>
              <h3 className="text-xl font-bold mt-0.5">18 Approved</h3>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Registered Students</p>
              <h3 className="text-xl font-bold mt-0.5">340 Students</h3>
            </div>
          </div>
        </Card>

      </div>

      {/* Pending Faculty Applications */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Users className="w-4 h-4 text-primary-600" />
          <span>Faculty Verification Queue</span>
        </h2>

        {pendingFaculty.length === 0 ? (
          <Card className="p-8 text-center text-slate-500 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            All faculty applications have been verified.
          </Card>
        ) : (
          <div className="space-y-3">
            {pendingFaculty.map((fac) => (
              <Card key={fac.id} className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{fac.name}</h3>
                      <Badge variant="warning" size="sm">Verification Pending</Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                      <span className="flex items-center">
                        <Mail className="w-3.5 h-3.5 mr-1" /> {fac.email}
                      </span>
                      <span className="flex items-center">
                        <Building className="w-3.5 h-3.5 mr-1" /> {fac.department}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleApprove(fac.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="danger"
                      onClick={() => handleReject(fac.id)}
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;
