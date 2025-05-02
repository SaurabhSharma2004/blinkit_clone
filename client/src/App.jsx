import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {getAllCategories} from "./services/operations/categoryApi.js";
import {setCategories} from "./slices/categorySlice.js";

function App() {
    const {accessToken} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchCategoryData = async () => {
            const data = await getAllCategories(accessToken)
            dispatch(setCategories(data))
        }
        fetchCategoryData()
    }, []);
    return (
        <>
          <Header />
          <main className="min-h-[75vh]">
            <Outlet />
          </main>
          <Footer />
          <Toaster />
        </>
  );
}

export default App;
