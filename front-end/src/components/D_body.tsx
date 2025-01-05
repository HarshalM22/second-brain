import axios from "axios";
import { useEffect, useState } from "react";

import { Contentcard } from "./Contentcard";
import { Card } from "./Card";
import { BACKEND_URL } from "../../config";

interface Props {
    title: string,
    description: string,
    link: string,
    id: number
}
export function D_body() {

    const [data, setData] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(true);

    useEffect(() => {
        if (shouldUpdate) {
            async function fetchData() {

                const response = await axios.get(`${BACKEND_URL}/me`, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })

                setData(response.data.find)
                setShouldUpdate(false);
            }
            fetchData()


        }
    }, [shouldUpdate])


    return (
        <div className="min-h-dvh w-full bg-gradient-to-r from-primary to-secondary flex flex-row justify-center">

            <div className=" h-4/5 w-4/5 grid grid-cols-4 justify-center mt-10 gap-4">
                <Card setShouldUpdate={setShouldUpdate} />

                {data.map((element: Props) => {
                    return (
                        <Contentcard key={element.id} title={element.title} description={element.description} link={element.link} />
                    )
                })}

            </div>

        </div>
    )

}