"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import Link from "next/link";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    }
    checkUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (user) {
    // If user is already logged in, redirect to dashboard
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Welcome to Todo App</h1>
      <div className="flex gap-4">
        <Link href="/signup">
          <button className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</button>
        </Link>
        <Link href="/login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        </Link>
      </div>
      {/* <TodoForm /> */}
      {/* <TodoList /> */}
    </div>
  );
}