import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddPlayer from './pages/AddPlayer';
import PlayerDetail from './pages/PlayerDetail';
import EditPlayer from './pages/EditPlayer';

import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddPlayer />} />
            <Route path="/player/:id" element={<PlayerDetail />} />
            <Route path="/edit/:id" element={<EditPlayer />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
