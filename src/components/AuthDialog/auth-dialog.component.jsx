import { useEffect, useState } from "react";
import "./auth-dialog.component.scss";

//import { Dialog, TextField } from "@mui/material";
//import Button from "../Button/button.component";
import authenticationService from "../../services/authentication.service";
import { useMainContext } from "../../contexts/main.context";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function AuthDialog({ open, setOpen, type }) {
  const [localType, setLocalType] = useState("");
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { updateAuthentication } = useMainContext();

  useEffect(() => {
    setLocalType(type || "login");
    if (type != localType) {
      setError(null);
      setFormData(null);
    }
  }, [type]);

  useEffect(() => {
    if (open) {
      setError(null);
      setFormData(null);
    }
  }, [open]);

  async function handleLogin() {
    setLoading(true);
    const [ok, data] = await authenticationService.login(formData);
    setLoading(false);
    if (ok) {
      console.log("Logged in!");
      setError(null);
      updateAuthentication(true, data);
      setOpen(false);
    } else {
      console.log("Wasn't able to login!");
      setError(data);
    }
  }

  async function handleRegister() {
    setLoading(true);
    const [ok, data] = await authenticationService.register(formData);
    setLoading(false);
    if (ok) {
      console.log("Registered!");
      setError(null);
      updateAuthentication(true, data);
      setOpen(false);
    } else {
      console.log("Wasn't able to register!");
      setError(data);
    }
  }

  function handleChange(e) {
    setFormData((curr) => {
      if (!curr) curr = {};
      curr[e.target.id] = e.target.value;

      return curr;
    });
  }

  function LoginForm() {
    return (
      <>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="emailOrUsername">Email or username</Label>
              <Input
                id="emailOrUsername"
                type="text"
                placeholder=""
                required
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                onChange={handleChange}
              />
            </div>
            <Button
              disabled={loading}
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="w-full"
            >
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              {!loading && "Login"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="underline"
              onClick={() => {
                setLocalType("register");
              }}
            >
              Sign up
            </a>
          </div>
        </CardContent>
      </>
    );
  }

  function RegisterForm() {
    return (
      <>
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  placeholder="Max"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Robinson"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="spicelover12"
                required
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              {!loading && "Create an account"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a
              href="#"
              className="underline"
              onClick={() => {
                setLocalType("login");
              }}
            >
              Sign in
            </a>
          </div>
        </CardContent>
      </>
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      modal
    >
      <DialogContent>
        {localType == "register" ? RegisterForm() : LoginForm()}
      </DialogContent>
    </Dialog>
  );
}
