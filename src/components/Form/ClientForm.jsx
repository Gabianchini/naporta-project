// import React, { useState } from 'react';
// import localforage from 'localforage';
// import { v4 as uuidv4 } from 'uuid';

// const ClientForm = ({ onAddClient }) => {
//   const [fullname, setFullname] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent reload page when sending form

//     // Generate primary key to be unique
//     const clientId = uuidv4();

//     // Create a new client object
//     const newClient = {
//       _id: clientId,
//       fullname,
//       email,
//       phone
//     };

//     // Save the client to local storage using LocalForage
//     await localforage.setItem(clientId, newClient);

//     // Call the onAddClient function passed from the parent component
//     onAddClient(newClient);

//     // Clear the form fields
//     setFullname('');
//     setEmail('');
//     setPhone('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Fullname:
//         <input
//           type="text"
//           value={fullname}
//           onChange={(e) => setFullname(e.target.value)}
//         />
//       </label>
//       <label>
//         Email:
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </label>
//       <label>
//         Phone:
//         <input
//           type="tel"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default ClientForm;