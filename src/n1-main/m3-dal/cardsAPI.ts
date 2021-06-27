import {instance} from './api';

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: 0
    _id: string
}
export type ResponseCardType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
//type for get
export type FetchCardsPayloadType = {
    cardsPack_id?: string
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortPack?: string
    page?: number
    pageCount?: number
}
//type for post
export type CardCreateType = {
    cardsPack_id?: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    rating?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    type?: string
}
type SetGradeResponseType = {
    updatedGrade: {
        _id: string
        cardsPack_id: string
        card_id: string
        user_id: string
        grade: number
        shots: number
    }
}
export const cardsAPI = {
    fetchCards(data: FetchCardsPayloadType) {
        return instance.get<ResponseCardType>(`cards/card?`,
            {params: {...data}})
            .then(response => response.data)
    },
    createCard(card: Partial<CardCreateType>) {
        return instance.post(`cards/card`, {card})
            .then(response => response.data)
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`)
            .then(response => {
                return response.data
            })
    },
    updateCard(_id: string, question?: string, answer?: string) {
        return instance.put(`cards/card`, {card: {_id, question, answer}})
            .then(response => response.data)
    },
    setCardGrade(grade: number, card_id: string) {
        return instance.put<SetGradeResponseType>(`cards/grade`, {grade, card_id})
    }
}