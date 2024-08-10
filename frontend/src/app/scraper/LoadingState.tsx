import {ClockLoader} from "react-spinners";

export function LoadingState({loading}: {loading: boolean}) {
    return (
        <div className="flex flex-col items-center mt-60">
            <ClockLoader loading={loading} color={"grey"}></ClockLoader>
        </div>
    )
}