
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Moon, Sun, PaletteIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function ThemeSettings() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [colorScheme, setColorScheme] = useState<'green' | 'blue' | 'purple'>('green');

  useEffect(() => {
    // Get stored theme preference
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (storedTheme) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
    }

    // Get stored color scheme
    const storedColorScheme = localStorage.getItem('colorScheme') as 'green' | 'blue' | 'purple' | null;
    if (storedColorScheme) {
      setColorScheme(storedColorScheme);
      applyColorScheme(storedColorScheme);
    }
  }, []);

  const applyTheme = (selectedTheme: 'light' | 'dark' | 'system') => {
    const root = window.document.documentElement;

    if (selectedTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(selectedTheme);
    }
  };

  const applyColorScheme = (selectedScheme: 'green' | 'blue' | 'purple') => {
    const root = window.document.documentElement;
    
    // Remove existing color scheme classes
    root.classList.remove('theme-green', 'theme-blue', 'theme-purple');
    
    // Add the new color scheme class
    root.classList.add(`theme-${selectedScheme}`);
    
    // Update CSS variables for the selected color scheme
    switch (selectedScheme) {
      case 'green':
        // Primary colors
        root.style.setProperty('--primary', '142 54% 35%');
        root.style.setProperty('--primary-foreground', '142 10% 98%');
        // Secondary colors
        root.style.setProperty('--secondary', '200 98% 39%');
        root.style.setProperty('--secondary-foreground', '142 10% 98%');
        // Accent colors
        root.style.setProperty('--accent', '142 30% 92%');
        root.style.setProperty('--accent-foreground', '142 50% 10%');
        // Sidebar colors
        root.style.setProperty('--sidebar-primary', '142 54% 35%');
        root.style.setProperty('--sidebar-accent', '142 30% 92%');
        root.style.setProperty('--sidebar-ring', '142 54% 35%');
        break;
        
      case 'blue':
        // Primary colors
        root.style.setProperty('--primary', '210 100% 45%');
        root.style.setProperty('--primary-foreground', '210 10% 98%');
        // Secondary colors
        root.style.setProperty('--secondary', '280 98% 39%');
        root.style.setProperty('--secondary-foreground', '210 10% 98%');
        // Accent colors
        root.style.setProperty('--accent', '210 30% 92%');
        root.style.setProperty('--accent-foreground', '210 50% 10%');
        // Sidebar colors
        root.style.setProperty('--sidebar-primary', '210 100% 45%');
        root.style.setProperty('--sidebar-accent', '210 30% 92%');
        root.style.setProperty('--sidebar-ring', '210 100% 45%');
        break;
        
      case 'purple':
        // Primary colors
        root.style.setProperty('--primary', '270 70% 60%');
        root.style.setProperty('--primary-foreground', '270 10% 98%');
        // Secondary colors
        root.style.setProperty('--secondary', '220 98% 39%');
        root.style.setProperty('--secondary-foreground', '270 10% 98%');
        // Accent colors
        root.style.setProperty('--accent', '270 30% 92%');
        root.style.setProperty('--accent-foreground', '270 50% 10%');
        // Sidebar colors
        root.style.setProperty('--sidebar-primary', '270 70% 60%');
        root.style.setProperty('--sidebar-accent', '270 30% 92%');
        root.style.setProperty('--sidebar-ring', '270 70% 60%');
        break;
    }
  };

  const handleThemeChange = (selectedTheme: 'light' | 'dark' | 'system') => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    applyTheme(selectedTheme);
    toast.success(`Theme set to ${selectedTheme}`);
  };

  const handleColorSchemeChange = (selectedScheme: 'green' | 'blue' | 'purple') => {
    setColorScheme(selectedScheme);
    localStorage.setItem('colorScheme', selectedScheme);
    applyColorScheme(selectedScheme);
    toast.success(`Color scheme set to ${selectedScheme}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>
            Choose your preferred theme for the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              className="flex-1 min-w-[100px]"
              onClick={() => handleThemeChange('light')}
            >
              <Sun className="mr-2 h-4 w-4" />
              Light
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              className="flex-1 min-w-[100px]"
              onClick={() => handleThemeChange('dark')}
            >
              <Moon className="mr-2 h-4 w-4" />
              Dark
            </Button>
            <Button
              variant={theme === 'system' ? 'default' : 'outline'}
              className="flex-1 min-w-[100px]"
              onClick={() => handleThemeChange('system')}
            >
              <PaletteIcon className="mr-2 h-4 w-4" />
              System
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Color Scheme</CardTitle>
          <CardDescription>
            Choose your preferred color scheme for the application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={colorScheme} 
            onValueChange={(value) => handleColorSchemeChange(value as 'green' | 'blue' | 'purple')}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="green" id="green-theme" />
              <Label htmlFor="green-theme" className="flex items-center">
                <span className="h-4 w-4 rounded-full bg-eco-500 mr-2"></span>
                Green (Default)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="blue" id="blue-theme" />
              <Label htmlFor="blue-theme" className="flex items-center">
                <span className="h-4 w-4 rounded-full bg-sky-500 mr-2"></span>
                Blue
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="purple" id="purple-theme" />
              <Label htmlFor="purple-theme" className="flex items-center">
                <span className="h-4 w-4 rounded-full bg-purple-500 mr-2"></span>
                Purple
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
}
