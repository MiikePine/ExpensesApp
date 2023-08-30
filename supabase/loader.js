
// import { createServerClient } from '@supabase/auth-helpers-remix'

// export const loader = async ({ request }) => {
//   const response = new Response()
//   // an empty response is required for the auth helpers
//   // to set cookies to manage auth

//   const supabaseClient = createServerClient(
//     process.env.VITE_SUPABASE_URL,
//     process.env.VITE_SUPABASE_ANON_KEY,
//     { request, response }
//   )

//   const { data } = await supabaseClient.from('posts').select('*').eq('user_id', userUID);


//   // in order for the set-cookie header to be set,
//   // headers must be returned as part of the loader response
//   return data(
//     {  },
//     {
//       headers: response.headers,
//     }
//   )
// }
