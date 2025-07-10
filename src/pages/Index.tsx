
import { useState } from 'react';
import { ContainerManagement } from '@/components/ContainerManagement';
import { LiveInspection } from '@/components/LiveInspection';
import { InspectionData } from '@/types/inspection';

const Index = () => {
  const [activeInspection, setActiveInspection] = useState<InspectionData | null>(null);

  return (
    <div className="min-h-screen bg-[#1E1E2E] text-white">
      {/* Header */}
      <header className="bg-[#2A2A3E] border-b border-[#3A3A4E] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/6ca71da2-6b47-4018-8950-70545872329f.png" 
              alt="Government of Ajman - Department of Ports and Customs"
              className="h-12 w-auto"
            />
            <div className="border-l border-[#3A3A4E] pl-4">
              <h1 className="text-xl font-bold text-white">Customs Inspection Portal</h1>
              <p className="text-sm text-gray-400">AI-Powered Container Screening System</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Inspector ID: AJ-2024-001</p>
              <p className="text-xs text-gray-500">Shift: 08:00 - 16:00</p>
            </div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">IN</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Container Management */}
        <div className="w-1/3 bg-[#252538] border-r border-[#3A3A4E]">
          <ContainerManagement 
            onStartInspection={setActiveInspection}
            activeInspection={activeInspection}
          />
        </div>

        {/* Right Panel - Live Inspection */}
        <div className="flex-1 bg-[#1E1E2E]">
          <LiveInspection 
            inspection={activeInspection}
            onEndInspection={() => setActiveInspection(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
