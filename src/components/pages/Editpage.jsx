import React, { useEffect, useState } from 'react';
import "../assets/styles/Updateproduct.css";
import { Col, Container, Row } from 'react-bootstrap';
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import CustomNavbar from '../common/Navbar';
import Sidebar from './Sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaCloudUploadAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Updateproduct = ({ activeSegment, setActiveSegment }) => {
    const location = useLocation();
    const product = location.state?.product || {};

    const navigate = useNavigate();
    const [productName, setProductName] = useState(product.productName || '');
    const [category, setCategory] = useState(product.category || '');
    const [subCategory, setSubCategory] = useState(product.subCategory || '');
    const [tax, setTax] = useState(product.tax || '');
    const [unit, setUnit] = useState(product.unit || '');
    const [price, setPrice] = useState(product.price || '');
    const [discount, setDiscount] = useState(product.discount || '');
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    const token = JSON.parse(localStorage.getItem("token"));
    const max_file_size = 1 * 1024 * 1024;

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.size <= max_file_size) {
            setFile(selectedFile);
            const fileUrl = URL.createObjectURL(selectedFile);
            // setFilePreview(fileUrl);
            setImageUrl(fileUrl);
        } else {
            alert("File size exceeds 1MB.");
        }
    };

    useEffect(() => {
        if (product?.imageId) {
            const imageurl = `https://tn4l1nop44.execute-api.ap-south-1.amazonaws.com/stage1/api/v1_aws_s3_bucket/view/${product.imageId}`;
            setImageUrl(imageurl);
        }
        return () => {
            if (filePreview) URL.revokeObjectURL(filePreview);
        };
    }, [product, filePreview]);

    const handleFileUploadClick = () => {
        document.getElementById('inputfile').click();
    };

    const updateProduct = async (e) => {
        e.preventDefault();

        const productData = {
            productId: product?.productId,
            productName,
            category,
            subCategory,
            tax,
            unit,
            price,
            discount,
            imageId: file?.name || product.imageId,
        };

        try {
            const response = await fetch(
                'https://mjl9lz64l7.execute-api.ap-south-1.amazonaws.com/stage1/api/productmaster/update_productmaster',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(productData),
                }
            );
            if (response.ok) {
                toast.success('Product updated successfully', {
                    position: "top-center"
                });
                setTimeout(() => {
                    navigate('/products/update', { state: { product: productData } });
                }, 2000);
            } else {
                toast.error("Failed to update product.");
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("An error occurred while updating.");
        }
    };

    const onBack = () => {
        navigate('/products/update', { state: { product } });
    };

    const cancelHandle = () => {
        navigate('/products/update', { state: { product } });
    };

    return (
        <section>
            <div>
                <CustomNavbar />
                <div className='productpage-alignment'>
                    <Sidebar activeSegment={activeSegment} setActiveSegment={setActiveSegment} />
                    <div className='w-100 p-5'>
                        <div className='update-pro-header'>
                            <span>
                                <IoArrowBackOutline onClick={onBack} />
                                <h5 className="mb-0">Edit Product</h5>
                            </span>
                            <div className='button-section'>
                                <button className='delete-btn' onClick={cancelHandle}>Cancel</button>
                                <button className='edit-btn' onClick={updateProduct}>Save</button>
                            </div>
                        </div>
                        <Container>
                            <Row className='align-items-center'>
                                <Col xxl={6} lg={6} className='file-image-alignment'>
                                    <div className="file-upload" onClick={handleFileUploadClick}>
                                        {imageUrl && (
                                            <div className="image-preview">
                                                <img src={imageUrl} alt="Preview" className="image-size" />
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
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </Col>
                                <Col xxl={6} lg={6}>
                                    <form>
                                        <div className='product-input'>
                                            <label className='pt-0'>Product Name</label><br />
                                            <input
                                                type="text"
                                                name="productName"
                                                placeholder='Enter Product Name'
                                                value={productName}
                                                onChange={(e) => setProductName(e.target.value)}
                                            />
                                        </div>
                                        <div className='product-alignment'>
                                            <div className='product-input'>
                                                <label>Category</label><br />
                                                <div className="custom-select-container">
                                                    <select
                                                        id="category"
                                                        name="category"
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                    >
                                                        <option value="" hidden>Select Category</option>
                                                        <option value="Category1">Category1</option>
                                                        <option value="Category2">Category2</option>
                                                        <option value="Category3">Category3</option>
                                                    </select>
                                                    <IoMdArrowDropdown className="custom-arrow-icon" />
                                                </div>
                                            </div>
                                            <div className='product-input'>
                                                <label>Sub Category</label><br />
                                                <div className="custom-select-container">
                                                    <select
                                                        id="sub-category"
                                                        name="subCategory"
                                                        value={subCategory}
                                                        onChange={(e) => setSubCategory(e.target.value)}
                                                    >
                                                        <option value="" hidden>Subcategory</option>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </select>
                                                    <IoMdArrowDropdown className="custom-arrow-icon" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='product-alignment'>
                                            <div className='product-input'>
                                                <label>Tax</label><br />
                                                <div className="custom-select-container">
                                                    <select
                                                        id="tax"
                                                        name="tax"
                                                        value={tax}
                                                        onChange={(e) => setTax(e.target.value)}
                                                    >
                                                        <option value="" hidden>Select Tax</option>
                                                        <option value="12%">12%</option>
                                                        <option value="17%">17%</option>
                                                        <option value="10%">10%</option>
                                                    </select>
                                                    <IoMdArrowDropdown className="custom-arrow-icon" />
                                                </div>
                                            </div>
                                            <div className='product-input'>
                                                <label>Unit</label><br />
                                                <div className="custom-select-container">
                                                    <select
                                                        id="unit"
                                                        name="unit"
                                                        value={unit}
                                                        onChange={(e) => setUnit(e.target.value)}
                                                    >
                                                        <option value="" hidden>Unit</option>
                                                        <option value="PCS">PCS</option>
                                                        <option value="PKT">PKT</option>
                                                        <option value="NOS">NOS</option>
                                                    </select>
                                                    <IoMdArrowDropdown className="custom-arrow-icon" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='product-alignment'>
                                            <div className='product-input'>
                                                <label htmlFor="price">Price</label><br />
                                                <input
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    placeholder='Enter Price'
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>
                                            <div className='product-input'>
                                                <label htmlFor="discount">Discount</label><br />
                                                <input
                                                    type="number"
                                                    name="discount"
                                                    id="discount"
                                                    placeholder='Enter Discount'
                                                    value={discount}
                                                    onChange={(e) => setDiscount(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default Updateproduct;
