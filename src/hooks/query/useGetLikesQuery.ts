// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// //custom hook for get single blog
// export const useGetLikes = (id) => {
//   return useQuery({
//     queryKey: ["reactions"],
//     queryFn: async () => {
//       const res = await axios.get(`http://localhost:8080/like/${id}`);
//       return res.data;
//     },
//     enabled: !!id, // Only run the query if id is available
//   });
// };
