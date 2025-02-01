import styles from './Settings.module.css';
import Navbar from '../../components/NavBar/Navbar';
import Header from '../../components/Header/Header';
import { useState, useEffect } from 'react';
import { getUserDetails, editUserDetails } from '../../api/auth';

const Settings = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchProfileDetails = async () => {
        try {
            setLoading(true)
            const userData = await getUserDetails();

            
            setName(userData.user.name); 
            setEmail(userData.user.email);
            setMobile(userData.user.mobile);

            
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileDetails();
    }, []);

    const handleEditProfile = async () => {
        try {
            setLoading(true)

            console.log(name, email, mobile, "hiiiiiii");
            const userData = await editUserDetails({
                userName: name, 
                email, 
                mobile
            });

            
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className={styles.container}>

            <div className={styles.sidebar}>
                <Navbar />
            </div>

            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <Header />
                </div>

                <div className={styles.settings}>
                    <div className={styles.editForm}>
                        <div className={styles.formItem}>
                            <label>Name</label>
                            <input 
                            value={name}
                            type="text"
                            name="name"
                            label="Name"
                            onChange={(e) => setName(e.target.value)}
                            required
                            />
                        </div>

                        <div className={styles.formItem}>
                            <label>Email id</label>
                            <input
                            value={email}
                            type="text"
                            name="email"
                            label="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                             />
                        </div>

                        <div className={styles.formItem}>
                            <label>Mobile no.</label>
                            <input
                            value={mobile}
                            type="text"
                            name="mobile"
                            label="mobile"
                            onChange={(e) => setMobile(e.target.value)}
                            required
                             />
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <button 
                        className={styles.save}
                        onClick={handleEditProfile}
                        >Save Changes</button>
                        <button className={styles.delete}>Delete Account</button>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Settings;