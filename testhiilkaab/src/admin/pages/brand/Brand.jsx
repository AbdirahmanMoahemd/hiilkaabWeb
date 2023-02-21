import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import React, { useEffect } from 'react'
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { listBrands, deleteBrands } from '../../../actions/brandActions';
import { Header } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';

const Brand = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    const brandList = useSelector(state => state.brandList) 
    const { loading, error, brands } = brandList

    const brandDelete = useSelector(state => state.brandDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = brandDelete
    
    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login') 
        }
        dispatch(listBrands())
       
    }, [
        dispatch, navigate, userInfo, successDelete])
    
     const deleteHandler = (id) => {
        if (window.confirm('Are you sure to delete this brand')) {
            dispatch(deleteBrands(id))
        }
        
    }






    const onClickFn = ()=>{
        
    }
    const { currentColor } = useStateContext();
    
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-2xl">
        <Header category="Page" title="Brands" currentColor={currentColor} onClick={onClickFn} linktext='/addbrands'/>
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
            {brands.map((brand) => (
            <div className="w-38 mb-2 bg-gray-100 p-2">
              <div className="relative bg-gray-400 group rounded-sm overflow-hidden p-2">
                
                <a
                  to="#"
                  className="flex text-ellipsis text-center items-center justify-center lg:text-base text-sm text-white 
                    font-roboto font-medium tracking-wide transition"
                >
                  {brand.name}
                </a>
               
              </div>
              <div className="flex mt-4 justify-around lg:text-2xl">
              <Link to={`/updateBrand/${brand.id}`}> 
                    <button className="text-primary"><MdModeEdit/></button>
                    </Link>
                    <button onClick={() => deleteHandler(brand.id)}><MdDelete/></button>
              </div>
              </div>
            ))}
          </>
        )}
      </div>
      </div>
    );
}

export default Brand