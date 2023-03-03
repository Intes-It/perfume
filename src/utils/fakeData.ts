import { MemberComment, Product } from '@types';

export const productPrice = [
  { name: '0€ — 10€', value: '0-10' },
  { name: '11€ — 20€', value: '11-20' },
  { name: '21€ — 50€', value: '21-50' },
];
export const productFilter = [
  { name: 'Trier Par...', value: '' },
  { name: 'Alphabétique (A à Z)', value: 'alpha-asc' },
  { name: 'Alphabétique (Z à A)', value: 'alpha-desc' },
  { name: 'Prix Croissant', value: 'price-asc' },
  { name: 'Prix Décroissant', value: 'price-desc' },
  { name: "Nombres D'avis", value: 'evaluate' },
];
export const colourOptions = [
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'forest', label: 'Forest' },
  { value: 'slate', label: 'Slate' },
  { value: 'silver', label: 'Silver' },
];

export const totalProducts: Product[] = [
  {
    id: '12',
    category: 'cosmetics',
    subCategory: 'solid-deodorant',
    image: 'https://naturefeerique.fr/wp-content/uploads/2022/03/deodorant-plume.jpg',
    title: 'Déodorant Plume',
    price: '14,50',
    vote: '100',
    score: 5,
    check: false,
    numberOfReviewers: 10,
    shortDescription: 'Le carré démaquillant est un accessoire zéro déchet indispensable.',
    description:
      'Le Carré démaquillant coton bio/bambou est idéal pour nettoyer le visage en douceur. \n Sa face micro-polaire ultra douce en viscose de bambou permet un nettoyage en douceur. \n Le tissu micro-éponge viscose de bambou a des propriétés naturelles antibactériennes, il est donc parfaitement adapté pour les peaux sensibles des enfants et des adultes.',
  },
  {
    id: 'demaquillant-cocoon',
    category: 'cosmetics',
    subCategory: 'solid-face-cleanser',
    image: 'https://naturefeerique.fr/wp-content/uploads/2022/03/demaquillant-cocoon-1.jpg',
    title: 'Démaquillant Cocoon',
    price: '15,50',
    vote: '100',
    score: 4,
    check: false,
    numberOfReviewers: 10,
    shortDescription: 'Le carré démaquillant est un accessoire zéro déchet indispensable.',
    description:
      'Le Carré démaquillant coton bio/bambou est idéal pour nettoyer le visage en douceur. \n Sa face micro-polaire ultra douce en viscose de bambou permet un nettoyage en douceur. \n Le tissu micro-éponge viscose de bambou a des propriétés naturelles antibactériennes, il est donc parfaitement adapté pour les peaux sensibles des enfants et des adultes.',
  },
  {
    id: 'perles-demaquillantes',
    category: 'cosmetics',
    subCategory: 'solid-face-cleanser',
    image: 'https://naturefeerique.fr/wp-content/uploads/2022/03/perles-demaquillantes-1.jpg',
    title: 'Perles démaquillantes',
    price: '9,50',
    vote: '100',
    score: 3,
    check: false,
    numberOfReviewers: 10,
    shortDescription: 'Le carré démaquillant est un accessoire zéro déchet indispensable.',
    description:
      'Le Carré démaquillant coton bio/bambou est idéal pour nettoyer le visage en douceur. \n Sa face micro-polaire ultra douce en viscose de bambou permet un nettoyage en douceur. \n Le tissu micro-éponge viscose de bambou a des propriétés naturelles antibactériennes, il est donc parfaitement adapté pour les peaux sensibles des enfants et des adultes.',
  },
  {
    id: 'perles-de-soin',
    category: 'cosmetics',
    subCategory: 'solid-balm',
    image: 'https://naturefeerique.fr/wp-content/uploads/2022/03/perles-de-soin-2.jpg',
    title: 'Perles de soin',
    price: '11,90',
    vote: '100',
    score: 2,
    check: false,
    numberOfReviewers: 10,
    shortDescription: 'Le carré démaquillant est un accessoire zéro déchet indispensable.',
    description:
      'Le Carré démaquillant coton bio/bambou est idéal pour nettoyer le visage en douceur.\n  Sa face micro-polaire ultra douce en viscose de bambou permet un nettoyage en douceur.\n Le tissu micro-éponge viscose de bambou a des propriétés naturelles antibactériennes, il est donc parfaitement adapté pour les peaux sensibles des enfants et des adultes.',
  },
  {
    id: 'soin-precieux',
    category: 'cosmetics',
    subCategory: 'solid-balm',
    image: 'https://naturefeerique.fr/wp-content/uploads/2022/03/soin-precieux.jpg',
    title: 'Soin Précieux',
    price: '17,90',
    vote: '100',
    score: 5,
    check: false,
    numberOfReviewers: 10,
    shortDescription: 'Le carré démaquillant est un accessoire zéro déchet indispensable.',
    description:
      'Le Carré démaquillant coton bio/bambou est idéal pour nettoyer le visage en douceur. \n Sa face micro-polaire ultra douce en viscose de bambou permet un nettoyage en douceur.\n Le tissu micro-éponge viscose de bambou a des propriétés naturelles antibactériennes, il est donc parfaitement adapté pour les peaux sensibles des enfants et des adultes.',
  },
  {
    id: 'carre-demaquillant-coton-biobambou',
    category: 'accessories',
    subCategory: 'cleansing-squares',
    image:
      'https://naturefeerique.fr/wp-content/uploads/2022/02/carre-demaquillant-coton-biobambou.webp',
    title: 'Carré démaquillant Coton Bio/bambou',
    price: '2,5',
    vote: '100',
    score: 3,
    numberOfReviewers: 10,
    shortDescription: 'Le carré démaquillant est un accessoire zéro déchet indispensable.',
    description:
      'Le Carré démaquillant coton bio/bambou est idéal pour nettoyer le visage en douceur. \n Sa face micro-polaire ultra douce en viscose de bambou permet un nettoyage en douceur.\n Le tissu micro-éponge viscose de bambou a des propriétés naturelles antibactériennes, il est donc parfaitement adapté pour les peaux sensibles des enfants et des adultes.',
  },
  {
    id: 'carre-demaquillant-coton-bio-lot-de',
    category: 'accessories',
    subCategory: 'cleansing-squares',
    image:
      'https://naturefeerique.fr/wp-content/uploads/2022/02/carre-demaquillant-coton-bio-lot-de-2.webp',
    title: 'Carré démaquillant Coton bio/bambou Lot de 2',
    price: '4,5',
    vote: '100',
    score: 4,
    numberOfReviewers: 10,
    shortDescription: 'Le carré démaquillant est un accessoire zéro déchet indispensable.',
    description:
      'Le Carré démaquillant coton bio/bambou est idéal pour nettoyer le visage en douceur.  Sa face micro-polaire ultra douce en viscose de bambou permet un nettoyage en douceur. Le tissu micro-éponge viscose de bambou a des propriétés naturelles antibactériennes, il est donc parfaitement adapté pour les peaux sensibles des enfants et des adultes.',
  },

  {
    id: 'precious-lip-hand-balm',
    category: 'limited-edition',
    subCategory: 'glamor-range',
    image: 'http://naturefeerique.fr/wp-content/uploads/2022/02/Baume-Precieux12-site-scaled.jpg',
    title: 'Baume Précieux Mains & Lèvres',
    price: '9,50',
    vote: '100',
    score: 5,
    numberOfReviewers: 3,
    shortDescription: 'Le carré démaquillant est un accessoire zéro déchet indispensable.',
    description:
      'Le Carré démaquillant coton bio/bambou est idéal pour nettoyer le visage en douceur.  Sa face micro-polaire ultra douce en viscose de bambou permet un nettoyage en douceur. Le tissu micro-éponge viscose de bambou a des propriétés naturelles antibactériennes, il est donc parfaitement adapté pour les peaux sensibles des enfants et des adultes.',
  },
  {
    id: 'nomadic-precious-heart',
    category: 'limited-edition',
    subCategory: 'glamor-range',
    image: 'http://naturefeerique.fr/wp-content/uploads/2022/02/Coeur-Precieux-20-site-scaled.jpg',
    title: 'Cœur Précieux nomade',
    price: '13,50',
    vote: '100',
    score: 5,
    numberOfReviewers: 3,
    shortDescription: 'Le carré démaquillant est un accessoire zéro déchet indispensable.',
    description:
      'Le Carré démaquillant coton bio/bambou est idéal pour nettoyer le visage en douceur.  Sa face micro-polaire ultra douce en viscose de bambou permet un nettoyage en douceur. Le tissu micro-éponge viscose de bambou a des propriétés naturelles antibactériennes, il est donc parfaitement adapté pour les peaux sensibles des enfants et des adultes.',
  },

  {
    id: 'cleansing-beauty-kit',
    category: 'boxes',
    subCategory: 'our-wellness-formulas',
    image:
      'https://naturefeerique.fr/wp-content/uploads/2022/03/Kit-beaute-demaquillage-scaled-1.jpg',
    title: 'Kit Beauté Démaquillage',
    price: '24,50',
    vote: '100',
    score: 4,
    numberOfReviewers: 7,
    shortDescription: 'Une trousse beauté avec 30 Perles démaquillantes et 2 carrés démaquillants',
    description:
      'Ce kit contient le nécessaire pour un démaquillage : 30 Perles Démaquillantes dans leur écrin en liège + 2 carrés démaquillants réutilisables dans une jolie trousse.',
  },
  {
    id: 'nomadic-beauty-kit',
    category: 'boxes',
    subCategory: 'our-wellness-formulas',
    image: 'https://naturefeerique.fr/wp-content/uploads/2022/03/Kit-beaute-nomade-scaled-1.jpg',
    title: 'Kit Beauté Nomade',
    price: '31,50',
    vote: '100',
    score: 5,
    numberOfReviewers: 7,
    shortDescription:
      'Une trousse beauté avec 30 Perles démaquillantes, 2 carrés démaquillants et un Déodorant Plume',
    description:
      'Ce kit contient une jolie trousse de transport avec les produits indispensables pour partir en week-end : 30 Perles Démaquillantes dans leur boîte nomade + 2 carrés démaquillants réutilisables et un Déodorant plume dans sa boîte nomade.',
  },
];

export const featuredComments: MemberComment[] = [
  {
    id: '1',
    member: 'MARIELLE',
    text: 'Très contente, texture agréable, excellent résultat pour une peau très douce et bien nourrie ! Pratique et très joli, en plus la créatrice est adorable.',
  },
  {
    id: '2',
    member: 'SOPHIE',
    text: 'Étant depuis un certain temps à la recherche de produits efficaces pour ma peau, vous devez imaginer comment je me suis sentie quand je suis tombée sur Nature Féerique qui non seulement m’a donné totale satisfaction, et en plus offre des produits 100% naturels. Je dirais juste deux mots : « J’adore ! ».',
  },
  {
    id: '3',
    member: 'JULIE',
    text: 'Les produits Nature Féerique sont idéaux pour toute personne ayant la peau sensible comme moi.',
  },
  {
    id: '4',
    member: 'STÉPHANIE',
    text: "Ça fait déjà quelques temps que j’utilise cette marque de produits. Et je trouve qu’elle offre d'excellents produits qualités/prix et c’est un superbe cadeau à offrir à vos proches. STÉPHANIE",
  },
  {
    id: '5',
    member: 'LUCCI',
    text: 'Mon mari m’a offert le baume Précieux lèvres et mains et le baume soin précieux. Je peux vous dire que ces produits sont justes magiques. La sensation que vous avez après usage est incroyable.',
  },
];

export const homeSlideInfo = [
  {
    url: 'https://mldn3w3pos1n.i.optimole.com/cb:453S~5a2d9/w:auto/h:auto/q:mauto/id:aea1de3b3657bf3ad37e5d772129bfc3/https://naturefeerique.fr/Slide1.0-scaled.jpg',
    caption:
      'Pour Noël, optez pour un cadeau 100% artisanal et local. \nDécouvrir notre sélection Noël',
    text: "J'ADORE",
    href: '',
  },
  {
    url: 'https://mldn3w3pos1n.i.optimole.com/cb:453S~5a2d9/w:auto/h:auto/q:mauto/id:aea1de3b3657bf3ad37e5d772129bfc3/https://naturefeerique.fr/Slide1.0-scaled.jpg',
    text: '',
    caption: '',
    href: '',
  },
  {
    url: 'https://mldn3w3pos1n.i.optimole.com/cb:453S~5a2d9/w:auto/h:auto/q:mauto/id:7c31e1c30840e51557124a176e48f406/https://naturefeerique.fr/Box-a-composer1-scaled.jpg',
    text: 'OUI',
    caption: 'Un cadeau personnalisable avec nos \nbox à composer avec 2 ou 3 produits au choix.',
    href: '',
  },
];

export const TextNature = [
  'Il y a 3 ans, je préparais le départ pour une semaine de vacances avec mon mari et mes 2 filles. A nous 4, j’ai rempli 4 valises avec chacun ses vêtements puis 4 trousses de toilette avec des produits d’Hygiène & soin volumineux, parfois similaires alors qu’une trousse nomade recategoryant des produits communs pour toute la famille serait plus raisonnable et responsable !',
  'C’est en organisant les bagages que j’ai pris conscience que nous utilisions beaucoup de produits superflus contenus dans des bouteilles plastiques encombrantes et polluantes…',
  'Tout se passe dans nos salles de bain… on y trouve des produits cosmétiques en tout genre contenus dans des bouteilles plastiques à usage unique que l’on jette encore et encore. Chaque produit à sa fonction et sa cible, ce qui multiplie considérablement nos déchets quotidiens.',
  'C’est pour cela qu’en novembre 2019, Nature Féerique a imaginé une gamme de cosmétiques naturels solides adaptés à toute la famille, respectueux de la santé et de l’environnement.',
  'Deux ans après, de la recherche des meilleurs ingrédients, majoritairement locaux, au développement des formules, en passant par des tests et ajustements pour trouver la texture idéale, Nature Féerique est fière de vous dévoiler ces 3 premiers produits cosmétiques :',
  '- Déodorant Plume, un soin déodorant naturel solide',
  '- Démaquillant Cocoon, une huile solide 2 en 1 : nettoyante et démaquillante',
  '- Soin Précieux, une crème solide multi-usages',
  'Pour promouvoir son lancement, la marque a eu le privilège d’exposer et faire tester ses cosmétiques solides au Comptoir d’Alinéa, ce nouveau lieu éphémère d’échanges et de partages de l’enseigne Alinéa.',
  'Dans sa démarche, Nature Féerique s’engage à accompagner les familles vers une routine beauté minimaliste et une consommation cosmétique plus responsable.',
];
export const TextCreatrice = [
  'Née à Beaune (Côte d’Or), j’ai grandi au milieu des plus beaux vignobles de Bourgogne. C’est vers l’âge de 7 ans que j’ai commencé à me passionner pour les produits de beauté à travers une collection de miniatures de parfum. D’une imagination débordante, j’ai expérimenté mes premiers mélanges avec du gros sel, des craies de couleur et quelques gouttes de parfum dans un bocal en verre pour créer des sels de bain ; auxquels je pouvais rajouter du savon liquide. De caractère déterminée, c’est à la fin du collège, que je me suis orientée vers la chimie.',
  'Durant mes années Lycéennes, j’ai rencontré l’homme extraordinaire, avec qui je partage ma vie aujourd’hui. Ensemble, nous sommes partis dans le Sud (Toulouse et Montpellier) pour réaliser nos études universitaires.',
  'Ma formation ciblée en chimie, cosmétique et esthétique m’a ainsi permis d’acquérir une double compétence : formulation cosmétique et technique esthétique. J’ai donc une parfaite maîtrise quant à la création de produits cosmétiques en adéquation avec leur utilisation et les besoins des différents types de peau.',
  'Au cours de ma Licence professionnelle Parfums, Arômes et Cosmétiques, j’ai pris énormément de plaisir à réaliser un projet tutoré présenté au Concours national U’Cosmetics pour lequel j’ai obtenu fièrement le 1er prix du « concept cosmétique Innovant ». C’est l’accomplissement de ce projet qui m’a donné l’envie de développer une gamme de produits cosmétiques.',
  'Diplômés dans nos domaines respectifs, nos premiers contrats nous ont mené en Drôme Provençale, où nous résidons aujourd’hui avec nos deux adorables filles.',
  'Etant comblée familialement, et ayant pu acquérir d’un point de vue professionnel un savoir-faire maîtrisé (7 années riches d’une expérience au sein d’un laboratoire de recherche et développement à créer des formules cosmétiques pour les plus grandes marques), j’ai décidé de réaliser ce rêve de jeune diplômée qui me tenait à cœur : créer ma propre marque de cosmétiques 100% naturels, à la fois efficaces et sains pour la santé dans le respect de l’environnement !',
  'A travers ces quelques lignes, je tiens tout d’abord à vous raconter ma petite histoire, et par la même occasion vous exprimer ma reconnaissance pour votre soutien depuis la création de la marque « Nature Féerique ». Merci infiniment pour votre confiance et votre fidélité.',
];

export const BriefTextNature = [
  'Il y a 3 ans, je préparais le départ pour une semaine de vacances avec mon mari et mes 2 filles. A nous 4, j’ai rempli 4 valises avec chacun ses vêtements puis 4 trousses de toilette avec des produits d’Hygiène & soin volumineux, parfois similaires alors qu’une trousse nomade recategoryant des produits communs pour toute la famille serait plus raisonnable et responsable !',
];
export const BriefTextCreatrice = [
  'Née à Beaune (Côte d’Or), j’ai grandi au milieu des plus beaux vignobles de Bourgogne. C’est vers l’âge de 7 ans que j’ai commencé à me passionner pour les produits de beauté à travers une collection de miniatures de parfum. D’une imagination débordante, j’ai expérimenté mes premiers mélanges avec du gros sel, des craies de couleur et quelques gouttes de parfum dans un bocal en verre pour créer des sels de bain ; auxquels je pouvais rajouter du savon liquide. De caractère déterminée, c’est à la fin du collège, que je me suis orientée vers la chimie.',
];

export const blog = [
  {
    id: 1,
    title: 'Marché de Noël virtuel',
    subTitle: 'LIRE LA SUITE',
    image: '/images/blog1.webp',
    date: 'november 15, 2021',
  },
  {
    id: 2,
    title: 'Le Comptoir D’Alinea',
    subTitle: 'LIRE LA SUITE',
    image: '/images/blog.webp',
    date: 'septembre 15, 2021',
  },
];
