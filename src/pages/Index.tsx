import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Users, ArrowRight, Zap, Shield, Globe } from 'lucide-react';
import HolographicInterface from '@/components/HolographicInterface';
import AgentWorkspace from '@/components/AgentWorkspace';
import tammLogo from '@/assets/tamm-logo.jfif';

type ViewMode = 'home' | 'customer' | 'agent';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');

  if (currentView === 'customer') {
    return <HolographicInterface />;
  }

  if (currentView === 'agent') {
    return <AgentWorkspace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16 fade-in">
          <div className="flex justify-center mb-6">
            <img 
              src={tammLogo} 
              alt="TAMM Logo" 
              className="h-16 object-contain floating"
            />
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            TAMM Holographic Service Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Revolutionary customer service experience combining AI-powered holographic interfaces 
            with advanced agent workspace technology for Abu Dhabi Government Services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span>UAE Government Certified</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4 text-primary" />
              <span>Bilingual Support (EN/AR)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              <span>Real-time Processing</span>
            </div>
          </div>
        </div>

        {/* Interface Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Customer Interface Card */}
          <Card className="hover-scale cursor-pointer group shadow-soft hover:shadow-glow transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-holographic rounded-full flex items-center justify-center">
                <Monitor className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl mb-2">Customer Interface</CardTitle>
              <p className="text-muted-foreground">
                Holographic pod experience for customers seeking government services
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Life-sized holographic agent projection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Intuitive language selection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Voice and gesture recognition</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Real-time document sharing</span>
                </div>
              </div>
              <Button 
                className="w-full group-hover:shadow-glow" 
                onClick={() => setCurrentView('customer')}
              >
                Launch Customer View
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Agent Workspace Card */}
          <Card className="hover-scale cursor-pointer group shadow-soft hover:shadow-glow transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl mb-2">Agent Workspace</CardTitle>
              <p className="text-muted-foreground">
                Professional dashboard for customer service agents
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Real-time queue management</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Customer information display</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Session control tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Screen sharing capabilities</span>
                </div>
              </div>
              <Button 
                variant="secondary" 
                className="w-full group-hover:shadow-glow" 
                onClick={() => setCurrentView('agent')}
              >
                Launch Agent Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center fade-in">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Processing</h3>
              <p className="text-muted-foreground">
                Instant connection and response with advanced AI-powered routing
              </p>
            </div>
            <div className="text-center fade-in">
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bilingual Support</h3>
              <p className="text-muted-foreground">
                Seamless Arabic and English interface with cultural adaptation
              </p>
            </div>
            <div className="text-center fade-in">
              <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Government Grade Security</h3>
              <p className="text-muted-foreground">
                Enterprise-level security meeting UAE government standards
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-muted-foreground">
          <p>&copy; 2024 Abu Dhabi Government - Department of Government Enablement</p>
          <p className="text-sm mt-2">TAMM Holographic Service Platform v3.0</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
