import React from 'react';
import ProductCard from '../components/ProductCard';
import AddProductForm from '../components/AddProductForm';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const products = useSelector((state) => state.products.products);

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in max-w-[1700px]">
      <div className="grid grid-cols-12 gap-12">
        {/* Left Column (8/12) - Product Gallery */}
        <div className="col-span-12 lg:col-span-8">
          <div className="flex flex-col mb-16">
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 italic leading-none uppercase">
              FEATURED <span className="text-primary not-italic">COLLECTION</span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="h-0.5 w-16 bg-primary" />
              <p className="text-xs opacity-40 font-black uppercase tracking-[0.4em]">High-performance hardware dashboard</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Right Column (4/12) - Inventory Control Sidebar */}
        <div className="col-span-12 lg:col-span-4">
          <div className="sticky top-32 h-fit">
            <AddProductForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
