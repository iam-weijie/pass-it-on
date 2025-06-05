import "./globals.css";

export const metadata = {
  title: "PassItOn",
  description: "Pass a note to the next person",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
