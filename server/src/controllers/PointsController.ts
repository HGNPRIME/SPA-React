import knex from "../database/connection"
import {Request, Response} from 'express'

class PointsController {
    async create(request : Request,response : Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;

        const trx = await knex.transaction()

        const point = {
            image : "https://image.shutterstock.com/image-photo/empty-wood-table-top-on-600w-1140429617.jpg",
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point)

        const point_id = insertedIds[0]

        const pointsItens = items.map((item_id : number) => {
            return {
                item_id,
                point_id,
            }
        });

        await trx("point_items").insert(pointsItens)

        await trx.commit()

        return response.json({
            id : point_id,
            ...point
        })
    }

    async show (request : Request, response : Response) {
        const { id } = request.params

        const point = await knex('points').where('id', id).first()
        if(!point) {
            return response.status(400).json({message : "point not found"})
        }

        const items = await knex('items')
        .join('point_items','items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title')

        return response.json({point , items})
    }

    async index (request : Request, response : Response) {
        const {city , uf, items} = request.query

        const parsedItens = String(items)
        .split(',')
        .map(items => Number(items.trim()))

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItens)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*')
        return response.json(points)
    }
}

export default PointsController