"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { prisma } from "../lib/prisma";
import {
  createSession,
    deleteSession,
    } from "../lib/auth";

    import {
      loginSchema,
        registerSchema,
        } from "../lib/validations";

        export async function registerAction(
          _prevState: unknown,
            formData: FormData
            ) {
              const result = registerSchema.safeParse({
                  name: formData.get("name"),
                      email: formData.get("email"),
                          password: formData.get("password"),
                            });

                              if (!result.success) {
                                  return {
                                        error: result.error.issues[0].message,
                                            };
                                              }

                                                const {
                                                    name,
                                                        email,
                                                            password,
                                                              } = result.data;

                                                                try {
                                                                    const existingUser = await prisma.user.findUnique({
                                                                          where: {
                                                                                  email,
                                                                                        },
                                                                                            });

                                                                                                if (existingUser) {
                                                                                                      return {
                                                                                                              error: "Email already exists",
                                                                                                                    };
                                                                                                                        }

                                                                                                                            const hashedPassword = await bcrypt.hash(
                                                                                                                                  password,
                                                                                                                                        12
                                                                                                                                            );

                                                                                                                                                const user = await prisma.user.create({
                                                                                                                                                      data: {
                                                                                                                                                              name,
                                                                                                                                                                      email,
                                                                                                                                                                              password: hashedPassword,
                                                                                                                                                                                    },
                                                                                                                                                                                        });

                                                                                                                                                                                            await createSession(user.id);
                                                                                                                                                                                              } catch {
                                                                                                                                                                                                  return {
                                                                                                                                                                                                        error: "Something went wrong",
                                                                                                                                                                                                            };
                                                                                                                                                                                                              }

                                                                                                                                                                                                                redirect("/dashboard");
                                                                                                                                                                                                                }

                                                                                                                                                                                                                export async function loginAction(
                                                                                                                                                                                                                  _prevState: unknown,
                                                                                                                                                                                                                    formData: FormData
                                                                                                                                                                                                                    ) {
                                                                                                                                                                                                                      const result = loginSchema.safeParse({
                                                                                                                                                                                                                          email: formData.get("email"),
                                                                                                                                                                                                                              password: formData.get("password"),
                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                  if (!result.success) {
                                                                                                                                                                                                                                      return {
                                                                                                                                                                                                                                            error: result.error.issues[0].message,
                                                                                                                                                                                                                                                };
                                                                                                                                                                                                                                                  }

                                                                                                                                                                                                                                                    const {
                                                                                                                                                                                                                                                        email,
                                                                                                                                                                                                                                                            password,
                                                                                                                                                                                                                                                              } = result.data;

                                                                                                                                                                                                                                                                try {
                                                                                                                                                                                                                                                                    const user = await prisma.user.findUnique({
                                                                                                                                                                                                                                                                          where: {
                                                                                                                                                                                                                                                                                  email,
                                                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                                                                if (!user) {
                                                                                                                                                                                                                                                                                                      return {
                                                                                                                                                                                                                                                                                                              error: "Invalid email or password",
                                                                                                                                                                                                                                                                                                                    };
                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                            const passwordMatch = await bcrypt.compare(
                                                                                                                                                                                                                                                                                                                                  password,
                                                                                                                                                                                                                                                                                                                                        user.password
                                                                                                                                                                                                                                                                                                                                            );

                                                                                                                                                                                                                                                                                                                                                if (!passwordMatch) {
                                                                                                                                                                                                                                                                                                                                                      return {
                                                                                                                                                                                                                                                                                                                                                              error: "Invalid email or password",
                                                                                                                                                                                                                                                                                                                                                                    };
                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                            await createSession(user.id);
                                                                                                                                                                                                                                                                                                                                                                              } catch {
                                                                                                                                                                                                                                                                                                                                                                                  return {
                                                                                                                                                                                                                                                                                                                                                                                        error: "Something went wrong",
                                                                                                                                                                                                                                                                                                                                                                                            };
                                                                                                                                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                                                                                                                                redirect("/dashboard");
                                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                                export async function logoutAction() {
                                                                                                                                                                                                                                                                                                                                                                                                  await deleteSession();

                                                                                                                                                                                                                                                                                                                                                                                                    redirect("/");
                                                                                                                                                                                                                                                                                                                                                                                                    }