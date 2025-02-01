import { FaPlus } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../api/auth";
import LinkModal from "../LinkModal/LinkModal";
import { formatDateToDay } from "../../utils/util";
import { useNavigate } from "react-router-dom";
import { searchRemarks } from "../../api/link";

const Header = () => {
    const [profile, setProfile] = useState('')
    const [loading, setLoading] = useState(false);
    const [create, setCreate] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState('');
    const [selectedLink, setSelectedLink] = useState(null);

    const navigate = useNavigate();

    const fetchProfileDetails = async () => {
        try {
            setLoading(true)
            const userData = await getUserDetails();


            setProfile(userData.user.name);

        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileDetails();
    }, []);

    const openCreateModal = () => {
        setCreate(true);
    }

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/");
    };

    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            const response = await searchRemarks(query);

            setResults(response);
            setSelectedLink(null);
        } catch (error) {
            console.error('Error searching remarks:', error);
        }
    }

    const handleResultClick = (linkId) => {
        navigate("/links", { state: { linkId } });
    };

    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.wish}>
                    <h4>☀️ Good Morning, {!loading && profile}</h4>
                    <p>{formatDateToDay(new Date())}</p>
                </div>

                <div className={styles.rightContainer}>
                    <button className={styles.createButton} onClick={openCreateModal}>
                        <FaPlus />
                        <p>Create new</p>
                    </button>

                    <div className={styles.searchInput}>
                        <IoIosSearch />
                        <input
                            placeholder="Search by remarks"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>

                    {results.length > 0 && (
                        <div className={styles.searchResults}>
                            {results.map((result) => (
                                <div
                                    key={result._id}
                                    className={styles.resultItem}
                                    onClick={() => handleResultClick(result._id)}
                                >
                                    {result.remarks}
                                </div>
                            ))}
                        </div>
                    )}

                    <div
                        className={styles.profileIcon}
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        {profile.substring(0, 2).toUpperCase()}
                    </div>
                    {showDropdown && (
                        <div className={styles.dropdown}>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    )}
                </div>
            </div>

            {create &&
                <LinkModal prop={"New"} onClose={() => setCreate(false)} />
            }

        </>
    )
}

export default Header;