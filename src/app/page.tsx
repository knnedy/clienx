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
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                C
              </span>
            </div>
            <span className="text-xl font-bold">Clienx</span>
          </div>
          <div className="flex items-center gap-8">
            <Link
              href="/dashboard"
              className="px-6 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-balance mb-6">
              Connect with top talent
            </h1>

            <p className="text-xl text-muted-foreground text-balance mb-10 leading-relaxed max-w-2xl">
              Whether you&apos;re a freelancer finding your next opportunity or an employer searching for excellence, Clienx brings the right people together.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-16">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 border-2 border-primary/20 rounded-xl font-semibold hover:bg-muted transition-colors">
                Explore More
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-8">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold">$50M+</p>
                <p className="text-sm text-muted-foreground">Transacted</p>
              </div>
              <div>
                <p className="text-3xl font-bold">95%</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Split Feature Section */}
        <section className="border-t">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6 py-20">
            {/* Freelancers */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                For Freelancers
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Showcase your skills, find projects you love, and build your dream career.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Find high-paying projects",
                  "Secure payments & contracts",
                  "Build your professional portfolio",
                  "Connect with repeat clients",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="text-primary font-semibold hover:gap-2 transition-all flex items-center gap-1">
                Start as Freelancer
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Employers */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                For Employers
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Hire vetted professionals, manage projects efficiently, and scale your team.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Access verified talent pool",
                  "Manage projects in one place",
                  "Track progress & timelines",
                  "Secure escrow payments",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="text-primary font-semibold hover:gap-2 transition-all flex items-center gap-1">
                Start as Employer
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="border-t bg-muted/30 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything you need to succeed
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools designed for modern freelancing and hiring
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  title: "Smart Proposals",
                  desc: "Create professional proposals with templates and e-signatures",
                },
                {
                  icon: DollarSign,
                  title: "Secure Payments",
                  desc: "Built-in escrow and multiple payment methods for peace of mind",
                },
                {
                  icon: Clock,
                  title: "Time Tracking",
                  desc: "Track hours accurately and convert to invoices automatically",
                },
                {
                  icon: Shield,
                  title: "Verified Profiles",
                  desc: "Verified users and verified payments for trustworthy transactions",
                },
                {
                  icon: Users,
                  title: "Direct Messaging",
                  desc: "Communicate securely within the platform with file sharing",
                },
                {
                  icon: Zap,
                  title: "Smart Matching",
                  desc: "AI-powered recommendations for finding the right fit",
                },
              ].map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 rounded-2xl border bg-background hover:shadow-lg hover:border-primary/50 transition-all group">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl bg-linear-to-br from-primary to-accent p-12 md:p-16 text-center text-primary-foreground">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Ready to transform how you work?
              </h2>
              <p className="text-lg mb-10 opacity-95 max-w-2xl mx-auto">
                Join thousands of freelancers and employers building meaningful connections every day.
              </p>
              <Link
                href="/dashboard"
                className="inline-block px-8 py-4 bg-primary-foreground text-primary rounded-xl font-semibold hover:bg-white transition-colors">
                Start Your Free Trial
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-12 px-6 bg-muted/50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  C
                </span>
              </div>
              <span className="font-semibold">Clienx</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Blog
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
