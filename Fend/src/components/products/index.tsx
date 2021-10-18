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
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [productImages, setProductImages] = useState('');
  const [category, setCategory] = useState([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };
  return (
    <Layout sidebar>
      <div className="productsContainer">
        <h3> My Products</h3>

        <form
          className="addProduct"
          encType="multipart/form-data" /* onSubmit={#} */
        >
          <input
            label="Product Name"
            type="text"
            placeholder={`Product Name`}
            value={productName}
            name="productName"
            onChange={(e) => setProductName(e.target.value)}
          />
        </form>
      </div>
    </Layout>
  );
};

export default Products;
