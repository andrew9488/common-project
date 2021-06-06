import React, {ChangeEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import styles from './Search.module.css';


type SearchPropsType = {
    setSearch: (value: string) => void
}

const Search: React.FC<SearchPropsType> = (props) => {
    // useEffect(() => {
    //     packsAPI.fetchPack().then(response => console.log(response))
    // }, [])


    const search = useSelector<AppRootStateType, string>(state => state.filter.search)

    const [searchValue, setSearchValue] = useState(search);
    const [timeoutId, setTimeoutId] = useState<number>();

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.currentTarget.value;
        setSearchValue(value);
        props.setSearch(value)
        //
        // clearTimeout(timeoutId);
        //
        // let id = window.setTimeout(() => {
        //     props.setSearch(value)
        // }, 1000)
        //
        // setTimeoutId(id);
    }

    return (
        <div className={styles.searchDiv}>
            <input type="text"
                   placeholder={'search...'}
                   onChange={onSearchChange}
                   value={searchValue}
                   className={styles.searchInput}/>
        </div>
    )
}

export default Search;