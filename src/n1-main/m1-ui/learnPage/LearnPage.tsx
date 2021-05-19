import React, {useEffect, useState} from "react";
import {CardType} from "../../m3-dal/cardsAPI";
import {AppRootStateType} from "../../m2-bll/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchCardsTC, setCardGradeTC} from "../cards/cards-reducer";
import {NavLink, RouteComponentProps, withRouter} from "react-router-dom";
import {PATH} from "../routes/Routes";
import {getRandomCard} from "../../../n3-utils/u1-error/u2-getRandomCard/getRandomCard";
import SuperRadio from "../common/super-radio/SuperRadio";

type PathParamsType = {
    cardsPack_id: string
}
type PropsType = RouteComponentProps<PathParamsType>

const grades = ['Did not know', 'Forgot', 'Confused', 'A lot of thought', 'Knew'];

const LearnPage: React.FC<PropsType> = (props) => {

    const cardsPack_id = props.match.params.cardsPack_id
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const [grade, setGrade] = useState(grades.indexOf(grades[0])+1)
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
        if (cards && cards.length > 0) setCard(getRandomCard(cards));
        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, cardsPack_id, cards, first]);

    const onNext = (grade: number, id: string) => {
        setIsChecked(false);
        dispatch(setCardGradeTC(grade, id))
        if (cards && cards.length > 0) {
            setCard(getRandomCard(cards));
        }
    }

    const checkAnswer = () => {
        setIsChecked(true)
    }

    console.log(grade)

    return (
        <div>
            LearnPage
            {!isChecked &&
            <>
                <div>{card.question}</div>
                <div>
                    <NavLink to={PATH.PACKS}>cancel</NavLink>
                    <button onClick={checkAnswer}>show answer</button>
                </div>
            </>}
            {isChecked && (
                <>
                    <div>{card.question}</div>
                    <div>{card.answer}</div>
                    <SuperRadio name={"radio"}
                                value={grade}
                                options={grades}
                                onChangeOption={setGrade}/>
                    <div>
                        <NavLink to={PATH.PACKS}>cancel</NavLink>
                        <button onClick={() => onNext(grade, card._id)}>next</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default withRouter(LearnPage)
