
import React from 'react';
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css'; // если хочешь стилизовать отдельно

type PaginationProps = {
    pageCount: number;
    currentPage: number;
    onPageChange: (selected: { selected: number }) => void;
};

export default function Pagination({
    pageCount,
    currentPage,
    onPageChange,
}: PaginationProps) {
    return (
        <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={10}
            marginPagesDisplayed={1}
            onPageChange={onPageChange}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
        />
    );
}