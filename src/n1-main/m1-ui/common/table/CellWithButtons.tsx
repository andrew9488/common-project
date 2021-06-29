import React, {useState} from 'react';
import Modal from '../../../../n2-features/f2-modals/modal/Modal';
import GreenModal from '../../../../n2-features/f2-modals/modal/GreenModal';
import LearnPage from '../../learn-page/LearnPage';
import styles from './CellWithButtons.module.sass';
import {EditPack} from '../../packs/EditPack/EditPack';
import {EditCard} from '../../cards/EditCard/EditCard';

type CellWithButtonsPropsType = {
    deleteCardsPack: (packId: string) => void
    updateCardsPackName?: (packId: string, packName: string) => void
    updateCard?: (cardId: string, question: string, answer: string) => void
    id: string
    isOwn: boolean
    type: 'pack' | 'card'
    name?: string
    answer?: string
    question?: string
}


const CellWithButtons: React.FC<CellWithButtonsPropsType> = (props) => {
    const [showDelModal, setShowDelModal] = useState<boolean>(false);
    const [showLearnModal, setShowLearnModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const updatePack = (packId: string, packName: string) => {
        props.updateCardsPackName && props.updateCardsPackName(packId, packName)
    }
    const updateCard = (cardId: string, question: string, answer: string) => {
        props.updateCard && props.updateCard(cardId, question, answer)
    }

    return (
        <div className={styles.wrapper}>
            {props.type === 'pack' &&

            <>
                <div className={styles.btnsWrapper}>
                    {props.isOwn && <>
                        <button className={styles.delBtn} onClick={() => setShowDelModal(true)}>Delete</button>
                        <button className={styles.primBtn} onClick={() => setShowEditModal(true)}>Edit</button>
                    </>}
                    <button className={styles.primBtn} onClick={() => setShowLearnModal(true)}>Learn</button>
                </div>
                {
                    showDelModal && <Modal childrenHeight={220}
                                           childrenWidth={400}
                                           onDeleteClick={() => {
                                               props.deleteCardsPack(props.id);
                                               setShowDelModal(false)
                                           }}
                                           onModalClose={() => setShowDelModal(false)}
                                           type={'info'}
                                           header={'Delete pack'}
                                           buttonTitle={'Delete'}
                                           packName={'Pack name'}/>
                }
                {
                    showEditModal &&
                    <GreenModal onModalClose={() => setShowEditModal(false)} childrenWidth={413}
                                childrenHeight={540}>
                        <EditPack packId={props.id} updatePack={updatePack}
                                  closeEditModal={() => setShowEditModal(false)} packName={props.name}/>
                    </GreenModal>
                }
                {showLearnModal &&
                <GreenModal onModalClose={() => setShowLearnModal(false)} childrenWidth={413}
                            childrenHeight={575}>
                    <LearnPage cardsPack_id={props.id} onModalClose={() => setShowLearnModal(false)}/>
                </GreenModal>}
            </>
            }
            {props.type === 'card' &&
            <>
                {props.isOwn && <div className={styles.btnsWrapper}>
                    <button className={styles.delBtn} onClick={() => setShowDelModal(true)}>Delete</button>
                    <button className={styles.primBtn} onClick={() => setShowEditModal(true)}>Edit</button>
                </div>}
                {
                    showDelModal && <Modal childrenHeight={220}
                                           childrenWidth={400}
                                           onDeleteClick={() => {
                                               props.deleteCardsPack(props.id);
                                               setShowDelModal(false)
                                           }}
                                           onModalClose={() => setShowDelModal(false)}
                                           type={'info'}
                                           header={'Delete pack'}
                                           buttonTitle={'Delete'}
                                           packName={'Pack name'}/>
                }
                {
                    showEditModal &&
                    <GreenModal onModalClose={() => setShowEditModal(false)} childrenWidth={413}
                                childrenHeight={444}>
                        <EditCard cardId={props.id} updatePack={updateCard}
                                  closeEditModal={() => setShowEditModal(false)}
                                  answer={props.answer}
                                  question={props.question}
                        />
                    </GreenModal>
                }
            </>
            }
        </div>
    )
}

export default CellWithButtons;