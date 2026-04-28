type Props = {
    title: string
    onClick?: () => void
}
export const Button = ({ title, onClick }: Props) => {
    return (
        <button onClick={onClick}>{ title }</button>
    );
};