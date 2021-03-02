export default {
    data:() => ({
        errors : [],
        validationErr : [],
    }),
    methods: {
        errorHandler(errors)
        {
            if(errors.errors)
            {
                this.errors = errors.errors.message;
            }
            if(errors.validation)
            {
                this.validationErr = errors.validation.message;
            }
        }
    }
}
