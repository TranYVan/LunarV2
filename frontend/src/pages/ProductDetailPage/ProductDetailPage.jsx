import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const {id} = useParams();
  ('id', id)
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#F5F7F8", padding: "0 120px"}}>
      <h4 style={{fontSize: "12px", fontWeight: "normal"}}><span style={{cursor: "pointer", fontWeight: "bold"}} onClick={() => navigate('/')}>Home</span> - <span style={{cursor: "pointer"}}>Product Details</span></h4>
      <ProductDetailComponent idProduct={id}/>
    </div>
  );
}

export default ProductDetailPage