'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
// importanto Env que são as variaveis de ambiente
const Env = use('Env')

// importanto youch que é um formatador de error
const Youch = use('Youch')

class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    // verifica se o erro é de validação e retorna como json pra o front
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    // verifica se o ambiente é de desenvolvimento para retornar mais detalhes
    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      const errorJSON = await youch.toJSON()
      return response.status(error.status).send(errorJSON)
    }

    return response.status(error.status)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  /* async report (error, { request }) {
    // sentry

  } */
}

module.exports = ExceptionHandler
