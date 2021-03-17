import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from "react-router-dom";
import { Collapse } from "reactstrap";

import Logo from "../../../../assets/images/logo.png";

interface Props {
    sidebarToggle: boolean;
    setsidebarToggle: (state: boolean) => void;
    // isStartedOpen: any;
    // setStartedIsOpen: (state: boolean) => void;
}

const navData = [
    {name: 'sidebar:dashboard', path: '/admin/dashboard' },
    {
        name: 'sidebar:userappoval',
        path: '/admin/userappoval',
        key: 'userappoval',
        children: [
            { name: 'sidebar:userappoval-pending', path: '/admin/userappoval/pending', key: 'userappoval' }
        ],
    }
]

const SidebarAdmin = (props: Props) => {
    const location = useLocation();
    const { t } = useTranslation('sidebar');
    const { sidebarToggle, setsidebarToggle } = props;

    const [isOpen, setIsOpen] = useState<string[]>([])
    const togglesidebar = () => setsidebarToggle(!sidebarToggle)

    const toggleSidebarOnOutsideClick = useCallback((evt: Event) => {
        if (!((evt.target as HTMLElement).closest('aside.sidebar') || (evt.target as HTMLElement).closest('a.toggler')) && sidebarToggle) {
            // On Outside click beside sidebar component and header hamburger toggler icon
            setsidebarToggle(false)
        }
    }, [sidebarToggle, setsidebarToggle])

    const { innerWidth: width } = window
    useEffect(() => {
        if (width < 992) {
            ['click', 'touchend'].forEach((event) => document.addEventListener(event, toggleSidebarOnOutsideClick))
        } else {
            ['click', 'touchend'].forEach((event) => document.removeEventListener(event, toggleSidebarOnOutsideClick))
        }
        return () => ['click', 'touchend'].forEach((event) => document.removeEventListener(event, toggleSidebarOnOutsideClick))

    }, [width, toggleSidebarOnOutsideClick])

    const autoCollapseByPathName = useCallback((currentPath: string) => {
        navData.forEach((parentNav) => {
            if(parentNav.key){
                // Matching current path
                const activeLocation = currentPath.indexOf(parentNav.path) === 0;
                // Setting Collapse open keys
                if (activeLocation) {
                    setIsOpen(openList => ([...openList, parentNav.key]))
                }
            }
        })
    }, [setIsOpen])

    useEffect(() => {
        autoCollapseByPathName(location.pathname);
    }, [autoCollapseByPathName, location.pathname])


    return (
        <aside className="sidebar">
            <div className="d-flex justify-content-between align-items-center my-3">
                <div className="sidebar-logo">
                    <img src={Logo} alt="Rastriya Banijya Bank" className="logo" />
                </div>
                <h6 className="text-white ml-2 des">Directorate of Vehicle Management</h6>
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
                {navData.map((parentNav) =>
                    parentNav.key ?
                        <li key={parentNav.key}>
                            <a
                                href="#/"
                                data-toggle="collapse"
                                className="hasSub d-flex justify-content-between pr-0"
                                aria-expanded={isOpen.includes(parentNav.key)}
                                onClick={(e) => {
                                    // Prevent Navigation
                                    e.preventDefault();

                                    if (isOpen.includes(parentNav.key)) {
                                        let newNavList = isOpen.filter((navdata) => navdata !== parentNav.key)
                                        setIsOpen(newNavList)
                                    } else {
                                        setIsOpen([...isOpen, parentNav.key])
                                    }
                                }}
                            >
                                {t(parentNav.name)}
                                <i className={`pr-2 ${isOpen.includes(parentNav.key) ? 'ic-line-arrow-top' : 'ic-line-arrow-down'}`}></i>
                            </a>
                            <Collapse isOpen={isOpen.includes(parentNav.key)} className="ml-1">
                                {parentNav.children.map((nav) => (
                                    <NavLink to={nav.path} activeClassName="active" key={nav.key}>
                                        {t(nav.name)}
                                    </NavLink>
                                ))}
                            </Collapse>
                        </li>
                        :
                        <NavLink to={parentNav.path} activeClassName="active" key={parentNav.path}>
                            {t(parentNav.name)}
                        </NavLink>
                )}
            </ul>
        </aside>
    );
};

export default SidebarAdmin;