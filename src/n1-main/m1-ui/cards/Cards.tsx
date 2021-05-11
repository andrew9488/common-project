import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {CardType} from "../../m3-dal/api";
import {fetchCardsTC} from "./cards-reducer";
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

    console.log(props.match.params)

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

export default withRouter(Cards)