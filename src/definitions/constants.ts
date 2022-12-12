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
  Routes.productCategories.accessories,
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
