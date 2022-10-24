const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp_camp',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const sample = (array) => { return array[Math.floor(Math.random() * array.length)]; }


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6346be7f639838ed1d65790f',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            image: [
                {
                    url: 'https://res.cloudinary.com/dxlxyxf53/image/upload/v1666278054/YelpCamp/bpwk0uoghv2ei0wt2ksb.jpg',
                    filename: 'YelpCamp/cohaorzfjyyesy2kj8el',
                },
                {
                    url: 'https://res.cloudinary.com/dxlxyxf53/image/upload/v1666275652/YelpCamp/cuoxj5t2irlgrn9daudf.jpg',
                    filename: 'YelpCamp/mmsmubvlh3ihcxdvkkzj',
                }
            ],
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, accusamus hic maxime expedita, fugit quas asperiores incidunt autem perspiciatis quasi placeat facilis nesciunt, sequi provident. Optio dolorum totam fugit sunt.',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})