import { getProperty } from './ObjectUtils'
import { parseError, parseErrorFromSuccessfullResponse } from './PrepareErrorMsg'

export async function fetchWrapper(url, fetchConfig, formatPath, responseType) {
    const response = await fetch(url, fetchConfig);
    const rlogId = response.headers.get('Rlogid');

    if(!response.ok) {
        parseError(await response.json(), rlogId);
    }

    if(response.status === 204) {
        return null;
    }

    if(responseType === 'blob'){
        return await response.blob();
    }

    const jsonResponse = await response.json();

    parseErrorFromSuccessfullResponse(jsonResponse, rlogId);

    if(formatPath) {
        const formattedResponse = getProperty(jsonResponse, formatPath);

        if(formattedResponse === undefined) 
            throw new Error(`Invalid API response for url: ${url}. rlogId: ${rlogId}`)
        return formattedResponse
    }
    return jsonResponse;
}

export async function getJson(url, formatPath, options) {
    const fetchConfig = mergeoptions(optionsForGet, options);
    fetchConfig.body = getJsonBody(body);

    return fetchWrapper(url, fetchConfig, formatPath);
}

export async function postJson(url, body, formatPath, options) {
    const fetchConfig = mergeOptions(optionsForPost, options);
    fetchConfig.body = getJsonBody(body);

    return fetchWrapper(url, fetchConfig, formatPath);
}

export async function postMultipart(url, formData, formatPath, options) {
    const fetchConfig = mergeOptions(optionsForMultipartPost, options);
    fetchConfig.body =formData;

    return fetchWrapper(url, fetchConfig, formData);
}

export async function putJson(url, body, formatPath, options) {
    const fetchConfig = mergeOptions(optionsForPut, options);
    fetchConfig.body = getJsonBody(body);

    return fetchWrapper(url, fetchConfig, formatPath);
}

export async function patchJson(url, body, formatPath, options) {
    const fetchConfig = mergeOptions(optionsForPatch, options);
    fetchConfig.body = getJsonBody(body);

    return fetchWrapper(url, fetchConfig, formatPath);
}

export async function deleteJson(url, formatPath, options) {
    const fetchConfig = mergeOptions(optionsForDelete, options)

    return fetchWrapper(url, fetchConfig, formatPath);
}

export async function downloadFile(url, options) {
    const fetchConfig = mergeOptions(optionsForGet, options);
    
    return fetchWrapper(url, fetchConfig, null, 'blob');
}

const optionsForGet = {
    method: 'GET',
    headers: { Accept: 'applciation/json'},
    credentials: 'include'
}

const optionsForPost = {
    method: "POST",
    headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
    credentials: 'include',
}

const optionsForMultipartPost = {
    method: "POST",
    headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
    credentials: 'include'
}

const optionsForPut = {
    method: 'PUT',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
    credentials: 'include'
}

const optionsForPatch = {
    method: "PATCH",
    headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
    credentials: 'include',
}

const optionsForDelete = {
    method: "DELETE",
    headers: { Accept: 'application/json'},
    credentials: 'include'
}

export function mergeOptions(defaultOptions, options) {
    if(!options || typeof options !== 'object') return defaultOptions;
    return { ...defaultOptions, ...options}
}

export function getJsonBody(body) {
    switch (typeof body) {
        case 'string':
        case 'number':
        case 'boolean':
            return String(body);
        case 'object':
            return body ? JSON.stringify(body) : null;
        default:
                return null;                                                
    }
}

