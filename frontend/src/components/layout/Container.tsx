interface LayoutContainerProps {
  children: React.ReactNode;
}

export function LayoutContainer({ children }: LayoutContainerProps) {
  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {children}
    </main>
  );
}
