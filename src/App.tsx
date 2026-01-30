import { ConnectButton } from "@rainbow-me/rainbowkit";
import { APITester } from "./APITester";
import "./index.css";
import { SendMessage } from "./components/SendMessage";

export function App() {
  return (
    <div className="app">
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #eaeaea',
        marginBottom: '2rem'
      }}>
        <h1>Bun + React + Wagmi</h1>
        <ConnectButton />
      </header>

      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
      <APITester />
      <SendMessage />
    </div>
  );
}

export default App;
