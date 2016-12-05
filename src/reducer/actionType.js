/**
 * 对于action.type的判断方法
 */
var actionTypeIn = (type, pattern) => {
    var reg = new RegExp(`^${pattern}\/`);
    return reg.test(type);
};
var actionTypeIs = (type, pattern) => {
    return type === pattern;
};

export {
    actionTypeIs,
    actionTypeIn
}