import React from 'react';
import { useSelector } from 'react-redux';
import AddProductForm from '../components/AddProductForm';
import { ArrowLeft, Shield } from 'lucide-react';

const AddProductPage = ({ onBackClick }) => {
  const { isAuthenticated, role } = useSelector(state => state.auth);
  
  // Check if user has permission to add products
  const hasPermission = !isAuthenticated || role === 'admin';
  
  if (!hasPermission) {
    return (
      <div className="container mx-auto px-6 py-12 animate-fade-in max-w-4xl">
        <div className="flex flex-col mb-16">
          <button 
            onClick={onBackClick}
            className="group flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.3em] text-primary hover:opacity-100 transition-opacity mb-4"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase leading-none text-red-500">
            ACCESS <span className="text-primary not-italic">DENIED</span>
          </h1>
        </div>
        
        <div className="glass-card rounded-xl p-12 text-center border border-red-500/20 max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20">
            <Shield size={40} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-black text-white mb-4">Insufficient Permissions</h2>
          <p className="text-gray-400 mb-8">You don't have permission to access this page. Only administrators can manage inventory.</p>
          <button 
            onClick={onBackClick}
            className="btn btn-primary px-8 py-3 rounded-lg font-black tracking-widest text-sm border-none"
          >
            RETURN TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in max-w-4xl">
      <div className="flex flex-col mb-16">
        <button 
          onClick={onBackClick}
          className="group flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.3em] text-primary hover:opacity-100 transition-opacity mb-4"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase leading-none">
          ASSET <span className="text-primary not-italic">MANAGEMENT</span>
        </h1>
        <div className="flex items-center gap-4 mt-4">
          <div className="h-0.5 w-12 bg-primary" />
          <p className="text-xs opacity-40 font-black uppercase tracking-[0.3em]">Hardware inventory initialization portal</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <AddProductForm />
      </div>
    </div>
  );
};

export default AddProductPage;
