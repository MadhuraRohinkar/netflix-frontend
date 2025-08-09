// import React, { useState } from 'react';
// import useBearStore from '../store/authStore';

// const BearComponent = () => {
//   const [input, setInput] = useState('');
//   const bears = useBearStore((state) => state.bears);
//   const addBear = useBearStore((state) => state.addBear);
//   const deleteBear = useBearStore((state) => state.deleteBear);
//   const clearBears = useBearStore((state) => state.clearBears);

//   const handleAdd = () => {
//     if (input.trim() !== '') {
//       addBear(input.trim());
//       setInput('');
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded">
//       <h2 className="text-xl font-bold mb-4">🐻 Bear List</h2>

//       {/* Input + Add */}
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="border p-2 rounded w-full"
//           placeholder="Add a bear name"
//         />
//         <button
//           onClick={handleAdd}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Add
//         </button>
//       </div>

//       {/* Bear Grid */}
//       <div className="grid grid-cols-1 gap-2">
//         {bears.map((bear) => (
//           <div
//             key={bear.id}
//             className="flex justify-between items-center border p-2 rounded bg-gray-50"
//           >
//             <span>{bear.name}</span>
//             <button
//               onClick={() => deleteBear(bear.id)}
//               className="text-red-500 font-bold hover:text-red-700"
//               title="Delete"
//             >
//               ❌
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Clear All */}
//       {bears.length > 0 && (
//         <button
//           onClick={clearBears}
//           className="mt-4 text-red-500 underline text-sm"
//         >
//           Clear All
//         </button>
//       )}
//     </div>
//   );
// };

// export default BearComponent;
