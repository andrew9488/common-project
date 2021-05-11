import React, {useEffect, useState} from 'react';
import {v1} from 'uuid';
import styles from './Paginator.module.css';
import SuperButton from '../super-button/SuperButton';

type PaginatorPropsType = {
    totalCount: number
    currentPage: number
    portionSize: number
    pagesPortionSize: number
    onPageClickHandler: (item: number) => void
    className?: string
}

const Paginator: React.FC<PaginatorPropsType> = (props) => {

    const [portionNumber, setPortionNumber] = useState<number>(1);
    const [leftBorder, setLeftBorder] = useState<number>((portionNumber - 1) * props.pagesPortionSize + 1);
    const [rightBorder, setRightBorder] = useState<number>(portionNumber * props.pagesPortionSize);
    const generatePages = () => {
        let tempPages = []
        for (let i = leftBorder; i <= rightBorder; i++) {
            tempPages.push(i);
        }
        return tempPages;
    }
    const [pages, setPages] = useState<Array<number>>(generatePages());

    const pagesCount = Math.ceil(props.totalCount / props.portionSize);


    useEffect(() => {
        let tempPages = [];
        for (let i = leftBorder; i <= rightBorder; i++) {
            tempPages.push(i);
        }
        setPages(tempPages);
    }, [leftBorder, rightBorder])

    const onPageClickHandler = (page: number) => {
        setPortionNumber(page);
        props.onPageClickHandler(page);
    }
    const onNextButtonClick = () => {
        setLeftBorder(leftBorder + 10);
        setRightBorder(rightBorder + 10);
    }
    const onBackButtonClick = () => {
        setLeftBorder(leftBorder - 10);
        setRightBorder(rightBorder - 10);
    }

    return (
        <div className={props.className}>
            {leftBorder !== 1
                ? <SuperButton text={'back'} onClick={onBackButtonClick}/>
                : ''}
            {pages.map(page => <span key={v1()}
                                     className={`${styles.pageDigit} ${page === props.currentPage
                                         ? styles.currentPage
                                         : ''}`}
                                     onClick={() => onPageClickHandler(page)}>{page}</span>)}
            {rightBorder !== pagesCount
                ? <SuperButton text={'next'} onClick={onNextButtonClick}/>
                : ''}
        </div>
    )
}

export default Paginator;