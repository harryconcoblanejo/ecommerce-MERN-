import axios from '../../helpers/axios';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addCategory, getAllCategory } from '../../redux/actions';
import { RootState } from '../../redux/reducers';

import Layout from '../layout';
type options = {
  value: string;
  name: string;
};
import '../category/category.styles/index.scss';
const Category = () => {
  const [activeForm, setActiveForm] = useState(false);
  const category = useSelector((state: RootState) => state.category);
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setparentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  const [update, setUpdate] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, [update]);

  const renderCategories = (categories: any) => {
    let myCategories = [];

    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>,
      );
    }

    return myCategories;
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
  const handleCategoryImage = (e: any) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', categoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);

    dispatch(addCategory(form));

    setActiveForm(false);
  };

  const showForm = () => {
    console.log('showing form...');
    setActiveForm(true);
  };
  return (
    <Layout sidebar>
      <div className="categoryContainer">
        <h3> My categories</h3>
        <span onClick={() => showForm()} className="addCategoryButton">
          Add Category
        </span>

        <form
          className={activeForm == true ? 'addCategory' : 'hidenForm'}
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <input
            className="categoryName"
            type="text"
            placeholder={`Category Name`}
            value={categoryName}
            name="name"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <select
            onChange={(e) => setparentCategoryId(e.target.value)}
            value={parentCategoryId}
          >
            <option>Select Category</option>

            {createCAtegoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>

          <label htmlFor="categoryImage" className="categoryImageLabel">
            Select Image
          </label>
          <input
            type="file"
            name="categoryImage"
            id="categoryImage"
            onChange={handleCategoryImage}
            className="categoryImage"
          />

          <button type="submit">send</button>
        </form>

        <div className="categoryDisplay">
          <h4 className="categoryListTitle">Category list</h4>

          <ul>{renderCategories(category.categories)}</ul>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
