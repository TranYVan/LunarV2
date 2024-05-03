import React, { useEffect, useRef, useState } from "react";
import {
  WrapperAddUserButton,
  WrapperHeader,
  WrapperUploadFile,
} from "./style";
import { Button, Checkbox, DatePicker, Form, Input, Select, Space, message } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import InputFormComponent from "../InputFormComponent/InputFormComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useQuery } from "react-query";
import {
  UserAddOutlined,
  DeleteTwoTone,
  EditTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import { useMutationHook } from "../../hooks/useMutationHook";
import { getBase64 } from "../../utils/FileUtils";
import * as ProductService from "../../services/ProductService";
import * as CategoryService from "../../services/CategoryService";
import * as UserService from "../../services/UserService";
import InputPasswordComponent from "../InputFormComponent/InputPasswordComponent";

const dateFormat = "YYYY-MM-DD";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const AdminUser = () => {
  const [form] = Form.useForm();
  const [updateUserForm] = Form.useForm();

  const [rowSelected, setRowSelected] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModelOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const [stateUser, setStateUser] = useState({
    fullName: "",
    phone: "",
    email: "",
    birthday: dayjs(),
    roles: [],
    avatar: "",
    password: ""
  });

  const [stateUserDetail, setStateUserDetail] = useState({
    fullName: "",
    phone: "",
    birthday: "",
    roles: [],
    avatar: "",
    password: ""
  });

  const fetchAllCategories = async () => {
    const res = await CategoryService.getAllCategory();
    return res;
  };

  const fetchAllUsers = async () => {
    const res = await UserService.getAllUsers();
    return res;
  };
  
  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getUserProfileById(rowSelected)

    if (res) {
      setStateUserDetail({
        fullName: res?.fullName,
        phone: res?.phone,
        roles: res?.roles.map((rl) => {
          return rl?.name;
        }),
        avatar: res?.avatar,
        birthday: dayjs(res?.birthday, dateFormat),
        password: ""
      })
    }
    setIsLoadingDetail(false)
  }
  
  const usersQuery = useQuery(["users"], fetchAllUsers, {
    retry: 3,
    retryDelay: 1000,
  });

  useEffect(() => {
    form.setFieldsValue(stateUser);
  }, [form, stateUser]);

  useEffect(()=> {
    updateUserForm.setFieldsValue(stateUserDetail);
  }, [updateUserForm, stateUserDetail])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingDetail(true);
      fetchGetDetailsUser(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const renderActions = () => {
    return (
      <div style={{ display: "flex", gap: "4px" }}>
        <EditTwoTone
          twoToneColor="#13a303"
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
      </div>
    );
  };

  

  const mutationCreateUser = useMutationHook((payload) => {
    const { fullName, email, phone, birthday, avatar, roles, password } = payload;
    const res = UserService.createUser({
      fullName: fullName,
      email: email,
      phone: phone,
      avatar: avatar,
      roles: roles,
      password: password,
      birthday: birthday
    });

    return res;
  });

  const mutationUpdateUser = useMutationHook((payload) => {
    const { fullName, email, phone, birthday, avatar, roles, password } = payload;
    const res = UserService.updateUser(rowSelected, {
      fullName: fullName,
      email: email,
      phone: phone,
      avatar: avatar,
      roles: roles,
      password: password,
      birthday: birthday
    });
    return res;
  });

  const { data, isLoading, isError, isSuccess } = mutationCreateUser;
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isError: isErrorUpdated,
    isSuccess: isSuccessUpdated,
  } = mutationUpdateUser;

  const handleCancel = () => {
    setIsModelOpen(false);
    setStateUser({
      fullName: "",
      phone: "",
      email: "",
      birthday: "",
      roles: [],
      avatar: "",
    });

    form.resetFields();
  };
  
  const handleDrawerClose = () => {
    setIsOpenDrawer(false);
    updateUserForm.resetFields();
  };

  const onFinish = () => {
    mutationCreateUser.mutate({
      ...stateUser,
      birthday: stateUser.birthday.format(dateFormat),
      roles: stateUser?.roles.map(r => {
        return {
          name: r
        }
      })
    }, {
      onSettled: () => {
        usersQuery.refetch();
      },
    });
  };

  const onFinishUpdate = () => {
    mutationUpdateUser.mutate({
      ...stateUserDetail,
      birthday: stateUserDetail?.birthday.format(dateFormat),
      roles: stateUserDetail?.roles.map(r => {
        return {
          name: r
        }
      })
    }, {
      onSettled: () => {
        usersQuery.refetch();
      },
    });
  };

  const onFinishFailed = () => {
    ("finish failed");
  };

  const handleOnChange = (e) => {
  
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeRolesInCreateForm = (e) => {
    setStateUser({
      ...stateUser,
      roles: e
    })
  }
  const handleOnChangeRolesInUpdateForm = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      roles: e
    })
  }

  const handleOnChangeBirthday = (value) => {
    setStateUser({
      ...stateUser,
      birthday: value
    })
  };

  const handleOnChangeBirthdayDetail = (value) => {
    setStateUserDetail({
      ...stateUserDetail,
      birthday: value
    })
  };

  const handleOnChangeAvatar = async ({ fileList }) => {
    
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUser({
      ...stateUser,
      avatar: file.preview
    })

  };

  const handleOnChangeAvatarDetail = async ({ fileList }) => {
    
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetail({
      ...stateUserDetail,
      avatar: file.preview
    })

  };

  const handleOnChangeDetail = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value,
    });
  };
  ('detail ', stateUserDetail);
  const handleOnChangeImageDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetail({
      ...stateUserDetail,
      image: file.preview,
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

      handleDrawerClose();
    } else if (isErrorUpdated) {
      messageApi.open({
        type: "error",
        content: "Try Again",
      });
    }
  }, [isSuccessUpdated, isErrorUpdated]);


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
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
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
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
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      ...getColumnSearchProps('id')
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <a style={{ color: "#724e91", fontWeight: "bold" }}>{text}</a>,
      ...getColumnSearchProps('email')
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      sorter: (a,b) => a.fullName < b.fullName,
      ...getColumnSearchProps('fullName')
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps('phone')
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      sorter: (a,b) => {
        return a.birthday > b.birthday;
      },
      ...getColumnSearchProps('birthday')
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderActions,
    },
  ];

  return (
    <div>
      {contextHolder}
      <WrapperHeader>User Management</WrapperHeader>
      <div style={{ marginTop: "25px" }}>
        <WrapperAddUserButton onClick={() => setIsModelOpen(true)}>
          <UserAddOutlined style={{ fontSize: "50px" }} />
        </WrapperAddUserButton>
      </div>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <TableComponent
          columns={columns}
          data={usersQuery?.data?.content}
          isLoading={usersQuery?.isLoading}
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
        title="Create New User"
        isOpen={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <LoadingComponent isLoading={isLoading}>
          <Form
            form={form}
            name="CreateUserForm"
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
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input product's name",
                },
              ]}
            >
              <InputFormComponent
                value={stateUser?.fullName}
                onChange={handleOnChange}
                name="fullName"
              />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <InputFormComponent
                value={stateUser?.phone}
                onChange={handleOnChange}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input this field",
                },
                {
                  type: "email",
                  message: "Please input an valid email here"
                }
              ]}
            >
              <InputFormComponent
                value={stateUser?.email}
                onChange={handleOnChange}
                name="email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "User must has a password",
                },
              ]}
            >
              <InputPasswordComponent
                value={stateUser?.password}
                onChange={handleOnChange}
                name="password"
              />
            </Form.Item>

            <Form.Item
              label="Birthday"
              name="birthday"
              rules={[
                {
                  required: true,
                  message: "Please input user's birthday"
                },
              ]}
            >
              <DatePicker
                value={stateUser?.birthday}
                minDate={dayjs("1900-06-01", dateFormat)}
                maxDate={dayjs()}
                style={{
                  marginBottom: "10px",
                }}
                onChange={handleOnChangeBirthday}
              />
            </Form.Item>
            <Form.Item
              label="Roles"
              name="roles"
            >
              <Checkbox.Group onChange={handleOnChangeRolesInCreateForm}> 
                <Checkbox id={1} value="ROLE_USER" >USER</Checkbox>
                <Checkbox id={2} value="ROLE_ADMIN">ADMIN</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[
                {
                  required: true,
                  message: "Please upload the profile avatar",
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                <div style={{ display: "flex" }}>
                  <Button>Select File</Button>
                  {stateUser?.avatar && (
                    <img
                      src={stateUser?.avatar}
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
        title="User Detail"
        isOpen={isOpenDrawer}
        onClose={handleDrawerClose}
        width="60%"
      >
        <LoadingComponent isLoading={isLoadingDetail || isLoadingUpdated}>
        <Form
            form={updateUserForm}
            name="UpdateUserForm"
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
              updateUserForm.resetFields();
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input product's name",
                },
              ]}
            >
              <InputFormComponent
                value={stateUserDetail?.fullName}
                onChange={handleOnChangeDetail}
                name="fullName"
              />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <InputFormComponent
                value={stateUserDetail?.phone}
                onChange={handleOnChangeDetail}
                name="phone"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "User must has a password",
                },
              ]}
            >
              <InputPasswordComponent
                value={stateUserDetail?.password}
                onChange={handleOnChangeDetail}
                name="password"
              />
            </Form.Item>

            <Form.Item
              label="Birthday"
              // name="birthday"
              rules={[
                {
                  required: true,
                  message: "Please input user's birthday"
                },
              ]}
            >
              <DatePicker
                value={stateUserDetail?.birthday}
                minDate={dayjs("1900-06-01", dateFormat)}
                maxDate={dayjs()}
                style={{
                  marginBottom: "10px",
                }}
                onChange={handleOnChangeBirthdayDetail}
              />
            </Form.Item>
            <Form.Item
              label="Roles"
              name="roles"
            >
              <Checkbox.Group onChange={handleOnChangeRolesInUpdateForm} options={[
                {
                  label: 'ADMIN',
                  value: 'ROLE_ADMIN',
                },
                {
                  label: 'USER',
                  value: 'ROLE_USER'
                }
              ]}/> 

            </Form.Item>
            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[
                {
                  required: true,
                  message: "Please upload the profile avatar",
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnChangeAvatarDetail} maxCount={1}>
                <div style={{ display: "flex" }}>
                  <Button>Select File</Button>
                  {stateUserDetail?.avatar && (
                    <img
                      src={stateUserDetail?.avatar}
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
      {/* <ModalComponent
        title="Remove Product"
        isOpen={isModalOpenDelete}
        onCancel={handleCancelDelete}
        // onOk={handleDeleteProduct}
      >
        <LoadingComponent isLoading={isLoadingDeleted}>
          <div>Are you sure removing this product?</div>
        </LoadingComponent>
      </ModalComponent> */}
    </div>
  );
};

export default AdminUser;
