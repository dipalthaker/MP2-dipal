import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListView from '../src/pages/ListView';
import GalleryView from '../src/pages/GalleryView';
import DetailView from './pages/DetailView';
import './App.css';
import Header from './components/Header';

export default function App() {
  return (
    <Router basename="/MP2-dipal">
      <Header />
      <div className="container">
      <Routes>
        <Route path="/" element={<ListView />} />
        <Route path="/gallery" element={<GalleryView />} />
        <Route path="/detail/:id" element={<DetailView />} />
      </Routes>
      </div>
    </Router>
  );
};

