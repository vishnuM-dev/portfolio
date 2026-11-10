import '../index.css';
import '../App.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata = {
  metadataBase: new URL('https://github.com/vishnu-reddy-dev'),
  title: {
    default: 'M. Vishnu Vardhan Reddy | Associate Software Engineer | Java Full Stack Developer',
    template: '%s | M. Vishnu Vardhan Reddy',
  },
  description:
    'Portfolio of M. Vishnu Vardhan Reddy, Associate Software Engineer and Java Full Stack Developer specializing in Java, Spring Boot, REST APIs, MySQL, React.js, and Next.js.',
  keywords: [
    'M. Vishnu Vardhan Reddy',
    'Vishnu Reddy',
    'Java Full Stack Developer',
    'Associate Software Engineer',
    'Spring Boot',
    'React',
    'JavaScript',
    'MySQL',
    'Next.js',
    'Portfolio',
  ],
  authors: [{ name: 'M. Vishnu Vardhan Reddy' }],
  creator: 'M. Vishnu Vardhan Reddy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://github.com/vishnu-reddy-dev',
    title: 'M. Vishnu Vardhan Reddy | Java Full Stack Developer',
    description:
      'Portfolio of M. Vishnu Vardhan Reddy, Associate Software Engineer and Java Full Stack Developer specializing in Java, Spring Boot, REST APIs, React.js, and Next.js.',
    siteName: 'M. Vishnu Vardhan Reddy Portfolio',
    images: [
      {
        url: '/images/profile-vishnu.png',
        width: 800,
        height: 800,
        alt: 'M. Vishnu Vardhan Reddy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M. Vishnu Vardhan Reddy | Java Full Stack Developer',
    description:
      'Portfolio of M. Vishnu Vardhan Reddy, Associate Software Engineer and Java Full Stack Developer specializing in Java, Spring Boot, REST APIs, React.js, and Next.js.',
    images: ['/images/profile-vishnu.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const viewport = {
  themeColor: '#F7F3FC',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
