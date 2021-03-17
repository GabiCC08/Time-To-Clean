import React from 'react';
import Link from "next/link";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import Loading from "../../components/Loading";
import {useAuth} from "@/lib/auth";
const Users =()=>{
    const {user}=useAuth();
    const {data,error}=useSWR(`/users`,fetcher);
    if (error) return <div>No se pudo cargar la informacion de los usuarios</div>;
    if(!data) return <Loading />;
    return (

        <ul>
            {data.data.map((user)=>
                    <table>
                        <tr>
                            <td><Link href={`/users/${user.id}`}>{user.name}</Link>,</td>
                            <td>{user.lastname},</td>
                            <td>{user.birthdate},</td>
                            <td>{user.type},</td>
                            <td>{user.email},</td>
                            <td>{user.role},</td>
                            <td>{user.cellphone},</td>
                        </tr>
                    </table>
            )}
        </ul>
    );
};
export default Users;
