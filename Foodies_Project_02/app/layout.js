import MainHeader from '@/components/main-header/main-header';
import './globals.css';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        // that is layout page
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
