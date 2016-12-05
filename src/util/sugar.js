var takeWhileTrue = (...cases) => (state,action) => {
    var result = false,
        i=0;
    while(i<cases.length && (result = cases[i].call(null,state,action)) === false ){
        i++;
    }
    if(result !== false)
        return result;
    return false;
}


export {
    takeWhileTrue
};
