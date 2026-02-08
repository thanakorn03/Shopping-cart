import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import AddProductPage from './pages/AddProductPage';

function App() {
  const [view, setView] = useState('home'); // 'home', 'cart', 'addProduct'

  const handleCartClick = () => {
    setView('cart');
  };

  const handleAddProductClick = () => {
    setView('addProduct');
  };

  const handleHomeClick = () => {
    setView('home');
  };

  return (
    <div className="min-h-screen bg-[#0f111a] text-[#e2e8f0]">
      <Navbar 
        onCartClick={handleCartClick} 
        onHomeClick={handleHomeClick} 
        onAddProductClick={handleAddProductClick}
      />
      
      <main>
        {view === 'home' && <HomePage />}
        {view === 'cart' && <CartPage onBackClick={() => setView('home')} />}
        {view === 'addProduct' && <AddProductPage onBackClick={() => setView('home')} />}
      </main>
      
      <footer className="py-12 px-6 border-t border-white/5 bg-[#1a1c2e]">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
          <div className="flex flex-col items-center md:items-start leading-tight">
            <span className="text-sm font-black tracking-widest uppercase">Shopping Cart</span>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">High Performance Hardware Dashboard</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
