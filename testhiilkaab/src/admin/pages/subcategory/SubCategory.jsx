import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useEffect } from 'react'
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { deleteSubCategory, listSubCategories } from '../../../actions/subCategoryActions';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

const SubCategory = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const subcategoryList = useSelector(state => state.subcategoryList) 
    const { loading, error, subcategories } = subcategoryList

    const subcategoryDelete = useSelector(state => state.subcategoryDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = subcategoryDelete
    
    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login') 
        }
        dispatch(listSubCategories())
       
    }, [
        dispatch, navigate, userInfo, successDelete])
    
     const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this subcategory')) {
            dispatch(deleteSubCategory(id))
        }
        
    }






    const onClickFn = ()=>{
        
    }
    const { currentColor } = useStateContext();
    
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
        <Header category="Page" title="Sub categories" currentColor={currentColor} onClick={onClickFn} linktext='/addsubCategory'/>
        <div className="grid grid-cols-2 lg:grid-cols-6 sm:grid-cols-2 gap-2">
        {loadingDelete && (
          <center><ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          /></center>
        )}
        {errorDelete && <Message severity="error" text={errorDelete} />}
        {loading ? (
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {subcategories.map((subcategory) => (
            <div className="w-38 mb-2 bg-gray-100 p-2">
              <div className="relative bg-gray-400 group rounded-sm overflow-hidden p-2">
                
                <a
                  to="#"
                  className="flex text-ellipsis text-center items-center justify-center lg:text-base text-sm text-white 
                    font-roboto font-medium tracking-wide transition"
                >
                  {subcategory.name}
                </a>
                <a
                  to="#"
                  className="pt-4 flex items-center justify-center text-sm text-white 
                    font-roboto font-medium tracking-wide transition"
                >
                  {subcategory.category.name}
                </a>
              </div>
              <div className="flex mt-4 justify-around lg:text-2xl">
              <Link to={`/updateSubCategory/${subcategory.id}`}> 
                    <button className="text-primary"><MdModeEdit/></button>
                    </Link>
                    <button onClick={() => deleteHandler(subcategory.id)}><MdDelete/></button>
              </div>
              </div>
            ))}
          </>
        )}
      </div>
      </div>
    );
}

export default SubCategory