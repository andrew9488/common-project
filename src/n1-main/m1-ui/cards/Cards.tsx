import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {CardType} from "../../m3-dal/api";
import {Pack} from "../packs/Pack/Pack";
import {fetchCardsTC} from "./cards-reducer";
import {Card} from "./Card/Card";

export const Cards: React.FC = () => {

    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCardsTC())
    }, [])

    return (
        <>
            <h3>Cards Page</h3>
            <table>
                <thead>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Grade</th>
                    <th>Update</th>
                    <th>Url</th>
                    <th>
                        <button>Add</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {cards && cards.map(c => {
                    return <Card key={c._id} card={c}/>
                })}
                </tbody>
            </table>
        </>);
}