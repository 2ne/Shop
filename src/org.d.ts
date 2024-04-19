export interface OrgColours {
  primary: string;
  primary_text: string;
  secondary: string;
  secondary_text: string;
  interactive: string;
}

export interface OrgBanners {
  img: string;
  title: string;
  description?: string;
  link: string;
}

export interface OrgTiles {
  img: string;
  title: string;
  link: string;
}

export enum Colour {
  red = "red",
  orange = "orange",
  amber = "amber",
  yellow = "yellow",
  lime = "lime",
  green = "green",
  emerald = "emerald",
  teal = "teal",
  cyan = "cyan",
  sky = "sky",
  blue = "blue",
  indigo = "indigo",
  violet = "violet",
  purple = "purple",
  fuchsia = "fuchsia",
  pink = "pink",
  rose = "rose",
  stone = "stone",
}

export interface Event {
  img?: string;
  hideImage?: boolean;
  title: string;
  description?: string;
  link: string;
  address: string;
  startTime: string;
  endTime: string;
  price: string;
  colour?: Colour;
  productColour?: Colour;
  productGroup?: string;
}

export interface OrgEvents {
  [key: string]: Event[];
}

export interface OrgClassEvents {
  [key: string]: Event[];
}

export const orgName: string;
export const orgLogo: string;
export const orgColours: OrgColours;
export const orgBanners: OrgBanners[];
export const orgTiles: OrgTiles[];
export const orgEvents: OrgEvents;
export const orgClassEvents: OrgClassEvents;
