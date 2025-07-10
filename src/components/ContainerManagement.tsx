
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanLine, Clock, CheckCircle, Circle, PlayCircle } from 'lucide-react';
import { InspectionData } from '@/types/inspection';

interface ContainerManagementProps {
  onStartInspection: (inspection: InspectionData) => void;
  activeInspection: InspectionData | null;
}

export const ContainerManagement: React.FC<ContainerManagementProps> = ({ 
  onStartInspection, 
  activeInspection 
}) => {
  const [containerId, setContainerId] = useState('');
  const [riskLevel, setRiskLevel] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [whitelistCheck, setWhitelistCheck] = useState('');

  const mockInspections: InspectionData[] = [
    {
      id: '1',
      containerId: 'AJMU-2024-001',
      riskLevel: 'High',
      scheduledTime: '09:00',
      status: 'Scheduled',
      whitelistStatus: false
    },
    {
      id: '2',
      containerId: 'AJMU-2024-002',
      riskLevel: 'Medium',
      scheduledTime: '09:30',
      status: 'Live',
      whitelistStatus: true
    },
    {
      id: '3',
      containerId: 'AJMU-2024-003',
      riskLevel: 'Low',
      scheduledTime: '10:00',
      status: 'Completed',
      whitelistStatus: true
    }
  ];

  const handleSubmit = () => {
    if (!containerId) return;
    
    const newInspection: InspectionData = {
      id: Date.now().toString(),
      containerId,
      riskLevel,
      scheduledTime: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      status: 'Scheduled',
      whitelistStatus: whitelistCheck.toLowerCase().includes('approved')
    };
    
    console.log('New inspection submitted:', newInspection);
    setContainerId('');
    setWhitelistCheck('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Scheduled': return <Circle className="w-4 h-4 text-yellow-500" />;
      case 'Live': return <Circle className="w-4 h-4 text-green-500 fill-current" />;
      case 'Completed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default: return <Circle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-400 bg-red-900/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-900/20';
      case 'Low': return 'text-green-400 bg-green-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Quick Add Form */}
      <Card className="m-4 bg-[#2A2A3E] border-[#3A3A4E]">
        <CardHeader>
          <CardTitle className="text-white text-lg">Quick Container Add</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input
              placeholder="Container ID"
              value={containerId}
              onChange={(e) => setContainerId(e.target.value)}
              className="bg-[#1E1E2E] border-[#3A3A4E] text-white pr-10"
            />
            <ScanLine className="absolute right-3 top-3 w-4 h-4 text-gray-400 cursor-pointer hover:text-white" />
          </div>
          
          <Select value={riskLevel} onValueChange={(value: 'Low' | 'Medium' | 'High') => setRiskLevel(value)}>
            <SelectTrigger className="bg-[#1E1E2E] border-[#3A3A4E] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#2A2A3E] border-[#3A3A4E]">
              <SelectItem value="Low" className="text-white">Low Risk</SelectItem>
              <SelectItem value="Medium" className="text-white">Medium Risk</SelectItem>
              <SelectItem value="High" className="text-white">High Risk</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            placeholder="Whitelist Check (auto-complete)"
            value={whitelistCheck}
            onChange={(e) => setWhitelistCheck(e.target.value)}
            className="bg-[#1E1E2E] border-[#3A3A4E] text-white"
          />
          
          <Button 
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Submit to Ops
          </Button>
        </CardContent>
      </Card>

      {/* Today's Inspection List */}
      <Card className="m-4 flex-1 bg-[#2A2A3E] border-[#3A3A4E]">
        <CardHeader>
          <CardTitle className="text-white text-lg flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Today's Inspections
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {mockInspections.map((inspection) => (
            <div 
              key={inspection.id}
              className={`p-3 rounded-lg border ${
                activeInspection?.id === inspection.id 
                  ? 'bg-blue-900/30 border-blue-500' 
                  : 'bg-[#1E1E2E] border-[#3A3A4E]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(inspection.status)}
                  <span className="text-white font-medium">{inspection.scheduledTime}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${getRiskColor(inspection.riskLevel)}`}>
                  {inspection.riskLevel}
                </span>
              </div>
              
              <div className="text-sm text-gray-300 mb-2">{inspection.containerId}</div>
              
              {inspection.status === 'Scheduled' && (
                <Button
                  onClick={() => onStartInspection(inspection)}
                  size="sm"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  disabled={activeInspection !== null}
                >
                  <PlayCircle className="w-4 h-4 mr-1" />
                  Start Inspection
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
