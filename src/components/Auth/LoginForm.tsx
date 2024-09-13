import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Container, Typography, Box, Link } from '@mui/material';
import FormElement from '../UI/Form/FormElement';
import { login } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ILoginState } from '../../interfaces/ILoginState';
import { useNavigate } from 'react-router-dom';
  
const initState: ILoginState = {  
    email: "",
    password: "",
};

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector((state) => state.auth);
    const [state, setState] = useState<ILoginState>(initState);

    const token = useAppSelector((state) => state.auth.token);
    const navigate = useNavigate(); 

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(login({ email: state.email, password: state.password }))
    };

    useEffect(() => {
        if (token) {
            navigate('/notes');
        }
    }, [token, navigate]);

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
                <Typography component='h1' variant='h5'>Sign In</Typography>
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
                        label='Password'
                        name='password'
                        value={state.password}
                        onChange={inputChangeHandler}
                        required
                        error={error || undefined} 
                        type='password'
                    />
                    <Button id="sign-in-button" type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} disabled={status === 'loading'}>
                        {status === 'loading' ? 'Signing in...' : 'Sign In'}
                    </Button>
                    {error && (
                        <Box sx={{ color: 'error.main' }}>
                            <Typography color='error'>{error}</Typography>
                        </Box>
                    )}
                    <Box mt={2} display={'flex'} justifyContent={'center'}>
                        <Typography variant='body2'>
                            Don't have an account?
                            <Link href='/register'>register</Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;
