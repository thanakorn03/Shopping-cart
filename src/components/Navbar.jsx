import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ShoppingCart, PackagePlus, LayoutGrid, Search, User } from 'lucide-react';

const Navbar = ({ onCartClick, onHomeClick, onAddProductClick }) => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const handlePageChange = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  return (
    <nav className="navbar bg-[#1a1c2e] sticky top-0 z-50 border-b border-white/5 px-6 md:px-12 h-20 transition-all flex justify-between">
      {/* Far Left: Logo Section */}
      <div className="flex-none">
        <button 
          onClick={onHomeClick}
          className="flex items-center gap-3 outline-none"
        >
          <div className="flex flex-col items-start leading-none">
            <span className="text-2xl font-black tracking-tighter italic text-white uppercase">Shopping<span className="text-primary not-italic">Cart</span></span>
            <span className="text-[9px] uppercase font-black tracking-[0.5em] opacity-30 ml-0.5">High Performance</span>
          </div>
        </button>
      </div>

      {/* Far Right: Actions Section */}
      <div className="flex-none flex items-center gap-6">
        {/* Navigation Group */}
        <div className="hidden md:flex items-center gap-6 text-[11px] uppercase font-bold tracking-[0.2em]">
          <button onClick={onHomeClick} className="hover:text-primary transition-colors">Home</button>
          <button onClick={onAddProductClick} className="hover:text-primary transition-colors">Inventory</button>
        </div>

        {/* Sleek Search Bar */}
        <div className="hidden lg:flex items-center bg-white/5 rounded-lg px-4 h-11 border border-white/5 w-64 group focus-within:border-primary/50 transition-all">
          <Search size={16} className="opacity-30 group-focus-within:text-primary transition-colors shrink-0" />
          <input 
            type="text" 
            placeholder="Search dashboard..." 
            className="bg-transparent border-none outline-none text-xs ml-3 w-full placeholder:opacity-20 text-white"
            disabled
          />
        </div>

        <div className="w-px h-6 bg-white/10 mx-1 hidden md:block" />

        {/* Cart Icon */}
        <button 
          onClick={onCartClick}
          className="relative group p-2 hover:text-primary transition-all active:scale-95"
        >
          <ShoppingCart size={22} strokeWidth={2} className="group-hover:text-primary transition-colors" />
          {totalQuantity > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-4.5 bg-red-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white px-1 shadow-lg">
              {totalQuantity}
            </span>
          )}
        </button>

        <div className="w-px h-6 bg-white/10 mx-1 hidden md:block" />

        {/* User Profile Section */}
        <div className="flex items-center gap-3 pl-2">
          <div className="hidden sm:flex flex-col items-end leading-none">
            <span className="text-[10px] font-black text-white uppercase tracking-tighter">Thanakorn</span>
            <span className="text-[8px] uppercase font-bold text-primary tracking-widest opacity-70">Admin Mode</span>
          </div>
          <button className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:border-primary/50 transition-all active:scale-95 group">
            <User size={18} className="opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
