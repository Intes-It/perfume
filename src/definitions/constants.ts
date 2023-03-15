export const Routes = {
  home: {
    title: "ACCUEIL",
    route: "/",
  },
  about: {
    title: "A Propos",
    route: "/about",
  },
  faq: {
    title: "FAQ",
    route: "/faqs",
  },
  checkout: {
    title: "Paiement",
    route: "/checkout",
  },
  blog: {
    title: "Articles",
    route: "/blog",
    image:
      "https://mldn3w3pos1n.i.optimole.com/cb:453S~5a2d9/w:auto/h:auto/q:mauto/id:b2ad038a933778cbbc61fbc58eedfcef/https://naturefeerique.fr/journal-nes.png",
  },
  favorite: {
    title: "Produits Favoris",
    route: "/favorite",
  },
  myAccount: {
    title: "Mon Compte",
    route: "/my-account",
    children: {
      forgotPassword: {
        title: "Mon Compte",
        route: "/my-account/forgot-password",
      },
    },
  },
  productCategories: {
    cosmetics: { 
      id: 6,
      title: "Cosmétiques",
      route: "/product-categories/cosmetiques",
      image:
        "http://naturefeerique.fr/wp-content/uploads/2022/03/Photo-Categorie-cosmetiques-1-scaled-2.webp",
      children: {
        solidDeodorant: {
          title: "Déodorant Solide",
          route: "/product-categories/cosmetics/solid-deodorant",
          children: {
            featherDeodorant: {
              title: "Déodorant Plume",
              route: "/product/12",
            },
          },
        },
        solidFaceCleanser: {
          title: "Nettoyant Visage Solide",
          route: "/product-categories/cosmetics/solid-face-cleanser",
          children: {
            cocoonCleanser: {
              title: "Démaquillant Cocoon",
              route: "/product/demaquillant-cocoon",
            },
            cocoonCleansingPearls: {
              title: "Perles Démaquillantes Cocoon",
              route: "/product/perles-demaquillantes",
            },
          },
        },
        solidBalm: {
          title: "Baume Solide",
          route: "/product-categories/cosmetics/solid-balm",
          children: {
            preciousCare: {
              title: "Soin Précieux",
              route: "/product/soin-precieux",
            },
            preciousCarePearls: {
              title: "Perles De Soin Précieux",
              route: "/product/perles-de-soin",
            },
          },
        },
      },
    },
    accessories: {
      id: 5,
      title: "Accessoires",
      route: "/product-categories/accessoires",
      image:
        "http://naturefeerique.fr/wp-content/uploads/2022/03/Photo-categorie-Accessoires-scaled-1.jpg",
      children: {
        cleansingSquares: {
          title: "Carrés Démaquillants",
          route: "/product-categories/accessories/cleansing-squares",
          children: {
            bambooCleansingSquare100: {
              title: "Carré Démaquillant 100% Bambou",
              route: "/product/8",
            },
            organicCottonBambooCleansingSquare: {
              title: "Carré Démaquillant Coton Bio/Bambou",
              route: "/product/10",
            },
          },
        },
        ecoDesignedPouches: {
          title: "Pochettes Éco-Conçues",
          route: "/product-categories/accessories/eco-designed-pouches",
          children: {
            solidDeodorantPouch: {
              title: "Pochette Déodorant Solide",
              route: "/product/solid-deodorant-pouch",
            },
            cocoonMakeupRemoverPouch: {
              title: "Pochette Démaquillant Cocoon",
              route: "/product/cocoon-makeup-remover-pouch",
            },
            preciousCarePouch: {
              title: "Pochette Soin Précieux",
              route: "/product/precious-care-pouch",
            },
          },
        },
      },
    },
    limitedEdition: {
      id: 4,
      title: "Édition Limitée",
      route: "/product-categories/edition-limitee",
      image:
        "https://mldn3w3pos1n.i.optimole.com/cb:453S~5a2d9/w:auto/h:auto/q:mauto/id:bc473c5bdb3bd5a52d20679306c31fd7/https://naturefeerique.fr/Presentation-Gamme-Amour1-scaled.jpg",
      children: {
        glamorRange: {
          title: "Gamme Glamour",
          route: "/product-categories/limited-edition/glamor-range",
          children: {
            preciousLipHandBalm: {
              title: "Baume Précieux Mains & Lèvres",
              route: "/product/precious-lip-hand-balm",
            },
            nomadicPreciousHeart: {
              title: "Cœur Précieux nomade",
              route: "/product/nomadic-precious-heart",
            },
          },
        },
      },
    },
  },
  boxes: {
    title: "Coffrets",
    route: "#",
    image:
      "https://mldn3w3pos1n.i.optimole.com/cb:453S~5a2d9/w:auto/h:auto/q:mauto/id:bc473c5bdb3bd5a52d20679306c31fd7/https://naturefeerique.fr/Presentation-Gamme-Amour1-scaled.jpg",
    children: {
      ourWellnessFormulas: {
        title: "NOS FORMULES BIEN-ÊTRE",
        route: "/product-categories/boxes/our-wellness-formulas",
        children: {
          cleansingBeautyKit: {
            title: "Kit Beauté Démaquillage",
            route: "/product/cleansing-beauty-kit",
          },
          nomadicBeautyKit: {
            title: "Kit Beauté Nomade",
            route: "/product/nomadic-beauty-kit",
          },
          beautyCareKit: {
            title: "Kit Beauté Soin",
            route: "/product/beauty-care-kit",
          },
          discoveryKit : {
            title: "Kit Découverte (Bientôt Disponible)",
            route: "#",
          },
          customizableBeautyCase : {
            title: "Trousse Beauté Personnalisable (Bientôt Disponible)",
            route: "#",
          },
        },
      },
    },
  },
  contact: {
    title: "Contact",
    route: "/contact",
  },
} as const;

export const VisibleTitleRoutes = [
  Routes.about,
  Routes.blog,
  Routes.faq,
  Routes.favorite,
  Routes.myAccount,
  Routes.checkout,
  Routes.productCategories.cosmetics,
  Routes.productCategories.cosmetics.children.solidBalm,
  Routes.productCategories.cosmetics.children.solidDeodorant,
  Routes.productCategories.cosmetics.children.solidFaceCleanser,
  Routes.productCategories.accessories,
  Routes.productCategories.accessories.children.cleansingSquares,
  Routes.productCategories.accessories.children.ecoDesignedPouches,
  Routes.productCategories.limitedEdition,
  Routes.productCategories.limitedEdition.children.glamorRange,
  Routes.boxes,
  Routes.boxes.children.ourWellnessFormulas,
  Routes.contact,
] as const;

export const NavbarItems = [
  Routes.home,
  Routes.about,
  Routes.productCategories.cosmetics,
  Routes.productCategories.accessories,
  Routes.boxes,
  Routes.productCategories.limitedEdition,
  Routes.contact,
] as const;

export const OurUniverse = [
  Routes.productCategories.cosmetics,
  Routes.productCategories.accessories,
  Routes.productCategories.limitedEdition,
  Routes.blog,
] as const;

export const FooterRoutes = [
  {
    categoryName: "Information",
    items: [Routes.about, Routes.faq],
  },
  {
    categoryName: "Notre Univers",
    items: OurUniverse,
  },
] as const;

export const Countries = [
  {
    name: 'Vietnam',
    value: 'Vn'
  },
  {
    name: 'France',
    value: 'Fr'
  },
  {
    name: 'Chinese',
    value: 'Cn'
  }
]