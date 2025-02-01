import Navbar from '../../components/NavBar/Navbar';
import Header from '../../components/Header/Header';
import styles from './Dashboard.module.css';
import { dashboardAnalytics } from '../../api/link';
import { useState, useEffect } from 'react';

const Dashboard = () => {

    const [analytics, setAnalytics] = useState({
        dateWiseAnalytics: [],
        deviceWiseAnalytics: [],
        totalClicks: 0,
    });
    const [loading, setLoading] = useState(false);

    const fetchDashboardDetails = async () => {
        try {
            setLoading(true)
            const userData = await dashboardAnalytics();

            setAnalytics(userData);

        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardDetails();
    }, []);

    return (
        <div className={styles.container}>

            <div className={styles.sidebar}>
                <Navbar />
            </div>

            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <Header />
                </div>

                <div className={styles.dashboard}>
                    <div className={styles.heading}>
                        <h2>Total Clicks</h2>
                        <h2>{analytics.totalClicks}</h2>
                    </div>

                    <div className={styles.analysis}>

                        <div className={styles.number}>
                            <h3>Date-wise Clicks</h3>

                            <div className={styles.dateList}>
                                {analytics.dateWiseAnalytics.map((data, index) => {
                                    const maxClicks = Math.max(...analytics.dateWiseAnalytics.map(d => d.totalClicks));
                                    const percentage = (data.totalClicks / maxClicks) * 100;

                                    return (
                                        <div key={index} className={styles.dateItem}>
                                            <span className={styles.date}>{data.date}</span>
                                            <div
                                                className={styles.clicksBar}
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                            <span className={styles.clicks}>
                                                {data.totalClicks}
                                            </span>
                                        </div>)
                                })}
                            </div>

                        </div>
                        <div className={styles.devices}>
                            <h3>Click Devices</h3>

                            <ul>
                                {analytics.deviceWiseAnalytics.map((devices, index) => {
                                    const maxClicks = Math.max(...analytics.deviceWiseAnalytics.map(d => d.clicks));
                                    const percentage = (devices.clicks / maxClicks) * 100;

                                    return (
                                        <div key={index} className={styles.dateItem}>
                                            <span className={styles.date}>{devices._id}</span>
                                            <div
                                                className={styles.clicksBar}
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                            <span className={styles.clicks}>
                                                {devices.clicks} clicks                                    
                                            </span>
                                        </div>)
                                })}
                            </ul>

                        </div>

                    </div>

                </div>
            </div>


        </div>

    )
}

export default Dashboard;