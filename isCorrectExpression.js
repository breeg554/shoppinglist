const isStringEmpty = (str)=>{
    return (!str || /^\s*$/.test(str));
}

export {isStringEmpty}