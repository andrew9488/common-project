import React from 'react';
import styles from './GreenModal.module.css';

type ModalPropsType = {
    onModalClose: () => void
    childrenWidth: number
    childrenHeight: number
}

const Modal: React.FC<ModalPropsType> = (props) => {

    const {
        onModalClose,
        childrenWidth,
        childrenHeight,
        children
    } = props

    const top = `calc(50vh - ${childrenHeight / 2}px)`;
    const left = `calc(50vw - ${childrenWidth / 2}px)`;

    const modalMessageStyle = {
        top,
        left,
        width: childrenWidth,
        height: childrenHeight
    }

    return (
        <>
            <div className={styles.modalBackground} onClick={onModalClose}>
            </div>
            <div className={styles.modalMessage} style={modalMessageStyle}>
                {children}
            </div>
        </>
    )
}


export default Modal;