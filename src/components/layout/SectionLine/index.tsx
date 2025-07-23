import styles from "./styles.module.css";
import { ISectionLine } from "@/types/SectionLine";


export default function SectionLine(props: Readonly<ISectionLine>){

    return(
        <div className={`${styles.sectionBox} ${props.className || ""} `}>
            <div className={styles.line}></div>
            {props.children}
            <div className={styles.line}></div>
        </div>

    )
}