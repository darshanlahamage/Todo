"use client";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import TodoForm from "./TodoForm";

interface Todo {
  id: string;
  title: string;
  user_id: string;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data: user } = await supabase.auth.getUser();
    const { data } = await supabase.from('todos').select('*').eq('user_id', user?.user?.id);
    setTodos(data || []);
  };

  return (
    <div>
      <TodoForm onAdd={fetchTodos} />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;