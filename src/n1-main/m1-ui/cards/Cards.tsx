import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store";
import {createCardTC, deleteCardTC, fetchCardsTC, updateCardTC} from "./cards-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {CardCreateType, CardType} from '../../m3-dal/cardsAPI';
import Search from "../search/Search";
import {getPacksWithFilters, setSearchValueAC} from "../search/filter-reducer";
import {TableContainer} from "../common/table/TableContainer";
import SuperButton from "../common/super-button/SuperButton";
import GreenModal from "../../../n2-features/f2-modals/modal/GreenModal";
import {EditCard} from "./EditCard/EditCard";
import styles from "./Cards.module.scss"
import {PaginatorContainer} from "../common/paginator/PaginatorContainer";

type PathParamsType = {
    cardsPack_id: string
}
type PropsType = RouteComponentProps<PathParamsType>

const Cards: React.FC<PropsType> = (props) => {

    const myId = useSelector<AppRootStateType, string | null>(state => state.profile.userData._id)
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
    const dispatch = useDispatch()

    const [showAddModal, setShowAddModal] = useState<boolean>(false)
    const closeEditModal = () => {
        setShowAddModal(false)
    }

    useEffect(() => {
        dispatch(fetchCardsTC(props.match.params.cardsPack_id))
    }, [dispatch, props.match.params.cardsPack_id])


    const titles = useMemo(() => {
        if (cards[0].user_id === myId) {
            return ['Question', 'Answer', 'LastUpdate', 'Grade', 'Actions']
        } else {
            return ['Question', 'Answer', 'LastUpdate', 'Grade']
        }
    }, [cards, myId]);

    const addCard = (id: string, question: string, answer: string) => {
        const card: Partial<CardCreateType> = {
            cardsPack_id: id,
            question: question,
            answer: answer,
        }
        dispatch(createCardTC(card))
    }

    const deleteCard = (id: string) => {
        dispatch(deleteCardTC(id))
    }

    const updateCard = (id: string, question: string, answer: string) => {
        dispatch(updateCardTC(id, question, answer))
    }

    return (
        <div className={styles.cardsContainer}>
            <h3>Cards Page</h3>
            <div className={styles.searchBlock}>
                <div className={styles.search}>
                    <Search setSearch={value => dispatch(setSearchValueAC(value))}/>
                </div>
                <div className={styles.buttonsBlock}>
                    <SuperButton text="search" onClick={() => dispatch(getPacksWithFilters())}/>
                    <SuperButton text="add card" onClick={() => {
                        setShowAddModal(true)
                    }}/>
                </div>
            </div>
            <TableContainer type="card"
                            titles={titles}
                            deleteCallback={deleteCard}
                            cards={cards}
                            updateCardCallback={updateCard}
            />
            <div>
                <PaginatorContainer/>
            </div>
            {showAddModal &&
            <GreenModal onModalClose={() => setShowAddModal(false)} childrenWidth={413}
                        childrenHeight={540}>
                <EditCard closeEditModal={closeEditModal} cardId={props.match.params.cardsPack_id}
                          updatePack={addCard}/>
            </GreenModal>}
        </div>);
}

export default withRouter(Cards)