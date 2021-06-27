import React, {ChangeEvent, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../m2-bll/store';
import styles from './Search.module.scss';


type SearchPropsType = {
    setSearch: (value: string) => void
}

const Search: React.FC<SearchPropsType> = (props) => {

    const search = useSelector<AppRootStateType, string>(state => state.filter.search)
    const [searchValue, setSearchValue] = useState(search);

    useEffect(() => {
        const timeoutId = setTimeout(() => props.setSearch(searchValue), 500)
        return () => clearTimeout(timeoutId)
    }, [props.setSearch, searchValue])


    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        let value = event.currentTarget.value;
        setSearchValue(value);
    }

    return (
        <div className={styles.searchDiv}>
            <input type="text"
                   placeholder={'Search...'}
                   onChange={onSearchChange}
                   value={searchValue}
                   className={styles.searchInput}/>
        </div>
    )
}

export default Search;