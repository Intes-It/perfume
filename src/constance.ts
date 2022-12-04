export const Routes = {
  home: {
    title: "ACCUEIL",
    route: "/",
  },
  about: {
    title: "A Propos",
    route: "/about",
  },
  productCategories: {
    cosmetics: {
      title: "Cosmétiques",
      route: "/product-categories/cosmetics",
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
