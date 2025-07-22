export interface PageComponentBaseProps {
    className?: string;
}

export interface PageComponentProps
    extends PageComponentBaseProps {
    children: React.ReactNode;
    onClick?: () => void | Promise<void>;
}
