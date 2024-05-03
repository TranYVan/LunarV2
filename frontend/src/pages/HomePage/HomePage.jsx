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
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(false);

  const [limit, setLimit] = useState(5);

  const arr = ["TV", "Refrigerator", "Phone"];

  const fetchAllProducts = async (context) => {
    setLoading(true);
    console.log('context', context);
    const limitt = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];

    const res = await ProductService.getAllProducts(search, 0 ,limitt);
    setLoading(false);
    return res;
  };

  const {isLoading, data: products, isPreviousData} = useQuery(
    ["products", limit, searchDebounce],
    fetchAllProducts,
    { retry: 3, retryDelay: 1000, keepPreviousData: true }
  );
  console.log('isPrevious', products)
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
            {products?.content?.map((product) => {
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
              disabled={products?.totalElements === products?.content?.length || !products?.hasNext}
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
              onClick={() => setLimit((prev) => prev + 5)}
            />
          </div>
        </div>
      </div>
    </LoadingComponent>
  );
};

export default HomePage;
