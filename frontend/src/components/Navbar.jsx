import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, saveUserData } from "../Redux/authenticatinoSlice";
import { useEffect } from "react";

export default function Navbar() {

const {userData}=useSelector((state)=>state.authProjext)

const dispatch=useDispatch()
const handleLogout = () => {
  // Clear the token from session storage using the correct key
  sessionStorage.removeItem("userToken"); // Note: "userToken", not "usertoken"
  // Dispatch the action to clear user data from Redux
  dispatch(clearUserData());
  
};

useEffect(() => {
  console.log("User Data:", userData); // Log the userData value
}, [userData]);


  const itemRenderer = (item) => (
    <Link
      to={item.link}
      className="flex align-items-center p-menuitem-link text-decoration-none"
      style={{ color: "inherit" }}
    >
      <span className={item.icon} />
      <span className="mx-2 ">{item.label}</span>
      {item.badge && <Badge className="ml-auto " value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1 ">
          {item.shortcut}
        </span>
      )}
    </Link>
  );
  const items = [
    {
      label: "JEWELRY",
      template: itemRenderer,
      link: "/login",
    },
    {
      label: "NEW RELEASES",
      icon: "pi pi-eject",
      template: itemRenderer,
      link: "/signup",
    },
    {
      label: "GIFTS",
      icon: "pi pi-gift",
      template: itemRenderer,
      link: "/signup",
    },
  ];

  const end = (
    <div className="d-flex align-items-center">
      <div>
        <InputText
          placeholder="Search"
          type="text"
          className="w-8rem sm:w-auto"
        />
      </div>
      <div className="px-2">
        <Link to="/login">
          <i className="pi pi-user" style={{ color: "#708090" }}></i>
        </Link>
      </div>
      <div className="px-2">
        <Link to="/Product">
          <i className="pi pi-shopping-bag" style={{ color: "#708090" }}></i>
        </Link>
      </div>
      <div className="px-1 ">
        <Link
          to="/login"
          className="btn btn-outline-secondary"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Login <i className="pi pi-sign-in" style={{ color: "inherit" }}></i>
        </Link>
      </div>

      <div className="px-1">
        <Link
          to="/login"
          className="btn btn-outline-secondary"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Signup <i className="pi pi-sign-out" style={{ color: "inherit" }}></i>
        </Link>
      </div>

      <div className="px-1">
        <Link
          to="/login"
          className="btn btn-outline-secondary"
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleLogout}
        >
          Logout
          <i className="pi pi-user-plus" style={{ color: "inherit" }}></i>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      <Menubar model={items} end={end} />
    </div>
  );
}



