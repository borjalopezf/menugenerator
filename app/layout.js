import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'MenuGenerator',
  description: 'Crea tu menú digital en minutos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ClientLayoutWrapper>
          <Toaster position="top-center" />
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
