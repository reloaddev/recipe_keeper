import {auth, signOut} from "@/auth";

export async function SignOut() {
    const session = await auth();
    const user = session?.user;

    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <div className="flex flex-col gap-2 items-center mt-20">
                <h3 className="text-xl text-center font-bold">Logged in as {user?.name}</h3>
                <button className="w-full p-4 rounded-2xl text-white bg-green"
                        type="submit">
                    Sign Out
                </button>
            </div>
        </form>
    )
}