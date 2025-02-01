import React from 'react';
import styles from './Table.module.css';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Table = ({
    columns,
    data,
    pageSize,
    currentPage,
    totalPages,
    onPageChange,
    onSort,
    sortBy,
    order,
    loading,
    onEdit, 
    onDelete,
    onCopy
}) => {
    return (
        <div className={styles.tableContainer}>
            {loading ? (
                <div className={styles.loader}>Loading...</div>
            ) : (
                <>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        onClick={() => col.isSortable && onSort(col.key)}
                                        className={col.isSortable ? styles.sortable : ''}
                                    >
                                        {col.label}
                                        {col.isSortable &&
                                            (sortBy === col.key ? (order === 'asc' ? <IoIosArrowUp /> : <IoIosArrowDown />) : '')}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {columns.map((col) => (
                                            <td 
                                            key={`cell-${row._id}-${col.key}`}
                                            className={`${styles[col.className] || ''}`}
                                            >
                                                {col.renderCell
                                                    ? col.renderCell(row[col.key], row, {onEdit, onDelete, onCopy})
                                                    : row[col.key]}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className={styles.noData}>
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className={styles.pagination}>
                        <button
                            className={styles.pageButton}
                            disabled={currentPage === 1}
                            onClick={() => onPageChange(currentPage - 1)}
                            aria-label="Previous Page"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, idx) => (
                            <button
                                key={idx}
                                className={`${styles.pageButton} ${currentPage === idx + 1 ? styles.activePage : ''
                                    }`}
                                onClick={() => onPageChange(idx + 1)}
                            >
                                {idx + 1}
                            </button>
                        ))}
                        <button
                            className={styles.pageButton}
                            disabled={currentPage === totalPages}
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Table;
