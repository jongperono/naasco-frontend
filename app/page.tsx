export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">
              Naasco
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Product</a>
              <a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Docs</a>
              <a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Pricing</a>
              <a href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Blog</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Sign in
            </button>
            <button className="text-sm px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors">
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-zinc-100 dark:bg-zinc-900 text-sm">
            <span className="text-zinc-900 dark:text-white font-medium">
              🎉 Naasco raises $50m Series C
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            Everything you need<br />for authentication
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto">
            Ever feel like authentication requirements change with the season?
            We keep up with the latest trends and security best practices.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors font-medium">
              Start building for free
            </button>
            <button className="w-full sm:w-auto px-8 py-3 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors font-medium">
              View documentation
            </button>
          </div>

          {/* Trusted by badge */}
          <p className="mt-12 text-sm text-zinc-500 dark:text-zinc-500">
            Trusted by fast-growing companies around the world
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Feature Card 1 */}
          <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-3">
              Email and SMS one-time passcodes
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Fast and reliable one-time passcode delivery with built-in brute force prevention.
            </p>
            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
              Explore user authentication →
            </a>
          </div>

          {/* Feature Card 2 */}
          <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-3">
              Multi-tenancy
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Everything your B2B SaaS needs. All the features you need to onboard and manage users and organizations.
            </p>
            <a href="#" className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline">
              Explore Multi-tenancy →
            </a>
          </div>

          {/* Feature Card 3 */}
          <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-3">
              Build with SDKs for modern frameworks
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Developer experience front-and-center with helpful SDKs for most modern frameworks on web and mobile.
            </p>
            <a href="#" className="text-sm font-medium text-green-600 dark:text-green-400 hover:underline">
              All frameworks →
            </a>
          </div>

          {/* Feature Card 4 */}
          <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-3">
              Integrate with the tools you love
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Leverage as the source of truth for your user data and integrate with the tools that you already depend on.
            </p>
            <a href="#" className="text-sm font-medium text-orange-600 dark:text-orange-400 hover:underline">
              All integrations →
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-100 dark:to-zinc-50 p-12 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-zinc-900 mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-zinc-300 dark:text-zinc-600 mb-8 max-w-2xl mx-auto">
            Join thousands of developers building better authentication experiences
          </p>
          <button className="px-8 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors font-medium">
            Start building for free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Developers</h4>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Guides</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-sm text-zinc-600 dark:text-zinc-400">
            © 2026 Naasco. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
