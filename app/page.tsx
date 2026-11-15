import Hero from '@/components/sections/Hero';
import EcosystemStrip from '@/components/sections/EcosystemStrip';
import Categories from '@/components/sections/Categories';
import Products from '@/components/sections/Products';
import Featured from '@/components/sections/Featured';
import FarmPassport from '@/components/sections/FarmPassport';
import HowItWorks from '@/components/sections/HowItWorks';
import Cart from '@/components/sections/Cart';
import WhyLaicos from '@/components/sections/WhyLaicos';
import Sourcing from '@/components/sections/Sourcing';
import CtaBanner from '@/components/sections/CtaBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <EcosystemStrip />
      <Categories />
      <Products />
      <Featured />
      <FarmPassport />
      <HowItWorks />
      <Cart />
      <WhyLaicos />
      <Sourcing />
      <CtaBanner />
    </>
  );
}
