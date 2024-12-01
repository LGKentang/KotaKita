'use client';
import Image from 'next/image';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';

const LOGO_SIZE = 240 as const;

type AuthFormProps = {
  isLogin: boolean;
};

const AuthForm = ({ isLogin }: AuthFormProps) => {
  return (
    <div className="grid h-screen w-screen bg-white md:grid-cols-2">
      <div className="relative hidden md:block">
        <Image
          src="/assets/city.jpg"
          alt="city"
          className="object-cover"
          fill
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/assets/logo-kotakita.svg"
          alt="logo"
          width={LOGO_SIZE}
          height={LOGO_SIZE}
        />
        <form className="flex w-full max-w-lg flex-col justify-between gap-4 px-5 py-8">
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="username">
              Username
            </label>
            <Input id="username" type="text" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <Input id="password" type="password" />
          </div>
          {!isLogin ? (
            <div className="animation-pulse flex flex-col transition-all duration-200">
              <label htmlFor="fullname" className="mb-1">
                Fullname
              </label>
              <Input id="fullname" type="text" />
            </div>
          ) : (
            ''
          )}
          <Button
            type="submit"
            className="mt-4 border-2 border-black shadow-md hover:border-white hover:shadow-md"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
