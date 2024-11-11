export const failResponse = (custommessge?: string | 'Internal Server Error' , error?: any  , statusnumber?: number | 500 ) => {
    return {
        success: false , 
        message: custommessge , 
        error ,
        statusCode: statusnumber
    }
}