type Props = {
    title: string
    onClick?: () => void
    className?: string
}
export const Button1 = ({ title, onClick, className }: Props) => {
    return (
        <button className={className} onClick={onClick}>{ title }</button>
    );
};