import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/productSlice';
import { PlusCircle } from 'lucide-react';

const AddProductForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity)
    };
    dispatch(addProduct(formattedData));
    reset();
  };

  return (
    <div className="glass-card p-8 rounded-lg relative overflow-hidden group h-fit">
      <div className="flex flex-col mb-10 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-0.5 bg-primary rounded-full" />
          <span className="text-[10px] uppercase font-black tracking-[0.3em] text-primary">Control Unit</span>
        </div>
        <h2 className="text-3xl font-black tracking-tighter italic leading-none uppercase">ADD <span className="text-white not-italic">PRODUCT</span></h2>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
        <div className="form-control">
          <label className="label py-0 mb-1">
            <span className="text-[10px] uppercase font-black opacity-30 tracking-widest ml-1">Designation</span>
          </label>
          <input 
            type="text" 
            placeholder="e.g. ULTRA-X1" 
            className={`cyber-input ${errors.name ? 'border-red-500/50' : ''}`}
            {...register("name", { required: "Name is required" })}
          />
        </div>

        <div className="form-control">
          <label className="label py-0 mb-1">
            <span className="text-[10px] uppercase font-black opacity-30 tracking-widest ml-1">Category</span>
          </label>
          <select 
            className={`cyber-input appearance-none ${errors.category ? 'border-red-500/50' : ''}`}
            {...register("category", { required: "Category is required" })}
          >
            <option value="" className="bg-[#0f111a]">Select Classification</option>
            <option value="Electronics" className="bg-[#0f111a]">Electronics</option>
            <option value="Accessories" className="bg-[#0f111a]">Accessories</option>
            <option value="Home" className="bg-[#0f111a]">Home</option>
            <option value="Office" className="bg-[#0f111a]">Office</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label py-0 mb-1">
            <span className="text-[10px] uppercase font-black opacity-30 tracking-widest ml-1">Asset URL</span>
          </label>
          <input 
            type="text" 
            placeholder="https://..." 
            className={`cyber-input ${errors.image ? 'border-red-500/50' : ''}`}
            {...register("image", { required: "Image URL is required" })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label py-0 mb-1">
              <span className="text-[10px] uppercase font-black opacity-30 tracking-widest ml-1">Price</span>
            </label>
            <input 
              type="number" 
              step="0.01"
              placeholder="0.00" 
              className={`cyber-input ${errors.price ? 'border-red-500/50' : ''}`}
              {...register("price", { required: "Required", min: 0.01 })}
            />
          </div>

          <div className="form-control">
            <label className="label py-0 mb-1">
              <span className="text-[10px] uppercase font-black opacity-30 tracking-widest ml-1">Stock</span>
            </label>
            <input 
              type="number" 
              placeholder="0" 
              className={`cyber-input ${errors.quantity ? 'border-red-500/50' : ''}`}
              {...register("quantity", { required: "Required", min: 1 })}
            />
          </div>
        </div>

        <div className="form-control">
          <label className="label py-0 mb-1">
            <span className="text-[10px] uppercase font-black opacity-30 tracking-widest ml-1">Specs</span>
          </label>
          <textarea 
            placeholder="Details..." 
            className={`cyber-input h-24 py-3 resize-none ${errors.description ? 'border-red-500/50' : ''}`}
            {...register("description", { required: "Description is required" })}
          />
        </div>

        <button type="submit" className="btn btn-info w-full h-12 rounded-lg font-bold tracking-[0.2em] shadow-lg shadow-info/10 hover:shadow-info/20 hover:-translate-y-0.5 transition-all text-white uppercase text-xs border-none">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
