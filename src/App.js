// src/App.jsx
import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Table from './Table';
import Detail from './Detail';

export default function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/:workItem" element={<Detail />} />
      </Routes>
    </MemoryRouter>
  );
}
