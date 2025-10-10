export interface BaseReturn<T> {
    data: T
    status: "success" | 'error'
    errorMessage?: string
    redirect?: string
}
