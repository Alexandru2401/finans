export default function PublicHomePage() {
  return (
    <section className="relative flex min-h-[calc(90vh-80px)] w-full items-center justify-center bg-linear-to-br from-amber-200 via-amber-300 to-yellow-200 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
          Take Control of Your Finances
        </h1>

        <p className="mb-4 text-lg text-gray-800 md:text-xl">
          Your personal finance management tool, built for clarity and control.
        </p>

        <p className="mb-10 text-base text-gray-700 md:text-lg">
          Track expenses, set smart budgets, and achieve your financial goals —
          all in one place.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/signin"
            className="inline-flex h-11 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Get Started
          </a>

          <a
            href="/about"
            className="inline-flex h-11 items-center justify-center rounded-md border border-gray-900 px-8 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-900 hover:text-white"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
