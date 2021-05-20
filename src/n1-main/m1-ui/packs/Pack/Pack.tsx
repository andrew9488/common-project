import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../routes/Routes';
import {PackType} from '../../../m3-dal/packAPI';
import Modal from '../../../../n2-features/f2-modals/modal/Modal';

type PackPropsType = {
    pack: PackType
    updateCardsPackName: (id: string) => void
    deleteCardsPack: (id: string) => void
}

export const Pack: React.FC<PackPropsType> = (props) => {

    const [showDelModal, setShowDelModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    return (
        <>
            <tr>
                <td>{props.pack.name}</td>
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
                    <button onClick={() => setShowEditModal(true)}>update</button>
                    {showEditModal && <Modal childrenHeight={233}
                                             childrenWidth={400}
                                             onSaveClick={() => {
                                                 props.updateCardsPackName(props.pack._id);
                                                 setShowEditModal(false);
                                             }}
                                             onModalClose={() => setShowEditModal(false)}
                                             type={'input'}
                                             header={'Add new pack'}
                                             buttonTitle={'Save'}
                                             inputTitle={'Name pack'}/>}
                    <NavLink to={`${PATH.CARDS}/${props.pack._id}`}>cards</NavLink>
                    <NavLink to={`${PATH.LEARN}/${props.pack._id}`}>learn</NavLink>
                </td>
            </tr>
        </>
    );
}