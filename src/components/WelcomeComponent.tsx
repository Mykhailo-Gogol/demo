import Hero from './Hero'
import LoginHero from './LoginHero'

export function WelcomeComponent() {
  return (
    <section>
      <Hero />
      <LoginHero title="Login now!" />
    </section>
  )
}
