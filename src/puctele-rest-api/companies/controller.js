const CompanyModel = require("../models/Company");

module.exports = {
  getAllCompanies: (req, res) => {
    const { query: filters } = req;

    CompanyModel.findAllCompanys(filters)
      .then((companies) => {
        return res.status(200).json({
          status: true,
          data: companies,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getCompanyById: (req, res) => {
    const {
      params: { companyId },
    } = req;

    CompanyModel.findCompany({ id: companyId })
      .then((company) => {
        return res.status(200).json({
          status: true,
          data: company.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createCompany: (req, res) => {
    const { body } = req;

    CompanyModel.createCompany(body)
      .then((company) => {
        return res.status(200).json({
          status: true,
          data: company.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createCompanies: async (req, res) => {
    const { body } = req;
    const result = new Array();

    await Promise.all(
      body.map(async (element) => {
        await CompanyModel.createCompany(element)
          .then((company) => {
            result.push(company);
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

  updateCompany: (req, res) => {
    const {
      params: { companyId },
      body: payload,
    } = req;

    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the company.",
        },
      });
    }

    CompanyModel.updateCompany({ id: companyId }, payload)
      .then(() => {
        return CompanyModel.findCompany({ id: companyId });
      })
      .then((company) => {
        return res.status(200).json({
          status: true,
          data: company.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteCompany: (req, res) => {
    const {
      params: { companyId },
    } = req;

    CompanyModel.deleteCompany({id: companyId})
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfCompanysDeleted: numberOfEntriesDeleted
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