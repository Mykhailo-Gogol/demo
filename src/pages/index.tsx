import AppComponent from "@/components/AppComponent";
import { WelcomeComponent } from "@/components/WelcomeComponent";
import { useUser } from "@supabase/auth-helpers-react";

export default function Home() {
  const user = useUser();
  return <main>{user ? <AppComponent /> : <WelcomeComponent />}</main>;
}
