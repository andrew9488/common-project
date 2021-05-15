import React from "react";
import {CardType} from "../../../m3-dal/api";

type CardPropsType = {
    card: CardType
    deleteCard: (id: string) => void
    updateCard: (id: string) => void
}

export const Card: React.FC<CardPropsType> = (props) => {
    return (
        <>
            <tr>
                <td>{props.card.question}</td>
                <td>{props.card.answer}</td>
                <td>{props.card.grade}</td>
                <td>{props.card.updated}</td>
                <td>{props.card.rating}</td>
                <td>
                <button onClick={() => props.deleteCard(props.card._id)}>del</button>
                <button onClick={() => props.updateCard(props.card._id)}>update</button>
            </td>
            </tr>
        </>
    );
}