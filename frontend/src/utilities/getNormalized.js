export default (data) => {
  const result = {
    entities: {},
    ids: [],
  };

  data.forEach((el) => {
    const { id } = el;

    result.ids.push(id);
    result.entities[id] = el;
  });
  return result;
};
