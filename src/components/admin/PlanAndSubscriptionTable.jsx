import React, { useEffect, useState } from "react";
import { Modal, Tooltip } from "antd";
import DataTable from "react-data-table-component";
import { truncateTitle } from "../../utils/TruncateString";
import AddPlanForm from "./AddPlanForm";

const PlanAndSubscriptionTable = ({ data, getStripePlansHandler }) => {
  const [sortedData, setSortedData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  // Sort data
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
      name: "Plan Subtitle",
      cell: (row) => (
        <Tooltip title={row.sub_title}>
          {row.sub_title ? truncateTitle(row.sub_title, 10) : "-"}
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
      name: "Status",
      cell: (row) =>
        row.is_active ? (
          <div className="p-2 bg-green-600 rounded text-[#FFFFFF] text-[12px] text-center w-[70px]">
            Active
          </div>
        ) : (
          <div className="p-2 bg-red-600 rounded text-[#FFFFFF] text-[12px] text-center w-[70px]">
            Inactive
          </div>
        ),
      sortable: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="p-2 bg-[#003366] rounded text-[#FFFFFF] text-[12px] w-[70px]"
          onClick={() => handleEdit(row)}
        >
          Edit
        </button>
      ),
    },
  ];

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

  // Handle edit functionality
  const handleEdit = (data) => {
    setSelectedRow(data);
    setModalOpen(true);
  };

  return (
    sortedData && (
      <>
        <DataTable
          columns={columns}
          data={sortedData}
          highlightOnHover
          responsive
          customStyles={customStyles}
          defaultSortFieldId="Status"
          selectableRowsHighlight
        />
        {modalOpen && (
          <Modal
            open={modalOpen}
            onCancel={() => setModalOpen(false)}
            footer={null}
            destroyOnClose
            width={656}
            centered
            className="font-poppins bg-[#fafafc]"
            style={{ backgroundColor: "#fafafc" }}
          >
            <AddPlanForm
              setShowModal={setModalOpen}
              // getStripePlansHandler={getStripePlansHandler}
              // selectedData={selectedRow!}
            />
          </Modal>
        )}
      </>
    )
  );
};

export default PlanAndSubscriptionTable;
