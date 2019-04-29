/// This skill is derived from amazon 'fact' template

/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const cookbook = require('./alexa-cookbook.js');


const    SKILL_NAME = 'Ditados Populares';
const    GET_FACT_MESSAGE= 'Aqui vai: ';
const    HELP_MESSAGE= 'Você pode me perguntar por um ditado popular ou fechar a skill. Como posso ajudar?';
const    HELP_REPROMPT= 'O que vai ser?';
const    FALLBACK_MESSAGE= 'A skill' + {SKILL_NAME} + 'não tem uma resposta para isso. Ela pode contar ditados populares, é só perguntar. Como posso ajudar?'
const    FALLBACK_REPROMPT= 'Eu posso contar ditados populares. Como posso ajudar?'
const    ERROR_MESSAGE= 'Desculpa, algo deu errado.'
const    STOP_MESSAGE= 'Tchau!'
const    data =
      [
        'Água mole, pedra dura, tanto bate até que fura.',
        'A pressa é a inimiga da perfeição.',
        'Casa de ferreiro, espeto de pau.',
        'Um dia é da caça, outro do caçador.',
        'Filho de peixe, peixinho é.',
        'Para bom entendedor, meia palavra basta.',
        'Quem com ferro fere, com ferro será ferido.',
        'Cavalo dado não se olha os dentes.',
        'De grão em grão, a galinha enche o papo',
        'Cada macaco no seu galho',
        'Deus ajuda quem cedo madruga',
        'Onde há fumaça há fogo',
        'Cão que ladra não morde',
        'Pimenta nos olhos dos outros é refresco',
        'Quando um burro fala, o outro abaixa a orelha',
        'Mente vazia, oficina do diabo',
        'O que os olhos não veem, o coração não sente',
        'De médico e louco todo mundo tem um pouco',
        'Em terra de cego, quem tem um olho é rei',
        'Ladrão que rouba ladrão tem cem anos de perdão',
        'O seguro morreu de velho',
        'Quem canta seus males espanta',
        'Uma andorinha só não faz verão',
        ' Mais vale um pássaro na mão do que dois voando.',
        'A esperança é a última que morre.',
        'De boas intenções o inferno está cheio.',
        'O que é um peido para quem está cagado',
        'Quem ama o feio, bonito lhe parece.',
        'Quando um não quer, dois não brigam.',
        'Para bom entendedor, meia palavra basta.',
        'Para bom entendedor, meia pala.',
        'Camarão que dorme a onda leva.',
        'A ocasião faz o ladrão.',
        'Águas passadas não movem moinhos.',
        'Pau que nasce torto nunca se endireita',
        'É o olho do dono que engorda o gado',
        'Os últimos serão os primeiros.',
        'Manda quem pode, obedece quem tem juízo.',
        'Não adianta chorar sobre o leite derramado.',
        'Amigos, amigos, negócios à parte.',
        'À noite, todos os gatos são pardos.',
        'a caravana passa e os cães ladram',
        'apressado come cru',
        'agora que a porca torce o rabo',
        'cachorro velho não aprende truque novo',
        'cada macaco no seu galho',
        'com ferro fere, com ferro será ferido',
        'Quem tem boca vai à Roma.'




      ]

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const randomDitado = cookbook.getRandomItem(data);
    const speechOutput =  randomDitado ;

    return handlerInput.responseBuilder
      .speak(GET_FACT_MESSAGE + speechOutput)
      .withSimpleCard(SKILL_NAME, randomDitado)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const FallbackHandler = {
  // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.
  //              This handler will not be triggered except in that locale, so it can be
  //              safely deployed for any locale.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(ERROR_MESSAGE)
      .reprompt(ERROR_MESSAGE)
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
