import React from 'react';
import ProductList from '../../components/ProductList';

export default function MarketPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-green-800 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">TreeVerse Shop</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <ProductList />
      </main>
    </div>
  );
}