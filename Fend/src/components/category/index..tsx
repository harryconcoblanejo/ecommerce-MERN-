import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../../redux/actions';
import { RootState } from '../../redux/reducers';

import Layout from '../layout';

const Category = () => {
  const category = useSelector((state: RootState) => state.category);
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

  return (
    <Layout sidebar>
      <div className="categoryContainer">
        <h3> My categories</h3>
        <button>Add</button>
        <div className="categoryDisplay">
          Category list
          <ul>{renderCategories(category.categories)}</ul>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
