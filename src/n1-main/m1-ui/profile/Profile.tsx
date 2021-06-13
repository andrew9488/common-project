import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../routes/Routes';
import {initializedAppTC, RequestStatusType} from '../app-reducer';
import {logOutTC} from '../../../n2-features/f1-auth/a1-login/auth-reducer';
import s from './Profile.module.scss'
import Search from '../search/Search';
import {setSearchValueAC} from '../search/filter-reducer';
import {EditProfile} from './EditProfile/EditProfile';
import GreenModal from '../../../n2-features/f2-modals/modal/GreenModal';
import {PackType} from '../../m3-dal/packAPI';
import {Preloader} from '../common/preloader/Preloader';
import {TableContainer} from '../common/table/TableContainer';
import {SuperDoubleRangeContainer} from '../common/super-double-range/SuperDoubleRangeContainer';
import {PaginatorContainer} from '../common/paginator/PaginatorContainer';
import {deleteCardsPackTC, fetchPacksTC, updateCardsPackTC} from '../packs/packs-reducer';


const Profile: React.FC = () => {

    //data from redux
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const avatar = useSelector<AppRootStateType, string | null>(state => state.profile.userData.avatar)
    const name = useSelector<AppRootStateType, string | null>(state => state.profile.userData.name)
    const packs = useSelector<AppRootStateType, PackType[]>(state => state.packs.cardPacks)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const myId = useSelector<AppRootStateType, string | null>(state => state.profile.userData._id)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const searchName = useSelector<AppRootStateType, string>(state => state.filter.search)
    const minFilter = useSelector<AppRootStateType, number>(state => state.filter.min)
    const maxFilter = useSelector<AppRootStateType, number>(state => state.filter.max)

    useEffect(() => {
        dispatch(initializedAppTC(cardPacksTotalCount, myId))
    }, [dispatch, cardPacksTotalCount, myId])

    //modal
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const closeEditModal = () => {
        setShowEditModal(false)
    }
    const titles = useMemo(() => ['Name', 'Cards', 'LastUpdate', 'Created By', 'Actions'], []);
    // const filterPacks = useMemo(() => {
    //     return packs && myId ? packs.filter(p => p.user_id === myId) : packs
    // }, [packs, myId])


    const onLogOutHandler = () => {
        dispatch(logOutTC());
    }
    const pageClickPacksHandler = (page: number) => {
        dispatch(fetchPacksTC({page}))
    }

    const pagesCountPacksChange = (pageCount: number) => {
        debugger
        dispatch(fetchPacksTC({pageCount}))
    }

    const deleteCardsPack = (id: string) => {
        dispatch(deleteCardsPackTC(id))
    }
    const updateCardsPackName = (id: string, packName: string) => {
        dispatch(updateCardsPackTC(id, packName))
    }
    const getPacksWithFilters = () => {
        dispatch(fetchPacksTC({packName: searchName, min: minFilter, max: maxFilter}))
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
                    <h4>{name && name}</h4>
                    <div className={s.description}>Some description</div>
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
                        <SuperDoubleRangeContainer/>
                    </div>
                </div>
            </div>
            <div className={s.packsBlock}>
                <h3>Packs list {name && name + '\'s'}</h3>
                <div className={s.searchBlock}>
                    <div className={s.search}>
                        <Search setSearch={value => dispatch(setSearchValueAC(value))}/>
                    </div>
                    <div className={s.button}>
                        <button onClick={() => getPacksWithFilters()}>search</button>
                    </div>
                </div>
                <TableContainer packs={packs}
                                deleteCallback={deleteCardsPack}
                                titles={titles}
                                updateCardsPackCallback={updateCardsPackName}
                                type="pack"
                />
                <PaginatorContainer pageClickHandler={pageClickPacksHandler}
                                    pagesCountChange={pagesCountPacksChange}
                                    totalCount={cardPacksTotalCount}
                                    page={page}
                                    pageCount={pageCount}
                />
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

