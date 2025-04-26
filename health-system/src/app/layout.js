import './globals.css';
import LayoutWrapper from '../components/layoutWrapper';

export const metadata = {
    title: 'Health System'
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
