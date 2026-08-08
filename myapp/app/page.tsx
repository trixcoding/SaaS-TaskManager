import { redirect } from "next/navigation";

import { getCurrentUser } from "../lib/auth";
import HomeHero from "../components/home-hero";

export default async function HomePage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <HomeHero />
    </main>
  );
}