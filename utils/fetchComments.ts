import { Comment} from "../typings"
// ${process.env.NEXT_PUBLIC_BASE_URL}
export const fetchComments = async(tweetId:string) =>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getComment/?tweetId=${tweetId}`)
    const data = await res.json()
    const comments:Comment[] = data.comments
    return comments
}