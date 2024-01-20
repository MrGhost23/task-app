import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { login } from "@/store/slices/userAuthSlice";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

const Login: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const dispatchAction = await dispatch(
      login({
        username: values.username,
        password: values.password,
      })
    );

    setError(dispatchAction.payload || "");
    setIsLoading(false);
  };

  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="w-96">
        <h1 className="text-4xl font-bold mb-4 flex justify-center">Login</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 px-8 lg:px-0"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="LinkedIn Username"
                      className="text-lg focus:ring-sky-500 focus:border-none focus:outline-none"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your LinkedIn Username</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      autoComplete="off"
                      type="password"
                      className="text-lg focus:ring-sky-500 focus:border-none focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-red-500">{error}</p>}

            <Button
              type="submit"
              disabled={isLoading}
              className="block w-full bg-sky-500"
            >
              {isLoading ? "Loading..." : "Log In"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
