import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../routes/Routes';
import {PackType} from '../../../m3-dal/packAPI';
import Modal from '../../../../n2-features/f2-modals/modal/Modal';
import LearnPage from '../../learnPage/LearnPage';
import GreenModal from '../../../../n2-features/f2-modals/modal/GreenModal';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store";

type PackPropsType = {
    pack: PackType
    updateCardsPackName: (id: string) => void
    deleteCardsPack: (id: string) => void
}

export const Pack: React.FC<PackPropsType> = (props) => {

    const [showDelModal, setShowDelModal] = useState<boolean>(false);
    const [showLearnModal, setShowLearnModal] = useState<boolean>(false);

    return (
        <>
            <tr>
                <td><NavLink to={`${PATH.CARDS}/${props.pack._id}`}>{props.pack.name}</NavLink></td>
                <td>{props.pack.cardsCount}</td>
                <td>{props.pack.updated}</td>
                <td>{props.pack.user_name}</td>
                <td>
                    <button onClick={() => setShowDelModal(true)}>Delete</button>
                    {showDelModal && <Modal childrenHeight={220}
                                            childrenWidth={400}
                                            onDeleteClick={() => {
                                                props.deleteCardsPack(props.pack._id);
                                                setShowDelModal(false);
                                            }}
                                            onModalClose={() => setShowDelModal(false)}
                                            type={'info'}
                                            header={'Delete pack'}
                                            buttonTitle={'Delete'}
                                            packName={'Pack name'}/>}
                    <button onClick={() => props.updateCardsPackName(props.pack._id)}>Edit</button>
                    <button onClick={() => setShowLearnModal(true)}>Learn</button>
                    {showLearnModal &&
                    <GreenModal onModalClose={() => setShowLearnModal(false)} childrenWidth={500} childrenHeight={500}>
                        <LearnPage cardsPack_id={props.pack._id}/>
                    </GreenModal>}

                </td>
            </tr>
        </>
    );
}