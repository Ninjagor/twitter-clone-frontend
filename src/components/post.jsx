import Pfp from "../pfp.jpg"

const Post = ({props}) => {
    return(
        <>
        <div className="w-full pt-5 pb-5 border-b-[1px] border-neutral-800 flex">
            <img src={Pfp} alt="pfp" className="ml-10 w-12 h-12 rounded-[50%]"/>
            <div className="ml-5 w-full">
                <div className="flex gap-2 items-center justify-start"><p className="text-lg font-semibold text-neutral-200">{props.username}</p> <p className="text-neutral-400 font-medium text-sm">{props.email}</p></div>
                <div className="max-w-[95%] mt-2 text-neutral-100/90  w-[100%]"><p className="w-full">{props.postContent}</p></div>
            </div>
        </div>
        </>
    )
}

export default Post;