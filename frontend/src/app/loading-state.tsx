import {ClockLoader} from "react-spinners";

export function LoadingState({loading}: {loading: boolean}) {
    return (
        <div className="flex flex-col items-center mt-72">
            <ClockLoader loading={loading} color={"grey"}></ClockLoader>
        </div>
    )
}