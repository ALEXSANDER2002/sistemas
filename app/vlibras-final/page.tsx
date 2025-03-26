'use client'

import VLibras from "@djpfs/react-vlibras";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <VLibras />
      <header className="App-header">
        <img src="/unifesspa.jpg" className="App-logo" alt="logo" />
        <h1>Exemplo com VLibras</h1>
        <p>Esta página implementa o VLibras diretamente.</p>
      </header>
    </div>
  );
}

export default App; 