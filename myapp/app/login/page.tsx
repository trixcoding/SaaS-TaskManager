import { redirect } from "next/navigation";

import LoginForm from "../../components/login-form";
import { getCurrentUser } from "../../lib/auth";

export default async function LoginPage() {
  const user = await getCurrentUser();

    if (user) {
        redirect("/dashboard");
          }

            return (
                <main className="flex min-h-screen items-center justify-center p-6">
                      <LoginForm />
                          </main>
                            );
                            }