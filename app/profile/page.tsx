import { AnimatedBackground } from "../components/AnimatedBackground";

export default function ProfilePage() {
  return (
    <>
      <AnimatedBackground />
      <main className="relative z-10 min-h-screen bg-transparent flex items-center justify-center pb-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#5C4033] mb-4">👤 Profile</h1>
          <p className="text-lg text-[#5C4033]">Your profile will appear here</p>
        </div>
      </main>
    </>
  );
}
