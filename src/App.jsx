import "./App.css";
import { ContextProvider } from "./context/Context";
import Index from "./pages";

function App() {
  return (
    <>
      <ContextProvider>
        <Index />
      </ContextProvider>
    </>
  );
}

export default App;
