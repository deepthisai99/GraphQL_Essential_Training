import { reject } from 'lodash';
// import { resolve } from 'path';
import { Widgets } from './dbConnectors';

export const resolvers = {
    getProduct: async function ({ id }) {
        // return new Promise((resolve) => {
        //     Widgets.findById({ _id: id }, (err, product) => {
        //         if (err) reject(err)
        //         else resolve(product)
        //     })
        // });
        const w = await Widgets.findById(id);
        return w;
    },
    getAllProducts: () => {
        return Widgets.find({});
    },
    createProduct: ({ input }) => {
        const newWidget = new Widgets({
            name: input.name,
            description: input.description,
            price: input.price,
            soldout: input.soldout,
            inventory: input.inventory,
            stores: input.stores,
        });

        newWidget.id = newWidget._id;

        // return new Promise((resolve) => {
        //     newWidget.save((err) => {
        //         if (err) reject(err)
        //         else resolve(newWidget)
        //     });
        // });
        newWidget.save();
        return newWidget;
    },
    updateProduct: ({ input }) => {
        return Widgets.findOneAndUpdate({ _id: input.id }, input, { new: true })
    },
    deleteProduct: async function ({ id }) {
        await Widgets.findByIdAndRemove(id);
        console.log("Successfully deleted the widget");
        return "Successfully deleted the widget";

    }
};

export default resolvers;