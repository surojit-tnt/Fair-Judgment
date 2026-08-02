import { createClient } from "@supabase/supabase-js"

// Same role as lib/supabase/client.ts in the original project.
// Requires the `@supabase/supabase-js` package (add it to package.json
// if you wire up real auth) and these two env vars in `.env`:
//   VITE_SUPABASE_URL=...
//   VITE_SUPABASE_ANON_KEY=...
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
