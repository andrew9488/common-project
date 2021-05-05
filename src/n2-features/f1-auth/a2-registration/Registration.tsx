import React, {ChangeEvent, useState} from "react";

const Registration: React.FC = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    return (
        <div>
            <form>
                <div>
                    <span>Email: </span><input type="text" value={email} onChange={onChangeEmailHandler}/>
                </div>
                <div>
                    <span>password: </span><input type="password" value={password} onChange={onChangePasswordHandler}/>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Registration