export interface NavInterfaceBaseProps {
    className?: string;
}

export interface NavInterfaceProps
    extends NavInterfaceBaseProps {
    children: React.ReactNode;
    onClick?: () => void | Promise<void>;
}
