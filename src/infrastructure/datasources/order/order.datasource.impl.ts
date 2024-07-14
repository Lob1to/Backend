import { MongooseError, isValidObjectId } from "mongoose";
import { orderErrors } from "../../../config";
import { OrderModel, ProductModel, UserModel } from "../../../data/mongo";
import { OrderDatasource, OrderEntity, CreateOrderDto, UpdateOrderDto, CustomError, PaginationDto } from "../../../domain";

// TODO: Implementar codigos de descuento y validarlos

const {
    orderNotFound,
    invalidOrderId,
    invalidUserId,
    userNotFound,
    productNotFound,
    insufficientStock,
    invalidPrice,

} = orderErrors;

export class OrderDatasourceImpl implements OrderDatasource {

    private async calculateOrderTotal(items: { [key: string]: any }[]): Promise<number> {

        let total = 0;
        for (let i = 0; i < items.length; i++) {
            const product = await ProductModel.findById(items[i].product);

            if (!product) throw CustomError.notFound(productNotFound.message(items[i].product), productNotFound.code);


            if (items[i].quantity > product.stock) throw CustomError.badRequest(insufficientStock.message, insufficientStock.code);
            if (items[i].price > product.price) throw CustomError.internalServer(invalidPrice.message, invalidPrice.code);

            if (items[i].variant) {
                total += product.price * items[i].quantity * items[i].variant.price;
            }
            else {
                total += product.price * items[i].quantity;
            }
        }

        return total;

    }

    private async verifyItems(items: { [key: string]: any }[]): Promise<void> {

        for (let i = 0; i < items.length; i++) {
            const id = items[i].product;

            const product = await ProductModel.findById(id);
            if (!product) throw CustomError.notFound(productNotFound.message(id), productNotFound.code);

            if (items[i].quantity > product.stock) throw CustomError.badRequest(insufficientStock.message, insufficientStock.code);
            if (items[i].price > product.price) throw CustomError.internalServer(invalidPrice.message, invalidPrice.code);

        }
    }

    private async verifyUser(userId: string): Promise<void> {

        if (!isValidObjectId(userId)) throw CustomError.badRequest(invalidUserId.message, invalidUserId.code);
        const user = await UserModel.findById(userId);
        if (!user) throw CustomError.notFound(userNotFound.message, userNotFound.code);

    }


    async getOrders(paginationDto: PaginationDto): Promise<{ [key: string]: any | OrderEntity[] }> {

        try {
            const { page, limit } = paginationDto;

            const totalItems = await OrderModel.countDocuments();

            const totalPages = Math.ceil(totalItems / limit);

            const orders = await OrderModel.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .populate('user', 'name')
                .populate('items.product');

            const items = orders.map(OrderEntity.fromObject);

            const returnJson = {
                next: `/api/orders/?page=${page + 1}&limit=${limit}`,
                prev: (page - 1 > 0) ? `/api/orders/?page=${(page - 1)}&limit=${limit}` : null,
                page,
                limit,
                totalPages,
                totalItems,
                items,
            };

            return returnJson;

        } catch (error) {

            if (error instanceof MongooseError) throw error.message;
            throw error;

        }

    }

    async getOrder(id: string): Promise<OrderEntity> {

        try {
            if (!isValidObjectId(id)) throw CustomError.badRequest(invalidOrderId.message, invalidOrderId.code);

            const order = await OrderModel.findById(id)
                .populate('user', 'name')
                .populate('items.product');

            if (!order) throw CustomError.notFound(orderNotFound.message, orderNotFound.code);

            return OrderEntity.fromObject(order);

        } catch (error) {

            if (error instanceof MongooseError) throw error.message;
            throw error;

        }

    }

    async getOrdersByUserId(user: string, paginationDto: PaginationDto): Promise<{ [key: string]: any | OrderEntity[] }> {

        try {
            await this.verifyUser(user);

            const { page, limit } = paginationDto;

            const totalItems = await OrderModel.countDocuments();

            const totalPages = Math.ceil(totalItems / limit);

            const orders = await OrderModel.find({ user })
                .populate('user', 'name email')
                .populate('items.product', 'name price stock')
                .skip((page - 1) * limit)
                .limit(limit);

            const items = orders.map(OrderEntity.fromObject);

            const returnJson = {
                next: `/api/orders/${user}/?page=${page + 1}&limit=${limit}`,
                prev: (page - 1 > 0) ? `/api/orders/${user}/?page=${(page - 1)}&limit=${limit}` : null,
                page,
                limit,
                totalPages,
                totalItems,
                items,
            };

            return returnJson;

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;
            throw error;
        }

    }

    async createOrder(createOrderDto: CreateOrderDto): Promise<OrderEntity> {

        try {

            const {
                user,
                items,
                totalPrice,
                shippingAddress,
                paymentMethod,
                orderStatus,
                trackingUrl

            } = createOrderDto;

            await this.verifyUser(user);

            await this.verifyItems(items);

            const orderTotal = await this.calculateOrderTotal(items);

            const order = new OrderModel({
                user,
                items,
                totalPrice,
                shippingAddress,
                paymentMethod,
                orderTotal,
                orderStatus,
                trackingUrl
            });

            await order.save();

            return OrderEntity.fromObject(order);

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;
            throw error;
        }
    }

    async deleteOrder(id: string): Promise<OrderEntity> {
        try {
            if (!isValidObjectId(id)) throw CustomError.badRequest(invalidOrderId.message, invalidOrderId.code);

            const order = await OrderModel.findById(id);
            if (!order) throw CustomError.notFound(orderNotFound.message, orderNotFound.code);

            await OrderModel.findByIdAndDelete(id);

            return OrderEntity.fromObject(order);
        } catch (error) {
            if (error instanceof MongooseError) throw error.message;
            throw error;
        }
    }

    async updateOrder(updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {

        try {

            const { id } = updateOrderDto;

            if (!isValidObjectId(id)) throw CustomError.badRequest(invalidOrderId.message, invalidOrderId.code);

            const order = await OrderModel.findById(id);
            if (!order) throw CustomError.notFound(orderNotFound.message, orderNotFound.code);

            if (updateOrderDto.values.items) {

                await this.verifyItems(updateOrderDto.values.items);

            }

            if (updateOrderDto.values.userId) {

                await this.verifyUser(updateOrderDto.values.userId);

            }

            await OrderModel.findByIdAndUpdate(id, { ...updateOrderDto.values });

            return OrderEntity.fromObject(order);

        } catch (error) {
            if (error instanceof MongooseError) throw error.message;
            throw error;
        }

    }


}


