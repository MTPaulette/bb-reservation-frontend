import "@/styles/globals.css";
import "@/styles/fullcalendar-style.css";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return children;
}
