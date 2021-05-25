import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../routes/Routes';
import {RequestStatusType} from '../app-reducer';
import {logOutTC} from '../../../n2-features/f1-auth/a1-login/auth-reducer';
import {updateProfileTC} from "./profile-reducer";
import s from "./Profile.module.scss"
import SuperDoubleRange from "../common/super-double-range/SuperDoubleRange";
import Search from "../Search/Search";
import {setMinMaxValuesAC, setSearchValueAC} from "../Search/filter-reducer";


const Profile: React.FC = () => {

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


    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const avatar = useSelector<AppRootStateType, string | null>(state => state.profile.userData.avatar)
    const name = useSelector<AppRootStateType, string | null>(state => state.profile.userData.name)

    const [newName, setNewName] = useState("")
    const [newPhoto, setNewPhoto] = useState("")

    const onUploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPhoto(e.currentTarget.value)
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }

    // const onClick = () => {
    //     dispatch(updateProfileTC(newName, newPhoto))
    // }

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
                    <img src={avatar ? avatar : ""} alt="user_photo"/>
                    <h3>{name}</h3>
                    <button>EditMode</button>
                </div>
                <div className={s.cardsFilter}>
                    <span>Number of cards</span>
                    <SuperDoubleRange onChangeRange={onChangeRangeHandler} value={[min, max]}/>
                </div>
            </div>
            <div className={s.packsBlock}>
                <div className={s.packs}>
                    <h2>Packs list {name + "'s"}</h2>
                    <Search setSearch={value => dispatch(setSearchValueAC(value))}/>
                </div>
            </div>
            {/*<button onClick={onLogOutHandler} disabled={appStatus === 'loading'}>Log out</button>*/}
            {/*<input type="text" value={newName} onChange={onChange}/>*/}
            {/*<input type="text" value={newPhoto} onChange={onUploadPhoto}/>*/}
        </div>
    )
}

export default Profile