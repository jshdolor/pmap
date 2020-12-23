let isUndefined = function(test) {
    return typeof test === 'undefined';
};
let union = (arrA, arrB) => {
    return [...new Set([...arrA, ...arrB])];
};

let each = function(collection, iterator) {
    if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++)
            iterator(collection[i], i, collection);
    } else if (collection instanceof Object) {
        for (let key in collection) iterator(collection[key], key, collection);
    } else if (collection === null) {
        return collection;
    }
};

let isEmpty = (n) => {
    return isUndefined(n) || n === '' || n === null || n === 0;
};

let isArray = (collection) => {
    return Array.isArray(collection);
};

let extend = (dest, src) => {
    return Object.assign(dest, src);
};

function isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
}
let mergeDeep = (target, source) => {
    let output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key])) {
                if (!(key in target))
                    Object.assign(output, {
                        [key]: source[key],
                    });
                else output[key] = mergeDeep(target[key], source[key]);
            } else {
                Object.assign(output, {
                    [key]: source[key],
                });
            }
        });
    }
    return output;
};

let digitDisplay = (digit, numChar, character, posFiller) => {
    let charFiller = '';
    let i = digit.toString().length;
    character = character ? character : '0';
    numChar = numChar ? numChar : 2;

    while (i !== numChar) {
        charFiller += character;
        i++;
    }

    if (posFiller === 'post') {
        return digit + '' + charFiller;
    }

    return charFiller + '' + digit;
};
let propertyValue = (obj, dot, value) => {
    var path = dot.split('.');

    try {
        for (var i = 0; i < path.length; i++) {
            if (value !== null && i + 1 === path.length) {
                obj[path[i]] = obj[path[i]] || value;
            }

            obj = obj[path[i]];
        }

        return obj;
    } catch (e) {
        return value;
    }
};

let strReplaceKeys = (pairs, str) => {
    Object.keys(pairs).map((pairKey) => {
        str = str.replace(new RegExp(pairKey, 'g'), pairs[pairKey]);
    });

    return str;
};

let pluck = (array, key) => {
    return array.map((obj) => obj[key]);
};

let getUrlSearchParams = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

let objFetchByKey = (arr, key, value) => {
    let first = arr.filter((obj) => {
        return obj[key] == value;
    })[0];
    return first ? first : false;
};

let debounce = (func, delay) => {
    let inDebounce;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
};

let urlParser = (url, key) => {
    var parser = document.createElement('a');

    parser.href = url;

    return parser[key];
};

let cleanSource = (source) => {
    return JSON.parse(JSON.stringify(source));
};

let groupBy = (xs, key) => {
    return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

let isElementInViewport = (el) => {
    //special bonus for those using jQuery
    if (typeof jQuery === 'function' && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
            (window.innerHeight ||
                document.documentElement
                    .clientHeight) /*or $(window).height() */ &&
        rect.right <=
            (window.innerWidth ||
                document.documentElement.clientWidth) /*or $(window).width() */
    );
};

let getOffsetTop = (element) => {
    let offsetTop = 0;
    while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
    }
    return offsetTop;
};

const lodashGet = (obj, path, defaultValue) => {
    const travel = (regexp) =>
        String.prototype.split
            .call(path, regexp)
            .filter(Boolean)
            .reduce(
                (res, key) =>
                    res !== null && res !== undefined ? res[key] : res,
                obj
            );
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
    return result === undefined || result === obj ? defaultValue : result;
};

export {
    isUndefined,
    each,
    union,
    isEmpty,
    isArray,
    extend,
    mergeDeep,
    digitDisplay,
    propertyValue,
    strReplaceKeys,
    pluck,
    getUrlSearchParams,
    objFetchByKey,
    debounce,
    urlParser,
    cleanSource,
    groupBy,
    isElementInViewport,
    getOffsetTop,
    lodashGet,
};
