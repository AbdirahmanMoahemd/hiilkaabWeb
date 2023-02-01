import axios from 'axios'
import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
 
} from '../constants/wishlistConstants'

export const addToWish = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: WISHLIST_ADD_ITEM,
    payload: {
      product: data.id,
      name: data.name,
      images: data.images,
      price: data.price,
      newPrice: data.newPrice,
      countInStock: data.countInStock,
      
    },
  })

  localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}

export const removeFromWish = (id) => (dispatch, getState) => {
  dispatch({
    type: WISHLIST_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems))
}


