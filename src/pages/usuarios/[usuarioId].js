import Link from "next/link";
import {useRouter} from "next/router";
import Loading from "../../components/Loading";
import useSWR from "swr";
import {fetcher} from "@/lib/utils";
import withAuth from "../../hocs/withAuth";

const UserDetails=()=>{
    const router=useRouter();
    const {userId}=router.query;
    const {data,error}=useSWR(`/users/${userId}`,fetcher);
    if (error) return <div>No se pudo cargar la informacion de los usuarios</div>;
    if(!data) return <Loading />;

    return(
        <table>
            <tr>
                <td><Link href={`/users/${data.id}`}>{data.name}</Link>,</td>
                <td>{data.lastname},</td>
                <td>{data.birthdate},</td>
                <td>{data.type},</td>
                <td>{data.email},</td>
                <td>{data.role},</td>
                <td>{data.cellphone},</td>
            </tr>
        </table>
    );
}
export default withAuth(UserDetails);

