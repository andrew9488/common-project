import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {createCardsPackTC, deleteCardsPackTC, fetchPacksTC, updateCardsPackTC} from './packs-reducer';
import {
    getPacksWithFilters,
    onPacksPageClickTC,
    onPortionPacksChangeTC,
    setMinMaxValuesAC,
    setSearchValueAC
} from '../Search/filter-reducer';
import Search from '../Search/Search';
import SuperButton from '../common/super-button/SuperButton';
import SuperDoubleRange from '../common/super-double-range/SuperDoubleRange';
import Paginator from '../common/paginator/Paginator';
import styles from './Packs.module.css';
import {Preloader} from '../common/preloader/Preloader';
import {CardsPackCreateType, PackType} from '../../m3-dal/packAPI';
import Modal from '../../../n2-features/f2-modals/modal/Modal';
import GreenModal from "../../../n2-features/f2-modals/modal/GreenModal";
import LearnPage from "../learnPage/LearnPage";
import {Table} from "../common/table/Table";

export const Packs: React.FC = () => {

    //data from redux
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const myId = useSelector<AppRootStateType, string | null>(state => state.profile.userData._id)
    const dispatch = useDispatch()

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

    //table
    const updateCardsPackName = (_id: string) => {
        const name = 'newNameCardsPacksVA'
        dispatch(updateCardsPackTC(_id, name))
    }
    const deleteCardsPack = (id: string) => {
        dispatch(deleteCardsPackTC(id))
    }
    const [showDelModal, setShowDelModal] = useState<boolean>(false);
    const [showLearnModal, setShowLearnModal] = useState<boolean>(false);
    const titles = ["Name", "Cards", "LastUpdate", "Created By", "Actions"]
    const array = []
    if (packs) {
        for (let i = 0; i < packs.length; i++) {
            let arr = []
            arr.push(packs[i].name)
            arr.push(packs[i].cardsCount)
            arr.push(packs[i].updated)
            arr.push(packs[i].user_name)
            arr.push(
                <>
                    {myId === packs[i].user_id
                        ? <>
                            <button onClick={() => setShowDelModal(true)}>Delete</button>
                            {showDelModal && <Modal childrenHeight={220}
                                                    childrenWidth={400}
                                                    onDeleteClick={() => {
                                                        deleteCardsPack(packs[i]._id);
                                                        setShowDelModal(false)
                                                    }}
                                                    onModalClose={() => setShowDelModal(false)}
                                                    type={'info'}
                                                    header={'Delete pack'}
                                                    buttonTitle={'Delete'}
                                                    packName={'Pack name'}/>}
                            <button onClick={() => updateCardsPackName(packs[i]._id)}>Edit</button>
                        </>
                        : ""
                    }
                    <button onClick={() => setShowLearnModal(true)}>Learn</button>
                    {showLearnModal &&
                    <GreenModal onModalClose={() => setShowLearnModal(false)} childrenWidth={500}
                                childrenHeight={500}>
                        <LearnPage cardsPack_id={packs[i]._id}/>
                    </GreenModal>}
                </>)
            array.push(arr)
        }
    }


    const [pagesCount, setPagesCount] = useState<number>(pageCount);

    const pagesOptions = [5, 10, 15, 20, 25]
    const pagesOptionsTags = pagesOptions.map(item => <option value={item} key={item}>{item}</option>)

    //modals
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

    const onPageClickHandler = (newPage: number) => {
        dispatch(onPacksPageClickTC(newPage))
    }

    const onPagesCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setPagesCount(+event.currentTarget.value)
        dispatch(onPortionPacksChangeTC(+event.currentTarget.value))

    }

    const addCardsPack = (name: string) => {
        let cardsPack: Partial<CardsPackCreateType> = {
            name
        }
        dispatch(createCardsPackTC(cardsPack))
    }


    if (!packs) {
        return <Preloader/>
    }

    return (
        <>
            <h3 style={{paddingBottom: '20px'}}>Packs Page</h3>
            <div className={styles.filtersWrapper}>
                <Search setSearch={value => dispatch(setSearchValueAC(value))}/>
                <SuperButton text={'search'}
                             onClick={() => dispatch(getPacksWithFilters())}/>
                <div>
                    <SuperDoubleRange onChangeRange={onChangeRangeHandler}
                                      value={[min, max]}
                                      className={styles.range}/>
                    <p>Choose cards count in pack</p>
                </div>

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
            <button onClick={() => setShowEditModal(true)}>Add</button>
            {showEditModal && <Modal childrenHeight={233}
                                     childrenWidth={400}
                                     onSaveClick={(value) => {
                                         addCardsPack(value);
                                         setShowEditModal(false);
                                     }}
                                     onModalClose={() => setShowEditModal(false)}
                                     type={'input'}
                                     header={'Add new pack'}
                                     buttonTitle={'Save'}
                                     inputTitle={'Name pack'}/>}
            <Table titleColumns={titles} items={array}/>
            <>{/*<table>*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <th>Name</th>*/}
                {/*        <th>Cards Count*/}
                {/*            <button onClick={() => dispatch(sortPackTC('0cardsCount'))}>&#8593;</button>*/}
                {/*            <button onClick={() => dispatch(sortPackTC('1cardsCount'))}>&#8595;</button>*/}
                {/*        </th>*/}
                {/*        <th>Update</th>*/}
                {/*        <th>UserName</th>*/}
                {/*        <th>*/}
                {/*        </th>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    {packs && packs.map(p => {*/}
                {/*        return <Pack key={p._id}*/}
                {/*                     pack={p}*/}
                {/*                     deleteCardsPack={onDeleteCardsPackHandler}*/}
                {/*                     updateCardsPackName={onUpdateCardsPackNameHandler}*/}
                {/*        />*/}
                {/*    })}*/}
                {/*    </tbody>*/}
                {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                {/*</table>*/}</>
        </>
    );
}

