import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import './Navigator.scss';

const MenuGroup = ({ name, children }) => {
    return (
        <li className="menu-group">
            <div className="menu-group-name">
                <FormattedMessage id={name} />
            </div>
            <ul className="menu-list list-unstyled">
                {children}
            </ul>
        </li>
    );
};

const Menu = ({ name, active, link, children, onClick, hasSubMenu }) => {
    return (
        <li className={"menu" + (hasSubMenu ? " has-sub-menu" : "") + (active ? " active" : "")}>
            {hasSubMenu ? (
                <>
                    <span
                        data-toggle="collapse"
                        className={"menu-link collapsed"}
                        onClick={onClick}
                        aria-expanded={"false"}
                    >
                        <FormattedMessage id={name} />
                        <div className="icon-right">
                            <i className={"far fa-angle-right"} />
                        </div>
                    </span>
                    <div>
                        <ul className="sub-menu-list list-unstyled">
                            {children}
                        </ul>
                    </div>
                </>
            ) : (
                <Link to={link} className="menu-link">
                    <FormattedMessage id={name} />
                </Link>
            )}
        </li>
    );
};

const SubMenu = ({ name, link }) => {
    const location = useLocation();
    const isActive = location.pathname === link;

    return (
        <li className={"sub-menu " + (isActive ? "active" : "")}>
            <Link to={link} className="sub-menu-link">
                <FormattedMessage id={name} />
            </Link>
        </li>
    );
};

const Navigator = ({ menus, onLinkClick }) => {
    const location = useLocation();
    const [expandedMenu, setExpandedMenu] = useState({});

    useEffect(() => {
        checkActiveMenu();
    }, [location]);

    const toggle = (groupIndex, menuIndex) => {
        const key = `${groupIndex}_${menuIndex}`;
        setExpandedMenu(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    const isMenuHasSubMenuActive = (subMenus, link) => {
        if (!subMenus) return false;
        const currentPath = location.pathname;
        return subMenus.some(subMenu => subMenu.link === currentPath);
    };

    const checkActiveMenu = () => {
        outerLoop:
        for (let i = 0; i < menus.length; i++) {
            const group = menus[i];
            if (group.menus && group.menus.length > 0) {
                for (let j = 0; j < group.menus.length; j++) {
                    const menu = group.menus[j];
                    if (menu.subMenus && menu.subMenus.length > 0) {
                        if (isMenuHasSubMenuActive(menu.subMenus)) {
                            const key = `${i}_${j}`;
                            setExpandedMenu({ [key]: true });
                            break outerLoop;
                        }
                    }
                }
            }
        }
    };

    return (
        <ul className="navigator-menu list-unstyled">
            {menus.map((group, groupIndex) => (
                <MenuGroup key={groupIndex} name={group.name}>
                    {group.menus &&
                        group.menus.map((menu, menuIndex) => {
                            const isMenuActive = isMenuHasSubMenuActive(menu.subMenus, menu.link);
                            const isSubMenuOpen = expandedMenu[`${groupIndex}_${menuIndex}`] === true;

                            return (
                                <Menu
                                    key={menuIndex}
                                    active={isMenuActive}
                                    name={menu.name}
                                    link={menu.link}
                                    hasSubMenu={menu.subMenus}
                                    onClick={() => toggle(groupIndex, menuIndex)}
                                >
                                    {menu.subMenus && menu.subMenus.map((subMenu, subMenuIndex) => (
                                        <SubMenu
                                            key={subMenuIndex}
                                            name={subMenu.name}
                                            link={subMenu.link}
                                            onLinkClick={onLinkClick}
                                        />
                                    ))}
                                </Menu>
                            );
                        })}
                </MenuGroup>
            ))}
        </ul>
    );
};

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);
