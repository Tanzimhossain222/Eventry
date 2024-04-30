const { useContext } = require("react");
const { AuthContext } = require("../contexts");

export default function useAuth() {
    const { auth, setAuth } = useContext(AuthContext);
    return { auth, setAuth };
}