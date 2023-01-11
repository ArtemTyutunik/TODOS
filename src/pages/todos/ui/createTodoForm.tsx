import React, {FC} from 'react';

import {Box, Button, TextField} from "@mui/material";
import {useForm,Controller} from "react-hook-form";
import {useDispatch} from "react-redux";

import {ITodo} from "../../../entities/todos/ui/todo";
import {taskNameValidation} from "./validation";
import {addNewTask} from "../../../entities/todos/model/todo";

const formStyles = {
    border: '1px solid #6e6d6b',
    padding: '15px',
    borderRadius: '5px'
}

interface ICreateTodoFormProps {
    onClose: () => void
}


const CreateTodoForm:FC<ICreateTodoFormProps> = ({onClose}) => {
    const {control, handleSubmit, formState: {isValid}} = useForm<ITodo>()
    const dispatch = useDispatch()

    const onSubmit = (data:ITodo) => {
        dispatch(addNewTask(data))
        onClose()
    }

    return <Box component='form' onSubmit={handleSubmit(onSubmit)} color = {'#515761'}>
        <Box sx={formStyles}>
            <Controller name={'label'}
                        control={control}
                        rules={taskNameValidation}
                        render={({ field }) => <TextField variant={"standard"}
                                                          onChange={field.onChange}
                                                          label="Task name"
                                                          fullWidth
                                                          autoFocus
                                                          InputProps={{ disableUnderline: true }}/>}
            />

            <Controller name={'description'}
                        control={control}
                        render={({ field }) => <TextField variant={"standard"}
                                                          onChange={field.onChange}
                                                          label="Description"
                                                          fullWidth
                                                          InputProps={{ disableUnderline: true }}/>}
            />
        </Box>

        <Box display={"flex"} marginTop={'15px'} justifyContent={"flex-end"}>
            <Button variant="outlined" color={"inherit"} sx={{marginRight: '15px'}} onClick={onClose}>Cancel</Button>
            <Button variant="contained" type={'submit'} disabled={!isValid}>
                Add task
            </Button>
        </Box>
    </Box>
}


export default CreateTodoForm;
