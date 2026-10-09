import { useState } from 'react';
import { X, Mic, Languages, Users, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useLanguage, SUPPORTED_LANGUAGES } from '../utils/language-context';

export function FeatureHighlight() {
  const [isVisible, setIsVisible] = useState(true);
  const { currentLanguage, setLanguage } = useLanguage();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-orange-600" />
              <CardTitle>Welcome to Enhanced JanAI!</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Voice Assistant */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Mic className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg">🎤 AI Voice Mode</h3>
              <Badge className="bg-green-500">NEW</Badge>
            </div>
            <p className="text-gray-600">
              Operate JanAI entirely with your voice! The floating voice assistant (bottom-right) lets you:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-4">
              <li>Navigate between modules using voice commands</li>
              <li>Ask questions in natural language</li>
              <li>Get spoken responses in your language</li>
              <li>Works in 10 Indian languages</li>
            </ul>
            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <p className="text-blue-700">
                <strong>Try saying:</strong> "Open dashboard", "Show my documents", "Find schemes"
              </p>
            </div>
          </div>

          {/* Multilingual */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Languages className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg">🌐 Multilingual Support</h3>
              <Badge className="bg-green-500">NEW</Badge>
            </div>
            <p className="text-gray-600">
              Use JanAI in your preferred language:
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <div
                  key={lang.code}
                  className={`p-2 rounded cursor-pointer border ${
                    currentLanguage.code === lang.code
                      ? 'bg-purple-100 border-purple-300 font-medium'
                      : 'bg-gray-50 border-transparent hover:bg-gray-100'
                  }`}
                  onClick={() => setLanguage(lang)}
                >
                  {lang.nativeName} ({lang.name})
                </div>
              ))}
            </div>
            <div className="bg-purple-50 p-3 rounded-lg text-sm mt-2">
              <p className="text-purple-700">
                <strong>Change language:</strong> Use the language selector in the dashboard header
              </p>
            </div>
          </div>

          {/* Family Sharing */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg">👨‍👩‍👧‍👦 Family Document Sharing</h3>
              <Badge className="bg-green-500">NEW</Badge>
            </div>
            <p className="text-gray-600">
              Share documents with family members in real-time:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-4">
              <li>Add family members by email</li>
              <li>Set view or edit permissions</li>
              <li>Real-time document sync across family</li>
              <li>Manage all family documents in one place</li>
            </ul>
            <div className="bg-green-50 p-3 rounded-lg text-sm">
              <p className="text-green-700">
                <strong>Get started:</strong> Go to Document Wallet → Click "Family" button → Add family members
              </p>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="text-sm mb-2">⚠️ Browser Compatibility</h4>
            <p className="text-xs text-gray-600">
              For the best voice experience, use <strong>Google Chrome</strong> or <strong>Microsoft Edge</strong>. 
              Allow microphone access when prompted.
            </p>
          </div>

          <Button onClick={() => setIsVisible(false)} className="w-full">
            Get Started with JanAI
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
