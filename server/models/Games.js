const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
const options = {
    separator: "-",
    lang: "en",
    truncate: 120
}
mongoose.plugin(slug, options);
const GamesSchema = new mongoose.Schema({
    title: String,
    slug: { type: String, slug: ["title"], slugPaddingSize: 2, unique: true },
    last_url: String,
    description: String,
    preview: {
        src: String,
        alt: String
    },
    stock_price: String,
    discount: Number,
    total_price: String,
    system: Array,
    platform: String,
    info: {
        Genre: Array
    },
    tags: Array,
    config: {
        min: {
            OS: String,
            Processor: String,
            Memory: String,
            Graphics: String,
            Storage: String
        },
        rec: {
            OS: String,
            Processor: String,
            Memory: String,
            Graphics: String,
            Storage: String
        }
    },
    images: Array,
    keys: Array,
    content: String
})
module.exports = mongoose.model("Games", GamesSchema);