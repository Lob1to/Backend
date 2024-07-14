import { Request, Response } from "express";
import { OrderRepository, LogRepository, CreateOrderDto, UpdateOrderDto, PaginationDto } from "../../domain";
import { CreateOrder, DeleteOrder, GetOrder, GetOrders, GetOrdersByUserId, UpdateOrder } from "../../domain/use-cases/";
import { ErrorsHandler, ResponsesHandler } from "../handlers";


export class OrdersController {

    constructor(
        private ordersRepository: OrderRepository,
        private logRepository: LogRepository
    ) { }

    createOrder = (req: Request, res: Response) => {

        try {

            const [error, errorCode, createDto] = CreateOrderDto.create(req.body);

            if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

            new CreateOrder(this.ordersRepository, this.logRepository).execute(createDto!)
                .then(order => ResponsesHandler.sendSuccessResponse(res, 'Pedido creado con éxito', order))
                .catch(error => ErrorsHandler.handleErrors(error, res));


        } catch (error) {
            ErrorsHandler.handleUnknownError(res);
        }

    }


    getOrders = (req: Request, res: Response) => {

        try {
            const { page = 1, limit = 10 } = req.query;


            const [error, errorCode, paginationDto] = PaginationDto.create(+page, +limit);
            if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

            new GetOrders(this.ordersRepository, this.logRepository).execute(paginationDto!)
                .then(orders => ResponsesHandler.sendSuccessResponse(res, 'Pedidos encontrados con éxito', orders))
                .catch(error => ResponsesHandler.sendErrorResponse(res, error.statusCode, error, error.code));

        } catch (error) {

            ErrorsHandler.handleUnknownError(res);

        }
    }

    getOrderById = (req: Request, res: Response) => {

        try {

            const id = req.params.id;
            if (!id) return ResponsesHandler.sendErrorResponse(res, 400, 'Debe enviar el id del pedido', 'bad-request');

            new GetOrder(this.ordersRepository, this.logRepository).execute(id)
                .then(order => ResponsesHandler.sendSuccessResponse(res, 'Pedido encontrado con éxito', order))
                .catch(error => ResponsesHandler.sendErrorResponse(res, error.statusCode, error, error.code));

        } catch (error) {

            ErrorsHandler.handleUnknownError(res);

        }
    }

    getOrdersByUserId = (req: Request, res: Response) => {

        try {

            const { page = 1, limit = 10 } = req.query;


            const [error, errorCode, paginationDto] = PaginationDto.create(+page, +limit);
            if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

            const userId = req.params.userId;
            if (!userId) return ResponsesHandler.sendErrorResponse(res, 400, 'Debe enviar el id del usuario', 'bad-request');

            new GetOrdersByUserId(this.ordersRepository, this.logRepository).execute(userId, paginationDto!)
                .then(orders => ResponsesHandler.sendSuccessResponse(res, 'Pedidos encontrados con éxito', orders))
                .catch(error => ResponsesHandler.sendErrorResponse(res, error.statusCode, error, error.code));

        } catch (error) {
            ErrorsHandler.handleUnknownError(res);
        }

    }

    updateOrder = (req: Request, res: Response) => {

        try {

            const id = req.params.id;
            if (!id) return ResponsesHandler.sendErrorResponse(res, 400, 'Debe enviar el id del pedido', 'bad-request');

            const [error, errorCode, updateDto] = UpdateOrderDto.create({ id, ...req.body });

            if (error) return ResponsesHandler.sendErrorResponse(res, 400, error, errorCode ?? 'bad-request');

            new UpdateOrder(this.ordersRepository, this.logRepository).execute(updateDto!)
                .then(order => ResponsesHandler.sendSuccessResponse(res, 'Pedido actualizado con éxito', order))
                .catch(error => ResponsesHandler.sendErrorResponse(res, error.statusCode, error, error.code));

        } catch (error) {
            ErrorsHandler.handleUnknownError(res);
        }

    }

    deleteOrder = (req: Request, res: Response) => {

        try {

            const id = req.params.id;
            if (!id) return ResponsesHandler.sendErrorResponse(res, 400, 'Debe enviar el id del pedido', 'bad-request');

            new DeleteOrder(this.ordersRepository, this.logRepository).execute(id)
                .then(order => ResponsesHandler.sendSuccessResponse(res, 'Pedido eliminado con éxito', order))
                .catch(error => ResponsesHandler.sendErrorResponse(res, error.statusCode, error, error.code));

        } catch (error) {

            ErrorsHandler.handleUnknownError(res);

        }
    }

}