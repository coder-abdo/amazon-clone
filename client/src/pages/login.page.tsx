import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Cookie from 'js-cookie';
import {
  Divider,
  Form,
  LegalText,
  TextLink,
} from '../components/style/form.style';
import {
  RegisterSubmitButton,
  SubmitButton,
  TextField,
} from '../components/style/input';
import { InputContainer } from '../components/style/input-container.style';
import { Label } from '../components/style/label.style';
import { LoginInputFields } from './types/auth.types';
import { useForm } from 'react-hook-form';
import { ErrText } from '../components/style/error';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../authStore';
export const Login = () => {
  const schema = yup
    .object({
      email: yup.string().email().required('email is required'),
      password: yup
        .string()
        .required('password is required')
        .min(6, 'password must be at least 6 characters'),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputFields>({
    resolver: yupResolver(schema),
  });
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const mutation = useMutation(
    (signin: { email: string; password: string }) => {
      return axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/signin`,
        signin
      );
    }
  );
  if (auth.isAuthenticated) {
    return <Navigate to="/" />;
  }
  const handleLoginForm = handleSubmit((data) => {
    const { email, password } = data;
    mutation.mutate(
      { email, password },
      {
        onSuccess: ({ data }) => {
          Cookie.remove('token');
          Cookie.set('token', data.access_token, {
            sameSite: 'Lax',
            secure: true,
          });
          setAuth({
            ...auth,
            isAuthenticated: true,
            token: data.access_token,
          });
          navigate('/');
        },
      }
    );
  });

  return (
    <div>
      <Form onSubmit={handleLoginForm}>
        <h1>Sign-In</h1>
        <InputContainer>
          <Label htmlFor="email">Email</Label>
          <TextField type="email" {...register('email')} id="email" />
          {errors.email && <ErrText>{errors.email.message}</ErrText>}
        </InputContainer>
        <InputContainer>
          <Label htmlFor="password">Password</Label>
          <TextField
            type="password"
            {...register('password')}
            className={errors.password ? 'error' : ''}
            id="password"
          />
          {errors.password && <ErrText>{errors.password.message}</ErrText>}
        </InputContainer>
        <InputContainer>
          <SubmitButton
            type="submit"
            value="continue"
            isLoading={mutation.isLoading}
          />
        </InputContainer>
        <LegalText style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <span>By continuing, you agree to Amazon's </span>
          <TextLink href="!#">Condition of Use</TextLink>and
          <TextLink href="!#">Privacey Notice</TextLink>
        </LegalText>
      </Form>
      <Divider solid={false} variant="horozintal">
        <h5>New to Amazon?</h5>
      </Divider>
      <Link to="/register">
        <RegisterSubmitButton value="Create your Amazon account" />
      </Link>
    </div>
  );
};
