import { useEffect, useState } from "react";
import { CreateContentModal } from "./UI/CreateContentModal";

export function InputText() {
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const InputContent = async () => {
            // your async logic here
            // e.g. open modal, wait, then close
            setModal(true);
            // await something here if needed
            setModal(false);
        };

        InputContent();
    }, []);

    return (
        <div>
            <CreateContentModal
                open={modal}
                onClose={() => {
                    setModal(false);
                }}
            />
        </div>
    );
}
