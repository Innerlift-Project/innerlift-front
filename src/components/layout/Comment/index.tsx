"use client";

import { CommentProps } from "@/types/Post";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { IUser } from "@/types/User";

export default function Comment(props: CommentProps) {
    const [authorData, setAuthorData] = useState<IUser | null>(null);
    useEffect(() => {
        const fetchAuthorData = async () => {
            if (props.comment.author) {
                try {
                    const response = await api.get(`/users/id`, {
                        params: { id: props.comment.authorId }
                    });
                    setAuthorData(response.data);
                } catch (error) {
                    console.error("Error fetching author data:", error);
                }
            }
        };
        fetchAuthorData();
    }, [props.comment.authorId, props.comment.author]);


    return (
        <div className={`${styles.PostPreview}`} >
            <div className={styles.postHeader}> 
                <h5>{`@${authorData ? authorData.username : "[deleted-user]"}`}</h5>
            </div>
            <div className={styles.postContent}>
                <p>{props.comment.content}</p>
            </div>
        </div>
    );
}