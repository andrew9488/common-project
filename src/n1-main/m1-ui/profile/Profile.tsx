import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../routes/Routes';
import {RequestStatusType} from '../app-reducer';
import {logOutTC} from '../../../n2-features/f1-auth/a1-login/auth-reducer';
import Search from '../Search/Search';
import {getPacksWithFilters, setMinMaxValuesAC, setSearchValueAC} from '../Search/filter-reducer';
import SuperButton from '../common/super-button/SuperButton';
import SuperDoubleRange from '../common/super-double-range/SuperDoubleRange';
import Paginator from '../common/paginator/Paginator';

const Profile: React.FC = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

    //переносить
    const minRedux = useSelector<AppRootStateType, number>(state => state.filter.min);
    const maxRedux = useSelector<AppRootStateType, number>(state => state.filter.max);

    const [min, setMin] = useState<number>(minRedux);
    const [max, setMax] = useState<number>(maxRedux);
    const onChangeRangeHandler = (values: number[]) => {
        setMin(values[0]);
        setMax(values[1]);
        dispatch(setMinMaxValuesAC(values));
    }


    const onLogOutHandler = () => {
        dispatch(logOutTC());
    }

    if (!isLoggedIn) {
        return <Redirect to={PATH.LOGIN}/>
    }


    return (
        <div>
            Profile
            <br/>
            <button onClick={onLogOutHandler} disabled={appStatus === 'loading'}>Log out</button>
            {/*переносить*/}
            <Search setSearch={(value) => {
                dispatch(setSearchValueAC(value))
            }}/>
            <SuperButton text={'search'} onClick={() => dispatch(getPacksWithFilters())}/>
            <SuperDoubleRange onChangeRange={onChangeRangeHandler} value={[min, max]}/>
            <Paginator totalCount={1} currentPage={1} portionSize={12} pagesPortionSize={10} onPageClickHandler={() => {
            }}/>
        </div>
    )
}

export default Profile