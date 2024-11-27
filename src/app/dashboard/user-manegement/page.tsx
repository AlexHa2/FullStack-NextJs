import TableComponent from "@/components/Table/Table";




 interface Iuser {
  name: string,
  avatar: string,
  old: number,
  dayofbirth: Date,
  id: number
}



export default async function UserManegement() {

  const data : Iuser = await fetch("https://66722692e083e62ee43e1f49.mockapi.io/api/student/next");
  const DataUser = await data.json();

  console.log("data",DataUser)
  return (
    <>
     <TableComponent rows={DataUser}/>
    </>
  )
}



