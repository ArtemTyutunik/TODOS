import React, {FC} from 'react';

import {useForm, useFormState, Controller} from 'react-hook-form';
import {Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from '@mui/material';

import {IFormInputs, IInputsProps} from '@shared/forms/interfaces/interfaces';
import {loginValidation, passwordValidation} from '@shared/forms/validation/validation';
import {Link as RouterLink} from 'react-router-dom';


const SignUpForm:FC<IInputsProps> = ({onSubmit}) => {
  const {handleSubmit, control} = useForm<IFormInputs>({mode: 'onChange'});
  const {errors, isValid} = useFormState({control});
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
          Sign up
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
          <Controller
            control={control}
            name={'login'}
            rules={loginValidation}
            render={({field}) => <TextField
              onChange={field.onChange}
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              type = "email"
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
            render={({field}) => <TextField
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
          <Button
            type="submit"
            fullWidth
            disabled={!isValid}
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
              Sign Up
          </Button>
        </Box>
        <Grid container>
          <Grid item>
            <Link variant="body2" component = {RouterLink} to = '/'>
              {'Have account? Login'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SignUpForm;
