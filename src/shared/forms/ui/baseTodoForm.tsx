import React, {FC} from "react";

import {Controller, useForm} from "react-hook-form";
import {Box, Button, TextField} from "@mui/material";
import {taskNameValidation} from "../../../pages/todos/ui/validation";
import {IBaseFormInputsValues} from "../interfaces/interfaces";
import {ITodo} from "../../interfaces";



interface IBaseTodoFormProps {
    onClose: () => void,
    onSubmit: (data: IBaseFormInputsValues) => void,
    todo?: ITodo
}

//if todo is not undefined it means that the field values will be the corresponding todo properties

const formStyles = {
    border: '1px solid #6e6d6b',
    padding: '15px',
    borderRadius: '5px'
}

const BaseTodoForm:FC<IBaseTodoFormProps> = ({onClose, onSubmit, todo}) => {
    const {control, handleSubmit, formState: {isValid}} = useForm<IBaseFormInputsValues>()

    return <Box component='form' onSubmit={handleSubmit(onSubmit)} color = {'#515761'}>
        <Box sx={formStyles}>
            <Controller name={'label'}
                        control={control}
                        rules={taskNameValidation}
                        render={({ field }) => <TextField variant={"standard"}
                                                          defaultValue={todo?.label}
                                                          onChange={field.onChange}
                                                          label="Task name"
                                                          fullWidth
                                                          autoFocus
                                                          InputProps={{ disableUnderline: true }}/>}
            />

            <Controller name={'description'}
                        control={control}
                        render={({ field }) => <TextField variant={"standard"}
                                                          defaultValue={todo?.description}
                                                          onChange={field.onChange}
                                                          label="Description"
                                                          fullWidth
                                                          InputProps={{ disableUnderline: true }}/>}
            />
        </Box>

        <Box display={"flex"} marginTop={'15px'} justifyContent={"flex-end"}>
            <Button variant="outlined" color={"inherit"}
                    sx={{marginRight: '15px',
                        textTransform: 'initial'}}
                    onClick={onClose}>
                Cancel
            </Button>
            <Button variant="contained" type={'submit'} disabled={!isValid} sx={{textTransform: 'initial'}}>
                Submit
            </Button>
        </Box>
    </Box>
}

export default BaseTodoForm;