import ProfileSection from '@/components/sections/profile/ProfileSection';
import ProfilePortofolioSection from '@/components/sections/profile/ProfilePortofolioSection';
import UserPetitionSection from '@/components/sections/profile/UserPetitionSection';

export default function ProfilePage() {
  return (
    <main className="bg-slate-200 flex flex-col min-h-screen justify-start gap-5 px-20">
      <div className="my-5 flex w-full justify-center gap-5">
        <ProfileSection />
        <div
          className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] "
          style={{
            scrollbarWidth: 'thin',  // Firefox scrollbar width
            scrollbarColor: '#888 #f1f1f1',  // Firefox scrollbar color
          }}
        >
          <div className="max-w-lg ">
            <UserPetitionSection />
          </div>
        </div>
      </div>
    </main>
  );
}
