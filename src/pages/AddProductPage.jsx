import React from 'react';
import AddProductForm from '../components/AddProductForm';
import { ArrowLeft } from 'lucide-react';

const AddProductPage = ({ onBackClick }) => {
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
