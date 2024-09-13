import React, { ChangeEvent, useState } from 'react';
import { Button, Container, Typography, Box, Link } from '@mui/material';
import FormElement from '../UI/Form/FormElement';
import { register } from '../../features/auth/authSlice';  
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IRegisterState } from '../../interfaces/IRegisterState';
import { useNavigate } from 'react-router-dom';

const initState: IRegisterState = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
};

const RegisterForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector((state) => state.auth);
    const [state, setState] = useState<IRegisterState>(initState);
    const navigate = useNavigate(); 

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (state.password !== state.confirmPassword) {
        return;
      }
      dispatch(register({ email: state.email, username: state.username, password: state.password }))
        .then(() => {
          navigate('/notes')
      });
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component='h1' variant='h5'>Register</Typography>
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <FormElement
                        label='Email'
                        name='email'
                        value={state.email}
                        onChange={inputChangeHandler}
                        required
                        error={error || undefined}
                    />
                    <FormElement
                        label='Username'
                        name='username'
                        value={state.username}
                        onChange={inputChangeHandler}
                        required
                        error={error || undefined}
                    />
                    <FormElement
                        label='Password'
                        name='password'
                        value={state.password}
                        onChange={inputChangeHandler}
                        required
                        error={error || undefined}
                        type='password'
                    />
                    <FormElement
                        label='Confirm Password'
                        name='confirmPassword'
                        value={state.confirmPassword}
                        onChange={inputChangeHandler}
                        required
                        error={state.password !== state.confirmPassword ? 'Passwords do not match' : error || undefined}
                        type='password'
                    />
                    <Button id="register-button" type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={status === 'loading'}>
                        {status === 'loading' ? 'Registering...' : 'Register'}
                    </Button>
                    {error && (
                        <Box sx={{ color: 'error.main' }}>
                            <Typography color='error'>{error}</Typography>
                        </Box>
                    )}
                    <Box mt={2} display={'flex'} justifyContent={'center'}>
                        <Typography variant='body2'>
                            Already have an account?
                            <Link href='/login'> Login</Link>
                        </Typography>
                    </Box>
        </Box>
      </Box>      
    </Container>
  );
};

export default RegisterForm;
