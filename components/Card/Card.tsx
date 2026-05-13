'use client';
import clsx from "clsx";
import styles from "./Card.module.css";

interface CardProps {
    children: React.ReactNode;
    className?: string
}

export default function Card({ children, className }: CardProps) {
    return (
        <div className={clsx(styles.card, className)}>
            {children}
        </div>
    )
}