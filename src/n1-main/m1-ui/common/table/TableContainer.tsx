import React from "react";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {PATH} from "../../routes/Routes";
import CellWithButtons from "./CellWithButtons";
import {Table} from "./Table";
import {AppRootStateType} from "../../../m2-bll/store";
import {PackType} from "../../../m3-dal/packAPI";
import {CardType} from "../../../m3-dal/cardsAPI";

type TableContainerPropsType = {
    type: "pack" | "card"
    packs?: PackType[]
    cards?: CardType[]
    titles: string[]
    deleteCallback: (id: string) => void
    updateCardsPackCallback?: (id: string, packName: string) => void
    updateCardCallback?: (id: string, question: string, answer: string) => void
}
export const TableContainer: React.FC<TableContainerPropsType> = (props) => {

    const myId = useSelector<AppRootStateType, string | null>(state => state.profile.userData._id)

    const updateCardsPackName = (id: string, packName: string) => {
        props.updateCardsPackCallback && props.updateCardsPackCallback(id, packName)
    }
    const updateCard = (id: string, question: string, answer: string) => {
        props.updateCardCallback && props.updateCardCallback(id, question, answer)
    }

    const array = [];

    if (props.packs) {
        for (let i = 0; i < props.packs.length; i++) {
            let arr = []
            arr.push(<NavLink to={`${PATH.CARDS}/` + props.packs[i]._id}> {props.packs[i].name}</NavLink>)
            arr.push(props.packs[i].cardsCount)
            arr.push(props.packs[i].updated.slice(0, -14))
            arr.push(props.packs[i].user_name)
            arr.push(
                <CellWithButtons deleteCardsPack={props.deleteCallback}
                                 updateCardsPackName={updateCardsPackName}
                                 id={props.packs[i]._id}
                                 isOwn={props.packs[i].user_id === myId}
                                 type="pack"/>
            )
            array.push(arr)
        }
    }
    if (props.cards) {
        for (let i = 0; i < props.cards.length; i++) {
            let arr = []
            arr.push(props.cards[i].question.length > 30 ? props.cards[i].question.slice(0, 30) + "..." : props.cards[i].question)
            arr.push(props.cards[i].answer.length > 68 ? props.cards[i].answer.slice(0, 68) + "..." : props.cards[i].answer)
            arr.push(props.cards[i].updated.slice(0, -14))
            arr.push(props.cards[i].grade)
            arr.push(
                <CellWithButtons deleteCardsPack={props.deleteCallback}
                                 updateCard={updateCard}
                                 id={props.cards[i]._id}
                                 isOwn={props.cards[i].user_id === myId}
                                 type="card"/>
            )
            array.push(arr)
        }
    }

    return (
        <Table titleColumns={props.titles} items={array}/>
    )
}