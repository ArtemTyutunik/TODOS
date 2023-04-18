import React, {FC} from 'react';
import {useForm, useFormState} from 'react-hook-form';
import {Box, Button, Container, CssBaseline, Grid, Link, Typography} from '@mui/material';
import {IFormInputs, IInputsProps} from '@shared/forms/interfaces/interfaces';
import {Link as RouterLink} from 'react-router-dom';
import FormInputs from '@entities/signUpForm/FormInputs';


const SignUpForm:FC<IInputsProps> = ({onSubmit}) => {
  const {handleSubmit, control} = useForm<IFormInputs>({mode: 'onChange'});
  const {isValid} = useFormState({control});
  return (
    <Container component="main" maxWidth="laptop">
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
          <FormInputs control={control}/>
          <Button
            type="submit"
            fullWidth
            disabled={!isValid}
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
              Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link variant="body2" component = {RouterLink} to = '/'>
                {'Have account? Login'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpForm;
