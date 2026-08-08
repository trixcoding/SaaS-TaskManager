import { redirect } from "next/navigation";

import RegisterForm from "../../components/register-form";
import { getCurrentUser } from "../../lib/auth";

export default async function RegisterPage() {
  const user = await getCurrentUser();

    if (user) {
        redirect("/dashboard");
          }

            return (
                <main className="flex min-h-screen items-center justify-center p-6">
                      <RegisterForm />
                          </main>
                            );
                            }