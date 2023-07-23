import * as React from 'react';
import {useContext, createContext} from 'react';
import {IDate, Priority, tagIdType} from '@shared/interfacesAndTypes';
import {SelectChangeEvent} from '@mui/material';

export interface IFormContext {
    todoDate: IDate,
    setTodoDate: (newDate: IDate) => void,
    priority: Priority | undefined,
    setPriority: (event: SelectChangeEvent<Priority>) => void,
    todoTags: tagIdType[],
    onSelectTag: (newTag: string) => void
}

const FormContext = createContext<IFormContext>(null!)

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
