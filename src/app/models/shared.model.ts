/*====== SHARED MODELS ======*/
/* Includes all DTO class models which do not belong to a single object and are repeated across the backend for API consistency*/

export interface PageResponseModel<T> {
    content: T[],
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    size: number
    totalElements: number
    totalPages: number
}