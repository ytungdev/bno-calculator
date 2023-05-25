export function proxy(dest, path) {
    const dev = {
        'server':'http://localhost:3080'
    }

    const prod = {
        'server':'https://localhost:3000'
    }

    let p = process.env.NODE_ENV === "development" ? dev : prod;
    
    return p[dest].concat(path);
}