import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Volume2, VolumeX, Loader2, Settings, Sparkles } from 'lucide-react';
import { useAudio } from '@/hooks/useAudio';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

interface AudioControlsProps {
  text: string;
  className?: string;
}

export const AudioControls: React.FC<AudioControlsProps> = ({ text, className }) => {
  const { generateAndPlayAudio, stopAudio, isGenerating, isPlaying } = useAudio();
  const [apiKey, setApiKey] = useState(() => 
    localStorage.getItem('elevenlabs_api_key') || ''
  );
  const [showSettings, setShowSettings] = useState(false);

  const handlePlayAudio = async () => {
    if (!apiKey) {
      setShowSettings(true);
      return;
    }

    if (isPlaying) {
      stopAudio();
    } else {
      await generateAndPlayAudio(text, apiKey);
    }
  };

  const handleSaveApiKey = () => {
    localStorage.setItem('elevenlabs_api_key', apiKey);
    setShowSettings(false);
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePlayAudio}
          disabled={isGenerating || !text.trim()}
          className="h-8 w-8 p-0 hover:bg-surface-elevated rounded-full transition-spring glass border border-border/20"
        >
          {isGenerating ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : isPlaying ? (
            <VolumeX className="h-3.5 w-3.5 text-accent" />
          ) : (
            <Volume2 className="h-3.5 w-3.5" />
          )}
        </Button>

        <Popover open={showSettings} onOpenChange={setShowSettings}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-surface-elevated rounded-full transition-spring glass border border-border/20"
            >
              <Settings className="h-3.5 w-3.5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-6 glass-strong border-border/30" side="top">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Audio Settings</h3>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="api-key" className="text-sm font-medium">ElevenLabs API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your ElevenLabs API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-surface-glass/50 border-border/30 rounded-xl"
                />
              </div>
              
              <div className="flex justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveApiKey}
                  disabled={!apiKey.trim()}
                  className="flex-1"
                >
                  Save Key
                </Button>
              </div>
              
              <p className="text-xs text-message-text-muted leading-relaxed">
                Get your API key from{' '}
                <a 
                  href="https://elevenlabs.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light underline font-medium"
                >
                  elevenlabs.io
                </a>
                {' '}to enable premium text-to-speech
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};