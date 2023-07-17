import * as translations from './translations';

export type Lang = keyof typeof translations;
export type Text = keyof typeof translations[Lang];
export type Texts = typeof translations[Lang][Text];
