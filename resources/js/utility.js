export function gqlError(error)
{
    const errors = error?.graphQLErrors || [];
    const serverErr = !errors.some(err => err.hasOwnProperty('path'));

    let response = {
        errors : null,
        validation : {
            message: null
        }
    }

    if(serverErr)
    {
        response.errors = {message :["somthing went wrong!"]};
    }else{
        if(errors.some(err => err.extensions?.category == "validation"))
        {
            const validationErr = errors.filter(err => err.extensions?.category == "validation")[0].extensions?.validation || [];
            response.validation.message = validationErr;
        }else{
            response.errors = { message : [] }
            errors.map(err => response.errors.message.push(err.message));
        }
    }

    return response;
}
