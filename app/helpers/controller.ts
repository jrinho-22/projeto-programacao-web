export const resolveError = (error: any, res: any) => {
    res.status(error.status || 500).send({
        data: [],
        status: 'error',
        errorMessage: error.message || error.msg,
    })
}   