import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Globe, User, Phone, PhoneOff } from 'lucide-react';
import tammLogo from '@/assets/tamm-logo.png';
import holographicBg from '@/assets/holographic-bg.jpg';

type ViewState = 'welcome' | 'language-selection' | 'connecting' | 'in-call';

interface HolographicInterfaceProps {
  onLanguageSelect?: (language: 'en' | 'ar') => void;
  onCallEnd?: () => void;
  agentConnected?: boolean;
  agentName?: string;
}

export default function HolographicInterface({ 
  onLanguageSelect, 
  onCallEnd, 
  agentConnected = false,
  agentName = "Sarah Al-Mansouri"
}: HolographicInterfaceProps) {
  const [currentView, setCurrentView] = useState<ViewState>('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'ar' | null>(null);

  useEffect(() => {
    // Simulate user detection after 3 seconds
    const timer = setTimeout(() => {
      if (currentView === 'welcome') {
        setCurrentView('language-selection');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentView]);

  const handleLanguageSelect = (language: 'en' | 'ar') => {
    setSelectedLanguage(language);
    setCurrentView('connecting');
    onLanguageSelect?.(language);
    
    // Simulate connection process
    setTimeout(() => {
      setCurrentView('in-call');
    }, 2000);
  };

  const handleEndCall = () => {
    onCallEnd?.();
    setCurrentView('welcome');
    setSelectedLanguage(null);
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-holographic-bg flex items-center justify-center"
      style={{
        backgroundImage: `url(${holographicBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Holographic Overlay */}
      <div className="absolute inset-0 bg-holographic-overlay/60 backdrop-blur-sm"></div>
      
      {/* Main Interface */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        
        {/* Welcome View */}
        {currentView === 'welcome' && (
          <div className="text-center fade-in">
            <div className="floating mb-8">
              <img 
                src={tammLogo} 
                alt="TAMM Logo" 
                className="w-32 h-16 mx-auto object-contain pulse-glow"
              />
            </div>
            <h1 className="text-4xl font-bold text-holographic-primary mb-4 text-holographic">
              {selectedLanguage === 'ar' ? 'مرحباً بكم في تـــام' : 'Welcome to TAMM'}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {selectedLanguage === 'ar' 
                ? 'خدمات حكومة أبوظبي الرقمية' 
                : 'Abu Dhabi Government Digital Services'}
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <User className="w-5 h-5" />
              <span>Detecting presence...</span>
            </div>
          </div>
        )}

        {/* Language Selection View */}
        {currentView === 'language-selection' && (
          <div className="text-center fade-in">
            <div className="mb-8">
              <img 
                src={tammLogo} 
                alt="TAMM Logo" 
                className="w-24 h-12 mx-auto object-contain mb-6"
              />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Please select your language
              </h2>
              <p className="text-xl text-foreground mb-2">
                يرجى اختيار لغتك
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                variant="language-select"
                size="language"
                onClick={() => handleLanguageSelect('en')}
                className="hover-scale glass"
              >
                <div className="flex flex-col items-center gap-2">
                  <Globe className="w-8 h-8" />
                  <span>English</span>
                </div>
              </Button>
              
              <Button
                variant="language-select"
                size="language"
                onClick={() => handleLanguageSelect('ar')}
                className="hover-scale glass"
                dir="rtl"
              >
                <div className="flex flex-col items-center gap-2">
                  <Globe className="w-8 h-8" />
                  <span>العربية</span>
                </div>
              </Button>
            </div>
          </div>
        )}

        {/* Connecting View */}
        {currentView === 'connecting' && (
          <div className="text-center fade-in">
            <div className="mb-8">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <Phone className="w-16 h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {selectedLanguage === 'ar' ? 'جاري الاتصال...' : 'Connecting...'}
              </h2>
              <p className="text-muted-foreground">
                {selectedLanguage === 'ar' 
                  ? 'يتم توصيلك بموظف خدمة العملاء' 
                  : 'Connecting you to a customer service agent'}
              </p>
            </div>
          </div>
        )}

        {/* In Call View */}
        {currentView === 'in-call' && (
          <div className="fade-in">
            <Card className="glass border-glass-border p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-success rounded-full pulse-glow"></div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {selectedLanguage === 'ar' ? 'متصل' : 'Connected'}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedLanguage === 'ar' ? `الموظف: ${agentName}` : `Agent: ${agentName}`}
                </div>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {selectedLanguage === 'ar' 
                    ? 'أهلاً وسهلاً! كيف يمكنني مساعدتك اليوم؟' 
                    : 'Hello! How can I assist you today?'}
                </h3>
                <p className="text-muted-foreground">
                  {selectedLanguage === 'ar' 
                    ? 'يمكن للموظف رؤيتك وسماعك. تحدث بشكل طبيعي.' 
                    : 'The agent can see and hear you. Please speak naturally.'}
                </p>
              </div>

              {/* Demo Video Area */}
              <div className="mb-6">
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <video
                    src="./Holographic_Greeting_Video_Generated.mp4"
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

            </Card>

            <div className="flex justify-center">
              <Button
                variant="agent-danger"
                size="lg"
                onClick={handleEndCall}
                className="gap-3"
              >
                <PhoneOff className="w-5 h-5" />
                {selectedLanguage === 'ar' ? 'إنهاء المكالمة' : 'End Call'}
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Ambient Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-glow rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-holographic-primary rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-secondary/30 rounded-full floating"></div>
      </div>
    </div>
  );
}