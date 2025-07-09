import { ReactElement } from "react"

interface DeleteButtonProps {
    Icon: ReactElement
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    reference?: React.Ref<HTMLButtonElement>
}

export function DeleteButton({ Icon, onClick, reference }: DeleteButtonProps) {
    return (
        <div>
            <button ref={reference} onClick={onClick}>{Icon}</button>
        </div>
    );
}

