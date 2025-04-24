'use client';
import { useState } from 'react';
import supabase from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signUp({ email, password });
    
    setLoading(false);
    
    if (error) {
      alert('Signup Failed: ' + error.message);
    } else {
      alert('Check your email for confirmation!');
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Create Account</h2>
      <form onSubmit={handleSignup} className="w-full space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <div className="mt-4 text-center w-full">
        <span>Already have an account? </span>
        <Link href="/login" className="text-blue-500 hover:underline">
          Log in
        </Link>
      </div>
    </div>
  );
}