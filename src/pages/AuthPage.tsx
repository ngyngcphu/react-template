import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { EnvelopeIcon, KeyIcon } from '@heroicons/react/24/outline';
import { authService } from '@services';
import { useUserStore } from '@states';

export function AuthPage() {
  const { register, handleSubmit } = useForm<LoginFormData>();

  const { getUserData } = useUserStore();

  const submit = (data: LoginFormData) => {
    authService
      .login(data)
      .then(() => {
        getUserData();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <Card color='transparent' shadow={false}>
      <Typography variant='h4' color='blue-gray'>
        Login
      </Typography>
      <Typography color='gray' className='mt-1 font-normal'>
        Enter your email and password.
      </Typography>
      <form className='mt-8 mb-2 w-72 md:w-80 max-w-screen-lg' onSubmit={handleSubmit(submit)}>
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            id='auth-email'
            size='lg'
            label='Email'
            icon={<EnvelopeIcon />}
            {...register('email', {
              required: true,
              minLength: 5
            })}
            type='email'
            crossOrigin=''
          />
          <Input
            id='auth-password'
            type='password'
            size='lg'
            icon={<KeyIcon />}
            label='Password'
            {...register('password', {
              required: true,
              minLength: 8
            })}
            crossOrigin=''
          />
        </div>

        <Button className='mt-6 bg-blue-500' fullWidth type='submit'>
          Login
        </Button>
      </form>
    </Card>
  );
}
