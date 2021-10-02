import React, {SyntheticEvent, useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import accessToken from "../../../accessToken"
import { setAccessToken } from '../../../accessToken';
import jwt_decode from "jwt-decode";

const LoginContainer = styled.div`
  font-family:'Lato',sans-serif; 
  ${tw`
  h-full
  w-full
  md:pt-20 
  pb-6 
  px-2 
  md:px-0
  `};
`;

interface ILoginProps{
  // set the props as username/email with id for create orders 
}

export function LoginSection(props: ILoginProps) {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false);
  const [loginState, setLoginState] = useState(false);
   
  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    
    const response = await fetch('http://localhost:9000/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        // credentials: 'include',
        body: JSON.stringify({
            email,
            password
        })
      });
    if(response.status === 201) {
      setRedirect(true);
      setLoginState(true);
      const accessToken = await response.json(); 
      console.log(accessToken);
      
      // get the logined user info and save it to cache 
    } else {
       
       alert('Invalid credentials')
    } 
    
     
  
    }

  if (redirect) {
     
      return <Redirect to="/"/>;
    }
  return (
      <LoginContainer>
      <div className="container h-50 bg-gray-30 m-z">
       <form className="bg-white shadow-m rounded px-10 pt-8 pb-8 mb-4 max-w-md mx-auto sm:max-w-xl" onSubmit={submit}>
          <div className="m-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            type="email"
            id="username"
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder="alex@gmail.com"
            required
          />
        </div>
        <div className="m-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            id="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="**********"
            required
          />
          </div>
          <button style={{ marginTop: 1, padding: 15}}className="w-100 btn btn-lg btn-primary" type="submit"> SIGN IN </button>
          <a href="/signup" ><p className="text-center text-red-500 text-m" >
            No Account Yet,Register and Join Us Now.
          </p></a>
        </form>
       
        </div>
        </LoginContainer>
   
      
);

}