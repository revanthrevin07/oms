import React, { useState } from 'react';
import "../assets/styles/Createproduct.css";
import { Col, Container, Row } from 'react-bootstrap';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import CustomNavbar from '../common/Navbar';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Createproduct = ({ activeSegment, setActiveSegment }) => {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const max_file_size = 1 * 1024 * 1024;

  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    subCategory: '',
    tax: '',
    unit: '',
    price: '',
    discount: '',
    imageId: null
  });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size <= max_file_size) {
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setFilePreview(fileUrl);
    } else {
      alert("File size exceeds 1MB.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload an image.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("file", file);

    try {
      const response = await fetch(
        "https://tn4l1nop44.execute-api.ap-south-1.amazonaws.com/stage1/api/v1_aws_s3_bucket/upload",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) throw new Error("Upload failed.");

      const contentType = response.headers.get("content-type");
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log(data.token);
      } else {
        const text = await response.text();
        console.log(text);
      }

      const imageId = file.name;

      const productData = {
        productName: formData.productName,
        category: formData.category,
        subCategory: formData.subCategory,
        tax: formData.tax,
        unit: formData.unit,
        price: formData.price,
        discount: formData.discount,
        imageId: imageId,
      };

      const token = JSON.parse(localStorage.getItem("token"));

      const productResponse = await fetch(
        'https://mjl9lz64l7.execute-api.ap-south-1.amazonaws.com/stage1/api/productmaster/add_productmaster',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        }
      );

      const responseBody = await productResponse.json();

      if (productResponse.ok) {
        toast.success('Products added successfully', {
          position: "top-center"
        })
        setTimeout(() => {
          navigate("/products");
        }, 1000);
      } else {
        console.error('API Error:', responseBody);
        alert("Error adding product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  

  const onBack = () => {
    navigate('/products');
  };

  const handleFileUploadClick = () => {
    document.getElementById('inputfile').click();
  };

  const handleCloseClick = () => {
    setFile(null);
    setFilePreview(null);
    document.getElementById('inputfile').value = '';
  };

  return (
    <section>
      <CustomNavbar />
      <div className="productpage-alignment">
        <Sidebar activeSegment={activeSegment} setActiveSegment={setActiveSegment} />
        <div className="w-100 p-5">
          <div>
            <div className="add-product-heading">
              <IoArrowBackOutline onClick={onBack} aria-label="Go back" />
              <h5 className="mb-0">Add New Product</h5>
            </div>

            <form onSubmit={handleSubmit}>
              <Container>
                <Row className="align-items-end">
                  <Col xxl={6} lg={6} className="file-image-alignment">
                    <div className="file-upload" onClick={handleFileUploadClick}>
                      {filePreview && (
                        <div className="image-preview">
                          <img src={filePreview} alt="Preview" className="image-size" />
                          <AiFillCloseSquare className='close-icon' onClick={handleCloseClick} />
                        </div>
                      )}
                      <label htmlFor="upload" className="image-label">
                        <FaCloudUploadAlt />
                        <h5>Click to upload image</h5>
                        <p>SVG, PNG, JPG, or GIF <br />Recommended size (1000px * 1248px)</p>
                      </label>
                      <input
                        required
                        id="inputfile"
                        type="file"
                        name="inputfile"
                        accept=".svg, .png, .jpg"
                        value={formData.imageId}
                        onChange={handleFileChange}
                      />
                    </div>
                  </Col>

                  <Col xxl={6} lg={6}>
                    <div className="product-input">
                      <label>Product Name <span className="required">*</span></label><br />
                      <input
                        required
                        type="text"
                        name="productName"
                        placeholder="Enter Product Name"
                        value={formData.productName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="product-alignment">
                      <div className="product-input">
                        <label>Category<span className="required">*</span></label><br />
                        <div className="custom-select-container">
                          <select
                            id="category"
                            name="category"
                            onChange={handleInputChange}
                            value={formData.category}
                            required
                          >
                            <option value="" hidden>Select Category</option>
                            <option value="Category1">Category1</option>
                            <option value="Category2">Category2</option>
                            <option value="Category3">Category3</option>
                          </select>
                          <IoMdArrowDropdown className="custom-arrow-icon" />
                        </div>
                      </div>

                      <div className="product-input">
                        <label>Sub Category <span className="required">*</span></label><br />
                        <div className="custom-select-container">
                          <select
                            id="sub-category"
                            name="subCategory"
                            onChange={handleInputChange}
                            value={formData.subCategory}
                            required
                          >
                            <option value="" hidden>Select Subcategory</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                          <IoMdArrowDropdown className="custom-arrow-icon" />
                        </div>
                      </div>
                    </div>

                    <div className="product-alignment">
                      <div className="product-input">
                        <label>Tax <span className="required">*</span></label><br />
                        <div className="custom-select-container">
                          <select
                            id="tax"
                            name="tax"
                            onChange={handleInputChange}
                            value={formData.tax}
                            required
                          >
                            <option value="" hidden>Select Tax</option>
                            <option value="12%">12%</option>
                            <option value="17%">17%</option>
                            <option value="10%">10%</option>
                          </select>
                          <IoMdArrowDropdown className="custom-arrow-icon" />
                        </div>
                      </div>

                      <div className="product-input">
                        <label>Unit <span className="required">*</span></label><br />
                        <div className="custom-select-container">
                          <select
                            id="unit"
                            name="unit"
                            onChange={handleInputChange}
                            value={formData.unit}
                            required
                          >
                            <option value="" hidden>Select Unit</option>
                            <option value="PCS">PCS</option>
                            <option value="PKT">PKT</option>
                            <option value="NOS">NOS</option>
                          </select>
                          <IoMdArrowDropdown className="custom-arrow-icon" />
                        </div>
                      </div>
                    </div>

                    <div className="product-alignment">
                      <div className="product-input">
                        <label>Price <span className="required">*</span></label><br />
                        <input
                          required
                          type="number"
                          name="price"
                          placeholder="Enter Price"
                          value={formData.price}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="product-input">
                        <label>Discount <span className="required">*</span></label><br />
                        <input
                          required
                          type="text"
                          name="discount"
                          placeholder="Enter Discount"
                          value={formData.discount}
                          onChange={(e) => handleInputChange({
                            target: { name: 'discount', value: e.target.value.replace(/\D/g, '').slice(0, 2) + (e.target.value ? '%' : '') }
                          })}
                        />
                      </div>

                    </div>

                    <div className="update-btn">
                      <button type="button" onClick={onBack}>Cancel</button>
                      <button type="submit">Save</button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Createproduct;
