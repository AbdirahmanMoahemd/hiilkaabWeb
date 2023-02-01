import express from 'express';
const router = express.Router()
import { addOrderItems, getOrderById, getMyOrdersAll,updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered, updateOrderToPaid2} from '../controllers/orderController.js'
import { protect, admin } from '../middlewares/authMiddleware.js'


router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.get('/count', getMyOrdersAll)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid).put(protect, updateOrderToPaid2)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)
router.route('/:id/pay/evc').put(protect, updateOrderToPaid2)


export default router