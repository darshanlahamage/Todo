
// 'use client';
// import 'dotenv/config';
// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";

// // const supabase = createClient(
// //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
// //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// // );

// // export default supabase;


// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;


// console.log("Supabase URL: ", process.env.NEXT_PUBLIC_SUPABASE_URL);
// console.log("Supabase Key: ", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// const supabase = createClient(supabaseUrl, supabaseAnonKey);
// export default supabase;


'use client';
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase env variables are missing!");
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
