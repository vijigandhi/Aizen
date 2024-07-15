import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductDetail = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    // const customerId = 1;  // You can dynamically set this based on the logged-in user

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/productDetail');
                setProducts(response.data);
            } catch (err) {
                setError(err);
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = async (product) => {
        const payload = {
            customer_id: product.customer_id,
            product_id: product.id,
            quantity: product.quantity  
        };
        console.log('Sending payload:', payload);  

        try {
            const response = await axios.post('http://localhost:8000/api/cart', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Added to cart:', response.data);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    if (error) {
        return <div>Error fetching products: {error.message}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Products List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={product.image} alt={product.product_name} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{product.product_name}</h2>
                            <p className="text-gray-600 mb-2">{product.description}</p>
                            <div className="flex items-center justify-between">
                                <div className="text-lg font-semibold">
                                    {product.special_price ? `$${product.special_price}` : `$${product.actual_price}`}
                                </div>
                                <p className="mt-2">Available Quantity: {product.quantity}</p>
                                <button 
                                    onClick={() => addToCart(product)} 
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetail;
