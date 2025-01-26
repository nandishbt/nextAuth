'use client'
export default  function getdetails({params}:any){

    const id = params?.id;

    return (
        <div>
            <h1>Details for user with id {id}</h1>
            {/* Fetch user details from API */}
            {/* Display details */}
        </div>
    )


}