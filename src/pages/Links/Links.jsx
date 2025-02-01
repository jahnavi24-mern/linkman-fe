import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Header from '../../components/Header/Header';
import Table from '../../components/Table/Table';
import { fetchLinks, fetchLink } from '../../api/link';
import styles from './Links.module.css';
import {formatDate, formatStatus} from '../../utils/util';
import { MdModeEdit, MdDelete } from "react-icons/md";
import LinkModal from '../../components/LinkModal/LinkModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import { deleteLink } from '../../api/link';
import { useLocation } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { MdContentCopy } from "react-icons/md";

const columns = [
  { key: 'createdAt', label: 'Date', isSortable: true, renderCell: (value) => formatDate(value) },
  { key: 'originaLink', label: 'Original Link', isSortable: false, className: 'originalLink' },
  { 
    key: 'shortLink', 
    label: 'Short Link', 
    isSortable: false, 
    className: 'shortLink',
    renderCell: (value, row, {onCopy}) => (
      <div className={styles.shortLinkContainer}>
        <span className={styles.shortLinkText}>{value}</span>
        <MdContentCopy 
          className={styles.copyIcon}
          onClick={() => onCopy && onCopy(value)}
        />
      </div>
    )
  },
  { key: 'remarks', label: 'Remarks', isSortable: false },
  { key: 'clicks', label: 'Clicks', isSortable: true },
  { key: 'linkExpiration', label: 'Status', isSortable: false, renderCell: (value) => formatStatus(value) },
  {
    key: 'action', 
    label: 'Action',
    renderCell: (value, row, onEdit, onDelete) => (
      <div className={styles.actions}>
        <button
          className={styles.editButton}
          onClick={() => onEdit(row)}
        >
          <MdModeEdit />
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(row)}
        >
          <MdDelete />
        </button>
      </div>
    ),
  }
];


const Links = () => {
    const [links, setLinks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState('desc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [edit, setEdit] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);
    const {showToast} = useToast();

    const pageSize = 10;

    const location = useLocation();

    const loadLinks = async (page, size, sort, order) => {
        try {
            setLoading(true);
            const data = await fetchLinks(page, size, sort, order);
            setLinks(data.data.links);
            setTotalPages(data.data.pagination.totalPages);
        } catch (err) {
            setError(err.message || 'Failed to fetch links.');
        } finally {
            setLoading(false);
        }
    };

    const loadSingleLink = async (linkId) => {
        try {
            setLoading(true);
            const response = await fetchLink(linkId);

            setLinks([response.data]);
        } catch (err) {
            setError(err.message || 'Failed to fetch link.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (location.state?.linkId) {
            loadSingleLink(location.state.linkId);
        } else {
            loadLinks(currentPage, pageSize, sortBy, order);
        }
    }, [location.state, currentPage, pageSize, sortBy, order]);

    const handleEdit = (link) => {
        setSelectedLink(link);
        setEdit(true);
    };

    const handleLinkUpdate = async () => {
        await loadLinks(currentPage, pageSize, sortBy, order);
    };

    const openDeleteModal = (link) => {
        setSelectedLink(link);
        setDeleteModal(true);
    };

    const handleDelete = async () => {
        if (!selectedLink) return;
        try{
            const response = await deleteLink(selectedLink._id);
            showToast("Link deleted successfully", "success");

            setLinks((prevLinks) => prevLinks.filter((link) => link._id !== selectedLink._id));

            setSelectedLink(null);
            setDeleteModal(false);
            
        }catch(error){
            console.log("Error deleting the link: ", error);
            showToast("Something went wrong", "error");
        }
    };

    const handleCopy = useCallback((text) => {
        if (!text) return;
        
        navigator.clipboard.writeText(text)
            .then(() => {
                showToast("Link copied successfully", "success");
            })
            .catch((error) => {
                console.error('Copy failed:', error);
                showToast("Error while copying the link", "error");
            });
    }, [showToast]);
      

    const handleSort = (key) => {
        const newOrder = sortBy === key && order === 'asc' ? 'desc' : 'asc';
        setSortBy(key);
        setOrder(newOrder);
        setCurrentPage(1);
    };

    return (
        <>
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Navbar />
            </div>

            <div className={styles.mainContent}>
                <Header />
                <div className={styles.links}>
                    {error && <div className={styles.error}>{error}</div>}
                    <Table
                        columns={columns}
                        data={links}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                        onSort={handleSort}
                        sortBy={sortBy}
                        order={order}
                        loading={loading}
                        onEdit={handleEdit}
                        onDelete={openDeleteModal}
                        onCopy={handleCopy}
                    />
                </div>
            </div>
        </div>

        {edit && <LinkModal 
        prop={"Edit"}
        link={selectedLink}
        onClose={() => {
            setEdit(false);
            handleLinkUpdate();
            }}/>}

        {deleteModal && <DeleteModal 
        link={selectedLink}
        onClose={() => setDeleteModal(false)}
        onDelete={() => handleDelete()}
         />}

        </>
    );
};

export default Links;
