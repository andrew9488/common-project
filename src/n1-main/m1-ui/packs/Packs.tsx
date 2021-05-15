import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {createCardsPackTC, deleteCardsPackTC, fetchPacksTC, updateCardsPackTC} from './packs-reducer';
import {Pack} from './Pack/Pack';
import {
    getPacksWithFilters,
    onPacksPageClickTC,
    onPortionPacksChangeTC,
    setMinMaxValuesAC,
    setSearchValueAC,
    sortPackTC
} from '../Search/filter-reducer';
import Search from '../Search/Search';
import SuperButton from '../common/super-button/SuperButton';
import SuperDoubleRange from '../common/super-double-range/SuperDoubleRange';
import Paginator from '../common/paginator/Paginator';
import styles from './Packs.module.css';
import {Preloader} from '../common/preloader/Preloader';
import {CardsPackCreateType, PackType} from '../../m3-dal/packAPI';

export const Packs: React.FC = () => {

    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)

    const dispatch = useDispatch()

    const minRedux = useSelector<AppRootStateType, number>(state => state.filter.min);
    const maxRedux = useSelector<AppRootStateType, number>(state => state.filter.max);


    const [min, setMin] = useState<number>(minRedux);
    const [max, setMax] = useState<number>(maxRedux);
    const [pagesCount, setPagesCount] = useState<number>(pageCount);

    const onChangeRangeHandler = (values: number[]) => {
        setMin(values[0]);
        setMax(values[1]);
        dispatch(setMinMaxValuesAC(values));
    }

    const onPageClickHandler = (newPage: number) => {
        dispatch(onPacksPageClickTC(newPage))
    }

    const onPagesCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setPagesCount(+event.currentTarget.value)
        dispatch(onPortionPacksChangeTC(+event.currentTarget.value))

    }

    useEffect(() => {
        dispatch(fetchPacksTC({}))
    }, [])

    const pagesOptions = [5, 10, 15, 20, 25]
    const pagesOptionsTags = pagesOptions.map(item => <option value={item} key={item}>{item}</option>)

    const onAddCardsPackHandler = () => {
        let cardsPack = {
            name: "NEWCardsPackVA"
        } as Partial<CardsPackCreateType>
        dispatch(createCardsPackTC(cardsPack))
    }

    const onUpdateCardsPackNameHandler = (_id: string) => {
        const name = "newNameCardsPacksVA"
        dispatch(updateCardsPackTC(_id, name))
    }

    const onDeleteCardsPackHandler = (id: string) => {
        dispatch(deleteCardsPackTC(id))
    }

    if (!packs) {
        return <Preloader/>
    }

    return (
        <>
            <h3 style={{paddingBottom: '20px'}}>Packs Page</h3>
            <div className={styles.filtersWrapper}>
                <Search setSearch={(value) => {
                    dispatch(setSearchValueAC(value))
                }}/>
                <div>
                    <SuperDoubleRange onChangeRange={onChangeRangeHandler}
                                      value={[min, max]}
                                      className={styles.range}/>
                    <p>Choose cards count in pack</p>
                </div>
                <SuperButton text={'search'}
                             onClick={() => dispatch(getPacksWithFilters())}/>
            </div>
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
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Cards Count
                        <button onClick={() => dispatch(sortPackTC('0cardsCount'))}>&#8593;</button>
                        <button onClick={() => dispatch(sortPackTC('1cardsCount'))}>&#8595;</button>
                    </th>
                    <th>Update</th>
                    <th>UserName</th>
                    <th>
                        <button onClick={onAddCardsPackHandler}>Add</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {packs && packs.map(p => {
                    return <Pack key={p._id}
                                 pack={p}
                                 deleteCardsPack={onDeleteCardsPackHandler}
                                 updateCardsPackName={onUpdateCardsPackNameHandler}/>
                })}
                </tbody>
            </table>
        </>);
}