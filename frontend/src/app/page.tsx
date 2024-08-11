import {auth} from "@/auth";
import {Book, Check, Heart} from "react-feather";
import {SignIn} from "@/src/app/SignIn";
import {SignOut} from "@/src/app/SignOut";

const websites = [
    "chefkoch.de",
    "zuckerjagdwurst.com",
    "biancazapatka.com",
    "More soon..."
]

export default async function Home() {

    const session = await auth();

    const websiteCheckList = websites.map((website) => {
        return (
            <div key={website}
                 className="flex items-center gap-1">
                <Check size={20} strokeWidth={2}/>
                <p>{website}</p>
            </div>
        )
    });

    return (
        <div className="flex flex-col items-center px-10">
            <div className="w-full flex flex-col items-end justify-center mt-20">
                <div className="flex items-center">
                    <Book size={80} strokeWidth={1.5} color="black"/>
                    <Heart size={80} strokeWidth={1.5} color="black"/>
                </div>
                <p className="w-2/3 text-end">Your Recipe Cookbook</p>
            </div>
            {session?.user ? <SignOut></SignOut> : <SignIn></SignIn>}
            <div className="flex flex-col gap-2 mt-20 self-start">
                <h3 className="text-xl">Supported Websites</h3>
                {websiteCheckList}
            </div>
        </div>
    );
}
