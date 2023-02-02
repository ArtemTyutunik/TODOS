const REQUIRED_FIELD = 'Required';

export const loginValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(!value.match(/[a-zA-Z]/)) {
            return 'Only latin alphabet allowed '
        }

        return true;
    }
};

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value: string) => {
        if(value.length < 8) {
            return 'Password has to be not less than 8 symbols'
        }

        return true;
    }
};

export const taskNameValidation = {
    required: 'required',
    validate: (value: string) => {
        if(!value.replace(/^\s+|\s+$/g, '').length) {
            return 'Cannot be empty'
        }

        return true;
    }
};