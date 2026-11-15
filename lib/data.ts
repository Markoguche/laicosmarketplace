// Central content model for the LAICOS landing page (copy lifted 1:1 from the Figma design).
export const SITE = 'https://laicos.farm';

export const NAV_LINKS = [
  { label: 'Marketplace', href: '#produce' },
  { label: 'Categories', href: '#categories' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About LAICOS', href: '#why-laicos' },
];

export const HERO_CHECKS = ['Verified Farms', 'Quality Produce', 'Trusted Logistics'];

export const PARTNERS = ['Farmworks', 'Harvest', 'Greentrade', 'Agrlink', 'Fieldline'];

export type Category = { name: string; listings: number; image: string };

export const CATEGORIES: Category[] = [
  { name: 'Grains', listings: 48, image: '/images/cat-grains.jpg' },
  { name: 'Tubers', listings: 31, image: '/images/cat-tubers.jpg' },
  { name: 'Vegetables', listings: 54, image: '/images/cat-vegetables.jpg' },
  { name: 'Fruits', listings: 26, image: '/images/cat-fruits.jpg' },
  { name: 'Legumes', listings: 18, image: '/images/cat-legumes.jpg' },
  { name: 'Livestock', listings: 12, image: '/images/cat-livestock.jpg' },
  { name: 'Aquaculture', listings: 9, image: '/images/cat-aquaculture.jpg' },
  { name: 'Other', listings: 22, image: '/images/cat-other.jpg' },
];

export type Status = 'available' | 'limited' | 'out';

export type Product = {
  name: string;
  farm: string;
  price: string;
  unit: string;
  status: Status;
  image: string;
  qty?: number;
};

export const PRODUCTS: Product[] = [
  { name: 'Yellow Maize', farm: 'Farm LF-00123', price: '₦ XXX,XXX', unit: 'per tonne', status: 'available', image: '/images/prod-yellow-maize.jpg', qty: 2 },
  { name: 'Fresh Cassava', farm: 'Farm LF-00418', price: '₦ XXX,XXX', unit: 'per tonne', status: 'available', image: '/images/prod-fresh-cassava.jpg' },
  { name: 'White Yam', farm: 'Farm LF-00270', price: '₦ XXX,XXX', unit: 'per 100 tubers', status: 'limited', image: '/images/prod-white-yam.jpg' },
  { name: 'Paddy Rice', farm: 'Farm LF-00001', price: '₦ XXX,XXX', unit: 'per tonne', status: 'available', image: '/images/prod-paddy-rice.jpg' },
  { name: 'Brown Beans', farm: 'Farm LF-00064', price: '₦ XXX,XXX', unit: 'per 100kg', status: 'available', image: '/images/prod-brown-beans.jpg' },
  { name: 'Fresh Tomatoes', farm: 'Farm LF-00335', price: '₦ XXX,XXX', unit: 'per crate', status: 'limited', image: '/images/prod-fresh-tomatoes.jpg', qty: 1 },
  { name: 'Red Bell Pepper', farm: 'Farm LF-00182', price: '₦ XXX,XXX', unit: 'per basket', status: 'out', image: '/images/prod-red-bell-pepper.jpg' },
  { name: 'Green Plantain', farm: 'Farm LF-00011', price: '₦ XXX,XXX', unit: 'per bunch', status: 'available', image: '/images/prod-green-plantain.jpg' },
];

export const FEATURED = [
  {
    name: 'Yellow Maize',
    description: 'Clean, dried yellow maize harvested and bagged for bulk supply.',
    price: '₦ XXX,XXX',
    unit: 'per tonne',
    image: '/images/feat-yellow-maize.jpg',
  },
  {
    name: 'Fresh Cassava',
    description: 'Freshly harvested cassava roots, ready for processing.',
    price: '₦ XXX,XXX',
    unit: 'per tonne',
    image: '/images/feat-fresh-cassava.jpg',
  },
  {
    name: 'White Yam',
    description: 'Mature white yam tubers selected for size and quality.',
    price: '₦ XXX,XXX',
    unit: 'per 100 tubers',
    image: '/images/feat-white-yam.jpg',
  },
];

export const WHY_CARDS = [
  { icon: 'shield', title: 'Verified Farms', text: 'Source from registered and verified farms.' },
  { icon: 'leaf', title: 'Quality Produce', text: 'Discover agricultural products from real producers.' },
  { icon: 'bag', title: 'Easy Ordering', text: 'Find what you need and manage your order with ease.' },
  { icon: 'truck', title: 'Trusted Logistics', text: 'Move produce through trusted logistics partners.' },
];

export const STEPS = [
  { n: '01', icon: 'search', title: 'Browse', text: 'Explore available agricultural produce.' },
  { n: '02', icon: 'bag', title: 'Add to Cart', text: 'Select your produce and quantity.' },
  { n: '03', icon: 'truck', title: 'Order & Deliver', text: 'Complete your order and receive produce through trusted logistics.' },
];

export const CART_ITEMS = [
  { name: 'Yellow Maize', farm: 'Farm LF-00123', unitPrice: '₦ XXX,XXX', unit: 'per tonne', qty: 2, image: '/images/prod-yellow-maize.jpg' },
  { name: 'Fresh Tomatoes', farm: 'Farm LF-00335', unitPrice: '₦ XXX,XXX', unit: 'per crate', qty: 1, image: '/images/prod-fresh-tomatoes.jpg' },
];

export const FOOTER_COLS = [
  { heading: 'Marketplace', links: ['Shop Produce', 'Categories', 'Sourcing Requests'] },
  { heading: 'Company', links: ['About LAICOS', 'How It Works', 'Contact'] },
  { heading: 'Support', links: ['Help Centre', 'Terms', 'Privacy'] },
];
