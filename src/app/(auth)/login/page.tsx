"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

const REDIRECT_MAP: Record<string, string> = {
  "player@gmail.com": "/dashboard/player",
  "coach@gmail.com": "/dashboard/coach",
  "academy@gmail.com": "/dashboard/academy",
  "club@gmail.com": "/dashboard/club",
  "agent@gmail.com": "/dashboard/agent",
  "admin@gmail.com": "/dashboard/admin",
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    const email = data.email.toLowerCase();
    const redirectPath = REDIRECT_MAP[email] || "/dashboard/player"; // Default to player if not matched

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userRole", redirectPath.split("/").pop() || "player");

    router.push(redirectPath);
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-cardBg/50 backdrop-blur-xl border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-2 font-heading tracking-tight">
          Welcome <span className="text-primary italic">Back!</span>
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Access your professional football dashboard.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70 group-focus-within:text-primary transition-colors"
              size={18}
            />
            <input
              type="email"
              placeholder="e.g. player@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="relative w-full pl-10 pr-4 py-3.5 rounded-lg border border-white/5 bg-black/40 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-all"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-[10px] font-medium uppercase tracking-wider ml-1 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest ml-1">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/70 group-focus-within:text-primary transition-colors"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "At least 6 characters",
                },
              })}
              className="relative w-full pl-10 pr-12 py-3.5 rounded-lg border border-white/5 bg-black/40 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-[10px] font-medium uppercase tracking-wider ml-1 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-primary text-xs font-bold hover:text-primary/80 transition-colors tracking-wide"
          >
            FORGOT PASSWORD?
          </Link>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-7 rounded-lg font-bold text-black text-sm uppercase tracking-[0.2em] bg-primary hover:bg-primary/90 transition-all shadow-[0_0_20px_-5px_rgba(0,255,100,0.4)] hover:shadow-[0_0_25px_-5px_rgba(0,255,100,0.6)] disabled:opacity-50"
        >
          {isSubmitting ? "Authenticating..." : "Sign In"}
        </Button>

        {/* Register Hint */}
        <p className="text-center text-gray-500 text-xs mt-6 uppercase tracking-widest">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-white hover:text-primary transition-colors">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
