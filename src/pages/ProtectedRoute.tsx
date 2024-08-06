import { useNavigate } from "@solidjs/router";
import { children, Component, createEffect, JSX } from "solid-js"
import { toast } from "solid-sonner";

interface ProtectedProps {
    children?: JSX.Element
}

const ProtectedRoute: Component<ProtectedProps> = (props) => {
  const navigate = useNavigate();
  const safeChildren = children(() => props.children);
  const token = localStorage.getItem("jwt_token");
  
  if (!token) {
    toast.error("You need to be logged in to access this page");
    navigate("/login", { replace: true });
  }

  return (
    <>{safeChildren()}</>
  )
}

export default ProtectedRoute