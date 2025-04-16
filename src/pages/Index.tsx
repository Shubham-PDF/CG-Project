
import Scene from "@/components/Scene";
import Controls from "@/components/Controls";
import InfoPanel from "@/components/InfoPanel";
import { ShadingProvider } from "@/context/ShadingContext";

const Index = () => {
  return (
    <ShadingProvider>
      <div className="min-h-screen flex flex-col bg-gray-800 text-white">
        <header className="p-3 border-b border-gray-700 bg-gray-900">
          <h1 className="text-xl font-medium">3D Shading Demo</h1>
          <p className="text-gray-400 text-sm">
            Phong and Gouraud shading implementation
          </p>
        </header>

        <main className="flex-grow flex flex-col lg:flex-row">
          {/* 3D Scene takes most of the space */}
          <div className="flex-grow h-[60vh] lg:h-auto relative">
            <Scene />
          </div>

          {/* Controls sidebar */}
          <div className="w-full lg:w-[300px] p-3 overflow-y-auto flex flex-col gap-3 bg-gray-800 border-l border-gray-700">
            <Controls />
            <InfoPanel />
          </div>
        </main>

        <footer className="p-2 text-center text-xs text-gray-500 border-t border-gray-700 bg-gray-900">
          <p>Computer Graphics Assignment - 3D Shading Implementation</p>
        </footer>
      </div>
    </ShadingProvider>
  );
};

export default Index;
