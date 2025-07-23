import api from "@/services/api";

export async function handleLike(postId: string) {
    try {
        await api.post(`/posts/${postId}/reactions`, {data: {type: "HEART"}});
    } catch (error) {
        console.error("Error liking post:", error);
    }
}

export async function handleDislike(postId: string) {
    try {
        await api.delete(`/posts/${postId}/reactions`, {data: {type: "HEART"}});
    } catch (error) {
        console.error("Error liking post:", error);
    }
}
