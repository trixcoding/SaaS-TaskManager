"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function HomeHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="text-center"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold"
      >
        Mini SaaS
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.5,
        }}
        className="mt-4 text-gray-500"
      >
        Simple project management SaaS
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.35,
          duration: 0.5,
        }}
        className="mt-8 flex justify-center gap-4"
      >
        <Link
          href="/login"
          className="rounded-lg bg-blue-400 px-6 py-3 text-white"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="rounded-lg border px-6 py-3"
        >
          Register
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.55,
          duration: 0.5,
        }}
      >
        <Link
          href="/about"
          className="mt-6 inline-block text-sm text-gray-400 transition hover:text-blue-400"
        >
          Technical notes →
        </Link>
      </motion.div>
    </motion.div>
  );
}