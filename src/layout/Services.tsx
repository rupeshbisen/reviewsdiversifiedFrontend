import { useContext } from "react";
import { AuthContext } from "../contexts";

export default function Services() {
  const {
    isAuthUser,
    user
  } = useContext(AuthContext);

  console.log("isAuthUser user", isAuthUser,user)
  return (
    <div>Services</div>
  )
}
