// export interface UserCreated {
//     name?: string;
//     userName?: string;
//     password?: string;
//     phonenumber?: string;
//     email?: string;
//   };

export interface User {
    id?:number;
    name?: string;
    userName?: string;
    password?: string;
    phonenumber?: string;
    email?: string;
    idPrevilegies?:number;
  };