import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/articulos" element={<ArticleList />} />
        <Route path="/articulo/:code" element={<ArticleDetail />} />
      </Routes>
    </BrowserRouter>
  );
}