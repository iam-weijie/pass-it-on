import "./globals.css";

export const metadata = {
  title: "PassItOn",
  description: "Send and receive anonymous thoughts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
