import {useSelector} from 'react-redux'

const AdminRoute = ({children}) => {
    const {user} = useSelector((state) => state.profile)

    if (!user || user.role !== 'admin') {
        return <Navigate to="/"  />
    }
    return children
}

export default AdminRoute