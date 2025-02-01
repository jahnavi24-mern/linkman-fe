import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './App.module.css'

import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import Links from './pages/Links/Links';
import Analytics from './pages/Analytics/Analytics';
import Settings from './pages/Settings/Settings';
import { ToastProvider } from './context/ToastContext';

function App() {

  return (
    <ToastProvider>
      <div className={styles.container}>
        <img src="../logo.svg" alt="logo" className={styles.logo} />

        <Router>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/links" element={<Links />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>

      </div>
    </ToastProvider>
  )
}

export default App
