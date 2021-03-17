import React, { ReactElement, useState } from 'react';
import { Link } from "react-router-dom";

import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar'

import {
    Table
} from 'reactstrap';

interface Props {

}

export default function Dashboard({ }: Props): ReactElement {
    const [sidebarToggle, setsidebarToggle] = useState(false);
    return (
        <div className={`app theme-dark-blue ${sidebarToggle ? "toggled" : ""}`} style={{ position: "relative" }}>
            <Sidebar sidebarToggle={sidebarToggle} setsidebarToggle={setsidebarToggle} />
            <main className="stickyHeader">
                <Header sidebarToggle={sidebarToggle} setsidebarToggle={setsidebarToggle} />
                <div className="inner">
                    <div className="container py-3">
                        <h6 className="mb-3 text-black">Dashboard</h6>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 mb-md-0 mb-3">
                                <div className="card card-stats cardbg-blue">
                                    <div>
                                        <div className="icon">
                                            <div className="ic-setup"></div>
                                        </div>
                                        <p className="title">Total Users</p>
                                    </div>
                                    <h3 className="value">
                                        128
                                    </h3>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-4">
                                <div className="card card-stats cardbg-purple-20">
                                    <div>
                                        <div className="icon">
                                            <div className="ic-transactions"></div>
                                        </div>

                                        <p className="title">Total Vehicles</p>
                                    </div>
                                    <h3 className="value">
                                        43
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="card card-body table-responsive mt-3">
                            <h6 className="mb-2">सवारी दर्ता सूची</h6>
                            <Table className="table-02 table-striped">
                                <thead>
                                    <tr>
                                        <th>Importer Type</th>
                                        <th>Company/Individual Name</th>
                                        <th>Vehicle Registered No.</th>
                                        <th>Category</th>
                                        <th>Manufacturer Name</th>
                                        <th>Make Year</th>
                                        <th className="text-right">कार्य</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Company</td>
                                        <td>Yamaha Motors</td>
                                        <td>BA 2 Kha 2289</td>
                                        <td>Car</td>
                                        <td>Yamaha</td>
                                        <td>2018</td>
                                        <td>
                                            <ul className="list list__inline justify-content-end">
                                                <li>
                                                    <Link to="/vacancy-detail" className="btn btn-icon-only">
                                                        <i className="ic-show text-info"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Company</td>
                                        <td>Honda Motors</td>
                                        <td>BA 4 Kha 8845</td>
                                        <td>Car</td>
                                        <td>Honda</td>
                                        <td>2018</td>
                                        <td>
                                            <ul className="list list__inline justify-content-end">
                                                <li>
                                                    <Link to="/vacancy-detail" className="btn btn-icon-only">
                                                        <i className="ic-show text-info"></i>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        
                        
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
