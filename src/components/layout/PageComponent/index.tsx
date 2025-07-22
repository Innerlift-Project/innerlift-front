"use client";

import styles from "./styles.module.css";
import { PageComponentProps } from "@/types/PageComponent";

export default function NavInterface(props: PageComponentProps) {

    return (
        <div className={`${styles.pageComponent} ${props.className || ""}`}>
            {props.children}
        </div>
    );
}