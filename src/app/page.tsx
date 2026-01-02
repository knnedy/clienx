import { CheckCircle, FileText, DollarSign, Users, Zap, ArrowRight, Clock, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold">Clienx</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Sign In</button>
            <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border mb-8">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">The modern freelancer workspace</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              Client work,
              <br />
              <span className="text-muted-foreground">
                beautifully organized
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Proposals, contracts, invoices, and payments — all in one place. Stop juggling tools and start impressing clients.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 border-2 rounded-xl font-medium hover:bg-accent transition-colors">
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>14-day free trial</span>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 max-w-6xl mx-auto">
            <div className="rounded-2xl border-8 shadow-2xl overflow-hidden bg-card">
              <div className="h-96 bg-linear-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-muted-foreground">Dashboard Preview</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional tools that make you look good and save you time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Proposals</h3>
              <p className="text-muted-foreground">
                Create stunning proposals in minutes with templates and e-signature support
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Invoice & Payments</h3>
              <p className="text-muted-foreground">
                Send professional invoices and get paid faster with integrated payment processing
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Time Tracking</h3>
              <p className="text-muted-foreground">
                Track billable hours effortlessly and convert them to invoices instantly
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Client Portal</h3>
              <p className="text-muted-foreground">
                Give clients a branded portal to view projects, approve work, and make payments
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Contracts & Legal</h3>
              <p className="text-muted-foreground">
                Protect yourself with legally-vetted contract templates and e-signatures
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automation</h3>
              <p className="text-muted-foreground">
                Set up automated reminders, recurring invoices, and follow-up emails
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-primary text-primary-foreground">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to get organized?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of freelancers who trust clienx with their client work
            </p>
            <button className="px-8 py-4 bg-background text-foreground rounded-xl font-medium hover:bg-background/90 transition-colors">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C</span>
            </div>
            <span className="font-semibold">Clienx</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Clienx. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}