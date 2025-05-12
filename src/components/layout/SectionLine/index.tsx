import styles from "./styles.module.css";
import { ISectionLine } from "@/types/SectionLine";


export default function SectionLine(props: ISectionLine){

    return(
        <div className={styles['section-box']}>
            <div className={styles.line}></div>
            {props.text}
            <div className={styles.line}></div>
        </div>

    )
}