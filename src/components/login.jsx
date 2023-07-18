import { useState, useEffect, useRef } from "react";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    // Event handler for username input change
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    // Event handler for password input change
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    useEffect(() => {
      if (localStorage.getItem("token")) {
        window.location.replace("/");
      }
    }, [])

    const handleLogin = () => {
      // Check if the trimmed values are not empty
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();
      if (trimmedUsername === "" || trimmedPassword === "") {
        // If either field is empty, do not proceed with the login
        alert("Please enter both username and password.");
        return;
      }
  
      // Send the login request to the API
      fetch("https://twitter-clone-api-s87j.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: trimmedUsername, password: trimmedPassword }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Assuming the API returns a response with a status indicating the login status
          if (data.data === "success") {
            console.log("Login successful!");
            // Handle successful login here, e.g., redirect to a new page
            localStorage.setItem("token", data.token);
            window.location.replace("/");
          } else if (data.data === "user not found") {
            alert("Login failed. Username not found");
          } else if (data.data === "invalid credentials") {
            alert("Login failed. Invalid Credentials");
          }
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          if(window.confirm("Couldn't connect to server, try again?")) {
            handleLogin();
          } else {
            window.location.replace("/")
          }
        });
    };
  
    return (
      <>
        <main className="flex flex-col items-center justify-center h-screen gap-5">

          <div className="bg-neutral-900 rounded-[5px] text-neutral-50 w-full h-full max-w-[475px] max-h-[650px] relative">
            <div className="w-full flex items-center justify-center pt-[30px] pb-[30px] text-3xl font-bold">
              <h1>Log In</h1>
            </div>
            <div className="w-[86%] h-[1px] ml-[7%] bg-neutral-700 mb-[50px]"></div>
            <div className="flex flex-col items-start w-[86%] ml-[7%] gap-[20px]">
              <div className="w-full">
                <p className="text-sm flex gap-2 items-center justify-start">Enter Username <span className="text-[13px] font-medium text-neutral-400">{username.length}/20</span></p>
                <input
            type="text"
            className="block text-neutral-100 font-medium  mt-[15px] w-full pt-[15px] pb-[15px] pl-[10px] pr-[10px] rounded-[3px] focus:outline-none border-[1px] border-neutral-700 bg-neutral-800 focus:border-[#0284c7] transition duration-150 ease-in-out"
            value={username} // Bind the username state to the input value
            onChange={handleUsernameChange}
            maxLength={20} // Call the handleUsernameChange function on input change
              />
              </div>
              <div className="w-full">
                <p className="text-sm flex gap-2 items-center justify-start">Enter Password <span className="text-[13px] font-medium text-neutral-400">{password.length}/20</span></p>
                <input
            type="text"
            className="block text-neutral-100 font-medium  mt-[15px] w-full pt-[15px] pb-[15px] pl-[10px] pr-[10px] rounded-[3px] focus:outline-none border-[1px] border-neutral-700 bg-neutral-800 focus:border-[#0284c7] transition duration-150 ease-in-out"
            value={password} // Bind the username state to the input value
            onChange={handlePasswordChange}
            maxLength={20} // Call the handleUsernameChange function on input change
              />
              </div>
          <button className="transition duration-150 ease-in-out bg-neutral-50 mt-[30px] w-full h-[45px] rounded-[4px] text-[0.9rem] text-neutral-900 font-semibold hover:bg-neutral-800 hover:text-neutral-200 border-[1px] border-neutral-700" onClick={handleLogin}>Log in</button>
            </div>
            <div className="w-[86%] h-[1px] ml-[7%] bg-neutral-700 mb-[50px] mt-[50px]"></div>
            <button className="transition duration-150 ease-in-outbg-neutral-800 hover:bg-neutral-50 border-[1px] text-neutral-200 border-neutral-700  w-full h-[45px] rounded-[4px] text-[0.9rem] hover:text-neutral-900 font-semibold max-w-[86%] ml-[7%]" onClick={() => window.location.replace("/")}>Back Home</button>
            
          </div>
        </main>

        
      </>
    );
  };
  
  export default Login;