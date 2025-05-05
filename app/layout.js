import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';

export const metadata = {
  title: 'MenuGenerator',
  description: 'Crea tu menú digital en minutos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
