
export const wash = array => array.filter(Boolean);

export const arrayPush = (item, itens = []) => {
    if (item) {
        itens.push(item);
    }
    const arrayPushFn = arrayPush;
    return {
        arrayPush(i) {
            return arrayPushFn(i, itens);
        },
        toArray() {
            return itens;
        },
    };
};
