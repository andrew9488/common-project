import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

//types
type LoginResponseType = {
    _id: string
    email: string
    rememberMe: boolean,
    isAdmin: boolean,
    name: string
    verified: boolean,
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: string
    tokenDeathTime: number
    avatar: string
    error?: string
}

type RegisterResponseType = {
    error?: string
    email?: string
    in?: string
    isEmailValid?: boolean
    isPassValid?: boolean
    emailRegExp?: {},
    passwordRegExp?: string
    addedUser: AddedUserType
}

type ChangeProfileResponseType = {
    updatedUser: LoginResponseType
    error?: string
    token: string
    tokenDeathTime: number
}

//не поняла, почему его не надо типизировать, если он приходит...
type AddedUserType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
}

const forgotMessage = `<div style="font-size: 1.2em; font-family: Calibri,sans-serif">For password recovery click: <a href='http://localhost:3000/#/enter_new_password$token$'>here</a></div>`


export const API = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe})
            .then(response => response.data)
    },
    register(email: string, password: string,) {
        return instance.post<RegisterResponseType>('auth/register', {email, password})
            .then(response => response.data)
    },
    authMe() {
        return instance.post<LoginResponseType>('auth/me', {})
            .then(response => response.data)
    },
    changeProfile(name?: string, avatar?: string) {
        return instance.put<ChangeProfileResponseType>('auth/me', {name, avatar})
            .then(response => response.data.updatedUser)
    },
    logout() {
        return instance.delete<{ info: string, error?: string }>('auth/me')
            .then(response => response.data)
    },
    forgotPassword(email: string, from: string = 'test-front-dev <shishkina_veronika_10@mail.ru>', message: string = forgotMessage) {
        return instance.post<{ info: string, error?: string }>('auth/forgot', {email, from, message})
            .then(response => response.data)
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<{ info: string, error?: string }>('auth/set-new-password', {password, resetPasswordToken})
            .then(response => response.data)
    }
}

export type PackType = {
    _id: string, user_id: string, user_name: string, private: boolean, name: string, path: string,
    grade: number, shots: number, deckCover: string, cardsCount: number,
    type: string, rating: number, created: string, updated: string, more_id: string,
    __v: number
}

export type ResponsePackType = {
    cardPacks: Array<PackType>
    page: number
    pageCount: number
    cardPacksTotalCount: number,
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

//type for get
export type QueryPacksType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
}
const defaultsQueryPacks: QueryPacksType = {
    packName: "", min: 5, max: 9, sortPacks: "0updated", page: 1, pageCount: 5, user_id: ""
}

//type for post
type CardsPackCreateType = {
    name: string
    path: string
    grade: number
    shots: number
    rating: number
    deckCover: string
    privatePack: boolean
    type: string
}

const defaultsCardsPack = {
    cardsPack: {
        name: "no name",
        path: "",
        type: "",
        deckCover: "",
        grade: 0,
        privatePack: false,
        rating: 0,
        shots: 0
    } as CardsPackCreateType
}

export type DefaultsCardsPackType = typeof defaultsCardsPack

export const packsAPI = {
    fetchPacks(queryObj: Partial<QueryPacksType>) {
        let query: string[] = [];
        (Object.keys(defaultsQueryPacks) as (keyof QueryPacksType)[]).forEach((key: keyof QueryPacksType) => {
            if (queryObj[key]) {
                query.push(`${key}=${queryObj[key]}`);
                return;
            }
            query.push(`${key}=${defaultsQueryPacks[key]}`);
        })
        return instance.get<ResponsePackType>(`cards/pack?${query.join("&")}`)
            .then(response => response.data)
    },
    createPack(defaultsCardsPack: DefaultsCardsPackType) {
        return instance.post(`cards/pack`, defaultsCardsPack)
            .then(response => response.data)
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
            .then(response => response.data)
    },
    updatePack(_id: string, name: string = "new name") {
        return instance.put(`cards/pack`, {_id, name})
            .then(response => response.data)
    }
}

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
type QueryCardsType = {
    cardsPack_id: string
    cardAnswer: string
    cardQuestion: string
    min: number
    max: number
    sortPack: string
    page: number
    pageCount: number
}
const defaultsQueryCards: QueryCardsType = {
    cardsPack_id: "",
    cardAnswer: "",
    cardQuestion: "",
    sortPack: "0grade",
    min: 1,
    max: 4,
    page: 1,
    pageCount: 7
}

//type for post
type CardCreateType = {
    cardsPack_id: string
    question: string
    answer: string
    grade: number
    shots: number
    rating: number
    answerImg: string
    questionImg: string
    questionVideo: string
    answerVideo: string
    type: string
}

const defaultsCard = {
    card: {
        cardsPack_id: "",
        question: "no question",
        answer: "no answer",
        grade: 0,
        shots: 0,
        rating: 0,
        answerImg: "",
        questionImg: "",
        questionVideo: "",
        answerVideo: "",
        type: "card"
    } as CardCreateType
}

type DefaultsCardType = typeof defaultsCard

export const cardsAPI = {
    fetchCards(queryObj: Partial<QueryCardsType>) {
        let query: string[] = [];
        (Object.keys(defaultsQueryCards) as (keyof QueryCardsType)[]).forEach((key: keyof QueryCardsType) => {
            if (queryObj[key]) {
                query.push(`${key}=${queryObj[key]}`);
                return;
            }
            query.push(`${key}=${defaultsQueryCards[key]}`);
        })
        return instance.get<ResponseCardType>(`cards/card?${query.join("&")}`)
            .then(response => response.data)
    },
    createCard(defaultsCard: DefaultsCardType) {
        return instance.post(`cards/card`, defaultsCard.card)
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`)
            .then(response => response.data)
    },
    updateCard(_id: string, question: string = "new question", comments: string = "new comments") {
        return instance.put(`cards/card?id`, {_id, question, comments})
            .then(response => response.data)
    }
}