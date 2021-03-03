export default {
    data:() => ({
        errors : null,
        validationErr : null,
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
        },
        inputHasErr(input)
        {
            return this.validationErr ? this.validationErr[input] : false
        }
    }
}
