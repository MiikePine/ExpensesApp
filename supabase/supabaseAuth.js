
// import { createServerClient } from "@supabase/auth-helpers-remix"

// export const loader = async ({ request }) => {
//   const env = {
//     SUPABASE_URL: process.env.SUPABASE_URL,
//     SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
//   }

//   const response = new Response()

//   const supabase = createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
//     request,
//     response,
//   })

//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   return json(
//     {
//       env,
//       session,
//     },
//     {
//       headers: response.headers,
//     }
//   )
// }

