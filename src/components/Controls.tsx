
import { useContext } from 'react';
import { ShadingContext } from '../context/ShadingContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from '@/components/ui/label';

export default function Controls() {
  const {
    shadingMode,
    setShadingMode,
  } = useContext(ShadingContext);

  return (
    <Card className="min-w-[300px] w-full max-w-[400px] shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Shading Technique</CardTitle>
      </CardHeader>
      
      <CardContent>
        <RadioGroup 
          value={shadingMode} 
          onValueChange={(value) => setShadingMode(value as 'phong' | 'gouraud')}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phong" id="phong" />
            <Label htmlFor="phong">Phong Shading</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="gouraud" id="gouraud" />
            <Label htmlFor="gouraud">Gouraud Shading</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
