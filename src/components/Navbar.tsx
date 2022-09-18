import { useEffect, useState } from "react";
import { getAuthenticateUser, getUserAddress, initModal, logoutUser, web3auth } from "../lib/auth";


function Navbar() {

  const [user, setUser] = useState<any>(null);
  const [address, setAddress] = useState<string | null>(null);

  const fetchAddress = async () => {
    const value = await getUserAddress();
    setAddress(value);
  }

  const init = async () => {
    await initModal();
    await fetchAddress();
  }

  useEffect(() => {
    init()
  }, []);



  const connect = async () => {
    try {
      await web3auth.connect();
      fetchAddress();
    } catch (e) {
      console.log(e)
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setAddress(null);
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  }




  return (
    <div className="w-full bg-slate-700 text-white">
      <div className="w-3/4 mx-auto flex py-4  justify-between items-center">
        <div>
          <span>Sample App</span>
        </div>
        {address ? (<div>
          <span className="text-white">{address}</span>
          <button onClick={logout} className="bg-white px-4 py-2 rounded-full text-black text-sm">Logout</button>
        </div>) : (<div>
          <button onClick={connect} className="bg-white px-4 py-2 rounded-full text-black text-sm">Connect</button>
        </div>)}
      </div>
    </div>
  );
}

export default Navbar;
