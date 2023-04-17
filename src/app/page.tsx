import Card from './components/Card';
import Hero from './components/Hero';
import LoginHero from './clientLib';

import I1 from './static/1.jpg';
import I2 from './static/2.jpg';
import I3 from './static/3.jpg';

export default function Home() {
  return (
    <main className="px-4 lg:px-24">
      <Hero />
      <LoginHero title="Login now!" />

      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        <li>
          <Card image={I1} />
        </li>
        <li>
          <Card image={I2} />
        </li>
        <li>
          <Card image={I3} />
        </li>
      </ul>
    </main>
  );
}
