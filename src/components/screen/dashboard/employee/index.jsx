import { Sparkles } from "lucide-react";
import { useSelector } from "react-redux";

import logoImage from "@Assets/images/logo.png";

function EmployeeDashboard() {
  const username = useSelector((state) => state.auth.username);
  const displayName = username?.split(/[.@_-]/)[0] || "there";

  return (
    <main className="flex min-h-[calc(100vh-8.5rem)] w-full items-center py-4 sm:py-6">
      <section className="relative isolate grid min-h-[32rem] w-full overflow-hidden rounded-[2rem] bg-primary text-primary-foreground shadow-xl shadow-primary/15 lg:grid-cols-[1.1fr_0.9fr]">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-br from-white/10 via-transparent to-black/15"
          aria-hidden="true"
        />
        <div
          className="absolute -left-32 -top-32 -z-10 size-80 rounded-full border border-white/10"
          aria-hidden="true"
        />
        <div
          className="absolute -left-16 -top-16 -z-10 size-52 rounded-full border border-white/10"
          aria-hidden="true"
        />

        <div className="flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16 lg:py-20">
          <div className="mb-9 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
            <Sparkles className="size-4" aria-hidden="true" />
            Employee workspace
          </div>

          <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/55">
            The General Electric Stores
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl xl:text-6xl">
            Welcome back,
            <span className="mt-2 block capitalize text-white">{displayName}.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/65 sm:text-lg">
            It&apos;s good to see you again. Your employee workspace is ready for the day.
          </p>
        </div>

        <div className="relative hidden items-center justify-center overflow-hidden lg:flex" aria-hidden="true">
          <div className="absolute size-[30rem] rounded-full border border-white/10" />
          <div className="absolute size-80 rounded-full border border-white/15" />
          <div className="absolute size-56 rounded-full bg-white/8 shadow-2xl backdrop-blur-sm" />
          <div className="relative flex size-36 items-center justify-center rounded-[2rem] bg-white shadow-2xl shadow-black/25 ring-8 ring-white/10">
            <img
              src={logoImage}
              alt=""
              className="size-24 object-contain"
            />
          </div>
          <div className="absolute right-10 top-12 size-3 rounded-full bg-white/50" />
          <div className="absolute bottom-16 left-12 size-2 rounded-full bg-white/35" />
        </div>
      </section>
    </main>
  );
}

export default EmployeeDashboard;
