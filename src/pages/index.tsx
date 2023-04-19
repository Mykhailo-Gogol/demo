import Hero from "@/components/Hero";
import LoginHero from "@/components/LoginHero";

export default function Home() {
  return (
    <main>
      <Hero />
      <LoginHero title="Login now!" />
    </main>
  );
}
