import React, {useContext} from 'react';
import {IDate, Priority} from '@shared/interfaces';
import {SelectChangeEvent} from '@mui/material';

export interface IFormContext {
    todoDate: IDate,
    setTodoDate: (newDate: IDate) => void,
    priority: Priority | undefined,
    setPriority: (event: SelectChangeEvent<Priority>) => void,
    Label: string | undefined,
    setLabel: React.Dispatch<React.SetStateAction<string | undefined>>
}

const FormContext = React.createContext<IFormContext>(null!)

interface Props {
    values: IFormContext,
    children: React.ReactElement
}

const BaseFormContext = ({values, children}: Props) => {
  return <FormContext.Provider value={values}>
    {children}
  </FormContext.Provider>
};

export const useFormContext = () => useContext(FormContext)

export default BaseFormContext;
