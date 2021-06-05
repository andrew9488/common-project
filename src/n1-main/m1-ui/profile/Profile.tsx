import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../routes/Routes';
import {initializedAppTC, RequestStatusType} from '../app-reducer';
import {logOutTC} from '../../../n2-features/f1-auth/a1-login/auth-reducer';
import s from './Profile.module.scss'
import Search from '../Search/Search';
import {getPacksWithFilters, setSearchValueAC} from '../Search/filter-reducer';
import {EditProfile} from './EditProfile/EditProfile';
import GreenModal from '../../../n2-features/f2-modals/modal/GreenModal';
import {PackType} from '../../m3-dal/packAPI';
import SuperButton from '../common/super-button/SuperButton';
import {Preloader} from "../common/preloader/Preloader";
import {TableContainer} from "../common/table/TableContainer";
import {SuperDoubleRangeContainer} from "../common/super-double-range/SuperDoubleRangeContainer";
import {PaginatorContainer} from "../common/paginator/PaginatorContainer";


const Profile: React.FC = () => {

    //data from redux
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const avatar = useSelector<AppRootStateType, string | null>(state => state.profile.userData.avatar)
    const name = useSelector<AppRootStateType, string | null>(state => state.profile.userData.name)
    const myId = useSelector<AppRootStateType, string | null>(state => state.profile.userData._id)
    const packs = useSelector<AppRootStateType, PackType[]>(state => state.packs.cardPacks)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const minRedux = useSelector<AppRootStateType, number>(state => state.filter.min);
    const maxRedux = useSelector<AppRootStateType, number>(state => state.filter.max);

    //modal
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const closeEditModal = () => {
        setShowEditModal(false)
    }

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])

    const onLogOutHandler = () => {
        dispatch(logOutTC());
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }

    if (!isInitialized) {
        return <Preloader/>
    }

    return (
        <div className={s.profileContainer}>
            <div className={s.profileBlock}>
                <div className={s.profileInfo}>
                    <img src={avatar && avatar ? avatar : ''} alt="user_photo"/>
                    <h3>{name && name}</h3>
                    <div className={s.buttonBlock}>
                        <button className={s.editBtn} onClick={() => setShowEditModal(true)}>Edit profile</button>
                        <button className={s.logoutBtn}
                                onClick={onLogOutHandler}
                                disabled={appStatus === 'loading'}>Log out
                        </button>
                    </div>
                </div>
                <div className={s.cardsFilter}>
                    <h3>Number of cards</h3>
                    <div className={s.range}>
                        <SuperDoubleRangeContainer min={minRedux} max={maxRedux}/>
                    </div>
                </div>
            </div>
            <div className={s.packsBlock}>
                <div className={s.packs}>
                    <h3>Packs list {name && name + '\'s'}</h3>
                    <div className={s.searchBlock}>
                        <div className={s.search}>
                            <Search setSearch={value => dispatch(setSearchValueAC(value))}/>
                        </div>
                        <div className={s.button}>
                            <SuperButton text={'search'} onClick={() => dispatch(getPacksWithFilters())}/>
                        </div>
                    </div>
                    <TableContainer id={myId} items={packs}/>
                    <div>
                       <PaginatorContainer page={page} pageCount={pageCount} cardPacksTotalCount={cardPacksTotalCount}/>
                    </div>
                </div>
            </div>
            {showEditModal &&
            <GreenModal onModalClose={() => setShowEditModal(false)} childrenWidth={413}
                        childrenHeight={540}>
                <EditProfile closeEditModal={closeEditModal}/>
            </GreenModal>}

        </div>
    )
}
export default Profile

