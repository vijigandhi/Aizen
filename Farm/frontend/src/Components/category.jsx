import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CategoryForm = () => {
    const [category, setCategory] = useState({
        category_name: '',
        subCategory_name: '',
        description: '',
        image: null,
        is_popular: 0,
        status: '',
    });

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/category');
                if (response.data && Array.isArray(response.data)) {
                    setCategories(response.data);
                } else {
                    console.error('Invalid data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'category_name') {
            setSelectedCategory(value);
        }
        if (name === 'image') {
            setCategory(prevCategory => ({
                ...prevCategory,
                image: files[0] // Add the file object directly
            }));
        } else {
            setCategory(prevCategory => ({
                ...prevCategory,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('category_name', category.category_name);
        formData.append('subCategory_name', category.subCategory_name);
        formData.append('description', category.description);
        formData.append('image', category.image); 
        formData.append('is_popular', category.is_popular);
        formData.append('status', category.status);

        // Log FormData to verify the content
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await axios.post('http://localhost:8000/api/subCategory', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log('Response:', response.data);

            if (response.data.status === 'error') {
                console.error('Error:', response.data.message);
            } else {
                // Reset form after successful submission
                setCategory({
                    category_name: '',
                    subCategory_name: '',
                    description: '',
                    image: null,
                    is_popular: 0,
                    status: '',
                });
                setSelectedCategory('');
            }
        } catch (error) {
            console.error('Error adding subcategory:', error);
        }
    };

    return (
        <div className="category-form">
            <h2>Add New Subcategory</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Category Name:</label>
                    <select
                        name="category_name"
                        value={category.category_name}
                        onChange={handleChange}>
                        <option value="">Select Category</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat.category_name}>{cat.category_name}</option>
                        ))}
                    </select>
                </div>

                {selectedCategory && (
                    <div className="form-group">
                        <label>Add Item to {selectedCategory}:</label>
                        <input
                            name="subCategory_name"
                            type="text"
                            value={category.subCategory_name}
                            onChange={handleChange}
                        />
                    </div>
                )}

                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={category.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Image:</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Is Popular:</label>
                    <input
                        name="is_popular"
                        type="number"
                        value={category.is_popular}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <input
                        type="text"
                        name="status"
                        value={category.status}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Subcategory</button>
            </form>
        </div>
    );
};

export default CategoryForm;
