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
  blog: {
    title: "Journal",
    route: "/blog",
  },
  favorite: {
    title: "Produits Favoris",
    route: "/favorite",
  },
  myAccount: {
    title: "Mon Compte",
    route: "/my-account",
  },
  productCategories: {
    cosmetics: {
      title: "Cosmétiques",
      route: "/product-categories/cosmetics",
      children: {
        solidDeodorant: {
          title: "Déodorant Solide",
          route: "/product-categories/cosmetics/solid-deodorant",
          children: {
            featherDeodorant: {
              title: "Déodorant Plume",
              route:
                "/product-categories/cosmetics/solid-deodorant/feather-deodorant",
            },
          },
        },
        solidFaceCleanser: {
          title: "Nettoyant Visage Solide",
          route: "/product-categories/cosmetics/solid-face-cleanser",
          children: {
            cocoonCleanser: {
              title: "Démaquillant Cocoon",
              route:
                "/product-categories/cosmetics/solid-face-cleanser/cocoon-cleanser",
            },
            cocoonCleansingPearls: {
              title: "Perles Démaquillantes Cocoon",
              route:
                "/product-categories/cosmetics/solid-face-cleanser/cocoon-cleansing-pearls",
            },
          },
        },
        solidBalm: {
          title: "Baume Solide",
          route: "/product-categories/cosmetics/solid-balm",
          children: {
            preciousCare: {
              title: "Soin Précieux",
              route: "/product-categories/cosmetics/solid-balm/precious-care",
            },
            preciousCarePearls: {
              title: "Perles De Soin Précieux",
              route:
                "/product-categories/cosmetics/solid-balm/precious-care-pearls",
            },
          },
        },
      },
    },
    accessories: {
      title: "Accessoires",
      route: "/product-categories/accessories",
      children: {
        cleansingSquares: {
          title: "Carrés Démaquillants",
          route: "/product-categories/accessories/cleansing-squares",
          children: {
            bambooCleansingSquare100: {
              title: "Carré Démaquillant 100% Bambou",
              route:
                "/product-categories/accessories/cleansing-squares/bamboo-cleansing-square-100",
            },
            organicCottonBambooCleansingSquare: {
              title: "Carré Démaquillant Coton Bio/Bambou",
              route:
                "/product-categories/accessories/cleansing-squares/organic-cotton-bamboo-cleansing-square",
            },
          },
        },
        ecoDesignedPouches: {
          title: "Pochettes Éco-Conçues",
          route: "/product-categories/accessories/eco-designed-pouches",
          children: {          
            solidDeodorantPouch: {
              title: "Pochette Déodorant Solide",
              route:
                "/product-categories/accessories/eco-designed-pouches/solid-deodorant-pouch",
            },
            cocoonMakeupRemoverPouch: {
              title: "Pochette Démaquillant Cocoon",
              route:
                "/product-categories/accessories/eco-designed-pouches/cocoon-makeup-remover-pouch",
            },
            preciousCarePouch: {
              title: "Pochette Soin Précieux",
              route:
                "/product-categories/accessories/eco-designed-pouches/precious-care-pouch",
            },
          },
        },
      },
    },
    limitedEdition: {
      title: "Édition Limitée",
      route: "/product-categories/limited-edition",
    },
  },
  boxes: {
    title: "Coffrets",
    route: "#",
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
  Routes.productCategories.cosmetics,
  Routes.productCategories.cosmetics.children.solidBalm,
  Routes.productCategories.cosmetics.children.solidDeodorant,
  Routes.productCategories.cosmetics.children.solidFaceCleanser,
  Routes.productCategories.accessories,
  Routes.productCategories.accessories.children.cleansingSquares,
  Routes.productCategories.accessories.children.ecoDesignedPouches,
  Routes.productCategories.limitedEdition,
  Routes.boxes,
  Routes.contact,
] as const;

export const NavbarItems = [
  Routes.home,
  Routes.about,
  Routes.productCategories.cosmetics,
  Routes.productCategories.accessories,
  Routes.productCategories.limitedEdition,
  Routes.boxes,
  Routes.contact,
] as const;

export const FooterRoutes = [
  {
    categoryName: "Information",
    items: [Routes.about, Routes.faq],
  },
  {
    categoryName: "Notre Univers",
    items: [
      Routes.productCategories.cosmetics,
      Routes.productCategories.accessories,
      Routes.productCategories.limitedEdition,
      Routes.blog,
    ],
  },
] as const;
