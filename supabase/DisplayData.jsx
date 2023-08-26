// import React, { useEffect, useState } from 'react';
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://tubnpuzyuhjyhslwbshd.supabase.co';
// const supabaseKey = 'your_supabase_api_key';
// const tableName = 'items';

// const supabase = createClient(supabaseUrl, supabaseKey);

// const DisplayData = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchSupabaseData();
//   }, []);

//   const fetchSupabaseData = async () => {
//     try {
//       const { data, error } = await supabase.from(tableName).select('*');
//       if (error) {
//         console.error('Error fetching data', error);
//       } else {
//         setData(data);
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Supabase Data</h2>
//       <ul>
//         {data.map(item => (
//           <li key={item.id}>
//             {item.item} - {item.price} - {item.category}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DisplayData;
