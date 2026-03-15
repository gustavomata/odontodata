import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OdontoData - Plataforma de Dentistas no Brasil",
  description: "Dados completos sobre cirurgiões-dentistas no Brasil: por especialidade, região e indicadores de cobertura. Fontes: CFO, CNES, IBGE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
