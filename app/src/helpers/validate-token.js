import config from "../config/config";
import getTokenHeader from "./get-token-header";

export default async function ({token, id}) {
    const isTokenValid = await fetch(config.serverFullAddress + "/validate_token", {headers: {...getTokenHeader()}})
    return isTokenValid
}
