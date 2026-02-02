import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="group glass-card rounded-lg overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300">
      <figure className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <div className="badge badge-primary font-black text-[9px] uppercase tracking-widest px-2 py-2 border-none">
            {product.category}
          </div>
        </div>
      </figure>
      
      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-lg font-bold tracking-tight text-white group-hover:text-primary transition-colors uppercase italic">
          {product.name}
        </h2>
        <p className="text-xs opacity-50 line-clamp-2 leading-relaxed">
          {product.description || "High-performance gear."}
        </p>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase opacity-40 font-black tracking-widest">Available</span>
            <span className="text-xs font-bold text-white">{product.quantity} Units</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] uppercase opacity-40 font-black tracking-widest block">Price</span>
            <span className="text-xl font-black text-white">${product.price.toFixed(2)}</span>
          </div>
        </div>

        <button 
          className="btn btn-primary w-full h-10 rounded-lg shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all active:scale-95 text-white uppercase text-[10px] font-black tracking-widest border-none mt-2"
          onClick={handleAddToCart}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
