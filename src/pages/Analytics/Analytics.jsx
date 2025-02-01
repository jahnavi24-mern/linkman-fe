import React, { useState, useEffect } from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Header from '../../components/Header/Header';
import Table from '../../components/Table/Table';
import styles from './Analytics.module.css';
import { fetchAnalytics } from '../../api/link';
import { formatDate } from '../../utils/util';

const columns = [
    { key: "accessedAt", label: "Timestamp", renderCell: (value) => formatDate(value) },
    { key: "link.originaLink", label: "Original Link",  renderCell: (_, row) => row.link.originaLink, className: 'originalLink' },
    { key: "link.shortLink", label: "Short Link", renderCell: (_, row) => row.link.shortLink || "N/A", className: 'shortLink' },
    { key: "ipAddress", label: "IP Address" },
    { key: "deviceType", label: "User Device" },
    { key: "browser", label: "Browser" }
]

const Analytics = () => {
    const [links, setLinks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState('desc');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const pageSize = 10;

    const loadLinks = async (page, size, sort, order) => {
        try {
            setLoading(true);
            const data = await fetchAnalytics(page, size, sort, order);
            setLinks(data.data.analytics);
            setTotalPages(data.data.pagination.totalPages);
        } catch (err) {
            setError(err.message || 'Failed to fetch links.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLinks(currentPage, pageSize, sortBy, order);
    }, [currentPage, pageSize, sortBy, order]);


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

                    <div className={styles.analytics}>
                        {error && (
                            <div className={styles.error}>
                                <p>{error}</p>
                                <button onClick={() => loadLinks(currentPage, pageSize, sortBy, order)}>
                                    Retry
                                </button>
                            </div>
                        )}

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
                        />
                    </div>
                </div>
            </div>

            {/* {edit && <LinkModal 
        link={selectedLink}
        onClose={() => setEdit(false)}/>}

        {deleteModal && <DeleteModal 
        link={selectedLink}
        onClose={() => setDeleteModal(false)}
        onDelete={() => handleDelete()}
         />} */}

        </>
    );
}

export default Analytics;