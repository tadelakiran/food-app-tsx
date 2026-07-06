import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from './components/Home';
import Veg from './components/Veg';
import NonVeg from './components/NonVeg';
import Milk from './components/Milk';
import Fruits from './components/Fruits';
import Grocery from './components/Grocery';
import Vegetable from './components/Vegetable';
import { FcHome, FcGallery } from 'react-icons/fc';
import Register from './components/Register';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="top-nav">
          <div className="brand">
            <span className="brand-icon">🥗</span>
            <div>
              <h1>Fresh Cart</h1>
              <p>Daily essentials delivered fresh</p>
            </div>
          </div>

          <div className="nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <FcHome /> Home
            </NavLink>

            <NavLink
              to="/veg"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              <FcGallery /> Veg
            </NavLink>

            <NavLink
              to="/non-veg"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              🍗 Non-Veg
            </NavLink>

            <NavLink
              to="/milk"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              🥛 Milk
            </NavLink>

            <NavLink
              to="/fruits"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              🍎 Fruits
            </NavLink>

            <NavLink
              to="/vegetable"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              🥕 Vegetable
            </NavLink>

            <NavLink
              to="/grocery"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              🛒 Grocery
            </NavLink>
             <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              🤵 Register
            </NavLink>
          </div>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/veg" element={<Veg />} />
            <Route path="/non-veg" element={<NonVeg />} />
            <Route path="/milk" element={<Milk />} />
            <Route path="/fruits" element={<Fruits />} />
            <Route path="/grocery" element={<Grocery />} />
            <Route path="/vegetable" element={<Vegetable />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;