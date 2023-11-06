const Games = require("../models/Games");

class ApiController {
    async add(req, res) {
        try {
            const {files} = req
            const { title, stock_price, discount, total_price, system, platform, info, tags, config, content } = req.body;
            const data = {
                title: title,
                stock_price: stock_price,
                discount: discount,
                total_price: total_price,
                system: system,
                platform: platform,
                info: info,
                tags: tags,
                config: config,
                content: content
            }
            data.images = []
            files.forEach((file, index) => {
                if(index === 0) {
                    return data.preview = {src: file.filename, alt: file.originalname}
                }
                data.images.push({src: file.filename, alt: file.originalname})
            })
            const games = new Games(data)
            await games.save()
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Ошибка добавления' })
        }
    }
    async get(req, res) {
        try {
            const globalTime = new Date()
            Games.find().limit(100).lean().then(data => {
                res.status(200).json(data)
                console.log((new Date() - globalTime) / 1000)
            }).catch(err => console.error(err))
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: 'Ошибка получения' })
        }
    }
    async update(req, res) {
        try {
            const { title, stock_price, discount, total_price, system, platform, info, tags, config } = req.body;
            const { slug } = req.params;
            Games.findOne({ slug: slug }).then(data => {
                data.title = title;
                data.stock_price = stock_price;
                data.discount = discount;
                data.total_price = total_price;
                data.system = system;
                data.platform = platform;
                data.info = info;
                data.tags = tags;
                data.config = config;
                data.save()
                res.json(data).status(200)
            }).catch(err => res.json(err).status(400))
        } catch (error) {
            console.error(error)
            res.status(400).json({ message: 'Ошибка обновления' })
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            await Games.deleteOne({ _id: id }).then(data => {
                if(data.deletedCount <= 0) {
                    return res.status(400).json({ message: 'Такого элемента нет в базе' })
                }
                res.status(200).json({ message: 'Удаление произошло успешно' })
            })
        } catch (error) {
            console.error(error)
            res.status(400).json({ message: 'Ошибка удаления' })
        }
    }
}

module.exports = new ApiController();