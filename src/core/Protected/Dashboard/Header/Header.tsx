import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

import User from "../../../../assets/images/user.jpg"
import { i18nLanguages } from '../../../../i18n/i18n';
import { switchI18nLanguage } from '../../../../store/modules/i18n/i18n';
import { logoutAction, RootState } from '../../../../store/root-reducer';
interface Props {
    sidebarToggle: boolean;
    setsidebarToggle: (state: boolean) => void;
}
const Header = (props: Props) => {
    const {sidebarToggle, setsidebarToggle} = props;
    
    const i18nextData = useSelector((state: RootState) => state.i18nextData, shallowEqual);
    const dispatch = useDispatch()
    const initLogout = () => dispatch(logoutAction())
    
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const togglesidebar = () => setsidebarToggle(!sidebarToggle);

    return (
        <header className="header">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <a className="ic-menu text-white toggler" onClick={togglesidebar}></a>

                    <p className="title">Vehicle Registration And Transport Service Management System</p>

                </div>

                <div className="list list__inline list-separator">
                    <Dropdown
                        isOpen={dropdownOpen}
                        toggle={toggle}
                        tag="div"
                        className="ml-3"
                    >
                        <DropdownToggle className="auth" tag="a" role="button">
                            <div className="avatar-md">
                                <img src={User} />
                            </div>
                            <div className="textbox mr-2">
                                <h6 className="username"></h6>
                            </div>
                            <i className="ic-dropdown"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                <i className="ic-edit"></i>
                                Change Password
                            </DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem onClick={initLogout} className="dropdown-item text-danger">
                                <i className="ic-logout"> </i>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <div className="d-flex align-items-center">
                        <a
                            className='btn p-0 text-white des'
                            onClick={() => {
                                const switchlang = i18nLanguages.find(lang => lang !== i18nextData.languageType);
                                if(switchlang){
                                    dispatch(switchI18nLanguage(switchlang))
                                }
                            }}
                        >
                            {{ en: 'En', ne: 'नेपा' }[i18nextData.languageType]}
                        </a>
                    </div >
                </div >
            </div >
        </header >
    );
};

export default Header;