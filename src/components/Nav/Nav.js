import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Nav({ title, icon, to }) {
    return (
        <NavLink to={to} className={({ isActive }) => (isActive ? 'nav-btn text-primary' : 'nav-btn text-white')}>
            <FontAwesomeIcon icon={icon} className="w-[28px] h-[28px]" />
            <p className="text-[13px] uppercase font-medium pl-[8px]">{title}</p>
        </NavLink>
    );
}

export default Nav;
