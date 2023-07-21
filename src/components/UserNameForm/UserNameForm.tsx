'use client';
import { customToast } from '@/hooks/toast/customToast';
import { UsernameValidator } from '@/lib/validators/username';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Buttons } from '../Buttons/Buttons';
import Input from '../UI/TextInput/Input';
import './UserNameForm.scss';
interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, 'id' | 'username'>;
}

type FormData = z.infer<typeof UsernameValidator>;

const UserNameForm = ({ user, className, ...props }: UserNameFormProps) => {
  const router = useRouter();
  const [name, setName] = useState('');
  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async () => {
      const payload = { name: name };
      const { data } = await axios.patch(`/api/username/`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return customToast.warning('Username already taken. Please choose another username.');
        }
      }

      return customToast.error('Something went wrong. Your username was not updated. Please try again.');
    },
    onSuccess: () => {
      customToast.success('Your username has been updated.');
      router.refresh();
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUsername();
  };
  return (
    <form className="username-form" action="" onSubmit={(e) => handleSubmit(e)} {...props}>
      <p className="title">
        Your Current Username : <b>{user.username}</b>
      </p>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Please enter a display name you are comfortable with."
        label="u/"
      />
      <div className="buttons">
        <Buttons.general isPrimary isLoading={isLoading} content="Change username" />
        <Buttons.general onClick={() => router.back()} content="Cancel" />
      </div>
    </form>
  );
};

export default UserNameForm;
