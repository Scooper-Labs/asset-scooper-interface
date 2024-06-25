interface NavLink {
  name: string;
  href: string;
}

interface MenuProps {
  menuOpen: boolean;
  setMenuOpen: (boolean) => void;
  links: NavLink[];
}

export type { NavLink, MenuProps };
