import { useState, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import styles from './LinkModal.module.css';
import { createLink, fetchLink, editLink } from '../../api/link';
import { useToast } from '../../context/ToastContext';


const LinkModal = ({onClose, prop, link}) => {

    const [url, setUrl] = useState('');
    const [remarks, setRemarks] = useState('')
    const [linkExp, setLinkExp] = useState(false);
    const [dateTime, setDateTime] = useState("");
    const {showToast} = useToast();

    const handleClear = () => {
        setUrl('');
        setLinkExp(false);
        setDateTime('');
    }

    const handleSubmit = async () => {
        try {
            let response;
            if(prop=="New"){
                response = await createLink(url, remarks, dateTime);
                showToast('Link created successfully!', 'success');
            }else{
                response = await editLink(link._id, url, remarks, dateTime);
                showToast('Link updated successfully!', 'success');
            }

            onClose();
        } catch (error) {
            console.error('Error creating link:', error);
            showToast('Failed to create or update the link.', 'error');
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!link) return; 
            try {
                const response = await fetchLink(link._id); 
                setUrl(response.data.originaLink || ''); 
                setRemarks(response.data.remarks || '');

                const date = new Date(response.data.linkExpiration);
                const formattedDate = date.toISOString().slice(0, 16);

                setDateTime(formattedDate || '');
            } catch (error) {
                console.error('Error fetching link:', error);
            }
        };

        fetchData();
    }, [link]);

    

    return (
        <>
            <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                    <div className={styles.heading}>
                        <span>{prop} Link</span>
                        <IoMdClose onClick={onClose} className={styles.close} />
                    </div>

                    <div className={styles.form}>
                        <div className={styles.formItem}>
                            <label>Destination Url <span className={styles.star}>*</span></label>
                            <input
                                className={styles.input}
                                placeholder='https://web.whatsapp.com/'
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>

                        <div className={styles.formItem}>
                            <label>Remarks <span className={styles.star}>*</span></label>
                            <textarea 
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                className={styles.input}
                                placeholder='Add remarks'></textarea>
                        </div>

                        <div className={styles.linkExp}>
                            <label>Link Expiration</label>
                            <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    checked={linkExp}
                                    onChange={() => setLinkExp(!linkExp)}
                                />
                                <span className={styles.slider}></span>
                            </label>

                        </div>

                        <div className={styles.formItem}>
                            <input
                                type="datetime-local"
                                id="datetime"
                                value={dateTime}
                                onChange={(e) => setDateTime(e.target.value)}
                                disabled={!linkExp}
                            />
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <button onClick={handleClear} className={styles.clear}>Clear</button>
                        <button 
                        type='submit'
                        onClick={handleSubmit}
                        className={styles.submit}
                        >{prop=='Edit' ? "Edit" : "Create new"}</button>
                    </div>
                </div>
            </div>
        </>

    )
};

export default LinkModal;