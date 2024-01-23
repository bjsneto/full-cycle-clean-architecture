import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";
import { InputCreateProductDto } from "../create/create.product.dto";

const product1: InputCreateProductDto = {
    name: "Product 1",
    price: 100,
    type: "a",
  }

describe("Test find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {
                force: true,
            },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find product", async () => {
        const productRepository = new ProductRepository();
        const useCase = new FindProductUseCase(productRepository);

        const product = ProductFactory.create(product1.type, product1.name, product1.price);
        await productRepository.create(product);

        const output = await useCase.execute({ id: product.id });

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        });
    });
});