"use client";

import { logoutAction } from "../actions/auth";

export default function LogoutButton() {
  return (
      <form action={logoutAction}>
            <button
                    type="submit"
                            className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
                                  >
                                          Logout
                                                </button>
                                                    </form>
                                                      );
                                                      }