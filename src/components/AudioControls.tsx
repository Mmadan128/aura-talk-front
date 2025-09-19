import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Volume2, VolumeX, Loader2, Settings } from 'lucide-react';
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

  const hasApiKey = !!apiKey;

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePlayAudio}
          disabled={isGenerating || !text.trim()}
          className="h-8 w-8 p-0 hover:bg-surface-elevated"
        >
          {isGenerating ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : isPlaying ? (
            <VolumeX className="h-3 w-3" />
          ) : (
            <Volume2 className="h-3 w-3" />
          )}
        </Button>

        <Popover open={showSettings} onOpenChange={setShowSettings}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-surface-elevated"
            >
              <Settings className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" side="top">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">ElevenLabs API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your ElevenLabs API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveApiKey}
                  disabled={!apiKey.trim()}
                >
                  Save
                </Button>
              </div>
              <p className="text-xs text-message-text-muted">
                Get your API key from{' '}
                <a 
                  href="https://elevenlabs.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  elevenlabs.io
                </a>
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};