import Hero from '../components/Hero';
import Features from '../components/Features';
import Pricing from '../components/Pricing';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Pricing />
    </div>
  );
};

export default Home;
