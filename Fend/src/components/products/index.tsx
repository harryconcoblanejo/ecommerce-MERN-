import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../layout';

import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory } from '../../redux/actions';
import { RootState } from '../../redux/reducers';
import { addProduct } from '../../redux/actions/product.actions';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    label?: string;
  }
}

type Option = {
  value: string;
  name: string;
  children?: string;
};

const Products = () => {
  const category = useSelector((state: RootState) => state.category);

  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [productImages, setProductImages] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const dispatch = useDispatch();

  const [activeForm, setActiveForm] = useState(false);

  const handleProductImages = (e: any) => {
    setProductImages([...productImages, e.target.files[0]]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = new FormData();
    form.append('productName', productName);
    form.append('quantity', quantity);
    form.append('description', description);

    form.append('category', categoryId);
    form.append('price', price);

    for (let img of productImages) {
      form.append('productImages', img);
    }

    dispatch(addProduct(form));

    setActiveForm(false);
  };

  const showForm = () => {
    console.log('showing form...');
    setActiveForm(true);
  };

  const createCategoryList = (categories: any[], options: any = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        children: category.children,
      });

      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };
  const renderProducts = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Product Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2</td>
            <td>name</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Product Description</td>
            <td>Category</td>
          </tr>
        </tbody>
      </table>
    );
  };
  return (
    <Layout sidebar>
      <div className="productsContainer">
        <h3> My Products</h3>

        <span onClick={() => showForm()} className="addProductButton">
          Add Product
        </span>
        {renderProducts()}
        <form
          className={activeForm == true ? '' : 'hidenForm'} // realizar estilos formulario
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

            {createCategoryList(category.categories).map((option: Option) => (
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
