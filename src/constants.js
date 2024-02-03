export const initialFilter = {
  tab: 'font_download',
  sortBy: 'popularity',
  subset: 'all',
  query: '',
  stroke: '',
  classification: '',
  category: '',
  categories: ['serif', 'sans-serif', 'display', 'handwriting', 'monospace'],
  preview_text: '',
  preview_size: '40',
  vfonly: '',
  coloronly: '',
  stylecount: 1,
}

export const preview_size = [
  { label: '8', value: '8' },
  { label: '12', value: '12' },
  { label: '14', value: '14' },
  { label: '20', value: '20' },
  { label: '24', value: '24' },
  { label: '32', value: '32' },
  { label: '40', value: '40' },
  { label: '64', value: '64' },
  { label: '96', value: '96' },
  { label: '120', value: '120' },
  { label: '184', value: '184' },
  { label: '200', value: '200' },
]

export const vfonly = [{ label: 'Variable', value: 'true' }]

export const coloronly = [{ label: 'Color', value: 'true' }]

export const category = [
  { label: 'Serif', value: 'serif' },
  { label: 'Sans Serif', value: 'sans-serif' },
  { label: 'Display', value: 'display' },
  { label: 'Handwriting', value: 'handwriting' },
  { label: 'Monospace', value: 'monospace' },
]

export const stroke = [
  { label: 'Serif', value: 'serif' },
  // { label: 'Slab Serif', value: 'Slab-Serif' },
  { label: 'Sans Serif', value: 'sans-serif' },
]

export const classification = [
  { label: 'Display', value: 'display' },
  { label: 'Handwriting', value: 'handwriting' },
  { label: 'Monospace', value: 'monospace' },
  // { label: 'Not text', value: 'Symbols' },
]

export const subset = [
  { label: 'All languages', value: 'all' },
  { label: 'Arabic', value: 'arabic' },
  { label: 'Bengali', value: 'bengali' },
  { label: 'Chinese (Hong Kong)', value: 'chinese-hongkong' },
  { label: 'Chinese (Simplified)', value: 'hinese-simplified' },
  { label: 'Chinese (Traditional)', value: 'chinese-traditional' },
  { label: 'Cyrillic', value: 'cyrillic' },
  { label: 'Cyrillic Extended', value: 'cyrillic-ext' },
  { label: 'Devanagari', value: 'devanagari' },
  { label: 'Greek', value: 'greek' },
  { label: 'Greek Extended', value: 'greek-ext' },
  { label: 'Gujarati', value: 'gujarati' },
  { label: 'Gurmukhi', value: 'gurmukhi' },
  { label: 'Hebrew', value: 'hebrew' },
  { label: 'Japanese', value: 'japanese' },
  { label: 'Kannada', value: 'kannada' },
  { label: 'Khmer', value: 'khmer' },
  { label: 'Korean', value: 'korean' },
  { label: 'Latin', value: 'latin' },
  { label: 'Latin Extended', value: 'latin-ext' },
  { label: 'Malayalam', value: 'malayalam' },
  { label: 'Myanmar', value: 'myanmar' },
  { label: 'Oriya', value: 'oriya' },
  { label: 'Sinhala', value: 'sinhala' },
  { label: 'Tamil', value: 'tamil' },
  { label: 'Telugu', value: 'telugu' },
  { label: 'Thai', value: 'thai' },
  { label: 'Tibetan', value: 'tibetan' },
  { label: 'Vietnamese', value: 'vietnamese' },
]

export const sortBy = [
  { label: 'Name', value: 'family' },
  { label: 'Last Modified', value: 'lastModified' },
  { label: 'Trending', value: 'popularity' },
  { label: 'Style', value: 'category' },
]

export const variants = [
  { label: 'Regular', value: 'regular' },
  { label: 'Italic', value: 'italic' },
  { label: '500', value: '500' },
  { label: '600', value: '600' },
  { label: '700', value: '700' },
  { label: '800', value: '800' },
  { label: '100', value: '100' },
  { label: '200', value: '200' },
  { label: '300', value: '300' },
  { label: '900', value: '900' },
  { label: 'Italic 100', value: '100italic' },
  { label: 'Italic 200', value: '200italic' },
  { label: 'Italic 300', value: '300italic' },
  { label: 'Italic 500', value: '500italic' },
  { label: 'Italic 600', value: '600italic' },
  { label: 'Italic 700', value: '700italic' },
  { label: 'Italic 800', value: '800italic' },
  { label: 'Italic 900', value: '900italic' },
]

export const preview_type = {
  sentence: 'Whereas recognition of the inherent dignity',
  paragraph:
    'Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance. Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers. Everyone has the right to rest and leisure, including reasonable limitation of working hours and periodic holidays with pay.',
  custom:
    'abcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKLMNOPQRSTUVWXYZ\noO08 iIlL1 {} [] g9qCGQ ~-+=>',
}

const constants = {
  initialFilter,
  preview_size,
  vfonly,
  coloronly,
  category,
  stroke,
  classification,
  subset,
  sortBy,
  variants,
  preview_type,
}

export default constants
