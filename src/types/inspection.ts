
export interface InspectionData {
  id: string;
  containerId: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  scheduledTime: string;
  status: 'Scheduled' | 'Live' | 'Completed';
  whitelistStatus: boolean;
  manifest?: ManifestItem[];
  detections?: Detection[];
}

export interface ManifestItem {
  id: string;
  description: string;
  quantity: number;
  weight: string;
  category: string;
}

export interface Detection {
  id: string;
  item: string;
  confidence: number;
  status: 'Pending' | 'Confirmed' | 'False Alarm' | 'Escalated';
  timestamp: string;
  location: string;
}

export interface VideoFeed {
  id: string;
  label: string;
  status: 'Active' | 'Inactive' | 'Error';
}
