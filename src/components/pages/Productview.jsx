import React, { useState, useEffect } from 'react';
import "../assets/styles/Productview.css";
import { IoSearch } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Productview = () => {
  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      alert("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        'https://mjl9lz64l7.execute-api.ap-south-1.amazonaws.com/stage1/api/productmaster/get_all_productmaster',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const responseBody = await response.json();
      if (response.ok) {
        if (Array.isArray(responseBody)) {
          setProductList(responseBody);
        } else {
          console.log('API response is empty');
          setProductList([]);
        }
      } else {
        console.error('Error fetching products:', responseBody);
      }
    } catch (error) {
      console.error("There was an error fetching the products:", error);
    }
  };


  const productHeading = [
    { segment: "productname", title: "Product Name" },
    { segment: "category", title: "Category" },
    { segment: "subcategory", title: "Sub Category" },
    { segment: "unit", title: "Unit" },
    { segment: "price", title: "Price" },
    { segment: "tax", title: "Tax" },
  ];

  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleCategoryChange = (event) => setSelectedCategory(event.target.value);
  const handleSubCategoryChange = (event) => setSelectedSubCategory(event.target.value);

  const filteredProducts = productList.filter((product) =>
    (product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery) ||
      product.tax.toString().includes(searchQuery)) &&
    (selectedCategory ? product.category === selectedCategory : true) &&
    (selectedSubCategory ? product.subCategory === selectedSubCategory : true)
  );

  const handleRowClick = (product) => {
    navigate('/products/update', { state: { product } });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const displayedProducts = filteredProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <>
      <section>
        <div className='product-header'>
          <h5>Product List</h5>
          <Link to="/products/create">
            <button className='create-btn'>Create</button>
          </Link>
        </div>

        <div className='update-product'>
          <div className='search-section col-12 col-lg-6 col-xl-5 col-md-6'>
            <div className='search-box-container'>
              <input
                id="search"
                type="text"
                placeholder='Search'
                className='search-box'
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <IoSearch className='search-icon' />
            </div>
            <div className='filter-section'>
              <div className="custom-select-wrapper">
                <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                  <option value="" >Category</option>
                  <option value="Category1">Category1</option>
                  <option value="Category2">Category2</option>
                  <option value="Category3">Category3</option>
                </select>
                <IoMdArrowDropdown className="custom-arrow-icon" />
              </div>

              <div className="custom-select-wrapper">
                <select id="subcategory" value={selectedSubCategory} onChange={handleSubCategoryChange}>
                  <option value="" >Sub Category</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <IoMdArrowDropdown className="custom-arrow-icon" />
              </div>
            </div>
          </div>

          <table className='w-100'>
            <thead>
              <tr>
                {productHeading.map((product, index) => (
                  <th key={index} className='table-heading'>
                    {product.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedProducts.length > 0 ? (
                displayedProducts.map((product, index) => (
                  <tr
                    key={index}
                    className="product-item"
                    onClick={() => handleRowClick(product)}
                  >
                    <td>{product.productName}</td>
                    <td>{product.category}</td>
                    <td>{product.subCategory}</td>
                    <td>{product.unit}</td>
                    <td>{product.price}</td>
                    <td>{product.tax}</td>
                  </tr>
                ))
              ) : (
                <tr className='product-item'>
                  <td colSpan='6'>No products found.</td>
                </tr>
              )}
            </tbody>
          </table>

          <Stack spacing={2} className='pagination-align'
          >
            <Pagination
              count={Math.ceil(filteredProducts.length / rowsPerPage)}
              page={page}
              onChange={handlePageChange}
              color='primary'
            />
          </Stack>
        </div>
      </section>
    </>
  );
};

export default Productview;
