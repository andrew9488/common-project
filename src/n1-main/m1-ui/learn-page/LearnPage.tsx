import React, {useEffect, useState} from 'react';
import {CardType} from '../../m3-dal/cardsAPI';
import {AppRootStateType} from '../../m2-bll/store';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCardsTC, setCardGradeTC} from '../cards/cards-reducer';
import {getRandomCard} from '../../../n3-utils/u1-error/u2-getRandomCard/getRandomCard';
import SuperRadio from '../common/super-radio/SuperRadio';
import {PackType} from '../../m3-dal/packAPI';
import styles from './LearnPage.module.scss';
import s from "../packs/EditPack/EditPack.module.scss";

type LearnPagePropsType = {
    cardsPack_id: string
    onModalClose: () => void
}

const grades = ["Didn't know", 'Forgot', 'Confused', 'A lot of thought', 'Knew'];

const LearnPage: React.FC<LearnPagePropsType> = (props) => {
    const {cardsPack_id} = props
    const packName = useSelector<AppRootStateType, PackType | undefined>(state => state.packs.cardPacks && state.packs.cardPacks.find(pack => pack._id === cardsPack_id));
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const [grade, setGrade] = useState(grades.indexOf(grades[0]) + 1)
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
            dispatch(fetchCardsTC({cardsPack_id}));
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
        <div className={styles.learnPageContainer}>
            <h3>Learn "{packName?.name}"</h3>
            {!isChecked &&
            <div className={styles.questionBlock}>
                <h4>Question: "{card.question}"</h4>
                <div className={styles.buttonsBlock}>
                    <button className={styles.cancelBtn} onClick={props.onModalClose}>cancel</button>
                    <button className={styles.saveBtn} onClick={checkAnswer}>show answer</button>
                </div>
            </div>
            }
            {isChecked && (
                <div className={styles.answerBlock}>
                    <h4>Question: "{card.question}"</h4>
                    <h4>Answer: "{card.answer}"</h4>
                    <div className={styles.answer}>
                        <h4>Rate yourself: </h4>
                        <SuperRadio name={'radio'}
                                    value={grade}
                                    options={grades}
                                    onChangeOption={setGrade}/>
                    </div>
                    <div className={styles.buttonsBlock}>
                        <button className={styles.cancelBtn} onClick={props.onModalClose}>cancel</button>
                        <button className={styles.saveBtn} onClick={() => onNext(grade, card._id)}>next</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LearnPage;
