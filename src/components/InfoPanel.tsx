
import { useContext } from 'react';
import { ShadingContext } from '../context/ShadingContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function InfoPanel() {
  const { shadingMode } = useContext(ShadingContext);

  const renderShadingExplanation = () => {
    switch (shadingMode) {
      case 'phong':
        return (
          <>
            <h3 className="text-lg font-medium mb-2">Phong Shading</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Phong shading performs lighting calculations at each pixel, providing more accurate 
              highlights and smoother surface lighting. It calculates lighting per fragment (pixel).
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium">Key Components:</h4>
                <ul className="list-disc list-inside pl-2 text-muted-foreground space-y-1">
                  <li>Ambient reflection</li>
                  <li>Diffuse reflection</li>
                  <li>Specular reflection</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Advantages:</h4>
                <ul className="list-disc list-inside pl-2 text-muted-foreground space-y-1">
                  <li>Higher quality specular highlights</li>
                  <li>Smooth lighting across surfaces</li>
                  <li>More realistic appearance</li>
                </ul>
              </div>
            </div>
          </>
        );
      case 'gouraud':
        return (
          <>
            <h3 className="text-lg font-medium mb-2">Gouraud Shading</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Gouraud shading calculates lighting at each vertex and then interpolates 
              these values across the faces. It's computationally efficient but less accurate
              for specular highlights.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium">Key Components:</h4>
                <ul className="list-disc list-inside pl-2 text-muted-foreground space-y-1">
                  <li>Per-vertex lighting calculation</li>
                  <li>Linear interpolation across faces</li>
                  <li>Normal averaging at vertices</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Advantages:</h4>
                <ul className="list-disc list-inside pl-2 text-muted-foreground space-y-1">
                  <li>Computationally more efficient</li>
                  <li>Acceptable for low-polygon models</li>
                  <li>Good diffuse lighting representation</li>
                </ul>
              </div>
            </div>
          </>
        );
      case 'basic':
        return (
          <>
            <h3 className="text-lg font-medium mb-2">Basic (Flat) Shading</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Basic shading applies a single color to each face without lighting calculations.
              This is used as a reference to compare with the more advanced shading techniques.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium">Key Components:</h4>
                <ul className="list-disc list-inside pl-2 text-muted-foreground space-y-1">
                  <li>Single color per face</li>
                  <li>No illumination model</li>
                  <li>No reflection components</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Characteristics:</h4>
                <ul className="list-disc list-inside pl-2 text-muted-foreground space-y-1">
                  <li>Minimal computational cost</li>
                  <li>No realistic lighting</li>
                  <li>Used as a baseline reference</li>
                </ul>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="min-w-[300px] w-full max-w-[400px] shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Shading Technique Info</CardTitle>
        <CardDescription>
          Learn about different 3D shading models
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-4">
        {renderShadingExplanation()}
      </CardContent>
    </Card>
  );
}
