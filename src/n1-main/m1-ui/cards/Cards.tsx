import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {CardCreateType, CardType} from "../../m3-dal/api";
import {createCardTC, deleteCardTC, fetchCardsTC, updateCardTC} from "./cards-reducer";
import {Card} from "./Card/Card";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    cardsPack_id: string
}
type PropsType = RouteComponentProps<PathParamsType>

const Cards: React.FC<PropsType> = (props) => {

    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCardsTC(props.match.params.cardsPack_id))
    }, [])

    const onAddCardHandler = () => {
        const card = {
            cardsPack_id: props.match.params.cardsPack_id,
            question: "What is CSS?",
            answer: "CascadingStyleSheet",
        } as Partial<CardCreateType>
        dispatch(createCardTC(card))
    }

    const onDeleteCardHandler = (id: string) => {
        dispatch(deleteCardTC(id))
    }
    const onUpdateCardHandler = (id: string) => {
        const newQuestion = "new question for card"
        dispatch(updateCardTC(id, newQuestion))
    }

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
                    <th>Rating</th>
                    <th>
                        <button onClick={onAddCardHandler}>Add</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {cards && cards.map(c => {
                    return <Card key={c._id} card={c}
                                 deleteCard={onDeleteCardHandler}
                                 updateCard={onUpdateCardHandler}
                    />
                })}
                </tbody>
            </table>
        </>);
}

export default withRouter(Cards)