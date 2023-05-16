export interface IInputsProps {
    onSubmit: (data:IFormInputs) => void
}

export interface IFormInputs {
    login: string,
    password: string
}

export interface BaseFormInputs {
    label: string,
    description?: string
}
