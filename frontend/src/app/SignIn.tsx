import {signIn} from "@/auth"

export function SignIn() {

    return (
        <form
              action={async () => {
                  "use server"
                  await signIn("google", {redirectTo: "/cookbook"})
              }}
        >
            <div className="flex flex-col gap-2 items-center mt-20">
                <h3 className="text-xl text-center font-bold">Create an account to save your favorite recipes!</h3>
                <button className="w-full p-4 rounded-2xl text-white bg-violet"
                        type="submit">
                    Sign In with Google
                </button>
            </div>
        </form>
    )
}