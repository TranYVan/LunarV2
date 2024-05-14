import React, { useEffect, useRef, useState } from "react";
import {
  WrapperAddUserButton,
  WrapperHeader,
  WrapperUploadFile,
} from "./style";
import { Button, Checkbox, Form, Input, Modal, Select, Space } from "antd";
import { PlusOutlined, DeleteTwoTone, EditTwoTone, SearchOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import InputFormComponent from "../InputFormComponent/InputFormComponent";
import { getBase64 } from "../../utils/FileUtils";
import * as ProductService from "../../services/ProductService";
import * as CategoryService from "../../services/CategoryService";
import { message } from "antd";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useQuery } from "react-query";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminProduct = () => {
  const [form] = Form.useForm();
  const [updateProductForm] = Form.useForm();

  const [rowSelected, setRowSelected] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

  // const [searchText, setSearchText] = useState('');
  // const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [stateProduct, setStateProduct] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    discount: "",
    type: {
      id: "",
      name: "",
    },
    image: "",
    rating: 0
  });
  const [stateProductDetail, setStateProductDetail] = useState({
    name: "",
    description: "",
    price: "",
    stockQuantity: "",
    discount: "",
    type: {
      id: "",
      name: "",
    },
    image: "",
    rating: 0
  });

  const fetchAllCategories = async () => {
    const res = await CategoryService.getAllCategory();
    return res;
  };
  
  const fetchAllProducts = async () => {
    const res = await ProductService.getAllProducts("", 0, -1);
    return res;
  };
  
  const fetchProductDetail = async () => {
    const res = await ProductService.getDetailProduct(rowSelected);
    if (res) {
      setStateProductDetail({
        name: res?.name,
        description: res?.description,
        discount: res?.discount,
        price: res?.cost,
        stockQuantity: res?.stockQuantity,
        type: {
          id: res?.category?.id,
          name: res?.category?.name,
        },
        image: res?.thumbnails,
        rating: res?.rating
      });
    }
  };

  const { data: categories } = useQuery(
    ["categories"],
    fetchAllCategories,
    { retry: 3, retryDelay: 1000 }
  );

  const productsQuery = useQuery(["products"], fetchAllProducts, {
    retry: 3,
    retryDelay: 1000,
  });

  console.log('products query', productsQuery);
  
  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      fetchProductDetail();
    }
  }, [rowSelected, isOpenDrawer]);

  useEffect(() => {
    form.setFieldsValue(stateProduct);
    form.setFieldValue("type", stateProduct?.type?.id);
  }, [form, stateProduct]);

  useEffect(() => {
    updateProductForm.setFieldsValue(stateProductDetail);
    updateProductForm.setFieldValue("type", stateProductDetail?.type?.id);
  }, [updateProductForm, stateProductDetail]);

  const handleDetailsProduct = () => {
      setIsOpenDrawer(true);
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  }
  const renderActions = () => {
    return (
      <div style={{ display: "flex", gap: "4px" }}>
        <DeleteTwoTone
          twoToneColor="#E54F6D"
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => {
            setIsModalOpenDelete(true);
          }}
        />
        <EditTwoTone
          twoToneColor="#13a303"
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
      </div>
    );
  };

  const mutation = useMutationHook((payload) => {
    const { name, description, price, stockQuantity, type, image, discount, rating } = payload;
    console.log(payload);
    const res = ProductService.createProduct({
      name: name,
      description: description,
      cost: parseFloat(price),
      stockQuantity: parseInt(stockQuantity),
      category: type,
      thumbnails: image,
      rating: rating,
      discount: parseFloat(discount)
    });

    return res;
  });

  const mutationUpdateProduct = useMutationHook((payload) => {
    const { name, description, price, stockQuantity, type, image, discount, rating } = payload;
    const res = ProductService.updateProduct(rowSelected, {
      name: name,
      description: description,
      cost: parseFloat(price),
      stockQuantity: parseInt(stockQuantity),
      category: type,
      thumbnails: image,
      rating: parseFloat(rating),
      discount: parseFloat(discount)
    });
    return res;
  });

  const mutationDeleteProduct = useMutationHook((payload) => {
    const res = ProductService.deleteProduct(rowSelected);
    return res;
  })

  const mutationDeleteMany = useMutationHook((payload) => {
    const {...ids} = payload;
    const res = ProductService.deleteManyProduct(ids);
    return res;
  })

  const { data, isLoading, isError, isSuccess } = mutation;
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isError: isErrorUpdated,
    isSuccess: isSuccessUpdated,
  } = mutationUpdateProduct;
  const {data: dataDeleted, isLoading: isLoadingDeleted, isError: isErrorDeleted, isSuccess: isSuccessDeleted} = mutationDeleteProduct;
  const {data: dataDeletedMany, isLoading: isLoadingDeletedMany, isError: isErrorDeletedMany, isSuccess: isSuccessDeletedMany} = mutationDeleteMany;

  const handleCancel = () => {
    setIsModelOpen(false);
    setStateProduct({
      name: "",
      description: "",
      price: "",
      discount: "",
      stockQuantity: "",
      type: {
        id: "",
        name: "",
      },
      image: "",
      rating: 0
    });

    form.resetFields();
  };
  
  const handleDrawerClose = () => {
    setIsOpenDrawer(false);
    updateProductForm.resetFields();
  }
  
  const onFinish = () => {
    console.log("state product", stateProduct);
    mutation.mutate(stateProduct, {
      onSettled: () => {
        productsQuery.refetch();
      },
    });
  };

  const onFinishUpdate = () => {
    mutationUpdateProduct.mutate(stateProductDetail, {
      onSettled: () => {
        productsQuery.refetch();
      },
    });
  };

  const handleDeleteManyProducts = (ids) => {
    mutationDeleteMany.mutate({ids: ids}, {
      onSettled: () => {
        productsQuery.refetch();
      }
    });
    console.log('ids ', {ids});
  }

  const onFinishFailed = () => {
    console.log("finish failed");
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleDeleteProduct = () => {
    mutationDeleteProduct.mutate({}, {
      onSettled: () => {
        productsQuery.refetch();
      }
    });
  }
  
  const handleOnChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };
  const handleOnChangeImageDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetail({
      ...stateProductDetail,
      image: file.preview,
    });
  };

  const handleOnCategoryChange = (value) => {
    const foundObject = categories.find((obj) => obj.id === value);
    console.log("found", foundObject);

    setStateProduct({
      ...stateProduct,
      type: {
        id: foundObject?.id,
        name: foundObject?.name,
      },
    });
  };

  const handleOnCategoryDetailChange = (value) => {
    const foundObject = categories.find((obj) => obj.id === value);

    setStateProductDetail({
      ...stateProductDetail,
      type: {
        id: foundObject?.id,
        name: foundObject?.name,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      messageApi.open({
        type: "success",
        content: "Success",
      });
      handleCancel();
    } else if (isError) {
      messageApi.open({
        type: "error",
        content: "Try Again",
      });
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isSuccessUpdated) {
      messageApi.open({
        type: "success",
        content: "Success",
      });
      console.log('haha');
      handleDrawerClose();
    } else if (isErrorUpdated) {
      messageApi.open({
        type: "error",
        content: "Try Again",
      });
    }
  }, [isSuccessUpdated, isErrorUpdated]);

  useEffect(() => {
    if (isSuccessDeletedMany) {
      messageApi.open({
        type: "success",
        content: dataDeletedMany
      })
    } else if (isErrorDeletedMany) {
      messageApi.open({
        type: "error",
        content: "Delete Failed"
      })
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany])

  useEffect(() => {
    if (isSuccessDeleted) {
      messageApi.open({
        type: "success",
        content: "Delete Product Successfully",
      });
      handleCancelDelete();
    } else if (isErrorDeleted) {
      messageApi.open({
        type: "error",
        content: "Delete Product Failed",
      });
    }
  }, [isSuccessDeleted, isErrorDeleted]);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    }
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a style={{ color: "#724e91" }}>{text}</a>,
      sorter: (a, b) => a.name < b.name,
      ...getColumnSearchProps('name')
    },
    {
      title: "Price",
      dataIndex: "cost",
      sorter: (a, b) => a.cost - b.cost,
      filters: [
        {
          text: "Under 500$",
          value: "Under500",
        },
        {
          text: "Over 500$",
          value: "Over500",
        },
      ],
      onFilter: (value, record) => {
        if (value === "Under500") {
          return record.cost <= 500;
        }
        return record.cost > 500;
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      sorter: (a, b) => a.discount - b.discount
    },
    {
      title: "Stock Quantity",
      dataIndex: "stockQuantity",
      sorter: (a, b) => a.stockQuantity - b.stockQuantity,
    },
    {
      title: "Rating",
      dataIndex: "rating"
    }, 
    
    {
      title: "Type",
      dataIndex: ["category", "name"],
      filters: categories?.map(c => {
        return {
          text: c.name,
          value: c.name
        }
      }),
      onFilter: (value, record) => {
        console.log('pair ', value, record);
        const foundObject = categories.find((obj) => obj.name === value);
        return record?.category?.name === foundObject?.name;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderActions,
    },
  ];

  const dataTable = productsQuery?.data?.content?.length && productsQuery?.data?.content?.map((product) => {
    return {
      ...product, key: product.id
    };
  });
  console.log(dataTable)
  return (
    <div>
      {contextHolder}
      <WrapperHeader>Product Tracking</WrapperHeader>
      <div style={{ marginTop: "25px" }}>
        <WrapperAddUserButton onClick={() => setIsModelOpen(true)}>
          <PlusOutlined style={{ fontSize: "50px" }} />
        </WrapperAddUserButton>
      </div>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <TableComponent
          handleDeleteMany={handleDeleteManyProducts}
          isAllowDelete={true}
          columns={columns}
          data={dataTable}
          isLoading={productsQuery?.isLoading}
          
          rowKey={(record) => record.id}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record.id);
              }, // click row
            };
          }}
        />
      </div>
      <ModalComponent
        forceRender
        title="Create new product"
        isOpen={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <LoadingComponent isLoading={isLoading}>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input product's name",
                },
              ]}
            >
              <InputFormComponent
                value={stateProduct.name}
                onChange={handleOnChange}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <InputFormComponent
                value={stateProduct.description}
                onChange={handleOnChange}
                name="description"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Product must has a specific category",
                },
              ]}
            >
              <Select
                onChange={handleOnCategoryChange}
                options={categories?.map((category) => {
                  return {
                    value: category?.id,
                    label: category?.name,
                  };
                })}
              ></Select>
            </Form.Item>

            <Form.Item
              label="Stock Quantity"
              name="stockQuantity"
              rules={[
                {
                  required: true,
                  message: "Please input the current stock quantity",
                },
              ]}
            >
              <InputFormComponent
                value={stateProduct.stockQuantity}
                onChange={handleOnChange}
                name="stockQuantity"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input the price",
                },
              ]}
            >
              <InputFormComponent
                value={stateProduct.price}
                onChange={handleOnChange}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Please input the price",
                },
              ]}
            >
              <InputFormComponent
                value={stateProduct?.discount}
                onChange={handleOnChange}
                name="discount"
              />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input the price",
                },
              ]}
            >
              <InputFormComponent
                value={stateProduct?.rating}
                onChange={handleOnChange}
                name="rating"
              />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please upload the image",
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnChangeImage} maxCount={1}>
                <div style={{ display: "flex" }}>
                  <Button>Select File</Button>
                  {stateProduct?.image && (
                    <img
                      src={stateProduct?.image}
                      id="image"
                      style={{
                        height: "70px",
                        width: "70px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginLeft: "15px",
                      }}
                      alt="image"
                    />
                  )}
                </div>
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#495E57" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </ModalComponent>
      <DrawerComponent
        title="Product Detail"
        isOpen={isOpenDrawer}
        onClose={handleDrawerClose}
        width="60%"
      >
        <LoadingComponent isLoading={isLoadingUpdated}>
          <Form
            form={updateProductForm}
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinishUpdate}
            onFinishFailed={() => {
              form.resetFields();
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input product's name",
                },
              ]}
            >
              <InputFormComponent
                value={stateProductDetail?.name}
                onChange={handleOnChangeDetail}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <InputFormComponent
                value={stateProductDetail?.description}
                onChange={handleOnChangeDetail}
                name="description"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Product must has a specific category",
                },
              ]}
            >
              <Select
                onChange={handleOnCategoryDetailChange}
                options={categories?.map((category) => {
                  return {
                    value: category?.id,
                    label: category?.name,
                  };
                })}
              ></Select>
            </Form.Item>

            <Form.Item
              label="Stock Quantity"
              name="stockQuantity"
              rules={[
                {
                  required: true,
                  message: "Please input the current stock quantity",
                },
              ]}
            >
              <InputFormComponent
                value={stateProductDetail?.stockQuantity}
                onChange={handleOnChangeDetail}
                name="stockQuantity"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input the price",
                },
              ]}
            >
              <InputFormComponent
                value={stateProductDetail?.price}
                onChange={handleOnChangeDetail}
                name="price"
              />
            </Form.Item>
            <Form.Item
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Please input the current stock quantity",
                },
              ]}
            >
              <InputFormComponent
                value={stateProductDetail?.discount}
                onChange={handleOnChangeDetail}
                name="discount"
              />
            </Form.Item>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input the current rating",
                },
              ]}
            >
              <InputFormComponent
                value={stateProductDetail?.rating}
                onChange={handleOnChangeDetail}
                name="rating"
              />
            </Form.Item>
            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please upload the image",
                },
              ]}
            >
              <WrapperUploadFile
                onChange={handleOnChangeImageDetail}
                maxCount={1}
              >
                <div style={{ display: "flex" }}>
                  <Button>Select File</Button>
                  {stateProductDetail?.image && (
                    <img
                      src={stateProductDetail?.image}
                      id="image"
                      style={{
                        height: "70px",
                        width: "70px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginLeft: "15px",
                      }}
                      alt="image"
                    />
                  )}
                </div>
              </WrapperUploadFile>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#495E57" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </DrawerComponent>
      <ModalComponent title="Remove Product" isOpen={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
        <LoadingComponent isLoading={isLoadingDeleted}>
          <div>Are you sure removing this product?</div>
        </LoadingComponent>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;
