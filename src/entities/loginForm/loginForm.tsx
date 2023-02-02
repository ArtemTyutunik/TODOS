import React from 'react';
import {Controller, useForm, useFormState} from "react-hook-form";
import {Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';

import {loginValidation, passwordValidation} from "../../shared/forms/validation/validation";
import {IFormInputs, IInputsProps} from "../../shared/forms/interfaces/interfaces";
import ErrorMessage from "./ui/ErrorMessage";


function LoginForm({onSubmit}: IInputsProps) {
    const {handleSubmit, control} = useForm<IFormInputs>();
    const {errors,isValid} = useFormState({control});

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                    <Controller
                        control={control}
                        name={"login"}
                        rules={loginValidation}
                        render={({ field }) => <TextField
                            onChange={field.onChange}
                            margin="normal"
                            required
                            fullWidth
                            label="Login"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={ !!errors?.login?.message }
                            helperText={ errors?.login?.message }
                        />}
                    />
                    <Controller
                        control={control}
                        name={'password'}
                        rules = {passwordValidation}
                        render={({ field }) => <TextField
                            onChange={field.onChange}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={ !!errors?.password?.message }
                            helperText={ errors?.password?.message }
                        />}
                    />

                    <ErrorMessage/>

                    <Button
                        type="submit"
                        fullWidth
                        disabled={!isValid}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link variant="body2" component = {RouterLink} to = 'sign-up'>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>

    );
}

export default LoginForm;