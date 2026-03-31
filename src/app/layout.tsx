import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';

import { Providers } from '@/components/Providers';
import { BASE_PATH } from '@/lib/base-path';

import './globals.css';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'SPM — Publicité mobile Montpellier',
  description:
    'Publicité sur véhicule à Montpellier, Port Marianne, Carnon, Palavas, La Grande-Motte. Formats Rear, Side, Full.',
  icons: {
    icon: [
      { url: `${BASE_PATH}/logo/favicon.ico` },
      {
        url: `${BASE_PATH}/logo/favicon-96x96.png`,
        sizes: '96x96',
        type: 'image/png',
      },
    ],
    apple: [
      { url: `${BASE_PATH}/logo/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: `${BASE_PATH}/logo/site.webmanifest`,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/** Mirrors `ThemeContext` resolution: `spm-theme` → legacy `*-theme` → `prefers-color-scheme`. */
const themeScript = `
(function(){
  var KEY='spm-theme';
  var s=localStorage.getItem(KEY);
  var dark;
  if(s==='dark'){dark=true;}
  else if(s==='light'){dark=false;}
  else{
    var legacy=null;
    for(var i=0;i<localStorage.length;i++){
      var k=localStorage.key(i);
      if(!k||k===KEY)continue;
      if(!k.endsWith('-theme'))continue;
      var v=localStorage.getItem(k);
      if(v==='dark'||v==='light'){legacy=v;break;}
    }
    if(legacy==='dark')dark=true;
    else if(legacy==='light')dark=false;
    else dark=window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  document.documentElement.classList.toggle('dark',!!dark);
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={manrope.variable}>
      <body className="min-h-screen font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
