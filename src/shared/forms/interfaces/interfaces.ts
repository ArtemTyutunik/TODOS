export interface IInputsProps {
    onSubmit: (data:IFormInputs) => void,
    isPending?: boolean,
    isSuccess?: boolean,
}

export interface IFormInputs {
    login: string,
    password: string
}

export interface BaseFormInputs {
    label: string,
    description?: string
}
