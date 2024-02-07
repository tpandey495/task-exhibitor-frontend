import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { CgProfile } from 'react-icons/cg';
import "./index.css";

const Navbar = () => (
    <div className="nav-search-icon">
        <div className="search-container">
            <input type="text" placeholder="Search..." />
            <AiOutlineSearch className="search-icon" size={22} />
        </div>
        <div className="nav-personal-icon">
            <span className="nav-notification"><MdOutlineNotificationsNone size={28} /></span>
            <span className="nav-profile"><CgProfile size={28} /></span>
        </div>
    </div>
);

export default Navbar;
