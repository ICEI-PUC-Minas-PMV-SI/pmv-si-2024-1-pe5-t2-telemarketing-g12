module.exports = {
  parseParams: (params) => {
    const { page, limit, id: idList } = params;

    let query = params;
    if (page) {
      delete query.page;
    }
    if (limit) {
      delete query.limit;
    }
    if (idList) {
      delete query.idList;
      query = { ...query, id: JSON.parse(idList) };
    }

    return { query, limit: limit || null, offset: (page - 1) * limit || null };
  },
};
