
import Scene from "@/components/Scene";
import Controls from "@/components/Controls";
import InfoPanel from "@/components/InfoPanel";
import { ShadingProvider } from "@/context/ShadingContext";

const Index = () => {
  return (
    <ShadingProvider>
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <header className="p-4 border-b border-gray-800 bg-gray-950">
          <h1 className="text-2xl font-bold">3D Object Shading Techniques</h1>
          <p className="text-gray-400 mt-1">
            Interactive demonstration of Phong and Gouraud shading models
          </p>
        </header>

        <main className="flex-grow flex flex-col lg:flex-row">
          {/* 3D Scene takes most of the space */}
          <div className="flex-grow h-[60vh] lg:h-auto relative">
            <Scene />
          </div>

          {/* Controls sidebar */}
          <div className="w-full lg:w-[400px] p-4 overflow-y-auto flex flex-col gap-4 bg-gray-900 border-l border-gray-800">
            <Controls />
            <InfoPanel />
          </div>
        </main>

        <footer className="p-4 text-center text-sm text-gray-500 border-t border-gray-800 bg-gray-950">
          <p>Computer Graphics Project - 3D Shading Techniques Implementation</p>
        </footer>
      </div>
    </ShadingProvider>
  );
};

export default Index;
