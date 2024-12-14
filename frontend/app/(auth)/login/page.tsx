import { redirect } from 'next/navigation';
import AuthForm from '@/components/auth/Form';
import Link from 'next/link';
export default function Form({
  searchParams,
}: {
  searchParams: { tab: string };
}) {
  const tab = searchParams.tab ?? '1';
  if (!['0', '1'].includes(tab)) return redirect('/login');

  const defaultDesign =
    'px-4 py-2 text-black transition-all duration-400 hover:border-b-2 hover:border-black';
  const designChange =
    'px-4 py-2 text-black transition-all duration-400 border-b-2 border-black';

  return (
    <div>
      <div className="absolute right-0 z-10 mr-5 mt-2 flex justify-between gap-5 pt-2">
        <Link
          href={{
            pathname: '/login',
            query: { tab: '1' },
          }}
        >
          <button className={`${tab === '1' ? designChange : defaultDesign}`}>
            Login
          </button>
        </Link>
        <Link
          href={{
            pathname: '/login',
            query: {
              tab: '0',
            },
          }}
        >
          <button className={`${tab === '0' ? designChange : defaultDesign}`}>
            Register
          </button>
        </Link>
      </div>
      <AuthForm isLogin={tab == '1'} />
    </div>
  );
}
