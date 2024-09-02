export const getNormalizedData = (data) => {
    const result = {
        entities: {},
        ids: []
    }

    data.forEach((el) => {
        const id = el.id

        result.ids.push(id);
        result.entities[id] = el;
    })
    return result;
}