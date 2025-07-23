"use client";

import NavInterface from "@/components/layout/NavInterface";
import PageComponent from "@/components/layout/PageComponent";
import Button from "@/components/ui/Button";
import { ButtonSize, ButtonVariant } from "@/types/Button";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import api from '@/services/api'
import Comment from "@/components/layout/Comment";
import { useEffect, useState } from "react";
import { IPost } from "@/types/Post";
import SectionLine from "@/components/layout/SectionLine";
import { handleDislike, handleLike } from "@/lib/utils";


export default function PostPage({ params }: { readonly params: { readonly postid: string } }) {
    const router = useRouter()
    const [post, setPost] = useState<IPost | null>(null);
    const [comment, setComment] = useState("");
    useEffect(() => {
        api.get(`/posts/${params.postid}`).then(response => {
            setPost(response.data);
        })
        .catch(error => {   
            console.error("Error fetching post:", error);
        });
    }, []);

    async function handleCommentSubmit(comment: string) {
        try {
            await api.post(`/posts/${params.postid}/comments`, { content: comment });
            
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    }

    

    return (
        <div className={styles.social}>
        <NavInterface>
            <PageComponent className={styles.postPage}>
                <div className={styles.postPage}>
                    <Button  className={styles.backBtn} variant={ButtonVariant.GHOST} size={ButtonSize.MEDIUM} onClick={() => {router.back();}}>
                        <i className="bi bi-chevron-left"></i> Voltar
                    </Button>
                    <div className={styles.postScroller}>
                        <div className={styles.header}>
                            <h1>{post?.title}</h1>
                            <h6>{`@${post?.author.username}`}</h6>
                        </div>
                        <SectionLine className={styles.division}> <i className="bi bi-flower2"></i> </SectionLine>
                        <div className={styles.postContent}>
                            <p>{post?.content}</p>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.tags}>
                                {post?.tags.map((tag) => {
                                    const trimmedTag = tag.trim();
                                    return (
                                        <span key={trimmedTag} className={styles.tag}>{`#${trimmedTag}`}</span>
                                    );
                                })}
                            </div>
                        </div>
                        <SectionLine className={styles.division}> <i className="bi bi-flower2"></i> </SectionLine>
                        <div className={styles.commentSection}> 
                            <h3>Comentários</h3>
                            {(post?.coments ?? []).map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.commentInput}> 
                    <textarea placeholder="Escreva um comentário..." onChange={
                        (e) => {setComment(e.target.value)}
                    }/>
                    <Button className={styles.sendBtn} variant={ButtonVariant.PRIMARY} size={ButtonSize.MEDIUM} onClick={() => {
                        if (comment.trim() !== "") {
                            handleCommentSubmit(comment);
                            setComment("");
                        }
                    }}>
                        <i className="bi bi-send-fill"></i>
                    </Button>
                </div>

            </PageComponent>
        </NavInterface>
        </div>
    );
}
