module.exports = {
  port: 4000,
  jwtSecret: '!TELEPUC-Encrypt!',
  jwtExpirationInSeconds: 5 * 24 * 60 * 60, // 5 days * 24 hours * 60 minutes * 60 seconds
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
