"use client"

import Image from "next/image"
import { ArrowRight, Users, BarChart3, Clock, FileText, Settings, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/day-flow.png"
              alt="Dayflow logo"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
          <Button onClick={onGetStarted} variant="default">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm text-blue-600 dark:text-blue-400">
                ✨ The Future of HR Management
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-balance">
                Streamline Your HR Operations
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Dayflow is the all-in-one HRMS platform that simplifies employee management, attendance tracking, leave
                requests, and payroll processing. Designed for modern businesses.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button onClick={onGetStarted} size="lg" className="gap-2">
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl"></div>
              <img
                src="/professional-hr-management-dashboard-with-employee.jpg"
                alt="Dayflow HRMS Dashboard"
                className="relative rounded-2xl shadow-2xl border border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">5000+</div>
              <p className="text-sm text-muted-foreground">Companies Trust Us</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">50K+</div>
              <p className="text-sm text-muted-foreground">Active Employees</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">99%</div>
              <p className="text-sm text-muted-foreground">Uptime SLA</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
              <p className="text-sm text-muted-foreground">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your workforce efficiently and effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow space-y-4 overflow-hidden group">
              <img
                src="/employee-management-team-collaboration.jpg"
                alt="Employee Management"
                className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
              />
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">Employee Management</h3>
              <p className="text-muted-foreground">
                Centralized employee database with complete profiles, documents, and history tracking.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow space-y-4 overflow-hidden group">
              <img
                src="/attendance-tracking-digital-clock.jpg"
                alt="Attendance Tracking"
                className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
              />
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">Attendance Tracking</h3>
              <p className="text-muted-foreground">
                Real-time attendance tracking with clock in/out, biometric integration, and reports.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow space-y-4 overflow-hidden group">
              <img
                src="/leave-management-calendar.jpg"
                alt="Leave Management"
                className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
              />
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">Leave Management</h3>
              <p className="text-muted-foreground">
                Simple leave request submission, approval workflows, and balance tracking.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow space-y-4 overflow-hidden group">
              <img
                src="/analytics-reports-dashboard.jpg"
                alt="Advanced Reports"
                className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
              />
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">Advanced Reports</h3>
              <p className="text-muted-foreground">
                Comprehensive analytics and reports for attendance, payroll, and HR metrics.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow space-y-4 overflow-hidden group">
              <img
                src="/fast-reliable-performance.jpg"
                alt="Fast & Reliable"
                className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
              />
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">Fast & Reliable</h3>
              <p className="text-muted-foreground">
                Lightning-fast performance with enterprise-grade security and 99.9% uptime.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow space-y-4 overflow-hidden group">
              <img
                src="/customizable-configuration.jpg"
                alt="Customizable Settings"
                className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
              />
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold">Customizable</h3>
              <p className="text-muted-foreground">Fully customizable to match your company branding and workflows.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">Built for Every Business</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're a startup or an enterprise, Dayflow scales with your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Startups",
                description: "Easy setup, affordable pricing, and quick implementation for growing teams.",
                image: "/startup-business-team.jpg",
              },
              {
                title: "Mid-Size Companies",
                description: "Scalable solution with advanced features and multi-department support.",
                image: "/corporate-office-workspace.jpg",
              },
              {
                title: "Enterprises",
                description: "Custom integrations, dedicated support, and comprehensive security.",
                image: "/enterprise-headquarters.jpg",
              },
            ].map((useCase, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-background overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={useCase.image || "/placeholder.svg"}
                  alt={useCase.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Why Choose Dayflow?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our comprehensive HRMS solution
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-blue-500/10 rounded-3xl blur-3xl"></div>
              <img
                src="/hrms-interface-showcase.jpg"
                alt="Dayflow Interface Showcase"
                className="relative rounded-2xl shadow-2xl border border-border"
              />
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Increase Productivity",
                  description: "Automate routine HR tasks and focus on strategic initiatives.",
                },
                {
                  title: "Reduce Costs",
                  description: "Eliminate manual processes and reduce administrative overhead.",
                },
                {
                  title: "Improve Compliance",
                  description: "Stay compliant with labor laws and regulations automatically.",
                },
                {
                  title: "Better Analytics",
                  description: "Data-driven insights to make informed HR decisions.",
                },
                {
                  title: "Enhanced Security",
                  description: "Enterprise-grade security to protect sensitive employee data.",
                },
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Ready to Transform Your HR?</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of companies using Dayflow to streamline their HR operations.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={onGetStarted} size="lg" className="px-8 gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">No credit card required. 14-day free trial.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2026 Dayflow. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
