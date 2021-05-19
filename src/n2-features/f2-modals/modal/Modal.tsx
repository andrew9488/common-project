import React, {useState} from 'react';
import styles from './Modal.module.css';
import icon from '../../../assets/icons-and-images/Page 1.png';

type ModalPropsType = {
    onModalClose: () => void
    childrenWidth: number
    childrenHeight: number
    onSaveClick?: (value: string) => void
    onDeleteClick?: () => void
    type: 'input' | 'info'
    header: string
    buttonTitle: string
    inputTitle?: string
    packName?: string
}

const Modal: React.FC<ModalPropsType> = (props) => {

    const {
        onModalClose,
        childrenWidth,
        childrenHeight,
        onSaveClick,
        onDeleteClick,
        header,
        buttonTitle,
        type,
        packName,
        inputTitle
    } = props

    const top = `calc(50vh - ${childrenHeight / 2}px)`;
    const left = `calc(50vw - ${childrenWidth / 2}px)`;

    const modalMessageStyle = {
        top,
        left,
        width: childrenWidth,
        height: childrenHeight
    }

    const [inputValue, setInputValue] = useState<string>('')

    return (
        <>
            <div className={styles.modalBackground} onClick={onModalClose}>
                Modal window
            </div>
            <div className={styles.modalMessage} style={modalMessageStyle}>
                <h3>{header} <img src={icon} onClick={onModalClose}
                                  alt="del"/></h3>
                <div className={styles.line}/>
                {type === 'info' && <div className={styles.info}>
                    <p>Do you really want to remove <span>{packName}?</span></p>
                    <p>All cards will be excluded from this course.</p>
                </div>}
                {type === 'input' && <div className={styles.input}>
                    <h4>{inputTitle}</h4>
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)}/>
                </div>}
                <div className={styles.buttonBlock}>
                    <button className={styles.cancelBtn} onClick={onModalClose}>Cancel</button>
                    {type === 'info' && <button className={styles.delBtn} onClick={onDeleteClick}>
                        {buttonTitle}
                    </button>}
                    {type === 'input' &&
                    <button className={styles.saveBtn}
                            onClick={() => {
                                onSaveClick && onSaveClick(inputValue)
                            }}>{buttonTitle}</button>}
                </div>
            </div>
        </>
    )
}


export default Modal;