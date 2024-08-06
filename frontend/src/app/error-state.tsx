import {Link} from "react-feather";

export function ErrorState() {
    return (
        <div className="flex flex-col items-center mt-72 gap-2">
            <Link size={80} strokeWidth={0.5} color={"red"}/>
            <p className="text-red-500">Unsupported URL</p>
        </div>
    )
}