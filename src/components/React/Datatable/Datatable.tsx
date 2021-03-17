import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import { useTable, useGlobalFilter, usePagination, useSortBy } from 'react-table';
import { Table } from 'reactstrap';

import { getTextByLanguage } from 'i18n/i18n';
import "../LoadingButton/loading-theme.scss"

enum TableSize { sm, md, lg, xl }

interface BackendPaginationProps {
    currentPage: number;
    rowPerPage: number;
    totalItem: number;
    gotoPage: (pageNumber: number) => void;
}
export interface DatatableProps {
    columns: any[];
    data: any;
    className?: string;
    striped?: boolean;
    size?: TableSize;
    pagination?: boolean;
    loading?: boolean;

    filter?: boolean;
    filterText?: string;

    /**
     * For Server Side Pagination
     */
    serverPagination?: boolean
    serverPaginationParams?: BackendPaginationProps
}

export default function Datatable(props: DatatableProps): ReactElement {
    const { 
        columns, data = [], 
        className, size, 
        pagination = false, 
        loading, striped = true, 
        filter, filterText, 
        serverPaginationParams, serverPagination = false
    } = props;

    const {
        getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        setGlobalFilter,
        state: { pageIndex, pageSize },
    } = useTable({ columns, data, initialState: { pageIndex: 0 } }, useGlobalFilter, useSortBy, usePagination);

    const [initPagination, setinitPagination] = useState(false);

    useEffect(() => {
        // For Filter of all columns
        if (filter) {
            setGlobalFilter(filterText)
        } else {
            setGlobalFilter("")
        }
    }, [filterText, filter])


    useEffect(() => {
        setinitPagination(pagination || serverPagination);
    }, [pagination, serverPagination])

    return (
        <>
            <div className="table-responsive">
                <Table className={className || "table-02 table-rounded"} striped={striped}  size={size || "sm"} {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span className="ml-2">
                                            {column.isSorted ? (
                                                column.isSortedDesc ?
                                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="0.8em" width="0.8em" xmlns="http://www.w3.org/2000/svg"><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>
                                                    :
                                                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="0.8em" width="0.8em" xmlns="http://www.w3.org/2000/svg"><path d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path></svg>
                                            ) : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {loading ?
                            <tr>
                                <td colSpan={columns.length} className="text-center text-muted">
                                    <div className="loading">
                                        <div>"Dummy Text Indented"</div>
                                        <div className="spinner"></div>
                                    </div>
                                </td>
                            </tr>
                            :
                            <>
                                {(initPagination ? page : rows).map((row, i) => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return (
                                                    <td {...cell.getCellProps()}>
                                                        {cell.render('Cell')}
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </>
                        }
                    </tbody>
                </Table>
                {!loading && !rows.length &&
                    <div className="des text-center text-muted py-1" style={{ position: "sticky", left: 0, right: 0 }}>
                        Cart is empty
                       
                    </div>
                }
            </div>

            {/* Pagination */}
            {!loading && initPagination &&
                <div className="d-lg-flex justify-content-between border-top py-3">
                    <div className="des d-flex align-items-center mr-auto">
                        <span>Showing</span>
                        <div className="flex-shrink-1 mx-2">
                            <select
                                className="custom-select"
                                value={pageSize}
                                onChange={e => setPageSize(Number(e.target.value))}
                            >
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {pageSize}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <span>rows out of</span>
                        <span className="text-blue ml-1"> {rows.length} results</span>
                    </div>

                    <PaginationNumbers
                        currentPage={(serverPagination && serverPaginationParams) ? serverPaginationParams.currentPage : pageIndex}
                        totalItem={(serverPagination && serverPaginationParams) ? serverPaginationParams.totalItem : rows.length}
                        rowPerPage={(serverPagination && serverPaginationParams) ? serverPaginationParams.rowPerPage : pageSize}
                        gotoPage={(pageNumber: number) => {
                            if (serverPagination && serverPaginationParams) {
                                const { gotoPage } = serverPaginationParams;
                                gotoPage(pageNumber)
                            } else {
                                gotoPage(pageNumber)
                            }
                        }
                        }
                        goPrevious={() => {
                            if (serverPagination && serverPaginationParams) {
                                serverPaginationParams.currentPage > 0 && serverPaginationParams.gotoPage(serverPaginationParams.currentPage - 1)
                            } else {
                                canPreviousPage && previousPage();
                            }
                        }}
                        goNext={() => {
                            if (serverPagination && serverPaginationParams) {
                                const { currentPage, rowPerPage, totalItem, gotoPage } = serverPaginationParams;

                                getTotalPage(totalItem, rowPerPage) !== currentPage + 1 && gotoPage(currentPage + 1)
                            } else {
                                canNextPage && nextPage();
                            }
                        }}
                    />
                </div>}
        </>
    )
}

interface PaginationNumbersProps {
    currentPage: number;
    totalItem: number;
    rowPerPage: number;
    gotoPage: (page: number) => void;
    goPrevious: () => void;
    goNext: () => void;
}
const PaginationNumbers = ({ currentPage, totalItem, rowPerPage, gotoPage, goPrevious, goNext }: PaginationNumbersProps) => {


    const numberArray = useMemo(() => [...new Array(getTotalPage(totalItem, rowPerPage))].map((el, index) => index + 1), [totalItem, rowPerPage]);
    const [pageBounds, setpageBounds] = useState({ upperPageBound: 3, lowerPageBound: 0, pageBound: 3 })

    return (
        <div className="pagination-wrapper d-flex align-items-center mt-xl-0 mt-2">
            <ul className="pagination pagination-02">

                {/* Previous */}
                <li className="page-item">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            goPrevious()
                            if (currentPage && (currentPage % pageBounds.pageBound === 0)) {
                                setpageBounds({ ...pageBounds, upperPageBound: pageBounds.upperPageBound - pageBounds.pageBound, lowerPageBound: pageBounds.lowerPageBound - pageBounds.pageBound });
                            }
                        }}
                        className="page-link pagination-arrow mr-2" href="#/" aria-label="Previous">
                        <i className="ic-arrow-left text-black"></i>
                    </a>
                </li>

                {getTotalPage(totalItem, rowPerPage) > 1 ?
                    <>
                        {/* Go to last dotted */}
                        {pageBounds.lowerPageBound >= 1 &&
                            <li className='page-item'>
                                <a
                                    href="#/"
                                    className="page-link"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        gotoPage(pageBounds.lowerPageBound - pageBounds.pageBound + 2);
                                        setpageBounds({ ...pageBounds, upperPageBound: pageBounds.upperPageBound - pageBounds.pageBound, lowerPageBound: pageBounds.lowerPageBound - pageBounds.pageBound });
                                    }}
                                >
                                    &hellip;
                                </a>
                            </li>
                        }

                        {
                            numberArray.map((page) => (
                                (page < pageBounds.upperPageBound + 1) && page > pageBounds.lowerPageBound ?
                                    <li className={`page-item ${currentPage === page - 1 ? 'active' : ''}`} key={page}>
                                        <a
                                            href="#/"
                                            className="page-link"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                if (currentPage !== page - 1) {
                                                    gotoPage(page - 1);
                                                }
                                            }}
                                        >
                                            {page}
                                        </a>
                                    </li>
                                    :
                                    null
                            ))
                        }

                        {/* Go to next dotted */}
                        {numberArray.length > pageBounds.upperPageBound &&
                            <li className='page-item'>
                                <a
                                    href="#/"
                                    className="page-link"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        gotoPage(pageBounds.upperPageBound + pageBounds.pageBound - 2);
                                        setpageBounds({ ...pageBounds, upperPageBound: pageBounds.upperPageBound + pageBounds.pageBound, lowerPageBound: pageBounds.lowerPageBound + pageBounds.pageBound });
                                    }}
                                >
                                    &hellip;
                                </a>
                            </li>
                        }
                    </>
                    :
                    <>
                        <li className="page-item active">
                            <a onClick={(e) => e.preventDefault()} className="page-link active" href="#/">1</a>
                        </li>
                    </>
                }

                {/* Next */}
                <li className="page-item">
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            goNext()
                            if ((currentPage) >= pageBounds.upperPageBound - 1) {
                                setpageBounds({ ...pageBounds, upperPageBound: pageBounds.upperPageBound + pageBounds.pageBound, lowerPageBound: pageBounds.lowerPageBound + pageBounds.pageBound });
                            }
                        }}
                        className="page-link pagination-arrow ml-2" href="#/" aria-label="Next">
                        <i className="ic-arrow-right text-black"></i>
                    </a>
                </li>

            </ul>
            <div className="flex-shrink-1 ml-3 mr-2">
                <input
                    type="number"
                    defaultValue={currentPage + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                        if (page >= getTotalPage(totalItem, rowPerPage)) {
                            return
                        }
                        gotoPage(page);

                        const upperPageBound = page >= 3 ? ((page / 3) + 1) * 3 : 3;
                        setpageBounds({ ...pageBounds, upperPageBound: upperPageBound, lowerPageBound: upperPageBound - 3 });
                    }}
                    className="form-control page-input"
                    style={{ width: '3rem' }}
                />
            </div>
            <p className="des text-gray-500">Page</p>
        </div>
    )
}

const getTotalPage = (totalItems: number, countPerPage: number) => {
    if (totalItems < 10) return 1;
    return (totalItems / countPerPage) > parseInt((totalItems / countPerPage).toString()) ? parseInt((totalItems / countPerPage).toString()) + 1 : parseInt((totalItems / countPerPage).toString());
}