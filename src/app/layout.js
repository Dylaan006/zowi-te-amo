import "./globals.css";

export const metadata = {
  title: "Zowi te amo",
  description: "Una aplicación especial para celebrar el amor con frases aleatorias y un diseño romántico.",
  manifest: "/manifest.json",
  themeColor: "#ff4d6d",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Zowi te amo",
  },
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
