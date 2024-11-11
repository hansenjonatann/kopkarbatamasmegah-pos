



export const successResponse = (custommessage : string , customdata: any ,  statusnumber : number    ) => {
    return {
        success: true , 
        message: custommessage ,
        data: customdata , 
        statusCode: statusnumber
    }
}