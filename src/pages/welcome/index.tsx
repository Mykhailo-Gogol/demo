import Hero from '../../components/Hero'
import LoginHero from '../../components/LoginHero'

export default function Welcome() {
  return (
    <section>
      <Hero />
      <LoginHero title="Login now!" />
    </section>
  )
}
