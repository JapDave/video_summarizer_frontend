import React, { useEffect, useState } from 'react';
import { Modal, Tooltip, Input } from 'antd';
import DataTable from 'react-data-table-component';
import { truncateTitle } from '../../utils/TruncateString';
import { authAPI } from '../../api';
import { deleteVideoFromAdmin } from '../../api/auth';
import { useRef } from 'react';
import ToastContainer from '../customToaster/ToastContainer';
import { toast } from 'react-hot-toast';

const { Search } = Input;

const VideoPlayListTable = ({ data, getStripePlansHandler }) => {
  const toastRef = useRef();
  const [sortedData, setSortedData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingIds, setLoadingIds] = useState({});

  const columns = [
    {
      name: 'User ID',
      selector: (row) => row.user_id ?? '-',
      sortable: true,
    },
    {
      name: 'Display Name',
      selector: (row) => row.display_name ?? '-',
      sortable: true,
    },
    {
      name: 'Input Size (MB)',
      selector: (row) =>
        row.video_input_size ? `${row.video_input_size} MB` : '-',
      sortable: true,
    },
    {
      name: 'Output Size (MB)',
      selector: (row) =>
        row.video_output_size ? `${row.video_output_size} MB` : '-',
      sortable: true,
    },
    {
      name: 'Length (Min)',
      selector: (row) =>
        row.video_input_length
          ? `${row.video_input_length.toFixed(2)} min`
          : '-',
      sortable: true,
    },
    {
      name: 'URL',
      cell: (row) =>
        row.url ? (
          <a
            href={row.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Link
          </a>
        ) : (
          '-'
        ),
      sortable: false,
    },
    {
      name: 'Timestamp',
      selector: (row) => row.timestamp ?? '-',
      sortable: true,
    },
    {
      name: 'Created On',
      selector: (row) =>
        row.created_on ? new Date(row.created_on).toLocaleDateString() : '-',
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) =>
        row.is_processing
          ? 'Processing'
          : row.is_summarized
          ? 'Summarized'
          : 'Pending',
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex justify-center gap-2">
          {loadingIds[row.id] ? (
            <button
              className="p-2 rounded bg-gray-400 text-white text-xs w-[80px] cursor-not-allowed"
              disabled
            >
              Deleting...
            </button>
          ) : (
            <button
              className={`p-2 rounded ${
                row.is_deleted
                  ? 'bg-red-800 text-[#FFFFFF]'
                  : 'border-red-800 border text-red-800'
              } text-[12px] w-[70px]`}
              onClick={() => handleDeleteVideo(row.id)}
            >
              {row.is_deleted ? 'Deleted' : 'Delete'}
            </button>
          )}
        </div>
      ),
    },
  ];

  const filterData = () => {
    if (searchQuery === '') return sortedData;
    return sortedData.filter((row) => {
      return row.display_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  };

  useEffect(() => {
    if (data) {
      setSortedData(data);
    }
  }, [data]);

  const customStyles = {
    table: {
      style: {
        width: '100%',
        minHeight: '80vh',
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      },
    },
    headRow: {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#003366',
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: '16px',
        borderBottom: '2px solid #ddd',
      },
    },
    rows: {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
        padding: '12px',
        cursor: 'pointer',
        backgroundColor: '#ffffff',
      },
      hoverStyle: {
        backgroundColor: '#f0f4f7',
      },
    },
    headCells: {
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        paddingLeft: '15px',
        paddingRight: '15px',
      },
    },
    pagination: {
      style: {
        paddingTop: '10px',
        borderBottom: 'none',
      },
    },
  };

  const handleDeleteVideo = (id) => {
    Modal.confirm({
      title: `Are you sure you want to delete this video?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        setLoadingIds((prev) => ({ ...prev, [id]: true }));
        try {
          await deleteVideoFromAdmin(id, true);
          toast.success('Video has been deleted successfully.');
          close();
        } catch (error) {
          console.error('Error deleting video:', error);
          toast.error('An error occurred while deleting the video.');
        } finally {
          setLoadingIds((prev) => ({ ...prev, [id]: false }));
        }
      },
      onCancel: () => {
        console.log('Delete action canceled.');
      },
    });
  };

  return (
    sortedData && (
      <div className="rounded-lg shadow-md bg-white p-4">
        <ToastContainer ref={toastRef} />
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Video List</h2>
          <Search
            placeholder="Search Users"
            allowClear
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: 250,
              borderRadius: '5px',
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
