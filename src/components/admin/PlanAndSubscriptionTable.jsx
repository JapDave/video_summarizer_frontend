import React, { useEffect, useState } from 'react';
import { Modal, Tooltip, Input } from 'antd';
import DataTable from 'react-data-table-component';
import { truncateTitle } from '../../utils/TruncateString';
import AddPlanForm from './AddPlanForm';
import EditPlanForm from './EditPlanForm';

const { Search } = Input;

const PlanAndSubscriptionTable = ({
  data,
  getStripePlansHandler,
  getPlansHandler,
}) => {
  console.log('🚀 ~ PlanAndSubscriptionTable ~ data:', data);
  const [sortedData, setSortedData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
      name: 'ID',
      selector: (row) => row.id ?? '-',
      sortable: true,
    },
    {
      name: 'Name',
      cell: (row) => (
        <Tooltip title={row.name}>
          {row.name ? truncateTitle(row.name, 10) : '-'}
        </Tooltip>
      ),
      sortable: true,
    },
    {
      name: 'Subtitle',
      cell: (row) => (
        <Tooltip title={row.sub_title}>
          {row.sub_title ? truncateTitle(row.sub_title, 10) : '-'}
        </Tooltip>
      ),
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row) => (row.amount ? `$${row.amount}` : '-'),
      sortable: true,
    },
    {
      name: 'Interval Count',
      selector: (row) => row.interval_count ?? '-',
      sortable: true,
    },
    {
      name: 'Watermarking',
      selector: (row) => (row.watermarking ? 'Yes' : 'No'),
      sortable: true,
    },
    {
      name: 'Storage Space',
      selector: (row) => row.storage_space ?? '-',
      sortable: true,
    },
    {
      name: 'Chunk Size',
      selector: (row) => row.chunk_size ?? '-',
      sortable: true,
    },
    {
      name: 'Notification Type',
      selector: (row) => row.notification_type ?? '-',
      sortable: true,
    },
    {
      name: 'AI Model',
      selector: (row) => row.ai_model ?? '-',
      sortable: true,
    },
    {
      name: 'Output Resolutions',
      selector: (row) => row.output_resolutions ?? '-',
      sortable: true,
    },
    {
      name: 'Priority',
      selector: (row) => row.priority ?? '-',
      sortable: true,
    },
    {
      name: 'Video Length',
      selector: (row) => row.video_length ?? '-',
      sortable: true,
    },
    {
      name: 'File Retention',
      selector: (row) => row.file_retention ?? '-',
      sortable: true,
    },
    {
      name: 'Face Detection',
      selector: (row) => (row.face_detection ? 'Yes' : 'No'),
      sortable: true,
    },
    {
      name: 'Storage Limited',
      selector: (row) => (row.storage_limited ? 'Yes' : 'No'),
      sortable: true,
    },
    {
      name: 'Is Stripe Plan',
      selector: (row) => (row.is_stripe_plan ? 'Yes' : 'No'),
      sortable: true,
    },
    {
      name: 'Transitions',
      selector: (row) => row.transitions ?? '-',
      sortable: true,
    },
    {
      name: 'Status',
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
      name: 'Created At',
      selector: (row) => new Date(row.created_at).toLocaleDateString() ?? '-',
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <button
          className="p-2 bg-blue-600 rounded text-white text-xs w-[80px]"
          onClick={() => {
            setEditModalOpen(true), setSelectedRow(row);
          }}
        >
          Edit
        </button>
      ),
      button: true,
      ignoreRowClick: true,
      width: '120px',
    },
  ];

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

  const filterData = () => {
    if (searchQuery === '') return sortedData;
    return sortedData.filter((row) => {
      return (
        row.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.amount?.toString().includes(searchQuery.toString()) ||
        row.id?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };

  return (
    sortedData && (
      <div className="rounded-lg shadow-md bg-white p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Plans and Subscription
          </h2>
          <Search
            placeholder="Search Plans"
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
        {addModalOpen && (
          <Modal
            open={addModalOpen}
            onCancel={() => setAddModalOpen(false)}
            footer={null}
            destroyOnClose
            width={656}
            centered
            className="font-poppins bg-[#fafafc]"
            style={{ backgroundColor: '#fafafc' }}
          >
            <AddPlanForm
              setShowModal={setAddModalOpen}
              getPlansHandler={getPlansHandler}
              // getStripePlansHandler={getStripePlansHandler}
              // selectedData={selectedRow!}
            />
          </Modal>
        )}
        <div className="mt-16">
          {editModalOpen && (
            <Modal
              open={editModalOpen}
              onCancel={() => setEditModalOpen(false)}
              footer={null}
              destroyOnClose
              width={656}
              centered
              className="font-poppins bg-[#fafafc]"
              style={{ backgroundColor: '#fafafc' }}
            >
              <EditPlanForm
                setShowEditModal={setEditModalOpen}
                planData={selectedRow}
                getPlansHandler={getPlansHandler}
                // getStripePlansHandler={getStripePlansHandler}
                // selectedData={selectedRow!}
              />
            </Modal>
          )}
        </div>
      </div>
    )
  );
};

export default PlanAndSubscriptionTable;
