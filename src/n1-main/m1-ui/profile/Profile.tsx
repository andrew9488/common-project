import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../routes/Routes';
import {RequestStatusType} from '../app-reducer';
import {logOutTC} from '../../../n2-features/f1-auth/a1-login/auth-reducer';
import Modal from '../../../n2-features/f2-modals/modal/Modal';


const Profile: React.FC = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

    const onLogOutHandler = () => {
        dispatch(logOutTC());
    }


    //logic for delete pack with modals
    const [showModal, setShowModal] = useState<boolean>(true);


    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div>
            Profile
            {/*Перенести*/}
            <button>Delete card</button>
            {/*{showModal && <Modal childrenHeight={220}*/}
            {/*                     childrenWidth={400}*/}
            {/*                     onDeleteClick={() => {*/}
            {/*                     }}*/}
            {/*                     onModalClose={() => setShowModal(false)}*/}
            {/*                     type={'info'}*/}
            {/*                     header={'Delete pack'}*/}
            {/*                     buttonTitle={'Delete'}*/}
            {/*                     packName={'Pack name'}/>}*/}

            {showModal && <Modal childrenHeight={233}
                                 childrenWidth={400}
                                 onSaveClick={() => {
                                 }}
                                 onModalClose={() => setShowModal(false)}
                                 type={'input'}
                                 header={'Add new pack'}
                                 buttonTitle={'Save'}
                                 inputTitle={'Name pack'}/>}
            <br/>
            <button onClick={onLogOutHandler} disabled={appStatus === 'loading'}>Log out</button>
        </div>
    )
}

export default Profile