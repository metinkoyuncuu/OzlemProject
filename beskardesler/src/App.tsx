import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hakkimizda from './Hakkimizda';
import Hizmetler from './Hizmetler';
import Iletisim from './Iletisim';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <header>
          <h1>Wordpress Kurumsal Firma Teması v3</h1>
        </header>
        <Routes>
          <Route path="/" element={
            <>
              <div>
                <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
              </div>
              <h1>Vite + React</h1>
              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
              </div>
              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>
            </>
          } />
          <Route path="/hakkimizda" element={<Hakkimizda />} />
          <Route path="/hizmetler" element={<Hizmetler />} />
          <Route path="/iletisim" element={<Iletisim />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
