import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';

import Context from '../../store/Context';

function NavMobile({ to, icon, title }) {
    const { setShowNav } = useContext(Context);
    return (
        <NavLink
            to={to}
            className={({ isActive }) => (isActive ? 'nav-btn-mobile text-primary' : 'nav-btn-mobile text-white')}
            onClick={() => setShowNav(false)}
        >
            <FontAwesomeIcon icon={icon} className="w-[22px] h-[22px]" />
            <p className="text-[13px] font-medium pl-[8px]">{title}</p>
        </NavLink>
    );
}

export default NavMobile;
