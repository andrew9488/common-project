import {instance} from './api';

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

//type for get packs
export type FetchPacksPayloadType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}

//type for post
export type CardsPackCreateType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}


export const packsAPI = {
    fetchPacks(data: FetchPacksPayloadType) {
        return instance.get<ResponsePackType>(`cards/pack?`,
            {params: {...data}})
            .then(response => response.data)
    },
    createPack(cardsPack: Partial<CardsPackCreateType>) {
        return instance.post(`cards/pack`, {cardsPack})
            .then(response => response.data)
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
            .then(response => response.data)
    },
    updatePack(_id: string, name ?: string) {
        return instance.put(`cards/pack`, {cardsPack: {_id, name}})
            .then(response => response.data)
    }
}