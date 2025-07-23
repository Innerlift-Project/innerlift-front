"use client";

import NavInterface from "@/components/layout/NavInterface";
import PageComponent from "@/components/layout/PageComponent";
import Button from "@/components/ui/Button";
import { ButtonSize, ButtonVariant } from "@/types/Button";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import api from '@/services/api'

import { useState } from "react";
import SectionLine from "@/components/layout/SectionLine";


export default function NewPost() {
    const router = useRouter()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    

    return (
        <div className={styles.social}>
        <NavInterface>
            <PageComponent className={styles.postPage}>
                <div className={styles.postPage}>
                    <Button  className={styles.backBtn} variant={ButtonVariant.GHOST} size={ButtonSize.MEDIUM} onClick={() => {router.back();}}>
                        <i className="bi bi-chevron-left"></i> Voltar
                    </Button>
                    <form className={styles.postScroller} onSubmit={async (e) => {
                        e.preventDefault();
                        if (title.trim() === "" || content.trim() === "") {
                            alert("Título e conteúdo não podem estar vazios.");
                            return;
                        }
                        
                        try {
                            let tagsArray: string[] = [];
                            if (tags.trim() !== "") {
                                tagsArray = tags.split(' ').map(tag => tag.trim());
                            }
                            await api.post('/posts', { title, content, tags: tagsArray});
                            router.push('/social');
                        } catch (error) {
                            console.error("Error creating post:", error);
                        }
                    }}>
                        <div className={styles.header}>
                            <input type="text" placeholder="Título do post" className={styles.titleInput} onChange={(e) => {
                                setTitle(e.target.value);
                            }}/>
                        </div>
                        <SectionLine className={styles.division}> <i className="bi bi-flower2"></i> </SectionLine>
                        <div className={styles.postContent}>
                            <textarea placeholder="Escreva seu post aqui..." className={styles.contentInput} onChange={(e) => {
                                setContent(e.target.value);
                            }} />
                            <input type="text" placeholder="Tags (separadas por espaço)" className={styles.tagsInput} onChange={(e) => {
                                setTags(e.target.value);
                            }}/>
                        </div>
                        <Button type="submit" className={styles.sendBtn} variant={ButtonVariant.PRIMARY} size={ButtonSize.MEDIUM}>
                            Postar <i className="bi bi-send-fill"></i>
                        </Button>
                    </form>
                </div>

            </PageComponent>
        </NavInterface>
        </div>
    );
}
