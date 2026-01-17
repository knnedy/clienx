"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  Users,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  User,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signUp } from "@/lib/auth-client";

const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
  role: z.enum(["employer", "freelancer"]),
});

export default function SignUpPage() {
  const [userRole, setUserRole] = useState<"employer" | "freelancer">(
    "freelancer",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "freelancer",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      role: userRole,
      callbackURL: "/dashboard",
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true);
        },
        onResponse: () => {
          setIsLoading(false);
        },
        onError: (ctx) => {
          console.log(ctx.error);
          toast.error(ctx.error.message);
        },
        onSuccess: async () => {
          setIsLoading(false);
          form.reset();
          toast.success("Account created successfully");
          router.push("/dashboard");
        },
      },
    });
  };

  const features = {
    freelancer: [
      {
        icon: Sparkles,
        title: "Showcase your work",
        desc: "Build a stunning portfolio that attracts clients",
      },
      {
        icon: Shield,
        title: "Secure payments",
        desc: "Get paid safely with our protected escrow system",
      },
      {
        icon: Zap,
        title: "Grow faster",
        desc: "Connect with opportunities that match your skills",
      },
    ],
    employer: [
      {
        icon: Sparkles,
        title: "Top-tier talent",
        desc: "Access verified professionals with proven expertise",
      },
      {
        icon: Shield,
        title: "Quality guaranteed",
        desc: "Work with confidence using milestone payments",
      },
      {
        icon: Zap,
        title: "Fast matching",
        desc: "Find the perfect fit for your project in hours",
      },
    ],
  };

  const accentColor =
    userRole === "freelancer"
      ? "from-cyan-500 to-blue-500"
      : "from-purple-500 to-violet-500";
  const accentColorLight =
    userRole === "freelancer" ? "text-cyan-600" : "text-purple-600";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
      {/* Left Side - Premium branding section */}
      <div
        className={`hidden lg:flex lg:w-1/2 bg-linear-to-br ${accentColor} text-white p-12 flex-col justify-between relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute -right-32 top-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-32 bottom-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 w-fit">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold text-sm">
              C
            </div>
            <span className="font-semibold text-sm">Clienx</span>
          </div>
          <p className="text-white/70 text-sm font-medium">
            Connect. Collaborate. Create.
          </p>
        </div>

        <div className="relative z-10 space-y-8 max-w-md">
          <div>
            <h2 className="text-5xl font-bold tracking-tight leading-tight text-balance">
              {userRole === "freelancer"
                ? "Your talent deserves recognition"
                : "Find exceptional talent"}
            </h2>
            <p className="text-white/80 mt-4 text-lg leading-relaxed">
              {userRole === "freelancer"
                ? "Join thousands of professionals building their dream careers on Clienx."
                : "Access a global network of skilled professionals ready to bring your vision to life."}
            </p>
          </div>

          <div className="space-y-4">
            {features[userRole].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="p-3 rounded-xl bg-white/15 group-hover:bg-white/25 transition-colors duration-300">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-sm text-white/50">
          © 2026 Clienx. All rights reserved.
        </div>
      </div>

      {/* Right Side - Premium form section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="lg:hidden mb-8">
            <div className="inline-flex items-center gap-2 mb-6">
              <div
                className={`w-8 h-8 bg-linear-to-br ${accentColor} rounded-lg flex items-center justify-center font-bold text-white text-sm`}>
                C
              </div>
              <span className="font-bold text-xl">Clienx</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Connect. Collaborate. Create.
            </p>
          </div>

          {/* Heading */}
          <div className="space-y-3 mb-8">
            <h2 className="text-4xl font-bold tracking-tight">
              Create an account
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose your role to get started
            </p>
          </div>

          {/* Role selection with improved styling */}
          <div className="mb-8">
            <Tabs
              value={userRole}
              onValueChange={(v) => setUserRole(v as "employer" | "freelancer")}
              className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-12 p-1.5 bg-muted/50 border border-border rounded-lg gap-2">
                <TabsTrigger
                  value="freelancer"
                  className={`flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${userRole === "freelancer" ? "bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-700 dark:text-cyan-400 shadow-sm" : ""}`}>
                  <Briefcase className="w-4 h-4" />
                  <span className="hidden sm:inline">Freelancer</span>
                  <span className="sm:hidden">Freelance</span>
                </TabsTrigger>
                <TabsTrigger
                  value="employer"
                  className={`flex items-center justify-center gap-2 font-semibold transition-all duration-300 ${userRole === "employer" ? "bg-linear-to-r from-purple-500/20 to-violet-500/20 text-purple-700 dark:text-purple-400 shadow-sm" : ""}`}>
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">Employer</span>
                  <span className="sm:hidden">Hire</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FieldGroup>
              <div className="space-y-2">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="name"
                        className="text-sm font-semibold">
                        Full Name
                      </FieldLabel>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          id="name"
                          className="pl-11 h-11 border-border/50 bg-card/50 transition-all duration-200 hover:border-border focus:border-accent focus:bg-card focus:ring-2 focus:ring-accent/20"
                          aria-invalid={fieldState.invalid}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="email"
                        className="text-sm font-semibold">
                        Email Address
                      </FieldLabel>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          className="pl-11 h-11 border-border/50 bg-card/50 transition-all duration-200 hover:border-border focus:border-accent focus:bg-card focus:ring-2 focus:ring-accent/20"
                          aria-invalid={fieldState.invalid}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="password"
                        className="text-sm font-semibold">
                        Password
                      </FieldLabel>
                      <div className="relative">
                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          className="pl-11 h-11 border-border/50 bg-card/50 transition-all duration-200 hover:border-border focus:border-accent focus:bg-card focus:ring-2 focus:ring-accent/20"
                          aria-invalid={fieldState.invalid}
                          placeholder="••••••••"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Submit button with role-based gradient */}
              <Button
                type="submit"
                className={`w-full h-11 text-base font-semibold bg-linear-to-r ${accentColor} text-white hover:shadow-lg transition-all duration-300 border-0`}
                disabled={isLoading}>
                {isLoading ? (
                  <>
                    <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </FieldGroup>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground font-medium uppercase tracking-wide">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google sign-up */}
          <Button
            variant="outline"
            type="button"
            className="w-full h-11 font-semibold border-border/50 hover:bg-card/50 transition-all duration-200 bg-transparent">
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Sign in link */}
          <p className="text-sm text-center text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link
              href="/signin"
              className={`font-semibold transition-colors duration-200 hover:underline ${accentColorLight}`}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
