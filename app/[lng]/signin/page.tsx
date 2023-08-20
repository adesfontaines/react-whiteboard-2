/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useTranslation } from "@/app/i18n/client";
import "../../globals.css";
import SocialLoginButton from "@/app/components/socialLoginButton";

export default function SignIn({ params, searchParams }) {
  const { t } = useTranslation(params.lng, "common");

  return (
    <div className="flex h-full items-center justify-center  md:bg-gradient-to-b from-indigo-200 via-red-200 to-yellow-100 text-black md:flex-row md:justify-end">
      <div className="hidden h-max justify-center p-10 text-white md:block md:w-1/2">
        <h1 className="mb-4 text-4xl font-semibold">Welcome back !</h1>
        <p className="text-lg">
          Please connect to access to all functionnalities
        </p>
      </div>
      <div className="h-full flex items-center justify-center bg-white p-6 md:w-1/2">
        <div className="max-w-xs">
          <h2 className="mb-4 text-2xl font-semibold">{t("signInTitle")}</h2>
          <div className="mb-4 text-white">
            <SocialLoginButton
              t={t}
              logo="google"
              lng={params.lng}
              provider="Google"
              providerClass="bg-white"
            />

            <SocialLoginButton
              t={t}
              logo="facebook-dark"
              lng={params.lng}
              provider="Facebook"
              providerClass="hover:brightness-70 bg-[#016aff] text-white"
            />

            <SocialLoginButton
              t={t}
              logo="line"
              lng={params.lng}
              provider="Line"
              providerClass="bg-[#01c300] text-white"
            />
          </div>
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-gray-600"></div>
          </div>
          <div>
            <input
              type="email"
              placeholder={t("email")}
              className="mb-2 w-full rounded-lg border px-4 py-2"
            />
            <input
              type="password"
              placeholder={t("password")}
              className="mb-4 w-full rounded-lg border px-4 py-2"
            />
            <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white">
              {t("signIn")}
            </button>
          </div>
          <p className="mt-4 text-gray-600">
            Don't have an account ?&nbsp;
            <a href="#" className="text-blue-500">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
