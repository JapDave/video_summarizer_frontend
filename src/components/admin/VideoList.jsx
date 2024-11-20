import React, { useEffect, useState } from "react";
import { Modal, Tooltip, Input } from "antd";
import DataTable from "react-data-table-component";
import { truncateTitle } from "../../utils/TruncateString";

const { Search } = Input;

const VideoPlayListTable = ({ data, getStripePlansHandler }) => {
  const [sortedData, setSortedData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const columns = [
    {
      name: "Plan Name",
      cell: (row) => (
        <Tooltip title={row.name}>
          {row.name ? truncateTitle(row.name, 10) : "-"}
        </Tooltip>
      ),
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => (row.amount ? `$${row.amount}` : "-"),
      sortable: true,
    },
    {
      name: "Interval",
      selector: (row) => row.interval ?? "-",
      sortable: true,
    },
    {
      name: "Description",
      cell: (row) => (
        <div className="my-2 flex min-w-[200px] flex-col gap-y-1">
          {row.description &&
            Object.values(row.description).map(
              (desc, index) =>
                desc.trim() && (
                  <p key={index} className="flex">
                    <span className="w-5">{`${index + 1}.`}</span>
                    <span>{desc}</span>
                  </p>
                )
            )}
        </div>
      ),
      sortable: true,
      width: "300px",
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="p-2 bg-red-800 rounded text-[#FFFFFF] text-[12px] w-[70px]"
          onClick={() => handleDeleteVideo(row.id)}
        >
          Delete
        </button>
      ),
    },
  ];

  const filterData = () => {
    if (searchQuery === "") return sortedData;
    return sortedData.filter((row) => {
      return (
        row.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.amount?.toString().includes(searchQuery.toString()) ||
        row.id?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  useEffect(() => {
    const sorted = data
      ?.slice()
      .sort((a, b) =>
        a.is_active === b.is_active && a.amount > b.amount
          ? 0
          : a.is_active
          ? -1
          : 1
      );
    setSortedData(sorted);
  }, [data]);

  const customStyles = {
    table: {
      style: {
        width: "100%",
        minHeight: "80vh",
        height: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      },
    },
    headRow: {
      style: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#003366",
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: "16px",
        borderBottom: "2px solid #ddd",
      },
    },
    rows: {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "14px",
        padding: "12px",
        cursor: "pointer",
        backgroundColor: "#ffffff",
      },
      hoverStyle: {
        backgroundColor: "#f0f4f7",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        paddingLeft: "15px",
        paddingRight: "15px",
      },
    },
    pagination: {
      style: {
        paddingTop: "10px",
        borderBottom: "none",
      },
    },
  };

  const handleEdit = (data) => {
    setSelectedRow(data);
    setModalOpen(true);
  };

  const handleDeleteVideo = (id) => {
    Modal.confirm({
      title: `Are you sure you want to delete this video?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => {},
      onCancel: () => {},
    });
  };

  return (
    sortedData && (
      <div className="rounded-lg shadow-md bg-white p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Video List</h2>
          <Search
            placeholder="Search Users"
            allowClear
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: 250,
              borderRadius: "5px",
            }}
          />
        </div>
        <DataTable
          columns={columns}
          data={filterData()}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10]}
          highlightOnHover
          responsive
          customStyles={customStyles}
          defaultSortFieldId="Status"
          selectableRowsHighlight
        />
      </div>
    )
  );
};

export default VideoPlayListTable;
