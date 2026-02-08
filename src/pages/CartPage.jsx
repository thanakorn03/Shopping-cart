import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import { reduceQuantity, restoreQuantity } from '../store/productSlice';
import PaymentModal from '../components/PaymentModal';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';

const CartPage = ({ onBackClick }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const shipping = 4.99;
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div className="flex flex-col">
          <button 
            onClick={onBackClick}
            className="group flex items-center gap-2 text-[10px] uppercase font-black tracking-[0.3em] text-primary hover:opacity-100 transition-opacity mb-4"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Return to Dashboard
          </button>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase leading-none">
            PURCHASE <span className="text-primary not-italic">CART</span>
          </h1>
        </div>
        
        <div className="glass-card px-8 py-5 rounded-lg flex items-center gap-6 border border-white/5">
          <div className="flex flex-col items-end leading-none">
            <span className="text-[10px] uppercase font-black opacity-30 mb-2 tracking-widest">Active Units</span>
            <span className="text-3xl font-black text-white">{cart.totalQuantity}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          {cart.items.length === 0 ? (
            <div className="glass-card p-20 rounded-lg text-center border-dashed border-white/10">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingCart className="opacity-20 text-primary" size={40} />
              </div>
              <p className="text-2xl font-black opacity-30 mb-10 tracking-tight uppercase italic">Manifest is empty</p>
              <button onClick={onBackClick} className="btn btn-primary h-14 rounded-lg px-12 font-black tracking-widest text-xs border-none shadow-lg shadow-primary/20">EXPLORE PRODUCTS</button>
            </div>
          ) : (
            cart.items.map((item) => (
              <div key={item.id} className="glass-card flex items-center gap-8 p-6 rounded-lg group relative overflow-hidden transition-all hover:border-primary/20">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-lg overflow-hidden shrink-0 border border-white/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                </div>
                
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-[9px] uppercase font-black text-primary tracking-[0.2em] mb-2 block">{item.category}</span>
                    <h3 className="font-bold text-xl md:text-2xl tracking-tighter text-white uppercase italic leading-none mb-3">{item.name}</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase font-black opacity-30 tracking-widest">Unit Price</span>
                      <p className="text-white font-black text-lg">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-5 bg-[#0f111a] rounded-lg p-2 border border-white/5">
                      <button 
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/5 transition-colors text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch(restoreQuantity({ id: item.id, amount: 1 }));
                            dispatch(updateQuantity({ id: item.id, type: 'decrement' }));
                          }
                        }}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} strokeWidth={3} />
                      </button>
                      <span className="w-6 text-center font-black text-xl text-white">{item.quantity}</span>
                      <button 
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/5 transition-colors text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                        onClick={() => {
                          dispatch(reduceQuantity({ id: item.id, amount: 1 }));
                          dispatch(updateQuantity({ id: item.id, type: 'increment' }));
                        }}
                        disabled={item.quantity >= item.originalQuantity}
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    </div>
                    
                    <button 
                      className="p-3 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      onClick={() => {
                        dispatch(restoreQuantity({ id: item.id, amount: item.quantity }));
                        dispatch(removeFromCart(item.id));
                      }}
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 sticky top-32">
          <div className="glass-card p-10 rounded-lg border-white/5">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-0.5 bg-primary rounded-full" />
              <h2 className="text-[11px] uppercase font-black tracking-[0.4em] text-primary">Financial Summary</h2>
            </div>
            
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase opacity-30 tracking-widest">Subtotal</span>
                <span className="text-lg font-black text-white">${cart.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase opacity-30 tracking-widest">Logistics</span>
                <span className="text-lg font-black text-white">${cart.items.length > 0 ? shipping.toFixed(2) : "0.00"}</span>
              </div>
              
              <div className="h-px bg-white/5 w-full" />
              
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-black text-primary tracking-[0.3em]">Total Valuation</span>
                <span className="text-5xl font-black text-white tracking-tighter italic">
                  ${(cart.items.length > 0 ? cart.totalAmount + shipping : 0).toFixed(2)}
                </span>
              </div>
              
              <button 
                onClick={() => setIsPaymentModalOpen(true)}
                className={`btn btn-primary w-full h-16 mt-6 rounded-lg font-black tracking-[0.3em] text-sm border-none shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all ${cart.items.length === 0 ? 'opacity-20 cursor-not-allowed' : ''}`}
                disabled={cart.items.length === 0}
              >
                Pay ORDER
              </button>
              
              {paymentSuccess && (
                <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg text-center">
                  <p className="text-success font-black text-sm uppercase tracking-widest mb-2">
                    Payment Successful!
                  </p>
                  <p className="text-xs opacity-70">
                    Paid via {selectedPaymentMethod}
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-center gap-3 pt-4 opacity-20">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                <p className="text-[9px] uppercase font-black tracking-widest">Secure Uplink Verified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={cart.items.length > 0 ? cart.totalAmount + shipping : 0}
        onPaymentSuccess={(method) => {
          setPaymentSuccess(true);
          setSelectedPaymentMethod(method);
          setTimeout(() => setPaymentSuccess(false), 5000);
        }}
      />
    </div>
  );
};

export default CartPage;
