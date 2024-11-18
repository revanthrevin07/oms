import React, { useEffect, useState } from 'react';
import "../assets/styles/Updateproduct.css";
import { Col, Container, Row } from 'react-bootstrap';
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import CustomNavbar from '../common/Navbar';
import Sidebar from './Sidebar';
import { useNavigate, useLocation, useMemo } from 'react-router-dom';

const Updateproduct = ({ activeSegment, setActiveSegment }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const product = location.state?.product || {};
    const [imageUrl, setImageUrl] = useState(null);
    

    useEffect(() => {
        if (product?.imageId) {
            const imageId = product.imageId;
            const imageurl = `https://tn4l1nop44.execute-api.ap-south-1.amazonaws.com/stage1/api/v1_aws_s3_bucket/view/${imageId}`;
            setImageUrl(imageurl);
        }
    }, [product]);

    const deleteHandle = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const productData = {
            prodId: product?.prodId,
        };

        try {
            const deleteresponse = await fetch(
                `https://mjl9lz64l7.execute-api.ap-south-1.amazonaws.com/stage1/api/productmaster/delete_productmaster_by_id/${productData.prodId}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (deleteresponse.ok) {
                navigate('/products');
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onBack = () => {
        navigate('/products');
    };

    const editHandle = () => {
        navigate('/products/update/edit', { state: { product } });
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
                                <h5 className="mb-0">Product List</h5>
                            </span>
                            <div className='button-section'>
                                <button className='delete-btn' onClick={deleteHandle}>Delete</button>
                                <button className='edit-btn' onClick={editHandle}>Edit</button>
                            </div>
                        </div>
                        <Container>
                            <Row className='align-items-center'>
                                <Col xxl={6} lg={6} className='file-image-alignment'>
                                    <div className="file-upload">
                                        {imageUrl && (
                                            <div className="image-preview">
                                                <img src={imageUrl} alt="Product" className="image-size" />
                                            </div>
                                        )}
                                        <input
                                            required
                                            id="inputfile"
                                            type="file"
                                            name="inputfile"
                                            accept=".svg, .png, .jpg"
                                        />
                                    </div>
                                </Col>
                                <Col xxl={6} lg={6}>
                                    {product && (
                                        <form>
                                            <div className='product-input'>
                                                <label className='pt-0'>Product Name</label><br />
                                                <input
                                                    type="text"
                                                    name="productName"
                                                    placeholder='Enter Product Name'
                                                    value={product.productName}
                                                    readOnly
                                                />
                                            </div>

                                            <div className='product-alignment'>
                                                <div className='product-input'>
                                                    <label>Category</label><br />
                                                    <div className="custom-select-container">
                                                        <select
                                                            id="category"
                                                            name="category"
                                                            value={product.category}
                                                            readOnly
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
                                                            value={product.subCategory}
                                                            readOnly
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
                                                            value={product.tax}
                                                            readOnly
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
                                                            value={product.unit}
                                                            readOnly
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
                                                        value={product.price}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className='product-input'>
                                                    <label>Discount</label><br />
                                                    <input
                                                        required
                                                        type="text"
                                                        name="discount"
                                                        placeholder="Enter Discount"
                                                        value={product.discount}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Updateproduct;
