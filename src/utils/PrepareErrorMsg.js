export const PrepareErrorMsg = (error) => {
    if(error instanceof Error) {
        return error.message
    }

    if(typeof error === 'object' && error !== null) {
        return JSON.stringify(error);
    }

    return String(error);
}

export function parseError(error, rlogId) {
    if(typeof error !== 'object' || error === null || Object.keys(error).length === 0) {
        throw new Error("Invalid Response! rlogId: " + rlogId);
    }

    if('errors' in error) {
        if(Array.isArray(error.errors) && error.errors.length > 0 && (error.errors[0].message || error.errors[0].longMessage)) {
            const err = new Error((parseErrorFromJson(error.errors[0].longMessage) || error.errors[0].message ) + 'rlogId: ' + rlogId);
            err.details = error.errors;
            throw err;
        }
    }

    if('errorDataList' in error) {
        if(Array.isArray(error.errorDataList) && error.errorDataList.length  > 0){
            const firstError = error.errorDataList[0];
            if(firstError.message || firstError.longMessage) {
                const err = new Error((firstError.longMessage || firstError.message) + '.rlogId: ' + rlogId,)

                err.details = error.errorMessage.error;
                throw err;
            }
        }
    }
    if('Errors' in error && typeof error.Errors == 'object') {
        const err = new Error((error.Errors.ShortMessage || error.Errors.LongMessage) + '. rlogId: ' + rlogId);
        err.details = error. Errors;
        throw err;
    }
    throw new Error('Something went wrong! rlogId: ' + rlogId);
}

export function parseErrorFromSuccessfullResponse(error, rlogId) {

}

export function parseErrorFromJson(error) {
    
}