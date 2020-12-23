import ApiClient from "~/Infrastructure/Client/ApiClient";
import ExceptionHandler from "~/Infrastructure/Exception/Handler";


export default class ErrorMessagesService {
  static endpoint = "/utilities";

  static getAll() {
    let url = this.endpoint + "/error-messages";

    return ApiClient.setUrl(url)
        .get()
        .then(data => {

            return data;

        })
        .catch(e => new ExceptionHandler('ErrorMessage',e));
  }
}
