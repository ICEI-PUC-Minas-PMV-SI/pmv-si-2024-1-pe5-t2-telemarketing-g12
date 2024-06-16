const ClientModel = require('../models/Client');

module.exports = {
  getAllClients: (req, res) => {
    const { query: filters } = req;

    ClientModel.findAllClients(filters)
      .then((clients) => {
        return res.status(200).json({
          status: true,
          data: clients,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getClientById: (req, res) => {
    const {
      params: { clientId },
    } = req;

    ClientModel.findClient({ id: clientId })
      .then((client) => {
        return res.status(200).json({
          status: true,
          data: client.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createClient: (req, res) => {
    const { body } = req;

    ClientModel.createClient(body)
      .then((client) => {
        return res.status(200).json({
          status: true,
          data: client.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createClients: async (req, res) => {
    const { body } = req;
    const result = new Array();

    await Promise.all(
      body.map(async (element) => {
        await ClientModel.createClient(element)
          .then((client) => {
            result.push(client);
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

  updateClient: (req, res) => {
    const {
      params: { clientId },
      body: payload,
    } = req;

    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: 'Body is empty, hence can not update the client.',
        },
      });
    }

    ClientModel.updateClient({ id: clientId }, payload)
      .then(() => {
        return ClientModel.findClient({ id: clientId });
      })
      .then((client) => {
        return res.status(200).json({
          status: true,
          data: client.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteClient: (req, res) => {
    const {
      params: { clientId },
    } = req;

    ClientModel.deleteClient({ id: clientId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfClientsDeleted: numberOfEntriesDeleted,
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
