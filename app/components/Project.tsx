 "use client";

 import { Dispatch, SetStateAction } from "react";
 import { motion } from "framer-motion";
 import styles from "../page.module.css";

 export type ModalState = {
   active: boolean;
   index: number;
 };

 type Props = {
   title: string;
   subtitle: string;
   index: number;
   setModal: Dispatch<SetStateAction<ModalState>>;
 };

 export default function Project({
   title,
   subtitle,
   index,
   setModal,
 }: Props) {
   return (
     <motion.button
       type="button"
       className={styles.projectRow}
       initial="initial"
       whileInView="animate"
       viewport={{ once: true, amount: 0.6 }}
       variants={{
         initial: { opacity: 0, y: 12 },
         animate: {
           opacity: 1,
           y: 0,
           transition: {
             duration: 0.35,
             ease: [0.22, 1, 0.36, 1],
             delay: index * 0.05,
           },
         },
       }}
      onMouseEnter={() => {
        console.log("[Project] Mouse enter:", { title, index });
        setModal({ active: true, index });
      }}
      onFocus={() => {
        console.log("[Project] Focus:", { title, index });
        setModal({ active: true, index });
      }}
      onMouseLeave={() => {
        console.log("[Project] Mouse leave:", { title, index });
        // Don't close immediately, let the section handle it
      }}
      onBlur={() => {
        console.log("[Project] Blur:", { title, index });
        setModal({ active: false, index });
      }}
     >
       <div className={styles.projectTitleGroup}>
         <span className={styles.projectIndex}>
           {String(index + 1).padStart(2, "0")}
         </span>
         <div>
           <p className={styles.projectTitle}>{title}</p>
           <p className={styles.projectSubtitle}>{subtitle}</p>
         </div>
       </div>

       <span className={styles.projectAction}>View</span>
     </motion.button>
   );
 }

