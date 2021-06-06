import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {onPacksPageClickTC, onPortionPacksChangeTC} from '../../search/filter-reducer';
import Paginator from './Paginator';
import {AppRootStateType} from '../../../m2-bll/store';
import styles from './PaginatorContainer.module.scss';

type PaginatorContainerPropsType = {}

export const PaginatorContainer: React.FC<PaginatorContainerPropsType> = (props) => {

    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<AppRootStateType, number>(state => state.packs.page)
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount)
    const dispatch = useDispatch();

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

    return (
        <div className={styles.wrapper}>
            <Paginator totalCount={cardPacksTotalCount}
                       currentPage={page}
                       portionSize={pageCount}
                       pagesPortionSize={10}
                       onPageClickHandler={onPageClickHandler}/>
            <div className={styles.selectWrapper}>
                Show
                <select name="pagesCountSelect"
                        id="pagesCountSelect"
                        value={pagesCount}
                        onChange={onPagesCountChangeHandler}>
                    {pagesOptionsTags}
                </select>
                Cards per page
            </div>
        </div>
    )
}