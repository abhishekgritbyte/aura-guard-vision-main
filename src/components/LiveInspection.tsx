
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  ArrowUp, 
  Mic, 
  MicOff, 
  FileText, 
  Phone,
  Zap
} from 'lucide-react';
import { InspectionData, Detection, ManifestItem, VideoFeed } from '@/types/inspection';

interface LiveInspectionProps {
  inspection: InspectionData | null;
  onEndInspection: () => void;
}

export const LiveInspection: React.FC<LiveInspectionProps> = ({ 
  inspection, 
  onEndInspection 
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [emergencyActive, setEmergencyActive] = useState(false);

  const mockVideoFeeds: VideoFeed[] = [
    { id: '1', label: 'Front View', status: 'Active' },
    { id: '2', label: 'Side View', status: 'Active' },
    { id: '3', label: 'Top View', status: 'Active' },
    { id: '4', label: 'Interior Scan', status: 'Active' }
  ];

  const mockDetections: Detection[] = [
    {
      id: '1',
      item: 'Metallic Object',
      confidence: 87,
      status: 'Pending',
      timestamp: '09:15:23',
      location: 'Container Left Side'
    },
    {
      id: '2',
      item: 'Organic Material',
      confidence: 92,
      status: 'Confirmed',
      timestamp: '09:16:45',
      location: 'Container Center'
    },
    {
      id: '3',
      item: 'Dense Material',
      confidence: 65,
      status: 'False Alarm',
      timestamp: '09:17:12',
      location: 'Container Right Side'
    }
  ];

  const mockManifest: ManifestItem[] = [
    {
      id: '1',
      description: 'Electronic Components',
      quantity: 500,
      weight: '250kg',
      category: 'Electronics'
    },
    {
      id: '2',
      description: 'Textile Products',
      quantity: 200,
      weight: '150kg',
      category: 'Textiles'
    }
  ];

  const getDetectionStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-600';
      case 'Confirmed': return 'bg-red-600';
      case 'False Alarm': return 'bg-green-600';
      case 'Escalated': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-red-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  if (!inspection) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl text-gray-400 mb-2">No Active Inspection</h2>
          <p className="text-gray-500">Select a container from the left panel to begin inspection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Session Header */}
      <div className="bg-[#2A2A3E] border-b border-[#3A3A4E] p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{inspection.containerId}</h2>
            <p className="text-sm text-gray-400">
              Risk Level: <span className="text-red-400">{inspection.riskLevel}</span> | 
              Started: {inspection.scheduledTime}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={emergencyActive ? "destructive" : "outline"}
              size="sm"
              onClick={() => setEmergencyActive(!emergencyActive)}
              className={`${emergencyActive ? 'animate-pulse' : ''} border-red-500 text-red-500 hover:bg-red-500 hover:text-white`}
            >
              <Zap className="w-4 h-4 mr-1" />
              Customs Alert
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="border-gray-500 text-gray-300"
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="border-gray-500 text-gray-300"
            >
              <FileText className="w-4 h-4 mr-1" />
              Request Document
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={onEndInspection}
            >
              <Phone className="w-4 h-4 mr-1" />
              End Session
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Video Feeds */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-4 h-full">
            {mockVideoFeeds.map((feed) => (
              <Card key={feed.id} className="bg-[#2A2A3E] border-[#3A3A4E]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white flex items-center justify-between">
                    {feed.label}
                    <Badge variant={feed.status === 'Active' ? 'default' : 'secondary'}>
                      {feed.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-[#1E1E2E] rounded-lg flex items-center justify-center border border-[#3A3A4E]">
                    <Video className="w-8 h-8 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI Alerts & Manifest */}
        <div className="w-1/3 bg-[#252538] border-l border-[#3A3A4E] p-4">
          <Tabs defaultValue="alerts" className="h-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#2A2A3E]">
              <TabsTrigger value="alerts" className="text-white">AI Alerts</TabsTrigger>
              <TabsTrigger value="manifest" className="text-white">Manifest</TabsTrigger>
            </TabsList>
            
            <TabsContent value="alerts" className="h-full mt-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Real-time Detections</h3>
                {mockDetections.map((detection) => (
                  <Card key={detection.id} className="bg-[#2A2A3E] border-[#3A3A4E]">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-sm font-medium text-white">{detection.item}</h4>
                          <p className="text-xs text-gray-400">{detection.location}</p>
                        </div>
                        <Badge className={getDetectionStatusColor(detection.status)}>
                          {detection.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-sm font-medium ${getConfidenceColor(detection.confidence)}`}>
                          {detection.confidence}% Confidence
                        </span>
                        <span className="text-xs text-gray-500">{detection.timestamp}</span>
                      </div>
                      
                      {detection.status === 'Pending' && (
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Confirm
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 border-gray-500 text-gray-300">
                            <XCircle className="w-3 h-3 mr-1" />
                            False Alarm
                          </Button>
                          <Button size="sm" variant="destructive" className="flex-1">
                            <ArrowUp className="w-3 h-3 mr-1" />
                            Escalate
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="manifest" className="h-full mt-4">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Declared vs Detected</h3>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">Declared Items</h4>
                  {mockManifest.map((item) => (
                    <Card key={item.id} className="bg-[#2A2A3E] border-[#3A3A4E]">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="text-sm font-medium text-white">{item.description}</h5>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400">
                          Qty: {item.quantity} | Weight: {item.weight}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-white">AI Detected Items</h4>
                  {mockDetections.filter(d => d.status === 'Confirmed').map((detection) => (
                    <Card key={detection.id} className="bg-[#2A2A3E] border-red-900/50">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="text-sm font-medium text-red-400">{detection.item}</h5>
                          <Badge variant="destructive" className="text-xs">
                            Not Declared
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400">
                          Location: {detection.location}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
