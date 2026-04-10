type Props = {
    title: string
}
export const Button = ({ title }: Props) => {
    return (
        <button>{ title }</button>
    );
};