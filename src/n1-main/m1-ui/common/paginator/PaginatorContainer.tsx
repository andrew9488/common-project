import React, {ChangeEvent, useState} from 'react';
import Paginator from './Paginator';
import styles from './PaginatorContainer.module.scss';

type PaginatorContainerPropsType = {
    pageClickHandler: (page: number, count: number) => void
    pagesCountChange: (page: number) => void
    page: number
    pageCount: number
    totalCount: number
}

export const PaginatorContainer: React.FC<PaginatorContainerPropsType> = (props) => {

    const [pagesCount, setPagesCount] = useState<number>(props.pageCount);

    const pagesOptions = [4, 8, 10]
    const pagesOptionsTags = pagesOptions.map(item => <option value={item} key={item}>{item}</option>)

    const onPageClickHandler = (newPage: number) => {
        props.pageClickHandler(newPage, pagesCount)
    }

    const onPagesCountChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setPagesCount(+event.currentTarget.value)
        props.pagesCountChange(+event.currentTarget.value)
    }

    return (
        <div className={styles.wrapper}>
            <Paginator totalCount={props.totalCount}
                       currentPage={props.page}
                       portionSize={pagesCount}
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