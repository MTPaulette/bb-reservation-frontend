
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        ceci est le authentification layout
        {children}
      </div>
  );
}
