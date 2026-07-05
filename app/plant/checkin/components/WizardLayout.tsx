type WizardLayoutProps = {
  children: React.ReactNode;
};

export default function WizardLayout({
  children,
}: WizardLayoutProps) {
  return (
    <main className="min-h-screen bg-[#F8F4EC] px-3 py-6 sm:px-4 sm:py-8 pb-24 sm:pb-32 overflow-x-hidden">
      <div className="w-full max-w-2xl mx-auto">
        {children}
      </div>
    </main>
  );
}