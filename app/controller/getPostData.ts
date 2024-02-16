import axios from "axios";

// zustand 
import { usePostListStore } from "@/store/store";

export const getPostData = async () => {
    const { postList, setPostList } = usePostListStore();
    try {
        const res = await axios.get("/api/getpost");
        const getPostList = res.data;
        setPostList(getPostList);
        console.log(postList);
    } catch (error) {
        console.error(error);
    }
}
