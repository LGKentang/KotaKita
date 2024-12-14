import ProfileSection from '@/components/sections/profile/ProfileSection';
import ProfilePortofolioSection from '@/components/sections/profile/ProfilePortofolioSection';

export default function ProfilePage() {
  return (
    <main className="bg-slate-2 flex h-screen justify-center gap-5 bg-slate-200">
      <div className="my-5 flex w-full justify-center">
        <div className="flex w-[40%] justify-center gap-1 p-5 pb-3 pt-2">
          <ProfileSection />
        </div>
        <div className="flex w-[40%] gap-1 bg-white p-5 pb-3 pt-2 shadow-lg">
          <ProfilePortofolioSection />
        </div>
      </div>
    </main>
  );
}
