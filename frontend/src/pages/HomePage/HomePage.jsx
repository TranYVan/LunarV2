import React, { useEffect, useRef, useState } from "react";
import TypeProductComponent from "../../components/TypeProductComponent/TypeProductComponent";
import {
  WrapperButtonMore,
  WrapperProducts,
  WrapperTypeProduct,
} from "./style";
import { CardComponent } from "../../components/CardComponent/CardComponent";
import * as ProductService from "../../services/ProductService";

import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useDebounce } from "../../hooks/useDebounce";

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 1000);
  const refSearch = useRef();
  const [loading, setLoading] = useState(false);
  const [stateProducts, setStateProducts] = useState([]);

  const arr = ["TV", "Refrigerator", "Phone"];

  const fetchAllProducts = async (search) => {
    const res = await ProductService.getAllProducts(search);

    if (search?.length > 0 || refSearch.current) {
      setStateProducts(res?.content);
    } else {
      return res;
    }
  };

  useEffect(() => {
    if (refSearch.current) {
      fetchAllProducts(searchDebounce);
    }
    refSearch.current = true;
  }, [searchDebounce])

  const {isLoading, data: products} = useQuery(
    ["products"],
    fetchAllProducts,
    { retry: 3, retryDelay: 1000 }
  );

  useEffect(() => {
    if (products?.content?.length > 0) {
      setStateProducts(products?.content);
    }
  }, [products]);
  
  console.log('loading', isLoading, loading);

  return (
    <LoadingComponent isLoading={isLoading || loading}>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProductComponent name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        className="body"
        style={{ width: "100%", backgroundColor: "#F5F7F8" }}
      >
        <div
          id="container"
          style={{
            height: "1000px",
            width: "1270px",
            margin: "0 auto",
          }}
        >
          <WrapperProducts>
            {stateProducts?.map((product) => {
              return (
                <CardComponent
                  key={product?.id}
                  countInStock={product?.stockQuantity}
                  description={product?.description}
                  name={product?.name}
                  price={product?.cost}
                  type={product?.category}
                  sold={product?.soldQuantity}
                  discount={product?.discount}
                  image={product?.thumbnails}
                />
              );
            })}
          </WrapperProducts>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <WrapperButtonMore
              textButton="Load more"
              styleButton={{
                backgroundColor: "#495E57",
                border: "1px solid #fff",
                width: "220px",
                height: "45px",
              }}
              styleTextButton={{
                color: "#F5F7F8",
                fontWeight: "600",
                fontSize: "16px",
              }}
            />
          </div>
        </div>
      </div>
    </LoadingComponent>
  );
};

export default HomePage;
