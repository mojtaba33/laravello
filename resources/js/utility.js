import {store} from './store';
import {router} from './routes';
export function gqlError(error)
{
    const errors = error?.graphQLErrors || [];
    const serverErr = !errors.some(err => err.hasOwnProperty('path'));
    const authorization = errors.some(err => err?.extensions?.category === "authorization")

    if(error?.networkError && error?.networkError.statusCode === 419)
    {
        store.dispatch("auth/logout");
        router.push({name:'login'});
        return;
    }

    if(authorization)
    {
        router.push({name:'not-found'});
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

export const colorMap100 = {
    orange: "bg-yellow-400",
    gray: "bg-gray-100",
    yellow: "bg-yellow-100",
    purple: "bg-purple-100",
    red: "bg-red-100",
    green: "bg-green-100",
    blue: "bg-blue-100",
    indigo: "bg-indigo-100",
    pink: "bg-pink-100"
  };

  export const colorMap200 = {
    orange: "bg-yellow-500",
    gray: "bg-gray-200",
    yellow: "bg-yellow-200",
    purple: "bg-purple-200",
    red: "bg-red-200",
    green: "bg-green-200",
    blue: "bg-blue-200",
    indigo: "bg-indigo-200",
    pink: "bg-pink-200"
  };



