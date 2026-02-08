import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { processOrder } from '../store/cartSlice';
import { DollarSign, QrCode, Wallet, X } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, totalAmount, onPaymentSuccess }) => {
  const dispatch = useDispatch();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    {
      id: 'cash',
      name: 'Cash on Delivery',
      description: 'ชำระเงินปลายทาง',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      id: 'qr',
      name: 'QR Payment',
      description: 'สแกน QR Code',
      icon: QrCode,
      color: 'bg-blue-500'
    },
    {
      id: 'truemoney',
      name: 'TrueMoney Wallet',
      description: 'กระเป๋าเงิน TrueMoney',
      icon: Wallet,
      color: 'bg-purple-500'
    }
  ];

  const handlePayment = async () => {
    if (!selectedMethod) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Process order
    dispatch(processOrder());
    
    setIsProcessing(false);
    onPaymentSuccess(selectedMethod);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-xl max-w-md w-full border border-white/10 animate-scale-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Select Payment Method
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X size={20} className="text-white/50" />
            </button>
          </div>

          {/* Total Amount */}
          <div className="bg-[#0f111a] rounded-lg p-4 mb-6 border border-white/5">
            <div className="flex justify-between items-center">
              <span className="text-sm uppercase font-black opacity-50 tracking-widest">Total</span>
              <span className="text-2xl font-black text-white">${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3 mb-8">
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                    selectedMethod === method.id
                      ? 'border-primary bg-primary/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className={`${method.color} p-3 rounded-lg`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-black text-white text-lg">{method.name}</h3>
                    <p className="text-xs opacity-50 uppercase tracking-widest">{method.description}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    selectedMethod === method.id 
                      ? 'border-primary bg-primary' 
                      : 'border-white/20'
                  }`}>
                    {selectedMethod === method.id && (
                      <div className="w-2 h-2 bg-white rounded-full m-1"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-4 px-6 rounded-lg border border-white/20 hover:bg-white/5 transition-colors font-black text-white uppercase tracking-widest text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={!selectedMethod || isProcessing}
              className={`flex-1 py-4 px-6 rounded-lg font-black text-white uppercase tracking-widest text-sm transition-all ${
                selectedMethod && !isProcessing
                  ? 'bg-primary hover:bg-primary/80 shadow-lg shadow-primary/20'
                  : 'bg-white/10 cursor-not-allowed opacity-50'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;