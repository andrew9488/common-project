import React, {useMemo} from "react";
import {useDispatch} from "react-redux";
import {deleteCardsPackTC, updateCardsPackTC} from "../../packs/packs-reducer";
import {NavLink} from "react-router-dom";
import {PATH} from "../../routes/Routes";
import CellWithButtons from "./CellWithButtons";
import {Table} from "./Table";

type TableContainerPropsType = {
    id: string | null
    items: any[]
}
export const TableContainer: React.FC<TableContainerPropsType> = ({id, items}) => {

    const dispatch = useDispatch();

    // callbacks for actions with packs
    const deleteCardsPack = (id: string) => {
        dispatch(deleteCardsPackTC(id))
    }
    const updateCardsPackName = (_id: string, packName: string) => {
        dispatch(updateCardsPackTC(_id, packName))
    }

    //data for table with packs
    const titles = useMemo(() => ['Name', 'Cards', 'LastUpdate', 'Created By', 'Actions'], []);
    const myPacks = useMemo(() => {
        return items ? items.filter(p => p.user_id === id) : []
    }, [items])

    const array = [];

    if (myPacks) {
        for (let i = 0; i < myPacks.length; i++) {
            let arr = []
            arr.push(<NavLink to={`${PATH.CARDS}/`+myPacks[i]._id}> {myPacks[i].name}</NavLink>)
            arr.push(myPacks[i].cardsCount)
            arr.push(myPacks[i].updated.slice(0, -14))
            arr.push(myPacks[i].user_name)
            arr.push(
                <CellWithButtons deleteCardsPack={deleteCardsPack}
                                 updateCardsPackName={updateCardsPackName}
                                 packId={myPacks[i]._id}/>
            )
            array.push(arr)
        }
    }

    return (
        <Table titleColumns={titles} items={array}/>
    )
}