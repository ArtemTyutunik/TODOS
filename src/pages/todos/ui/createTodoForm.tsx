import React from 'react';
import {useForm,Controller} from "react-hook-form";
import {Box, Button, TextField} from "@mui/material";

const formStyles = {
    border: '1px solid #6e6d6b',
    padding: '15px',
    borderRadius: '5px'
}


const CreateTodoForm = () => {
    const {control, handleSubmit} = useForm()
    const onSubmit = (data: any) => console.log(data)

    return <Box component='form' onSubmit={handleSubmit(onSubmit)} color = {'#515761'}>
        <Box sx={formStyles}>
            <Controller name={'name'}
                        control={control}
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
            <Button variant="outlined" color={"inherit"} sx={{marginRight: '15px'}}>Cancel</Button>
            <Button variant="contained" disabled>
                Add task
            </Button>
        </Box>
    </Box>
}


export default CreateTodoForm;
