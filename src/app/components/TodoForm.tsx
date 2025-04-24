"use client";
import { useState } from "react";
import supabase from "@/lib/supabaseClient";

const TodoForm = ({ onAdd }: { onAdd: () => void }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      alert("Please login first");
      return;
    }

    const { error } = await supabase.from("todos").insert([
      {
        title,
        is_completed: false,
        user_id: user.data.user.id,
      },
    ]);

    if (error) console.error("Error adding task:", error);
    else {
      setTitle("");
      onAdd(); // Refresh list
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2 p-4">
      <input
        type="text"
        placeholder="Enter your task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 border rounded px-3 py-2"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
    </form>
  );
};

export default TodoForm;
