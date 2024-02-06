import Hero from '../../components/Hero'
import HeroLogin from '../../components/HeroLogin'
import HeroCarousel from '@/components/HeroCarousel'

export default function Welcome() {
  return (
    <section>
      <Hero />
      <HeroCarousel />
      <HeroLogin title="Login now!" />
    </section>
  )
}
