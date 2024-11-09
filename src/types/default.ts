import { User } from "@/types/global";

export const defaultUser: () => User = () => {

    const user: User = {
        name: "",
        email: "",
        password: "",
    }

    return user
}