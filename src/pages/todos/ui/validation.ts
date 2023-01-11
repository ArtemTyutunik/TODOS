export const taskNameValidation = {
    required: 'required',
    validate: (value: string) => {
        if(value == '') {
            return 'Cannot be empty'
        }

        return true;
    }
};