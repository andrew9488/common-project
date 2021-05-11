import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {PackType} from "../../m3-dal/api";
import {fetchPacksTC} from "./packs-reducer";
import {Pack} from "./Pack/Pack";

export const Packs: React.FC = () => {

    const packs = useSelector<AppRootStateType, Array<PackType>>(state => state.packs.cardPacks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPacksTC())
    }, [])

    return (
        <>
            <h3>Packs Page</h3>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Cards Count</th>
                    <th>Update</th>
                    <th>Url</th>
                    <th>
                        <button>Add</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {packs && packs.map(p => {
                    return <Pack key={p._id} pack={p}/>
                })}
                </tbody>
            </table>
        </>);
}