"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApi } from "@/hooks/use-api";
import authApi, { SignInDto, AuthResponse } from "@/api/auth-api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ACCESS_TOKEN_KEY, USER_KEY } from "@/context/auth-provider";
import Cookies from "js-cookie";

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  // Using useApi hook for login
  const loginApi = useApi<AuthResponse>({
    context: "Login",
    showErrorToast: true,
    onSuccess: (data) => {
      // Set token in both localStorage and cookie
      localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
      Cookies.set(ACCESS_TOKEN_KEY, data.access_token, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: 7, // 7 days
      });

      if (data.user) {
        localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      }

      toast.success("Logged in successfully!");
      router.push("/dashboard");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    const credentials: SignInDto = {
      email,
      password,
    };

    // Submit login request
    await loginApi.execute(() => authApi.signIn(credentials));
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {loginApi.error && (
                <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md dark:bg-red-900/20 dark:text-red-300">
                  {loginApi.error.message}
                </div>
              )}

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginApi.isLoading}
                >
                  {loginApi.isLoading ? "Logging in..." : "Login"}
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
