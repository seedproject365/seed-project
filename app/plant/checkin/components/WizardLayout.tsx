type WizardLayoutProps = {
  children: React.ReactNode;
};

export default function WizardLayout({
  children,
}: WizardLayoutProps) {
  return (
    <main className="min-h-screen bg-[#F8F4EC]">
      <div className="max-w-2xl mx-auto px-5 py-8">
        {children}
      </div>
    </main>
  );
}