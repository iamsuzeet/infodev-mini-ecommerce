import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { Collapse } from "reactstrap";

import Logo from "../../../../assets/images/logo.png";
interface Props {
    sidebarToggle: boolean;
    setsidebarToggle: (state: boolean) => void;
}
const Sidebar = (props: Props) => {
    const { sidebarToggle, setsidebarToggle } = props;
    const togglesidebar = () => setsidebarToggle(!sidebarToggle);


    return (
        <aside className="sidebar">
            <div className="d-flex justify-content-between align-items-center my-3">
                <div className="sidebar-logo">
                    <img src={Logo} alt="Rastriya Banijya Bank" className="logo" />
                </div>
                <h6 className="text-white ml-2 des sidebar-brand">Directorate of Vehicle Management</h6>
                <div className="toggler-close" onClick={togglesidebar}>
                    <span className="ic-close"></span>
                </div>
            </div>
            <div className="search--input">
                <div className="form-group-icon">
                    <input type="search" className="form-control" placeholder="Search" />
                    <i className="ic-search"></i>
                </div>
            </div>
            <ul className="list list-sidebar">
                <li >
                    {/* <Link to="#" data-toggle="collapse" role="button" className="hasSub">
                        <span className="ic-meter mr-2"></span>
                        Menu1
                    </Link>
                    <ul className="list list-sidebar menu__collapsable-sub collapse" >
                        <li >
                            <a data-toggle="collapse" href="#" role="button" aria-expanded="false" className="hasSub">
                                Sidebar 1
                                <span className="ic-meter mr-2"></span>
                            </a>
                            <ul className="menu__collapsable-sub collapse">
                                <li>
                                    <a href="#">
                                        menu 1
                                    </a>
                                </li>
                            </ul>

                            <a href="#">Sidebar 2</a>
                        </li>
                    </ul> */}
                    <NavLink to="/home" activeClassName="active">
                        Dashboard
                    </NavLink>
                    <NavLink to="/vehicle-list" activeClassName="active">
                        Vehicle Registration
                    </NavLink>
                    <NavLink to="/admin/vehicle-approval" activeClassName="active">
                        Approval
                    </NavLink>                    
                    {/* <NavLink to="/vacancy-list" activeClassName="active">
                        <span className="ic-meter mr-2"></span>
                        Vacancy
                    </NavLink>
                    <NavLink to="/vacancy-applied" activeClassName="active">
                        <span className="ic-meter mr-2"></span>
                        My Application
                    </NavLink> */}
                </li>
            </ul>

            {/* <ul className="list list-sidebar">
                <li>
                    <Link to="/home" className="active">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <a
                        className="hasSub"
                        aria-expanded={isStartedOpen}
                        onClick={() => setStartedIsOpen(!isStartedOpen)}
                    >
                        <span className="ic-meter mr-2"></span>
                        Menu1
                    </a>
                    <Collapse isOpen={isStartedOpen} className="ml-1 menu__collapsable-sub collapse">
                        <a>
                            <span className="ic-meter mr-2"></span>
                        Menu1
                        </a>
                    </Collapse>
                </li>
                <li>
                    <a
                        className="hasSub"
                        aria-expanded={isComponentOpen}
                        onClick={() => setComponentIsOpen(!isComponentOpen)}
                    >
                        <span className="ic-meter mr-2"></span>
                        Menu 2
          </a>
                    <Collapse isOpen={isComponentOpen} className="ml-1">
                        <a>
                            <span className="ic-meter mr-2"></span>
                        Menu1
                        </a>
                        <a>
                            <span className="ic-meter mr-2"></span>
                        Menu1
                        </a>
                    </Collapse>
                </li>
            </ul> */}


        </aside>
    );
};

export default Sidebar;