// import { createContext, useState, useEffect } from "react";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // On app load / refresh
//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     const email = localStorage.getItem("user_email");

//     if (token && email) {
//       setUser({ email });
//     }
//   }, []);

//   const login = (email) => {
//     localStorage.setItem("user_email", email);
//     setUser({ email });
//   };

//   const logout = () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("user_email");
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔑 Load user from localStorage on refresh
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Invalid user data in localStorage, clearing it");
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
