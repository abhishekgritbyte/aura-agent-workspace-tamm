import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Monitor, 
  MonitorOff, 
  Users, 
  Clock, 
  User,
  FileText,
  MessageSquare,
  Video,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomerCall {
  id: string;
  customerName: string;
  language: 'en' | 'ar';
  waitTime: number;
  priority: 'low' | 'medium' | 'high';
  serviceType: string;
}

interface CustomerInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
  language: 'en' | 'ar';
  previousCases: number;
  lastContact: string;
  status: 'new' | 'returning' | 'vip';
}

interface AgentWorkspaceProps {
  agentName?: string;
  agentId?: string;
}

export default function AgentWorkspace({ 
  agentName = "Sarah Al-Mansouri",
  agentId = "AGT-001"
}: AgentWorkspaceProps) {
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState<CustomerInfo | null>(null);
  const [callQueue, setCallQueue] = useState<CustomerCall[]>([
    {
      id: '1',
      customerName: 'Ahmed Al-Rashid',
      language: 'ar',
      waitTime: 45,
      priority: 'high',
      serviceType: 'Business License'
    },
    {
      id: '2',
      customerName: 'Maria Santos',
      language: 'en',
      waitTime: 120,
      priority: 'medium',
      serviceType: 'Visa Renewal'
    },
    {
      id: '3',
      customerName: 'Omar Hassan',
      language: 'ar',
      waitTime: 89,
      priority: 'low',
      serviceType: 'Document Verification'
    }
  ]);

  const { toast } = useToast();

  // Update wait times every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCallQueue(prev => prev.map(call => ({
        ...call,
        waitTime: call.waitTime + 1
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatWaitTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAcceptCall = (call: CustomerCall) => {
    setIsInCall(true);
    setCurrentCustomer({
      id: call.id,
      name: call.customerName,
      email: `${call.customerName.toLowerCase().replace(' ', '.')}@email.com`,
      phone: '+971 50 123 4567',
      language: call.language,
      previousCases: Math.floor(Math.random() * 5) + 1,
      lastContact: '2024-07-15',
      status: call.priority === 'high' ? 'vip' : 'returning'
    });
    
    setCallQueue(prev => prev.filter(c => c.id !== call.id));
    
    toast({
      title: "Call Connected",
      description: `Connected to ${call.customerName}`,
    });
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setCurrentCustomer(null);
    setIsMuted(false);
    setIsScreenSharing(false);
    
    toast({
      title: "Call Ended",
      description: "Session completed successfully",
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Microphone On" : "Microphone Muted",
      description: isMuted ? "You are now audible to the customer" : "You are now muted",
    });
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    toast({
      title: isScreenSharing ? "Screen Share Stopped" : "Screen Share Started",
      description: isScreenSharing ? "Screen is no longer shared" : "Your screen is now visible to the customer",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip': return 'bg-primary text-primary-foreground';
      case 'returning': return 'bg-secondary text-secondary-foreground';
      case 'new': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agent Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {agentName} ({agentId})</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isInCall ? "destructive" : "secondary"} className="px-3 py-1">
              {isInCall ? "In Call" : "Available"}
            </Badge>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Call Queue */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Call Queue ({callQueue.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {callQueue.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No calls waiting</p>
                ) : (
                  callQueue.map((call) => (
                    <Card key={call.id} className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{call.customerName}</h4>
                        <Badge variant={getPriorityColor(call.priority) as any}>
                          {call.priority}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        <p>{call.serviceType}</p>
                        <p>Language: {call.language === 'ar' ? 'Arabic' : 'English'}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {formatWaitTime(call.waitTime)}
                        </div>
                        <Button
                          variant="agent-primary"
                          size="sm"
                          onClick={() => handleAcceptCall(call)}
                          disabled={isInCall}
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Session Control Panel */}
            <Card>
              <CardHeader>
                <CardTitle>Session Control</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant={isMuted ? "agent-danger" : "agent-secondary"}
                    onClick={toggleMute}
                    disabled={!isInCall}
                  >
                    {isMuted ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                    {isMuted ? "Unmute" : "Mute"}
                  </Button>
                  
                  <Button
                    variant={isScreenSharing ? "agent-success" : "agent-secondary"}
                    onClick={toggleScreenShare}
                    disabled={!isInCall}
                  >
                    {isScreenSharing ? <MonitorOff className="w-4 h-4 mr-2" /> : <Monitor className="w-4 h-4 mr-2" />}
                    {isScreenSharing ? "Stop Share" : "Share Screen"}
                  </Button>
                  
                  <Button
                    variant="agent-danger"
                    onClick={handleEndCall}
                    disabled={!isInCall}
                  >
                    <PhoneOff className="w-4 h-4 mr-2" />
                    End Session
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            {currentCustomer && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{currentCustomer.name}</h3>
                        <Badge className={getStatusColor(currentCustomer.status)}>
                          {currentCustomer.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p><strong>Email:</strong> {currentCustomer.email}</p>
                        <p><strong>Phone:</strong> {currentCustomer.phone}</p>
                        <p><strong>Language:</strong> {currentCustomer.language === 'ar' ? 'Arabic' : 'English'}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Service History</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Previous Cases:</strong> {currentCustomer.previousCases}</p>
                        <p><strong>Last Contact:</strong> {currentCustomer.lastContact}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Communication Window */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  Customer View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  {isInCall ? (
                    <div className="text-center">
                      <Video className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium">Live Customer Feed</p>
                      <p className="text-sm text-muted-foreground">
                        Customer: {currentCustomer?.name}
                      </p>
                      {isScreenSharing && (
                        <Badge variant="secondary" className="mt-2">
                          Screen Sharing Active
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <MessageSquare className="w-16 h-16 mx-auto mb-4" />
                      <p>No active session</p>
                      <p className="text-sm">Accept a call to start customer interaction</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}