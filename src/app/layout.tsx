import { Inter, Roboto_Mono, Lora, Playfair_Display, Montserrat, Poppins, Saira, Mulish, Roboto, Jost, Quicksand, Karla, Solway, Arvo, Berkshire_Swash, Itim, Bellota, Aldrich, Palanquin_Dark, Comic_Neue, Source_Sans_3, Spectral, Open_Sans, Lato, Oswald, PT_Sans, Merriweather, Ubuntu, Nunito, Fira_Sans, Crimson_Text, Libre_Baskerville, Work_Sans, Caveat, Pacifico } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const roboto_mono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const playfair_display = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair-display' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-poppins' });
const saira = Saira({ subsets: ['latin'], variable: '--font-saira' });
const mulish = Mulish({ subsets: ['latin'], variable: '--font-mulish' });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto' });
const jost = Jost({ subsets: ['latin'], variable: '--font-jost' });
const quicksand = Quicksand({ subsets: ['latin'], variable: '--font-quicksand' });
const karla = Karla({ subsets: ['latin'], variable: '--font-karla' });
const solway = Solway({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-solway' });
const arvo = Arvo({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-arvo' });
const berkshire_swash = Berkshire_Swash({ subsets: ['latin'], weight: ['400'], variable: '--font-berkshire-swash' });
const itim = Itim({ subsets: ['latin'], weight: ['400'], variable: '--font-itim' });
const bellota = Bellota({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-bellota' });
const aldrich = Aldrich({ subsets: ['latin'], weight: ['400'], variable: '--font-aldrich' });
const palanquin_dark = Palanquin_Dark({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-palanquin-dark' });
const comic_neue = Comic_Neue({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-comic-neue' });
const source_sans_3 = Source_Sans_3({ subsets: ['latin'], variable: '--font-source-sans-3' });
const spectral = Spectral({ subsets: ['latin'], weight: ['400'], variable: '--font-spectral' });
const open_sans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-lato' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });
const pt_sans = PT_Sans({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-pt-sans' });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-merriweather' });
const ubuntu = Ubuntu({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-ubuntu' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });
const fira_sans = Fira_Sans({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-fira-sans' });
const crimson_text = Crimson_Text({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-crimson-text' });
const libre_baskerville = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-libre-baskerville' });
const work_sans = Work_Sans({ subsets: ['latin'], variable: '--font-work-sans' });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' });
const pacifico = Pacifico({ subsets: ['latin'], weight: ['400'], variable: '--font-pacifico' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roboto_mono.variable} ${lora.variable} ${playfair_display.variable} ${montserrat.variable} ${poppins.variable} ${saira.variable} ${mulish.variable} ${roboto.variable} ${jost.variable} ${quicksand.variable} ${karla.variable} ${solway.variable} ${arvo.variable} ${berkshire_swash.variable} ${itim.variable} ${bellota.variable} ${aldrich.variable} ${palanquin_dark.variable} ${comic_neue.variable} ${source_sans_3.variable} ${spectral.variable} ${open_sans.variable} ${lato.variable} ${oswald.variable} ${pt_sans.variable} ${merriweather.variable} ${ubuntu.variable} ${nunito.variable} ${fira_sans.variable} ${crimson_text.variable} ${libre_baskerville.variable} ${work_sans.variable} ${caveat.variable} ${pacifico.variable}`}>
        {children}
      </body>
    </html>
  );
}