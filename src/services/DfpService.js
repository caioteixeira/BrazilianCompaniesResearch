
const get = async (companyId) => {
    return fetch(`../data/${companyId}.json`)
        .then(response => response.json())
        .then(json => json.dfp)
}

export default { get }