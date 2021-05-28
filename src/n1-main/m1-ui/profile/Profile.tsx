import React, {ChangeEvent, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../routes/Routes';
import {RequestStatusType} from '../app-reducer';
import {logOutTC} from '../../../n2-features/f1-auth/a1-login/auth-reducer';
import s from './Profile.module.scss'
import SuperDoubleRange from '../common/super-double-range/SuperDoubleRange';
import Search from '../Search/Search';
import {
    getPacksWithFilters,
    onPacksPageClickTC,
    onPortionPacksChangeTC,
    setMinMaxValuesAC,
    setSearchValueAC
} from '../Search/filter-reducer';
import {EditProfile} from './EditProfile/EditProfile';
import GreenModal from '../../../n2-features/f2-modals/modal/GreenModal';
import {PackType} from '../../m3-dal/packAPI';
import {Table} from '../common/table/Table';
import {deleteCardsPackTC, updateCardsPackTC} from '../packs/packs-reducer';
import CellWithButtons from '../common/table/CellWithButtons';
import SuperButton from '../common/super-button/SuperButton';
import Paginator from '../common/paginator/Paginator';


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

    //double range
    const minRedux = useSelector<AppRootStateType, number>(state => state.filter.min);
    const maxRedux = useSelector<AppRootStateType, number>(state => state.filter.max);
    const [min, setMin] = useState<number>(minRedux);
    const [max, setMax] = useState<number>(maxRedux);
    const onChangeRangeHandler = (values: number[]) => {
        setMin(values[0]);
        setMax(values[1]);
        dispatch(setMinMaxValuesAC(values));
    }

    //modal
    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const closeEditModal = () => {
        setShowEditModal(false)
    }

    //paginator
    const [pagesCount, setPagesCount] = useState<number>(pageCount);
    const pagesOptions = [5, 10, 15, 20, 25]
    const pagesOptionsTags = pagesOptions.map(item => <option value={item} key={item}>{item}</option>)

    const onPageClickHandler = (newPage: number) => {
        dispatch(onPacksPageClickTC(newPage))
    }
    const onPagesCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setPagesCount(+event.currentTarget.value)
        dispatch(onPortionPacksChangeTC(+event.currentTarget.value))

    }

    const onLogOutHandler = () => {
        dispatch(logOutTC());
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
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
                        <SuperDoubleRange onChangeRange={onChangeRangeHandler} value={[min, max]}/>
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
                        <Paginator totalCount={cardPacksTotalCount}
                                   currentPage={page}
                                   portionSize={pageCount}
                                   pagesPortionSize={10}
                                   onPageClickHandler={onPageClickHandler}/>
                        <select name="pagesCountSelect"
                                id="pagesCountSelect"
                                value={pagesCount}
                                onChange={onPagesCountChangeHandler}>
                            {pagesOptionsTags}
                        </select>
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

type TableContainerPropsType = {
    id: string | null
    items: any[]
}

const TableContainer: React.FC<TableContainerPropsType> = ({id, items}) => {

    const dispatch = useDispatch();

    // callbacks for actions with packs
    const deleteCardsPack = (id: string) => {
        dispatch(deleteCardsPackTC(id))
    }
    const updateCardsPackName = (_id: string, packName: string) => {
        dispatch(updateCardsPackTC(_id, packName))
    }

    //data for table with packs
    const titles = useMemo(() => ['Name', 'Cards', 'LastUpdate', 'Created By', 'Actions'], []);
    const myPacks = useMemo(() => {
        return items ? items.filter(p => p.user_id === id) : []
    }, [items])

    const array = [];

    if (myPacks) {
        for (let i = 0; i < myPacks.length; i++) {
            let arr = []
            arr.push(myPacks[i].name)
            arr.push(myPacks[i].cardsCount)
            arr.push(myPacks[i].updated.slice(0, -14))
            arr.push(myPacks[i].user_name)
            arr.push(
                <CellWithButtons deleteCardsPack={deleteCardsPack}
                                 updateCardsPackName={updateCardsPackName}
                                 packId={myPacks[i]._id}/>
            )
            array.push(arr)
        }
    }

    return (
        <Table titleColumns={titles} items={array}/>
    )
}

