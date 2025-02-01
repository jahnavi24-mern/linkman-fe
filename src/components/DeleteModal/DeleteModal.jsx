import { IoMdClose } from "react-icons/io";
import styles from "./DeleteModal.module.css";


const DeleteModal = ({onClose, onDelete}) => {

    return (
        <>
            <div className={styles.modalOverlay}>
                <div className={styles.modal}>
                    <IoMdClose onClick={onClose} className={styles.close} />

                    <div className={styles.question}>
                        Are you sure, you want to remove it ? 
                    </div>

                    <div className={styles.buttons}>
                        <button 
                        className={styles.noButton}
                        onClick={onClose}
                        >NO</button>
                        <button 
                        className={styles.yesButton}
                        onClick={onDelete}
                        >YES</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeleteModal;