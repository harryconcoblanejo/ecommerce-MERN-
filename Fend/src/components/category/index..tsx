import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../redux/actions';
import { RootState } from '../../redux/reducers';

import Layout from '../layout';
type options = {
  value: string;
  name: string;
};

const Category = () => {
  const category = useSelector((state: RootState) => state.category);
  const [categoryName, setCategoryName] = useState('');
  const [parentCategoryId, setparentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  // const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

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

  return (
    <Layout sidebar>
      <div className="categoryContainer">
        <h3> My categories</h3>
        <div className="addCategry">
          <button>Add</button>

          <input
            type="text"
            placeholder={`Category Name`}
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <select>
            <option>Select Category</option>

            {createCAtegoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        <div className="categoryDisplay">
          Category list
          <ul>{renderCategories(category.categories)}</ul>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
