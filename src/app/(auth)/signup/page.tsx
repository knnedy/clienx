"use client";

import type React from "react";

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

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function SignUpPage() {
  const [userType, setUserType] = useState<"client" | "freelancer">(
    "freelancer",
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    alert("Account created!");
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
    client: [
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

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Dark branding section */}
      <div className="hidden lg:flex lg:w-1/2 bg-foreground text-background p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative large text */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[20rem] font-bold text-background/5 select-none leading-none tracking-tighter">
          C
        </div>

        <div className="relative z-10">
          <h1 className="text-2xl font-bold tracking-tight">Clienx</h1>
          <p className="text-background/60 text-sm mt-1">
            Connect. Collaborate. Create.
          </p>
        </div>

        <div className="relative z-10 space-y-8 max-w-md">
          <div>
            <h2 className="text-4xl font-bold tracking-tight leading-tight text-balance">
              {userType === "freelancer"
                ? "Your talent deserves recognition"
                : "Find exceptional talent"}
            </h2>
            <p className="text-background/60 mt-4 text-lg">
              {userType === "freelancer"
                ? "Join thousands of professionals building their dream careers."
                : "Access a global network of skilled professionals ready to bring your vision to life."}
            </p>
          </div>

          <div className="space-y-5">
            {features[userType].map((feature, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-background/10">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-background/60 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-sm text-background/40">
          © 2026 Clienx. All rights reserved.
        </div>
      </div>

      {/* Right Side - Form with clean borderless design */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Clienx</h1>
            <p className="text-muted-foreground text-sm">
              Connect. Collaborate. Create.
            </p>
          </div>

          <div className="space-y-2 mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Create an account
            </h2>
            <p className="text-muted-foreground">
              Choose your account type to get started
            </p>
          </div>

          <Tabs
            value={userType}
            onValueChange={(v) => setUserType(v as "client" | "freelancer")}
            className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-12 p-1 bg-muted">
              <TabsTrigger
                value="freelancer"
                className="flex items-center gap-2 h-full rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Briefcase className="w-4 h-4" />
                Freelancer
              </TabsTrigger>
              <TabsTrigger
                value="client"
                className="flex items-center gap-2 h-full rounded-md data-[state=active]:bg-background data-[state=active]:shadow-sm">
                <Users className="w-4 h-4" />
                Client
              </TabsTrigger>
            </TabsList>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FieldGroup>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Controller
                      name="firstName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="firstName"
                            className="text-sm font-medium">
                            First name
                          </FieldLabel>
                          <Input
                            {...field}
                            id="firstName"
                            aria-invalid={fieldState.invalid}
                            placeholder="Johnny"
                            className="h-11"
                            required
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Controller
                      name="lastName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel
                            htmlFor="lastName"
                            className="text-sm font-medium">
                            Last name
                          </FieldLabel>
                          <Input
                            {...field}
                            id="lastName"
                            aria-invalid={fieldState.invalid}
                            placeholder="Doe"
                            className="h-11"
                            required
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel
                          htmlFor="email"
                          className="text-sm font-medium">
                          Email
                        </FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          aria-invalid={fieldState.invalid}
                          placeholder="john@mail.com"
                          className="h-11"
                          required
                        />
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
                          className="text-sm font-medium">
                          Password
                        </FieldLabel>
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          aria-invalid={fieldState.invalid}
                          placeholder="••••••••"
                          className="h-11"
                          required
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium">
                  Create account
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </FieldGroup>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-3 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              className="w-full h-12 font-medium bg-transparent">
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
          </Tabs>

          <p className="text-sm text-center text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-foreground hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
