import React from 'react';
import { BsInfo } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Divider,
  Form,
  LegalText,
  TextLink,
} from '../components/style/form.style';
import { SubmitButton, TextField } from '../components/style/input';
import { InputContainer } from '../components/style/input-container.style';
import { Label } from '../components/style/label.style';
import { RegisterInputFields } from './types/auth.types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const Register = () => {
  const schema = yup
    .object({
      name: yup.string().required('name is required'),
      email: yup.string().email(),
      password: yup
        .string()
        .required('password is required')
        .min(6, 'password must be at least 6 characters'),
      confirmPassword: yup
        .string()
        .required()
        .oneOf([yup.ref('password')], 'password does not match'),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputFields>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const mutation = useMutation(
    (signup: { name: string; email: string; password: string }) => {
      return axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/signup`,
        signup
      );
    }
  );
  const handleRegisterForm = handleSubmit((data) => {
    const { name, email, password } = data;
    mutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          navigate('/login');
        },
      }
    );
  });

  return (
    <Form onSubmit={handleRegisterForm}>
      <h1>Create account</h1>
      <InputContainer>
        <Label htmlFor="name">Your name</Label>
        <TextField
          type="text"
          placeholder="First and last name"
          id="name"
          {...register('name')}
          className={errors.name?.message ? 'error' : ''}
        />
        <span>{errors.name?.message}</span>
      </InputContainer>
      <InputContainer>
        <Label htmlFor="email">email</Label>
        <TextField
          type="email"
          id="email"
          {...register('email')}
          className={errors.email?.message ? 'error' : ''}
        />
        <span>{errors.email?.message}</span>
      </InputContainer>
      <InputContainer>
        <Label htmlFor="password">Password</Label>
        <TextField
          type="password"
          placeholder="At least 6 characters"
          id="password"
          {...register('password')}
          className={errors.password?.message ? 'error' : ''}
        />
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '5px',
            fontSize: '12px',
          }}
        >
          <BsInfo style={{ color: '#00f', fontSize: '18px' }} /> Passwords must
          be at least 6 characters.
        </span>
        <span>{errors.password?.message}</span>
      </InputContainer>
      <InputContainer>
        <Label htmlFor="confirmPassword">Re-enter password</Label>
        <TextField
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
          className={errors.confirmPassword?.message ? 'error' : ''}
        />
        <span>{errors.confirmPassword?.message}</span>
      </InputContainer>
      <InputContainer>
        <SubmitButton
          type="submit"
          value="continue"
          isLoading={mutation.isLoading}
        />
      </InputContainer>
      <LegalText>
        <span>By creating an account, you agree to Amazon's</span>
        <span>
          <TextLink href="!#">Condition of Use</TextLink>and
          <TextLink href="!#">Privacey Notice</TextLink>
        </span>
      </LegalText>
      <Divider solid />
      <p>
        Already have an account?
        <Link to="/login" style={{ marginLeft: '5px' }}>
          <TextLink>Sign-in</TextLink>
        </Link>
      </p>
    </Form>
  );
};
