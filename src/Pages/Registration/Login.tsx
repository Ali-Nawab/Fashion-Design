import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import apis from "../../utils/apis"
import { useNavigate } from "react-router-dom"
import Spinner from "./Spinner"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/features/User/UserSlice"

const StyledFormContainer = styled('div')({
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: 'linear-gradient(to bottom right, #3b82f6, #4f46e5)',
  opacity: 0.9,
  backdropFilter: 'blur(5px)',
});

const StyledForm = styled('form')({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  width: '500px',
  padding: '24px',
  animation: 'slideIn 0.3s ease-out',
  '@keyframes slideIn': {
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
});

const StyledTextField = styled(TextField)({
  marginBottom: '16px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
});

const StyledButton = styled(Button)({
  borderRadius: '8px',
  fontWeight: 'bold',
  textTransform: 'none',
  padding: '10px 20px',
  marginTop: '16px',
});

const loginSchema = z.object({
  email: z.string().min(5, 'Invalid Email Address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginSchemaData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchemaData) => {

    console.log(data);

    setLoading(true);
    try{
      const response = await fetch(apis().login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      setLoading(false);

      console.log(result);
  
      if(!response.ok) {
        toast.dismiss();
        toast.error(result.message);
      }
  
      if(result.status) {
        toast.dismiss();
        localStorage.setItem("jwt-token", result?.token)
        dispatch(setUser({
          user_id: result.user_id,
          name: result.name,
          email: result.email,
          imageURL: result.imageURL
        }))
        toast.success(result.message);
        navigate('/')
      }
  
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
      console.error(error);
    }
  };

  return (
    <StyledFormContainer>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Login</h2>
        </div>
        <div style={{ marginTop: '24px' }}>
          <StyledTextField
            {...register('email')}
            variant="outlined"
            fullWidth
            label="Email"
            InputLabelProps={{ style: { color: '#666' } }}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <StyledTextField
            {...register('password')}
            variant="outlined"
            fullWidth
            label="Password"
            type="password"
            InputLabelProps={{ style: { color: '#666' } }}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </div>
        <p
          style={{
            textAlign: 'right',
            color: '#3b82f6',
            textDecoration: 'underline',
            cursor: 'pointer',
            marginTop: '8px',
          }}
        >
          <Link to="/forgetpassword">Forgot Password?</Link>
        </p>
        {
          !loading ? (
            <StyledButton
          variant="contained"
          type="submit"
          fullWidth
          style={{ backgroundColor: '#3b82f6', color: '#fff' }}
        >
          Login
        </StyledButton>
          ) : (
            <StyledButton
          variant="contained"
          type="submit"
          fullWidth
          style={{ backgroundColor: '#3b82f6', color: '#fff', display: 'flex' }}
        >
          Please Wait... <Spinner />
        </StyledButton>
          )
        }
        <div style={{ textAlign: 'center', marginTop: '16px', color: '#666' }}>
          Don't have an account?{' '}
          <Link to="/register">
            <span style={{ color: '#3b82f6', cursor: 'pointer' }}>Sign Up</span>
          </Link>
        </div>
      </StyledForm>
    </StyledFormContainer>
  );
};

export default Login;