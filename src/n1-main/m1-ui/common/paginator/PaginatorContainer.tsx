import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {onPacksPageClickTC, onPortionPacksChangeTC} from "../../Search/filter-reducer";
import Paginator from "./Paginator";

type PaginatorContainerPropsType = {
    page: number
    pageCount: number
    cardPacksTotalCount: number
}
export const PaginatorContainer: React.FC<PaginatorContainerPropsType> = (props) => {

    const dispatch = useDispatch();
    const [pagesCount, setPagesCount] = useState<number>(props.pageCount);
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
        <>
            <Paginator totalCount={props.cardPacksTotalCount}
                       currentPage={props.page}
                       portionSize={props.pageCount}
                       pagesPortionSize={10}
                       onPageClickHandler={onPageClickHandler}/>
            <select name="pagesCountSelect"
                    id="pagesCountSelect"
                    value={pagesCount}
                    onChange={onPagesCountChangeHandler}>
                {pagesOptionsTags}
            </select>
        </>
    )
}