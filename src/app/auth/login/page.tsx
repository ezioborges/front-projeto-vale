"use client";

import type { AxiosError } from "axios";
import { login } from "@/services/authService";
import useAuth from "@/hooks/useAuth";
import { resolvePostLoginRoute } from "@/utils/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isReady, setSession, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  type LoginErrorResponse = {
    message?: string;
  };

  useEffect(() => {
    if (isReady && isAuthenticated && user) {
      router.replace(resolvePostLoginRoute(user));
    }
  }, [isAuthenticated, isReady, router, user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(""); // limpa os erros anteriores

    try {
      const response = await login({ email, password });

      setSession(response.access, response.refresh, response.user);
      router.push(resolvePostLoginRoute(response.user));
    } catch (error) {
      const axiosError = error as AxiosError<LoginErrorResponse>;
      console.error("Erro no login: ", error);
      if (axiosError.response) {
        setErrorMsg(
          axiosError.response.data?.message || "E-mail ou senha incorretos",
        );
      } else {
        setErrorMsg("Erro de conexao. Tente novamente mais tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Elementos de Fundo (Blobs Holograficos do Style Guide) */}
      <div className="absolute top-0 left-1/2 -ml-96 h-96 w-96 rounded-full bg-purple-500 opacity-20 blur-3xl mix-blend-multiply" />
      <div className="absolute bottom-0 right-1/2 -mr-96 h-96 w-96 rounded-full bg-pink-500 opacity-20 blur-3xl mix-blend-multiply" />
      <div className="absolute top-1/2 left-1/2 -ml-24 -mt-24 h-64 w-64 rounded-full bg-orange-400 opacity-20 blur-3xl mix-blend-multiply" />

      {/* Card de Login Centralizado */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/60 bg-white/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        {/* Cabecalho do Card */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-500 to-orange-400 text-2xl font-bold text-white shadow-lg">
              C
            </span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Bem-vindo de volta
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Acesse sua conta para continuar conectando talentos.
          </p>
        </div>

        {/* Formulario */}
        <form className="space-y-6" onSubmit={handleLogin}>
          {errorMsg && (
            <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 border border-red-100">
              <i className="fa-solid fa-circle-exclamation mr-2"></i>
              {errorMsg}
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              E-mail
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <i
                  className="fa-regular fa-envelope text-slate-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="seu@email.com"
                className="block w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 bg-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Senha
              </label>
              <Link
                href="/recuperar-senha"
                className="text-sm font-semibold text-purple-600 hover:text-purple-500 transition-colors"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <i
                  className="fa-solid fa-lock text-slate-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="block w-full rounded-xl border border-slate-200 py-3.5 pl-11 pr-4 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 bg-white"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="flex w-full justify-center items-center gap-2 rounded-xl bg-slate-900 px-4 py-4 text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
            >
              {isLoading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <>
                  Entrar na Plataforma
                  <i
                    className="fa-solid fa-arrow-right text-xs"
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Rodape do Card */}
        <div className="mt-8 text-center text-sm text-slate-600">
          Ainda nao tem uma conta?{" "}
          <Link
            href="/#cadastro"
            className="font-bold text-purple-600 transition-colors hover:text-purple-500"
          >
            Cadastre-se aqui
          </Link>
        </div>
      </div>
    </main>
  );
}
