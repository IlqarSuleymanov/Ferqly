import Canvas from "./canvas/index.jsx";
import Customizer from "./pages/Customizer.jsx";
import Home from "./pages/Home.jsx";

function App() {
  return (
    <main className="w-full h-screen overflow-hidden transition-all ease-in">
      <Home />
      <Canvas />
      <Customizer />      
    </main>
  );
}

export default App;