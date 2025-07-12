// app/layout.tsx (Versión de prueba sin next/font)
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Prueba de Renderizado</title>
      </head>
      <body>{children}</body>
    </html>
  );
}