import type { NavLink } from '@public/storefront/types/content'

export const navLinks: NavLink[] = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Productos', href: '#productos' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

export const productsNavLinks: NavLink[] = [navLinks[0]]
