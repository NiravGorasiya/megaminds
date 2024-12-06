import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home: React.FC = () => {
    const user = useSelector((state:RootState) => state.auth?.user?.name);
    console.log(user, 'user');

    return (
        <div>
            <h1>Home{user}</h1>
            <p>Welcome to the protected home page!</p>
        </div>
    )
}

export default Home;