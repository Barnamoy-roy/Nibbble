import axios from "axios";

// zustand 
import { useUserPostListStore } from "@/store/userPostStore";
import { set } from "react-hook-form";

export const getUserShots = async (userId: any) => {

    const {userPostList, setUserPostList } = useUserPostListStore();

    try {
        const res = await axios.get(`/api/getusershot/${userId}`);
        const userShots = res.data;
        setUserPostList(userShots);
        console.log(userPostList);
    } catch (error) {
        console.log(error);
    }
}