// import TwitterLogo from "../twitter-logo.png"
import TwitterLogo from "../deadly-duolingo.png"
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faRightToBracket, faUserPlus, faRightFromBracket, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect, useRef } from "react";
import Post from "./post";

const Home = () => {
    function checkAuth() {
        if (localStorage.getItem("token")) {
            return true;
        } else {
            return false;
        }
    }
    const [isLoggedIn, setIsLoggedIn] = useState(checkAuth());
    const [posts, setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [postsInBatch, setPostsInBatch] = useState(25);
    const [tweetText, setTweetText] = useState("");
    const postsContainerRef = useRef(null);
    const isInitialMountRef = useRef(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [loadingMsg, setLoadingMsg] = useState("Loading...")

    useEffect(() => {
        // If it's the initial mount, skip fetching posts
        if (isInitialMountRef.current) {
          isInitialMountRef.current = false;
          return;
        }
    
        // Fetch new posts when the pageNumber changes
        fetchPosts();
      }, [pageNumber]);

      const fetchPosts = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`https://twitter-clone-api-s87j.onrender.com/api/getposts/${pageNumber}`);
          const data = await response.json();
          console.log(data)
          setPostsInBatch(data.data.length);
          console.log(`data batch ${data.data.length}`)

          if (Array.isArray(data.data)) {
            setPosts((prevPosts) => [...prevPosts, ...data.data]);
          } else {
            console.error("Error: The response data is not in the expected format.");
          }
    
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching posts:", error);
          setIsLoading(false);
          setLoadingMsg("Failed to connect to server. Try again later.")
        }
      };


      const handleScroll = () => {
        const postsContainer = postsContainerRef.current;
        if (postsContainer) {
          const { scrollTop, scrollHeight, clientHeight } = postsContainer;
          if (scrollTop + clientHeight == scrollHeight) {
            // Fetch new posts when the user scrolls close to the bottom
            // console.warn("ITR WORKED ITITITITI")
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        }
      };
    
      useEffect(() => {
        const postsContainer = postsContainerRef.current;
        if (postsContainer) {
          postsContainer.addEventListener("scroll", handleScroll);
        }
    
        return () => {
          if (postsContainer) {
            postsContainer.removeEventListener("scroll", handleScroll);
          }
        };
      }, [pageNumber]);


      const handleTweetChange = (event) => {
        setTweetText(event.target.value);
      };

      
      const handleCreateTweet = async () => {
        try {
          // Get the token from localStorage
          const token = localStorage.getItem("token");

          if(!token) {
            window.location.reload();
            return;
          }
    
          // Check if the tweetText is not empty
          if (tweetText.trim() === "") {
            alert("Please enter a tweet.");
            return;
          }
    
          // Send the POST request to create the tweet with the token in the request body
          const response = await fetch("https://twitter-clone-api-s87j.onrender.com/api/create/post", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ postContent: tweetText, token: token }), // Send the tweet text and token in the request body with the correct keys
          });
    
          const data = await response.json();
          console.log("Tweet created:", data);
    
          // Refresh the tweets after creating a new tweet
          window.location.reload();
        } catch (error) {
          console.error("Error creating tweet:", error);
        }
      };


    return (
        <>
        <div className={`w-full h-screen fixed z-20 bg-neutral-950/50 flex items-center justify-center ${modalOpen ? "pointer-events-auto": "pointer-events-none"} ${modalOpen ? "opacity-100": "opacity-0"} transition duration-300 ease-in-out`}>
          <div onClick={() => setModalOpen(false)} className="z-20 w-full h-full fixed"></div>
          <div className="w-full h-full bg-neutral-800 border-[1px] border-neutral-700 max-w-[600px] max-h-[350px] rounded-[5px] flex flex-col items-center justify-center pr-10 pl-10 gap-10 z-30">
            <div className="w-full h-[55%] text-sm font-semibold text-neutral-400">
              <p className="mb-[5px]">{tweetText.length}/500</p>
            <textarea value={tweetText} 
            onChange={handleTweetChange} maxLength={500} placeholder="Enter tweet text here" className="w-full bg-neutral-700 border-[1px] border-neutral-600 rounded-[3px] h-[95%] min-h-[95%] max-h-[95%] focus:outline-none focus:border-[#0284c7] transition duration-150 ease-in-out p-2 text-neutral-300 font-medium mb-[5px]"></textarea>
            </div>
            <button onClick={handleCreateTweet} className="w-full bg-[#1DA1F2]/90 rounded-[3px] h-12 border-[1px] border-[#1DA1F2]/90 transition-all ease-in duration-100 hover:bg-[#1DA1F2]/70 pt-[2px] pb-[2px]">Tweet</button>
          </div>
        </div>
        <main className="flex h-screen z-10">
        {/* Side bar */}
        <section className="h-full w-1/4 flex flex-col justify-start items-center xl:w-1/3 border-r-[1px] border-neutral-800">
            <div className="mt-10 mb-10 h-full w-full max-w-[60%] relative">
                <img onClick={() => alert("Do your spanish.")} src={TwitterLogo} alt="do your spanish" className="w-[150px] mb-0 cursor-pointer"/>
                <ul className="flex flex-col  h-fit gap-5">
                    <li><Link to={"/"}  className="text-neutral-100 flex gap-5 items-center justify-start p-3 max-w-[100%] rounded-full pl-5 hover:bg-neutral-900 transition-all ease-in duration-100 hover:text-[#1DA1F2]/[95]"><FontAwesomeIcon icon={faHouse}/> <p>Home</p></Link></li>
                    <li><Link to={"/about"}  className="text-neutral-100 flex gap-5 items-center justify-start p-3 max-w-[100%] rounded-full pl-5 hover:bg-neutral-900 transition-all ease-in duration-100 hover:text-[#1DA1F2]/[95]"><FontAwesomeIcon icon={faWandMagicSparkles}/> <p>About</p></Link></li>

                    {isLoggedIn ? <></> : <li><Link to={"/login"}  className="text-neutral-100 flex gap-5 items-center justify-start p-3 max-w-[100%] rounded-full pl-5 hover:bg-neutral-900 transition-all ease-in duration-100 hover:text-[#1DA1F2]/[95]"><FontAwesomeIcon icon={faRightToBracket}/> <p>Login</p></Link></li>}

                    {isLoggedIn ? <li><button onClick={() => {
                      localStorage.removeItem("token");
                      window.location.reload();
                    }} className="text-neutral-100 flex gap-5 items-center justify-start p-3 max-w-[100%] rounded-full pl-5 hover:bg-neutral-900 transition-all ease-in duration-100 hover:text-[#1DA1F2]/[95] w-full"><FontAwesomeIcon icon={faRightFromBracket}/> Logout</button></li>:  <li><Link to={"/signup"}  className="text-neutral-100 flex gap-5 items-center justify-start p-3 max-w-[100%] rounded-full pl-5 hover:bg-neutral-900 transition-all ease-in duration-100 hover:text-[#1DA1F2]/[95]"><FontAwesomeIcon icon={faUserPlus}/> <p>Signup</p></Link></li>}

                    <li><button className={`flex gap-5 items-center justify-center p-3 w-full max-w-[100%] bg-[#1DA1F2]/90 rounded-full pl-5  transition-all ease-in duration-100 hover:bg-[#1DA1F2]/75 border-[1px] border-[#1DA1F2]/90 ${!isLoggedIn ? "bg-[#1DA1F2]/50" : ""} ${!isLoggedIn ? "hover:bg-[#1DA1F2]/50" : ""}`} disabled={!isLoggedIn} onClick={() => setModalOpen(true)}>Tweet</button></li>
                </ul>
            </div>
        </section>
        {/* Main posts section */}
        <section className="h-fit max-h-full w-1/2  xl:w-2/3 border-r-[1px] border-neutral-800 overflow-y-auto" id="postsContainer" ref={postsContainerRef}>
            <h1 className="mt-10 ml-10 text-3xl font-bold text-neutral-100">For You</h1>
            <div className="w-full h-[1px] bg-neutral-800 mt-10"></div>
            <div>
            {posts.map((post) => (
        <Post key={post.id}  props={post} />
      ))}
      {postsInBatch < 25 ? <h1 className="h-20 mt-5 mb-5 text-xl flex items-center justify-center font-semibold text-neutral-300">You are all caught up 👍</h1> : <h1 className="h-20 mt-5 mb-5 text-xl flex items-center justify-center font-medium text-neutral-100">{loadingMsg} {loadingMsg == "Failed to connect to server. Try again later." ? "": <svg aria-hidden="true" className="ml-[15px] w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-neutral-700 fill-neutral-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>}</h1>}
            </div>
        </section>
        {/* Right Bar */}
        <section className="h-full w-1/4 xl:w-0"></section>
        </main>
        </>
    )
}

export default Home;