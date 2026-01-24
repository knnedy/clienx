import Link from "next/link";
import {
  FileText,
  DollarSign,
  Users,
  Zap,
  ArrowRight,
  Clock,
  Shield,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import ThemeToggle from "./components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-linear-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 rounded-md flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-lg font-bold bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Clienx
            </span>
          </div>
          <ThemeToggle />
          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-xs font-medium text-foreground hover:text-primary transition-colors">
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-xs font-medium bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500 text-white rounded-md hover:shadow-md transition-all hover:scale-105">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        {/* Gradient background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/15 dark:bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 right-0 w-80 h-80 bg-blue-600/8 dark:bg-blue-600/4 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/5 border border-cyan-500/20 dark:border-cyan-500/10">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-medium text-cyan-700 dark:text-cyan-400">
                The future of freelancing is here
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-5 leading-tight">
              Connect with
              <span className="block bg-linear-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                top talent
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg text-muted-foreground text-balance mb-8 leading-relaxed max-w-2xl">
              Whether you&apos;re a freelancer finding your next opportunity or
              an employer searching for excellence, Clienx brings the right
              people together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-3 mb-12">
              <Link
                href="/sign-up"
                className="px-6 py-2.5 bg-linear-to-r from-cyan-600 to-blue-600 dark:from-cyan-500 dark:to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 group text-sm">
                Start Free Trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-6 py-2.5 border border-border rounded-lg font-medium hover:bg-muted/50 transition-colors text-sm">
                Learn More
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-8 md:gap-16">
              {[
                { stat: "10K+", label: "Active Users" },
                { stat: "$50M+", label: "Transacted" },
                { stat: "95%", label: "Satisfaction" },
              ].map((item, idx) => (
                <div key={idx}>
                  <p className="text-2xl md:text-3xl font-bold">{item.stat}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Split Feature Section */}
        <section className="relative border-t border-border">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-6 py-20">
            {/* Freelancers */}
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent dark:from-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 rounded-xl border border-border group-hover:border-cyan-500/30 transition-colors">
                <div className="w-10 h-10 bg-cyan-500/10 dark:bg-cyan-500/10 rounded-md flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <Users className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h2 className="text-2xl font-bold mb-3">For Freelancers</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Showcase your skills, find projects you love, and build your
                  dream career on your own terms.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Find high-paying projects",
                    "Secure payments & contracts",
                    "Build your professional portfolio",
                    "Connect with repeat clients",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/sign-up"
                  className="text-cyan-600 dark:text-cyan-400 font-medium hover:gap-2 transition-all flex items-center gap-1 group/link text-sm">
                  Start as Freelancer
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Employers */}
            <div className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent dark:from-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 rounded-xl border border-border group-hover:border-purple-500/30 transition-colors">
                <div className="w-10 h-10 bg-purple-500/10 dark:bg-purple-500/10 rounded-md flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold mb-3">For Employers</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Hire vetted professionals, manage projects efficiently, and
                  scale your team with confidence.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Access verified talent pool",
                    "Manage projects in one place",
                    "Track progress & timelines",
                    "Secure escrow payments",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/sign-up"
                  className="text-purple-600 dark:text-purple-400 font-medium hover:gap-2 transition-all flex items-center gap-1 group/link text-sm">
                  Start as Employer
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative border-t border-border py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-balance">
                Everything you need to succeed
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools designed for modern freelancing and hiring
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: FileText,
                  title: "Smart Proposals",
                  desc: "Create professional proposals with templates and e-signatures",
                  color: "cyan",
                },
                {
                  icon: DollarSign,
                  title: "Secure Payments",
                  desc: "Built-in escrow and multiple payment methods for peace of mind",
                  color: "blue",
                },
                {
                  icon: Clock,
                  title: "Time Tracking",
                  desc: "Track hours accurately and convert to invoices automatically",
                  color: "purple",
                },
                {
                  icon: Shield,
                  title: "Verified Profiles",
                  desc: "Verified users and verified payments for trustworthy transactions",
                  color: "cyan",
                },
                {
                  icon: Users,
                  title: "Direct Messaging",
                  desc: "Communicate securely within the platform with file sharing",
                  color: "blue",
                },
                {
                  icon: Zap,
                  title: "Smart Matching",
                  desc: "AI-powered recommendations for finding the right fit",
                  color: "purple",
                },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                const colorClasses = {
                  cyan: "from-cyan-500/10 dark:from-cyan-500/5 group-hover:border-cyan-500/30",
                  blue: "from-blue-500/10 dark:from-blue-500/5 group-hover:border-blue-500/30",
                  purple:
                    "from-purple-500/10 dark:from-purple-500/5 group-hover:border-purple-500/30",
                };
                const iconColor = {
                  cyan: "text-cyan-600 dark:text-cyan-400",
                  blue: "text-blue-600 dark:text-blue-400",
                  purple: "text-purple-600 dark:text-purple-400",
                };
                const bgColor = {
                  cyan: "bg-cyan-500/10 dark:bg-cyan-500/10 group-hover:bg-cyan-500/20",
                  blue: "bg-blue-500/10 dark:bg-blue-500/10 group-hover:bg-blue-500/20",
                  purple:
                    "bg-purple-500/10 dark:bg-purple-500/10 group-hover:bg-purple-500/20",
                };

                return (
                  <div
                    key={idx}
                    className="group relative p-5 rounded-lg border border-border hover:shadow-md transition-all duration-300 bg-linear-to-br to-transparent"
                    style={{
                      backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    }}>
                    <div
                      className={`absolute inset-0 rounded-lg bg-linear-to-br ${colorClasses[feature.color as keyof typeof colorClasses]} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                    />
                    <div className="relative">
                      <div
                        className={`w-10 h-10 rounded-md flex items-center justify-center mb-3 transition-colors ${bgColor[feature.color as keyof typeof bgColor]}`}>
                        <Icon
                          className={`w-5 h-5 ${iconColor[feature.color as keyof typeof iconColor]}`}
                        />
                      </div>
                      <h3 className="text-base font-semibold mb-1.5">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative border-t border-border py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-500 dark:via-blue-500 dark:to-purple-500" />
              <div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-transparent to-transparent blur-3xl" />

              {/* Content */}
              <div className="relative p-8 md:p-12 text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-balance leading-tight">
                  Ready to transform how you work?
                </h2>
                <p className="text-sm md:text-base mb-6 opacity-90 max-w-xl mx-auto leading-relaxed">
                  Join thousands of freelancers and employers building
                  meaningful connections every day.
                </p>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-all hover:scale-105 group text-sm">
                  Start Your Free Trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border py-12 px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-linear-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold text-xs">C</span>
                  </div>
                  <span className="font-semibold text-sm">Clienx</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Connecting freelancers and employers worldwide.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2.5 text-sm">Product</h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors">
                      Security
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2.5 text-sm">Company</h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2.5 text-sm">Legal</h3>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors">
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-foreground transition-colors">
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
              <p>&copy; 2024 Clienx. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-foreground transition-colors">
                  Twitter
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
