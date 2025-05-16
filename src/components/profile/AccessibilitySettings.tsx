
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Volume2, Eye, Contrast } from "lucide-react";

export function AccessibilitySettings() {
  const [settings, setSettings] = useState({
    reduceMotion: false,
    highContrast: false,
    largeText: false,
    textToSpeech: false,
    contentZoom: 100,
  });

  useEffect(() => {
    // Load saved accessibility settings
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
      applyAccessibilitySettings(JSON.parse(savedSettings));
    }
  }, []);

  const updateSettings = (key: keyof typeof settings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
    applyAccessibilitySettings(newSettings);
    toast.success(`Accessibility setting updated`);
  };

  const applyAccessibilitySettings = (newSettings: typeof settings) => {
    const html = document.documentElement;
    
    // Apply reduce motion
    if (newSettings.reduceMotion) {
      html.classList.add('reduce-motion');
    } else {
      html.classList.remove('reduce-motion');
    }
    
    // Apply high contrast
    if (newSettings.highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }
    
    // Apply large text
    if (newSettings.largeText) {
      html.classList.add('large-text');
    } else {
      html.classList.remove('large-text');
    }
    
    // Apply content zoom
    html.style.setProperty('--content-zoom', `${newSettings.contentZoom}%`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Visual Preferences</CardTitle>
          <CardDescription>
            Adjust visual settings for a better experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reduce-motion">Reduce Motion</Label>
              <p className="text-sm text-muted-foreground">
                Minimize animations and motion effects
              </p>
            </div>
            <Switch
              id="reduce-motion"
              checked={settings.reduceMotion}
              onCheckedChange={(checked) => updateSettings('reduceMotion', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                <Label htmlFor="high-contrast">High Contrast</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better readability
              </p>
            </div>
            <Switch
              id="high-contrast"
              checked={settings.highContrast}
              onCheckedChange={(checked) => updateSettings('highContrast', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <Label htmlFor="large-text">Large Text</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Increase text size throughout the app
              </p>
            </div>
            <Switch
              id="large-text"
              checked={settings.largeText}
              onCheckedChange={(checked) => updateSettings('largeText', checked)}
            />
          </div>
          
          <div className="space-y-3">
            <div className="space-y-0.5">
              <Label>Content Zoom</Label>
              <p className="text-sm text-muted-foreground">
                Adjust the zoom level of content
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm w-8 text-right">{settings.contentZoom}%</span>
              <Slider 
                value={[settings.contentZoom]} 
                min={75} 
                max={150} 
                step={5}
                onValueChange={(value) => updateSettings('contentZoom', value[0])}
                className="flex-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Audio & Reading</CardTitle>
          <CardDescription>
            Adjust audio and reading settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <Label htmlFor="text-to-speech">Text to Speech</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Enable text to speech for content reading
              </p>
            </div>
            <Switch
              id="text-to-speech"
              checked={settings.textToSpeech}
              onCheckedChange={(checked) => updateSettings('textToSpeech', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
