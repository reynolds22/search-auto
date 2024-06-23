import React, {useState, useEffect} from "react";
import Suggest from "./suggest";

export default function SearchAuto(){

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [searchParm, setSearchParm] = useState("");
    const [showDrop, setShowDrop] = useState(false);
    const [filterUser, setFilterUser] = useState([]);

    function handleChange(event){
        const query = event.target.value.toLowerCase();
        setSearchParm(query);

        if(query.length > 1){
            const filteredData = users && users.length 
            ? users.filter(item => item.toLowerCase().indexOf(query) > -1)
            : [];
            setFilterUser(filteredData);
            setShowDrop(true);
        }
        else{
            setShowDrop(false);
        }
    };

    function handleClick(event){
        setShowDrop(false);
        setSearchParm(event.target.innerText);
        setFilterUser([]);
    };

    async function fetchListUsers(){
        try{
            const responce = await fetch(`https://dummyjson.com/users`);
            const data = await responce.json();

            if(data && data.users && data.users.length){
                setUsers(data.users.map((userItem)=> userItem.firstName));
                setLoading(false);
                setError(null);
            };
        }catch(error){
            console.log(error);
            setLoading(false);
            setError(error);
        }
    };

    useEffect(()=>{
        fetchListUsers();
    },[]);

    console.log(users, filterUser);

    return (
        <div className="container">
            {loading 
                ? <h1>Loading Data ! Please Wait</h1> 
                : (
                    <input 
                    name="search-users" 
                    placeholder="Search Users Here..."
                    value={searchParm}
                    onChange={handleChange}
                    style={{
                        margin : "10px auto",
                        display : "block"
                    }}
                />)}
            {showDrop && <Suggest handleClick={handleClick} data={filterUser}/>}
        </div>
    );
};
  