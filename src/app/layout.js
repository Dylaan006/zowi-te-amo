import "./globals.css";

export const metadata = {
  title: "Zowi te amo",
  description: "Una aplicación especial para celebrar el amor con frases aleatorias y un diseño romántico.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
