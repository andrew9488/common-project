import React, {useState} from 'react';
import Modal from '../../../../n2-features/f2-modals/modal/Modal';
import GreenModal from '../../../../n2-features/f2-modals/modal/GreenModal';
import LearnPage from '../../learnPage/LearnPage';
import styles from './CellWithButtons.module.sass';
import {EditPack} from "../../packs/EditPack/EditPack";

type CellWithButtonsPropsType = {
    deleteCardsPack: (packId: string) => void
    updateCardsPackName: (packId: string, packName: string) => void
    packId: string
}

const CellWithButtons: React.FC<CellWithButtonsPropsType> = (props) => {
    const [showDelModal, setShowDelModal] = useState<boolean>(false);
    const [showLearnModal, setShowLearnModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    return (
        <div className={styles.wrapper}>
            <button className={styles.delBtn} onClick={() => setShowDelModal(true)}>Delete</button>
            {
                showDelModal && <Modal childrenHeight={220}
                                       childrenWidth={400}
                                       onDeleteClick={() => {
                                           props.deleteCardsPack(props.packId);
                                           setShowDelModal(false)
                                       }}
                                       onModalClose={() => setShowDelModal(false)}
                                       type={'info'}
                                       header={'Delete pack'}
                                       buttonTitle={'Delete'}
                                       packName={'Pack name'}/>
            }
            <button className={styles.primBtn} onClick={() => setShowEditModal(true)}>Edit</button>
            {
                showEditModal &&
                <GreenModal onModalClose={() => setShowEditModal(false)} childrenWidth={413}
                            childrenHeight={540}>
                    <EditPack packId={props.packId} updatePack={props.updateCardsPackName}
                              closeEditModal={() => setShowEditModal(false)}/>
                </GreenModal>
            }
            <button className={styles.primBtn} onClick={() => setShowLearnModal(true)}>Learn</button>
            {showLearnModal &&
            <GreenModal onModalClose={() => setShowLearnModal(false)} childrenWidth={500}
                        childrenHeight={500}>
                <LearnPage cardsPack_id={props.packId} onModalClose={() => setShowLearnModal(false)}/>
            </GreenModal>}
        </div>
    )
}

export default CellWithButtons;