import React, { useMemo, useState } from "react";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { Button, ConfigProvider, Dropdown, Space, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data: dataSource = [],
    columns = [],
    isLoading = false,
    isAllowDelete = false,
    handleDeleteMany,
  } = props;

  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {

      setRowSelectedKeys(selectedRowKeys);
    },
    // getCheckboxProps: (record) => ({
    //     disabled: record.name === 'Disabled User',
    //     // Column configuration not to be checked
    //     name: record.name,
    // }),
  };

  const newColumnExport = useMemo(() => {
    const filter = columns?.filter((col) => col.dataIndex !== 'action');
    return filter;
  }, [columns]);

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: null,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];
  
  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys)
  }
  
  const handleExportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(dataSource, {
        str2Percent: true
      })
      .saveAs("Excel.xlsx");
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorder: "#495E57",
        },
      }}
    >
      <LoadingComponent isLoading={isLoading}>
        {isAllowDelete && rowSelectedKeys.length > 0 && (
          <div
            style={{
              backgroundImage: "linear-gradient(#F4CE14, #36041c)",
              color: "#F5F7F8",
              fontSize: "14px",
              fontWeight: "bolder",
              padding: "10px",
              cursor: "pointer",
              width: "fit-content",
              border: "1px solid #ccc"
            }}
            onClick={handleDeleteAll}
          >
            Delete All
          </div>
        )}
        
        <Button onClick={handleExportExcel}>Export</Button>
        <Table
          id="table-xls"
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={dataSource}
          {...props}
        />
      </LoadingComponent>
    </ConfigProvider>
  );
};

export default TableComponent;
