import React from "react";
import {CardType} from "../../../m3-dal/api";

type CardPropsType = {
    card: CardType
}

export const Card: React.FC<CardPropsType> = (props) => {
    return (
        <>
            <tr>
                <td>{props.card.question}</td>
                <td>{props.card.answer}</td>
                <td>{props.card.grade}</td>
                <td>{props.card.updated}</td>
                <td>{props.card.type}</td>
            </tr>
        </>
    );
}