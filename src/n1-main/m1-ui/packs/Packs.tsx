import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import {createCardsPackTC} from './packs-reducer';
import {getPacksWithFilters, setSearchValueAC} from '../Search/filter-reducer';
import Search from '../Search/Search';
import SuperButton from '../common/super-button/SuperButton';
import styles from './Packs.module.scss';
import {Preloader} from '../common/preloader/Preloader';
import {CardsPackCreateType, PackType} from '../../m3-dal/packAPI';
import Modal from '../../../n2-features/f2-modals/modal/Modal';
import {TableContainer} from "../common/table/TableContainer";
import {PaginatorContainer} from "../common/paginator/PaginatorContainer";
import {SuperDoubleRangeContainer} from "../common/super-double-range/SuperDoubleRangeContainer";

export const Packs: React.FC = () => {

    //data from redux
    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const myId = useSelector<AppRootStateType, string | null>(state => state.profile.userData._id)
    const minRedux = useSelector<AppRootStateType, number>(state => state.filter.min);
    const maxRedux = useSelector<AppRootStateType, number>(state => state.filter.max);
    const dispatch = useDispatch()

    const [id, setId] = useState<null | string>(null)

    //modals
    const [showEditModal, setShowEditModal] = useState<boolean>(false);

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
        <div className={styles.packsContainer}>
            <div className={styles.filtersBlock}>
                <div>
                    <h3>Show packs cards</h3>
                    <div className={styles.buttonsBlock}>
                        <button onClick={() => setId(myId)}>My</button>
                        <button onClick={() => setId(null)}>All</button>
                    </div>
                </div>
                <div>
                    <h3>Number of cards</h3>
                    <div className={styles.range}>
                        <SuperDoubleRangeContainer min={minRedux} max={maxRedux}/>
                    </div>
                </div>
            </div>
            <div className={styles.packsBlock}>
                <h3>Packs list</h3>
                <div className={styles.searchBlock}>
                    <div className={styles.search}>
                        <Search setSearch={value => dispatch(setSearchValueAC(value))}/>
                    </div>
                    <div className={styles.button}>
                        <SuperButton text={'search'} onClick={() => dispatch(getPacksWithFilters())}/>
                        <SuperButton text={'add'} onClick={() => setShowEditModal(true)}/>
                    </div>
                </div>
                <TableContainer items={packs} id={id}/>
                <div>
                    <PaginatorContainer page={page} pageCount={pageCount} cardPacksTotalCount={cardPacksTotalCount}/>
                </div>
            </div>
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
        </div>
    );
}

