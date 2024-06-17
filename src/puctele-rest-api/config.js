module.exports = {
  port: process.env.PORT || 4000,
  jwtSecret: '!TELEPUC-Encrypt!',
  jwtExpirationInSeconds: 5 * 24 * 60 * 60, // 5 days * 24 hours * 60 minutes * 60 seconds
  dbUrlConnection: process.env.DB_URL_CONNECTION || "postgres://pucadmin:redes20204@127.0.0.1:5432/telepucdatabase",
  ticketType: {
    DEFAULT: 'general',
    ASKING: 'asking',
    SELL: 'sell',
    UPGRADE: 'upgrade',
    CANCELATION: 'cancelation',
    COMPLAINT: 'complaint',
  },
  ticketStatus: {
    OPEN: 'open',
    PROGRESS: 'progress',
    COMPLETED: 'completed',
    HOLD: 'hold',
    CANCELLED: 'cancelled',
  },
  ticketPriority: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent',
  },
};
