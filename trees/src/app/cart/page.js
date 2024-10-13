
'use client';

import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    console.log('Current cart:', cart);
  }, [cart]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">سلة التسوق</h1>
      {cart.length === 0 ? (
        <p>السلة فارغة</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="mb-2 p-2 border rounded">
                <span>{item.title}</span> <br></br>- 
                <img src={item.imageUrl}/> <br></br>- 
                <span>{item.price} ريال</span> - <br/>
                <span>الكمية: {item.quantity}</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  إزالة
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">الإجمالي: {total} ريال</p>
          <button
            onClick={clearCart}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            إفراغ السلة
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;