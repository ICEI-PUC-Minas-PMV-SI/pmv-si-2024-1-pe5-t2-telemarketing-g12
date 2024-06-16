const ProductModel = require("../models/Product");

module.exports = {
  getAllProducts: (req, res) => {
    const { query: filters } = req;

    ProductModel.findAllProducts(filters)
      .then((products) => {
        return res.status(200).json({
          status: true,
          data: products,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getProductById: (req, res) => {
    const {
      params: { productId },
    } = req;

    ProductModel.findProduct({ id: productId })
      .then((product) => {
        return res.status(200).json({
          status: true,
          data: product.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createProduct: (req, res) => {
    const { body } = req;

    ProductModel.createProduct(body)
      .then((product) => {
        return res.status(200).json({
          status: true,
          data: product.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createProducts: async (req, res) => {
    const { body } = req;
    const result = new Array();

    await Promise.all(
      body.map(async (element) => {
        await ProductModel.createProduct(element)
          .then((product) => {
            result.push(product);
          })
          .catch((err) => {
            return res.status(500).json({
              status: false,
              error: err,
            });
          });
      })
    ).finally(() => {
      return res.status(200).json({
        status: true,
        data: JSON.stringify(result),
      });
    });
  },

  updateProduct: (req, res) => {
    const {
      params: { productId },
      body: payload,
    } = req;

    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the product.",
        },
      });
    }

    ProductModel.updateProduct({ id: productId }, payload)
      .then(() => {
        return ProductModel.findProduct({ id: productId });
      })
      .then((product) => {
        return res.status(200).json({
          status: true,
          data: product.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteProduct: (req, res) => {
    const {
      params: { productId },
    } = req;

    ProductModel.deleteProduct({id: productId})
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfProductsDeleted: numberOfEntriesDeleted
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};