const TicketModel = require("../models/Ticket");

module.exports = {
  getAllTickets: (req, res) => {
    const { query: filters } = req;

    TicketModel.findAllTickets(filters)
      .then((tickets) => {
        return res.status(200).json({
          status: true,
          data: tickets,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getTicketById: (req, res) => {
    const {
      params: { ticketId },
    } = req;

    TicketModel.findTicket({ id: ticketId })
      .then((ticket) => {
        return res.status(200).json({
          status: true,
          data: ticket.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createTicket: (req, res) => {
    const { body } = req;

    TicketModel.createTicket(body)
      .then((ticket) => {
        return res.status(200).json({
          status: true,
          data: ticket.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createTickets: async (req, res) => {
    const { body } = req;
    const result = new Array();

    await Promise.all(
      body.map(async (element) => {
        await TicketModel.createTicket(element)
          .then((ticket) => {
            result.push(ticket);
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

  updateTicket: (req, res) => {
    const {
      params: { ticketId },
      body: payload,
    } = req;

    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the ticket.",
        },
      });
    }

    TicketModel.updateTicket({ id: ticketId }, payload)
      .then(() => {
        return TicketModel.findTicket({ id: ticketId });
      })
      .then((ticket) => {
        return res.status(200).json({
          status: true,
          data: ticket.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteTicket: (req, res) => {
    const {
      params: { ticketId },
    } = req;

    TicketModel.deleteTicket({id: ticketId})
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfTicketsDeleted: numberOfEntriesDeleted
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