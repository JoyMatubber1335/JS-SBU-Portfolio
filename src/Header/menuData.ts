interface NavItem {
  label: string;
  url: string;
  submenu?: NavItem[];
}

export const menuData: NavItem[] = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '/about' },
  { label: 'Blog', url: '/blog' },
  { label: 'Support', url: '/support' },
  { 
    label: 'Pages', 
    url: '#',
    submenu: [
      { label: 'About Page', url: '/about' },
      { label: 'Contact Page', url: '/contact' },
      { label: 'Blog Grid Page', url: '/blog' },
      { label: 'Blog Sidebar Page', url: '/blog/sidebar' },
      { label: 'Blog Details Page', url: '/blog/details' },
      { label: 'Sign In Page', url: '/signin' },
      { label: 'Sign Up Page', url: '/signup' },
      { label: 'Error Page', url: '/404' },
    ]
  }
]; 