"use client";

import NavInterface from "@/components/layout/NavInterface";
import PageComponent from "@/components/layout/PageComponent";
import Button from "@/components/ui/Button";
import { ButtonSize, ButtonVariant } from "@/types/Button";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import SectionLine from "@/components/layout/SectionLine";
import api from '@/services/api'

import { useEffect, useState } from "react";
import PostPreview from "@/components/layout/PostPreview";
import { IPost } from "@/types/Post";


export default function Social() {
    const router = useRouter()
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        api.get('/posts/popular').then(response => {
            setPosts(response.data);
            console.log(response.data);
        })
        .catch(error => {   
            console.error("Error fetching posts:", error);
        });
    }, []);

    

    return (
        <div className={styles.social}>
        <NavInterface>
            <PageComponent>
                <div className={styles.header}>
                    <Button  className={styles.backBtn} variant={ButtonVariant.GHOST} size={ButtonSize.MEDIUM} onClick={() => {router.back();}}>
                        <i className="bi bi-chevron-left"></i> Voltar
                    </Button>
                    <h1>Forum</h1>
                </div>
                <SectionLine className={styles.division}> <i className="bi bi-flower2"></i> </SectionLine>
                <div className={styles.posts}>
                    {posts.map((post) => (
                        <PostPreview key={post.id} post={post} />
                    ))}
                </div>
                <Button  className={styles.postBtn} variant={ButtonVariant.PRIMARY} size={ButtonSize.LARGE} onClick={() => {router.push('/social/new');}}>
                    <i className="bi bi-plus-lg"></i> Postar
                </Button>
            </PageComponent>
        </NavInterface>
        </div>
    );
}
