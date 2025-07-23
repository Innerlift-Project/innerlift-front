"use client";

import { PostPreviewProps } from "@/types/Post";
import {useRouter} from "next/navigation";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { IUser } from "@/types/User";
import { useAuth } from "@/hooks/useAuth";
import { handleDislike, handleLike } from "@/lib/utils";

export default function PostPreview(props: PostPreviewProps) {
    const [authorData, setAuthorData] = useState<IUser | null>(null);
    const router = useRouter();

    const {
        user
    } = useAuth()

    useEffect(() => {
        const fetchAuthorData = async () => {
            if (props.post.author) {
                try {
                    const response = await api.get(`/users/id`, {
                        params: { id: props.post.authorId }
                    });
                    setAuthorData(response.data);
                } catch (error) {
                    console.error("Error fetching author data:", error);
                }
            }
        };
        fetchAuthorData();
    }, [props.post.authorId, props.post.author]);


    

    function isLiked() {
        return props.post.reactions?.find(reaction => reaction.type === "HEART" && reaction.user.id === user?.id);
    }

    return (
        <div className={`${styles.PostPreview}`} onClick={() => {
            router.push(`/social/${props.post.id}`);
        }}>
            <div className={styles.postHeader}> 
                <h5>{props.post.title}</h5> <h6>{`@${authorData ? authorData.username : "[deleted-user]"}`}</h6>
            </div>
            <div className={styles.postContent}>
                <p>{props.post.content.length < 256 ? props.post.content : `${props.post.content.substring(0, 255)}...` }</p>
            </div>
            <div className={styles.bottom}>
                <div className={styles.tags}>
                    {props.post.tags.map((tag) => {
                        const trimmedTag = tag.trim();
                        return (
                            <span key={trimmedTag} className={styles.tag}>{`#${trimmedTag}`}</span>
                        );
                    })}
                </div>
                <div className={styles.reactions}>
                    <span className={styles.reactionCount}>{props.post._count.reactions}</span>
                    <button className={styles.likeButton} onClick={(e) => {
                        e.stopPropagation();
                        if (isLiked()) {
                            handleDislike(props.post.id);
                        } else {
                            handleLike(props.post.id);
                        }
                    }}>
                        <i className={`bi bi-heart${isLiked() ? "-fill" : ""}`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
}