
import { useContext } from 'react';
import { ShadingContext } from '../context/ShadingContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export default function Controls() {
  const {
    shadingMode,
    setShadingMode,
    lightIntensity,
    setLightIntensity,
    lightColor,
    setLightColor,
    ambientIntensity,
    setAmbientIntensity,
    showStats,
    setShowStats,
    shininess,
    setShininess,
    lightPosition,
    setLightPosition
  } = useContext(ShadingContext);

  // Convert light position values for sliders
  const handleLightXChange = (value: number[]) => {
    setLightPosition([value[0], lightPosition[1], lightPosition[2]]);
  };
  
  const handleLightYChange = (value: number[]) => {
    setLightPosition([lightPosition[0], value[0], lightPosition[2]]);
  };
  
  const handleLightZChange = (value: number[]) => {
    setLightPosition([lightPosition[0], lightPosition[1], value[0]]);
  };

  return (
    <Card className="min-w-[300px] w-full max-w-[400px] shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">3D Shading Techniques</CardTitle>
        <CardDescription>
          Experiment with Phong and Gouraud shading
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs defaultValue="shading" className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="shading">Shading</TabsTrigger>
            <TabsTrigger value="lighting">Lighting</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shading" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Shading Model</h3>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setShadingMode('phong')}
                  className={`px-3 py-2 rounded-md text-sm ${
                    shadingMode === 'phong'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  Phong
                </button>
                <button
                  onClick={() => setShadingMode('gouraud')}
                  className={`px-3 py-2 rounded-md text-sm ${
                    shadingMode === 'gouraud'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  Gouraud
                </button>
                <button
                  onClick={() => setShadingMode('basic')}
                  className={`px-3 py-2 rounded-md text-sm ${
                    shadingMode === 'basic'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  Basic
                </button>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="shininess">Material Shininess</Label>
                <span className="text-sm text-muted-foreground">{shininess}</span>
              </div>
              <Slider
                id="shininess"
                min={0}
                max={300}
                step={1}
                value={[shininess]}
                onValueChange={(val) => setShininess(val[0])}
                disabled={shadingMode !== 'phong'}
              />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="show-stats">Show Stats</Label>
              <Switch
                id="show-stats"
                checked={showStats}
                onCheckedChange={setShowStats}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="lighting" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="light-intensity">Light Intensity</Label>
                <span className="text-sm text-muted-foreground">{lightIntensity.toFixed(1)}</span>
              </div>
              <Slider
                id="light-intensity"
                min={0}
                max={2}
                step={0.1}
                value={[lightIntensity]}
                onValueChange={(val) => setLightIntensity(val[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="ambient-intensity">Ambient Light</Label>
                <span className="text-sm text-muted-foreground">{ambientIntensity.toFixed(1)}</span>
              </div>
              <Slider
                id="ambient-intensity"
                min={0}
                max={1}
                step={0.1}
                value={[ambientIntensity]}
                onValueChange={(val) => setAmbientIntensity(val[0])}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Label htmlFor="light-position-x">Light Position X</Label>
              <Slider
                id="light-position-x"
                min={-10}
                max={10}
                step={0.1}
                value={[lightPosition[0]]}
                onValueChange={handleLightXChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="light-position-y">Light Position Y</Label>
              <Slider
                id="light-position-y"
                min={-10}
                max={10}
                step={0.1}
                value={[lightPosition[1]]}
                onValueChange={handleLightYChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="light-position-z">Light Position Z</Label>
              <Slider
                id="light-position-z"
                min={-10}
                max={10}
                step={0.1}
                value={[lightPosition[2]]}
                onValueChange={handleLightZChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="light-color">Light Color</Label>
              <input
                id="light-color"
                type="color"
                value={lightColor}
                onChange={(e) => setLightColor(e.target.value)}
                className="w-full h-10 rounded-md cursor-pointer"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
