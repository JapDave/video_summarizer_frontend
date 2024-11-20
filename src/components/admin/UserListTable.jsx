import { Modal, Input } from "antd";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const { Search } = Input;

const UserListTable = ({ userData, updateUser, loading }) => {
  const [sortedData, setSortedData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingIds, setLoadingIds] = useState({});
  const { userData: userInfo } = useSelector((state) => state.admin);

  const columns = [
    {
      name: "User ID",
      selector: (row) => row.id ?? "-",
      sortable: true,
      width: "100px",
    },
    {
      name: "First Name",
      selector: (row) => row.first_name ?? "-",
      sortable: true,
      width: "150px",
    },
    {
      name: "Last Name",
      selector: (row) => row.last_name ?? "-",
      sortable: true,
      width: "150px",
    },
    {
      name: "Email ID",
      selector: (row) => row.email ?? "-",
      sortable: true,
      width: "200px",
    },
    {
      name: "Created On",
      selector: (row) => convertDateFormat(row.created_on) ?? "-",
      sortable: true,
      width: "150px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex justify-center gap-2">
          {loadingIds[row.id] ? (
            <button
              className="p-2 rounded bg-gray-400 text-white text-xs w-[80px] cursor-not-allowed"
              disabled
            >
              Loading...
            </button>
          ) : row.is_blocked === true ? (
            <button
              data-cy="block-user-btn"
              disabled={loading}
              className="p-2 bg-green-600 rounded text-white text-xs w-[80px]"
              onClick={() => {
                if (userInfo.email !== row.email) {
                  handleBlockUser(row.id, false);
                } else {
                  toast.error("You cannot unblock yourself");
                }
              }}
            >
              Unblock
            </button>
          ) : (
            <button
              data-cy="block-user-btn"
              disabled={loading}
              className="p-2 bg-red-600 rounded text-white text-xs w-[80px]"
              onClick={() => {
                if (userInfo.email !== row.email) {
                  handleBlockUser(row.id, true);
                } else {
                  toast.error("You cannot block yourself");
                }
              }}
            >
              Block
            </button>
          )}
        </div>
      ),
      button: true,
      ignoreRowClick: true,
      width: "120px",
    },
  ];

  const customStyles = {
    table: {
      style: {
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

  const handleBlockUser = (id, is_blocked) => {
    Modal.confirm({
      title: `Are you sure you want to ${
        is_blocked ? "block" : "unblock"
      } this user?`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        setLoadingIds((prev) => ({ ...prev, [id]: true }));
        try {
          await updateUser(id, is_blocked);
          toast.success(
            `User has been successfully ${
              is_blocked ? "blocked" : "unblocked"
            }.`
          );
        } catch (error) {
          toast.error("An error occurred while updating the user.");
        } finally {
          setLoadingIds((prev) => ({ ...prev, [id]: false }));
        }
      },
      onCancel() {},
    });
  };

  const convertDateFormat = (dateTimeString) => {
    const [datePart] = dateTimeString.split("T");
    return datePart;
  };

  const filterData = () => {
    if (searchQuery === "") return userData;
    return userData.filter((row) => {
      return (
        row.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.id?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  useEffect(() => {
    const sorted =
      userData &&
      userData
        .slice()
        .sort((a, b) =>
          a.is_blocked === b.is_blocked ? 0 : a.is_blocked ? 1 : -1
        );
    setSortedData(sorted);
  }, [userData]);

  return (
    <div className="rounded-lg shadow-md bg-white p-4">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">User List</h2>
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

      {sortedData && (
        <DataTable
          title=""
          columns={columns}
          data={filterData()}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10]}
          highlightOnHover
          responsive
          customStyles={customStyles}
          selectableRowsHighlight
        />
      )}
    </div>
  );
};

export default UserListTable;
