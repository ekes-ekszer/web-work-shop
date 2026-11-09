import type { ImageMetadata } from 'astro';

import cta from '../assets/ekes/cta.png';
import hero from '../assets/ekes/hero.png';
import bag from '../assets/ekes/bag.svg';
import search from '../assets/ekes/search.svg';
import valueBold from '../assets/ekes/value-bold.svg';
import valueCare from '../assets/ekes/value-care.svg';
import valueHeritage from '../assets/ekes/value-heritage.svg';

const source = (asset: ImageMetadata) => asset.src;

export const media = {
  navigation: {
    bag: source(bag),
    search: source(search),
  },
  story: {
    hero: source(hero),
    cta: source(cta),
    values: {
      heritage: source(valueHeritage),
      bold: source(valueBold),
      care: source(valueCare),
    },
  },
} as const;
