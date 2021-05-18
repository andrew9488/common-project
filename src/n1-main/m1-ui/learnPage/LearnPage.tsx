import React, {useEffect, useState} from "react";
import {CardType} from "../../m3-dal/cardsAPI";
import {AppRootStateType} from "../../m2-bll/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchCardsTC} from "../cards/cards-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

type PathParamsType = {
    cardsPack_id: string
}
type PropsType = RouteComponentProps<PathParamsType>

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: Array<CardType>) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const LearnPage: React.FC<PropsType> = (props) => {

    const cardsPack_id = props.match.params.cardsPack_id
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards);

    const [card, setCard] = useState<CardType>({
        _id: 'fake',
        cardsPack_id: '',

        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,

        type: '',
        rating: 0,
        user_id: '',
        __v: 0,

        created: '',
        updated: '',
    });

    const dispatch = useDispatch();
    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first) {
            dispatch(fetchCardsTC(cardsPack_id));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards && cards.length > 0) setCard(getCard(cards));
        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, cardsPack_id, cards, first]);

    const onNext = () => {
        setIsChecked(false);

        if (cards && cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }
    }

    return (
        <div>
            LearnPage

            <div>{card.question}</div>
            <div>
                <button onClick={() => setIsChecked(true)}>check</button>
            </div>

            {isChecked && (
                <>
                    <div>{card.answer}</div>

                    {grades.map((g, i) => (
                        <button key={'grade-' + i} onClick={() => {
                        }}>{g}</button>
                    ))}

                    <div>
                        <button onClick={onNext}>next</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default withRouter(LearnPage)
