import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../layout';

import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    label?: string;
  }
}

const Products = () => {
  const category = useSelector((state: RootState) => state.category);

  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [productImages, setProductImages] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState('');

  const [activeForm, setActiveForm] = useState(false);

  const handleProductImages = (e: any) => {
    setProductImages([...productImages, e.target.files[0]]);
  };
  console.log(productImages);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = new FormData();
    // form.append('productName', productName);
    // form.append('quantity', quantity);
    // form.append('description', description);
    // form.append('productImages', productImages);
    // form.append('category', category);
    // form.append('price', price);

    console.log(`productName: ${productName},
     quantity: ${quantity},
      description: ${description},
       category:${category},
       price:${price}`);
    console.log(productImages);

    // dispatch(addCategory(form));

    setActiveForm(false);
  };

  const showForm = () => {
    console.log('showing product form...');
    setActiveForm(true);
  };

  const createCAtegoryList = (categories: any) => {
    const options = [];
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCAtegoryList(category.children);
      }
    }

    return options;
  };

  return (
    <Layout sidebar>
      <div className="productsContainer">
        <h3> My Products</h3>

        <form
          className="addProduct"
          encType="multipart/form-data" /* onSubmit={#} */
          onSubmit={handleSubmit}
        >
          <input
            label="Product Name"
            type="text"
            placeholder={`Product Name`}
            value={productName}
            name="productName"
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            label="Quantity"
            type="text"
            placeholder={`Quantity`}
            value={quantity}
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            label="Price"
            type="text"
            placeholder={`Price`}
            value={price}
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            label="Description"
            type="text"
            placeholder={`Description`}
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            onChange={(e) => setCategoryId(e.target.value)}
            value={categoryId}
          >
            <option>Select Category</option>

            {createCAtegoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          {productImages.length > 0
            ? productImages.map((pic: any, index: number) => (
                <div key={index}>{pic.name}</div>
              ))
            : null}

          <input
            label="Product Images"
            type="file"
            multiple
            placeholder={`Product Images`}
            // value={productImages}
            name="productImages"
            onChange={handleProductImages}
          />

          <button type="submit">Create Product</button>
        </form>
      </div>
    </Layout>
  );
};

export default Products;
