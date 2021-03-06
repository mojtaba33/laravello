import {store} from './store';
import {router} from './routes';
export function gqlError(error)
{
    const errors = error?.graphQLErrors || [];
    const serverErr = !errors.some(err => err.hasOwnProperty('path'));

    if(error?.networkError && error?.networkError.statusCode === 419)
    {
        store.dispatch("auth/logout");
        router.push({name:'login'});
        return;
    }

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

export const colorMap500 = {
    orange: "bg-yellow-600",
    gray: "bg-gray-500",
    yellow: "bg-yellow-400",
    purple: "bg-purple-500",
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
    pink: "bg-pink-500"
};



