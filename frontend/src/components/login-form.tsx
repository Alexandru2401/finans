import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import LoginSchema from "@/schemas/login.schema";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const redirect = useNavigate();

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const [isSubmiting, setIsSubmiting] = useState(false);

  function handleChange(
    identifier: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setFormData((prevVal) => ({
      ...prevVal,
      [identifier]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [identifier]: undefined,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = LoginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    console.log("Valid form data:", result.data);
    setErrors({});

    setIsSubmiting(true);

    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
      const response = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log("Raspuns request din form:", response);

      const data = await response.json();

      console.log("Data din form:", data);

      if (!response.ok) {
        toast.error(data.message || "test");
        return;
      }

      toast.success(data.message || "Login successful!");
      redirect("/dashboard");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmiting(false);
    }
  }

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
            <FieldGroup>
              {/* Email Field */}
              <Field className="max-h-16">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e)}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 min-h-5">{errors.email}</p>
                )}
              </Field>

              {/* Password Field */}
              <Field className="mt-2 max-h-16">
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e)}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 min-h-5">
                    {errors.password}
                  </p>
                )}
              </Field>

              <Field className="mt-3">
                <Button type="submit" className="cursor-pointer w-full">
                  {isSubmiting ? "Loading..." : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a href="/signin" className="underline">
                    Start for Free
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
