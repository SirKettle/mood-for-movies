const getUriSafe = str => str.replace(/ /gi, '-').replace(/[^A-Za-z0-9_-]/gi, '');

export default getUriSafe;
