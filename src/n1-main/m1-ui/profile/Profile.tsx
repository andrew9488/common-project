import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../routes/Routes';
import {RequestStatusType} from '../app-reducer';
import {logOutTC} from '../../../n2-features/f1-auth/a1-login/auth-reducer';
import s from './Profile.module.scss'
import SuperDoubleRange from '../common/super-double-range/SuperDoubleRange';
import Search from '../Search/Search';
import {setMinMaxValuesAC, setSearchValueAC} from '../Search/filter-reducer';
import {EditProfile} from './EditProfile/EditProfile';
import GreenModal from '../../../n2-features/f2-modals/modal/GreenModal';
import {PackType} from '../../m3-dal/packAPI';
import {Table} from '../common/table/Table';
import {deleteCardsPackTC, updateCardsPackTC} from '../packs/packs-reducer';
import CellWithButtons from '../common/table/CellWithButtons';


const Profile: React.FC = () => {

    //redux
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const avatar = useSelector<AppRootStateType, string | null>(state => state.profile.userData.avatar)
    const name = useSelector<AppRootStateType, string | null>(state => state.profile.userData.name)
    const myId = useSelector<AppRootStateType, string | null>(state => state.profile.userData._id)
    const packs = useSelector<AppRootStateType, PackType[]>(state => state.packs.cardPacks)

    // for table
    const deleteCardsPack = (id: string) => {
        dispatch(deleteCardsPackTC(id))
    }
    const updateCardsPackName = (_id: string) => {
        const name = 'newNameCardsPacksVA'
        dispatch(updateCardsPackTC(_id, name))
    }

    const titles = ['Name', 'Cards', 'LastUpdate', 'Created By', 'Actions']
    const myPacks = packs && packs.filter(p => p.user_id === myId)
    const array = []
    if (myPacks) {
        for (let i = 0; i < myPacks.length; i++) {
            let arr = []
            arr.push(myPacks[i].name)
            arr.push(myPacks[i].cardsCount)
            arr.push(myPacks[i].updated)
            arr.push(myPacks[i].user_name)
            arr.push(
                <CellWithButtons deleteCardsPack={deleteCardsPack}
                                 updateCardsPackName={updateCardsPackName}
                                 packId={myPacks[i]._id}/>
            )
            array.push(arr)
        }
    }

    //double range
    const minRedux = useSelector<AppRootStateType, number>(state => state.filter.min);
    const maxRedux = useSelector<AppRootStateType, number>(state => state.filter.max);
    const [min, setMin] = useState
    < number > (minRedux);
    const [max, setMax] = useState
    < number > (maxRedux);
    const onChangeRangeHandler = (values: number[]) => {
        setMin(values[0]);
        setMax(values[1]);
        dispatch(setMinMaxValuesAC(values));
    }

    //modal
    const [showEditModal, setShowEditModal] = useState<boolean>(false)


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
                    <button onClick={() => setShowEditModal(true)}>EditMode</button>
                    <button onClick={onLogOutHandler} disabled={appStatus === 'loading'}>Log out</button>
                </div>
                <div className={s.cardsFilter}>
                    <span>Number of cards</span>
                    <SuperDoubleRange onChangeRange={onChangeRangeHandler} value={[min, max]}/>
                </div>
            </div>
            <div className={s.packsBlock}>
                <div className={s.packs}>
                    <h2>Packs list {name && name + '\'s'}</h2>
                    <Search setSearch={value => dispatch(setSearchValueAC(value))}/>
                    <Table titleColumns={titles} items={array}/>
                </div>
            </div>
            {showEditModal &&
            <GreenModal onModalClose={() => setShowEditModal(false)} childrenWidth={500}
                        childrenHeight={500}>
                <EditProfile/>
            </GreenModal>}

        </div>
    )
}
export default Profile